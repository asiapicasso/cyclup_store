<h1 align="center">
  Cyclup Design Store - Backend & Dashboard Admin
</h1>

<h4 align="center">
  <a href="https://docs.medusajs.com">Medusa Documentation</a> |
</h4>

# Getting Started

## Compatibility

This starter is compatible with versions >= 1.8.0 of `@medusajs/medusa`.

## Prerequisites

- [Postgres](https://www.postgresql.org/)
- [Medusa](https://docs.medusajs.com/)
- [Docker](https://docs.docker.com/get-docker/)

## Install Docker with volume

Example : 
`docker run -d --name name -e 'POSTGRES_USER=username' -e 'POSTGRES_PASSWORD=password' -e 'POSTGRES_DB=data_base' -v volume:/var/lib/postgresql/data -p 5432:5432 postgres`

## Install the dependencies on the project

`npm install`

## Run the project

`npm run dev`

### Open the code and start customizing

Your Backend is now running at http://localhost:9000!

Your Dashboard Admin is now running at http://localhost:7001!