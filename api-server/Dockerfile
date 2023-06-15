FROM ruby:3.2.2-alpine3.18

RUN apk add --update build-base bash bash-completion libffi-dev tzdata postgresql-client postgresql-dev nodejs npm yarn

WORKDIR /app

COPY Gemfile* /app/
COPY boot.rb /app/boot.rb

RUN bundle config --delete bin # let Rails create its own binstub
RUN bundle install

# CMD [ "rails", "server" ]

CMD [ "/bin/bash" ]


# command: "bundle exec rails s -p 3000 -b '0.0.0.0'" # move to Dockerfile?

# actually this just tries to run the scaffolding when I do it
