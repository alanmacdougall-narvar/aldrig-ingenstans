# Aldrig Ingenstans

När, var? Aldrig, ingenstans.

"When, where? Nowhere, never."

Demonstrates a Docker config with a Postgres-backed Rails API server behind an
nginx reverse proxy. Nginx also serves the JS frontend.

## Initial setup

Copy `.env.example` to `.env` and add the missing values. Same for
`.env.production.example`.

Don't worry about `frontend/.env`; no secrets, just config.

Run `docker compose run api-server bundle exec rails db:prepare` to set up the
database and run migrations.

## Running the prod setup in local docker

To run the entire project on localhost:

```
COMPOSE_PROFILES='production' docker compose up --build
```

Accessible at https://localhost.

This is a test of the whole system; not set up for local development with
reloading, etc. To do actual dev work, see the next two sections.

Note that there is a `bin/run_production.sh`, but it includes a `--detach`
command which runs Docker in the background, and it uses `.env.production`,
which specifies non-localhost SSL certificates.

Note that SSL won't work unless you have self-signed keys in `/certbot/conf`.
See `.env` for exact paths.

I used `mkcert` to run a local certificate authority for my self-signed keys on
localhost:

```
brew install mkcert
mkcert -install
mkcert localhost 127.0.0.1 # generates local keys
# now you can move those local keys to /certbot/conf
```

## Running in development

```
COMPOSE_PROFILES='' sudo docker compose up --build
```

This will start only the Postgres database; run the server and frontend
separately:

```
# in frontend
npm install # as needed
npm run dev

# in api-server
bundle install # as needed
bundle exec rails server
```

Now load http://localhost:5173 and you're good.

Note that `/api-server/.env` is a symlink to `/.env`. That's where we're getting
the postgres credentials.

Why not develop in Docker? I don't know, man, I just like hitting a `byebug` and
getting an interactive console. It's probably possible in Docker, I'd have to
mess with it some more.

## Running in production

See `.env.production` (and `frontend/.env.production`) for differences.

```
./bin/run_production.sh
```

### SSL certificates

Note that SSL won't work unless Certbot-generated keys are present in
`/certbot/conf`. To produce these keys, run this on the server:

```
sudo docker compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d aldrig-ingestans.site
```

Use the root crontab to set up SSL key renewal:
```
<cron timing expression> /home/<user>/aldrig-ingestans/bin/renew_certificates.sh
```

### If frontend fails to build on prod

On my minimal DigitalOcean droplet, the `npm install` phase of the frontend
Dockerfile was timing out. Even though NPM's error message was about
connectivity, the real answer seems to be that the system was out of RAM.
Based on [this StackOverflow answer](https://stackoverflow.com/questions/49228066/npm-install-via-digital-ocean-gets-killed),
I ran these commands at the Linux shell (not within Docker), and my builds
worked fine after that:

```sh
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon --show
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
sudo sysctl vm.swappiness=10
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
sudo sysctl vm.vfs_cache_pressure=50
echo 'vm.vfs_cache_pressure=50' | sudo tee -a /etc/sysctl.conf
```
