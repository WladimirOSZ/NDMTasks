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

### Setup
First, copy the .env.example file to .env:
```bash
cp .env.example .env
```

### Running the app
There's two ways of running the app:

### Option 1. Docker
```bash
docker compose up
```
And the app will be running at `http://localhost:5173`

### Option 2. Local

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

And the app will be running at `http://localhost:5173.`

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

Make sure you have cypress installed
```bash
npm install cypress
```

Then, run cypress
```bash
npx run cypress
```


## GraphQL docs and folder structure
- [DOC](/doc/structure.md)
- [GraphQL](/doc/graphql.md)