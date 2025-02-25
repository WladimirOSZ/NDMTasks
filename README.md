# NDM Tasks - A todo app

## Summary
  - [Summary](#summary)
  - [Stack Summary](#stack-summary)
  - [Requirements](#requirements)
  - [Running the app](#running-the-app)
  - [Running Tests](#runing-tests)
  - [GraphQL docs and folder structure](#graphql-docs-and-folder-structure)
---


## Stack Summary
- Backend:
  - Ruby on Rails
  - Postgres
  - GraphQL
  - RSpec

- Frontend:
  - React
  - Apollo Client
  - Tailwind
  - MUI
  - React Hook Form
  - Jest

## Requirements

- There's two ways of running the app:
  - [Docker](#docker)
  - [Local](#local)

- Docker requirements:
  - Docker

- Local requirements:
 - Ruby 3.3.0
 - Node 20

## Running the app

### Docker
```bash
docker compose up
```

### Local

#### Backend
```bash
bundle install
rails db:create db:migrate
rails s
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

## Running Tests
#### Backend
```bash
docker compose run api bash
bundle exec rspec
```
#### Frontend
```bash
docker compose run frontend bash
npm test
```

### Integration tests (Cypress)
By the moment, cypress can only be runned with local config.
Requirements:
- Node 20

To run Cypress tests, run the app in test environment


#### Docker way
```bash
RAILS_ENV=test docker compose up
```

#### Local way
```bash
RAILS_ENV=test rails s

cd front
npm run dev
```

Then, run cypress
```bash
cd front
npm run cypress
```


## GraphQL docs and folder structure
- [DOC](/doc/structure.md)
- [GraphQL](/doc/graphql.md)