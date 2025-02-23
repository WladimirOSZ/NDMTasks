# NDM Tasks - A todo app

## Summary
  - [Summary](#summary)
  - [Stack Summary](#stack-summary)
  - [Requirements](#requirements)
  - [Running the app](#running-the-app)
  - [Tests](#tests)
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

## Tests
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

## GraphQL docs and folder structure
- [DOC](/doc/structure.md)
- [GraphQL](/doc/graphql.md)