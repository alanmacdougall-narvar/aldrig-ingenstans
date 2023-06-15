# --json automatically sets content-type headers and does a POST

curl http://localhost:80/video --json '{"fruit": "apple", "fruitCount": 100}';

curl http://localhost:80/video \
  --header 'Content-Type: application/json' \
  --data '{"fruit": "apple", "fruitCount": 100}'

curl http://localhost:5000/post-test \
  --header 'Content-Type: application/json' \
  --data '{"fruit": "apple", "fruitCount": 100}'

curl -X POST http://localhost:5000/simple-post-test

curl http://localhost:80/video \
  --json '{"title": "Title abc123", "url": "https://www.example.com/videos/abc123"}';

curl http://localhost:80/video \
  --json '{"title": "Title def456", "url": "https://www.example.com/videos/def456"}';

curl http://localhost/api/videos
# cool, this works ... and clearly persisted between docker runs

# graphql query test... this works!

curl http://localhost/graphql \
  --json '{"query": "query { helloWorld { message } }"}'


curl http://localhost/graphql \
  --json '{"query": "query { videos { title }}"}'

curl http://localhost:4000 \
  --json '{"query": "query { videos { title }}"}'

# test cors by emulating frontend server

curl http://localhost/api/videos --header 'Origin: http://localhost:3000'

# generate local ssl key
mkdir -p certbot/conf/live

sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout certbot/conf/live/localhost/nginx-selfsigned.key \
  -out certbot/conf/live/localhost/nginx-selfsigned.crt

# on prod, create swap file

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


# on prod, rebuild frontend and restart

sudo docker exec -it frontend npm run build

sudo docker exec -it frontend /bin/sh

which npm

sudo docker compose up --no-deps --build -d frontend
