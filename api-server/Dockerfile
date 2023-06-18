FROM ruby:3.2.2-alpine3.18

RUN apk add --update build-base bash bash-completion libffi-dev tzdata postgresql-client postgresql-dev nodejs npm yarn

WORKDIR /app

COPY Gemfile* /app/

RUN bundle config --delete bin # let Rails create its own binstub
RUN bundle install

COPY . .

CMD [ "bundle", "exec", "rails", "server", "-b", "0.0.0.0" ]
