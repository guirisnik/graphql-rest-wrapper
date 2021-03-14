## GraphQL REST Wrapper

A GraphQL server wrapping IBGE API.

### How it works

[IBGE API](https://servicodados.ibge.gov.br/api/docs/localidades#api-Municipios) provides endpoints to fetch cities given a state ID. This server acts as a GraphQL gateway to filter the API response and avoid overfetching.

Response schemas are defined in `schemas/schema.graphql` for just two endpoints described in the documentation.

### How to run

Set the port you want the server to run on `.env` and then just install dependencies using `npm` or `yarn`:

```bash
npm install
```

```bash
yarn install
```

To run the server use the `start` script defined in `package.json`:

```bash
npm run start
```

or

```bash
yarn start
```
