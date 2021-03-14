const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");

require("dotenv").config();

const baseUrl = `https://servicodados.ibge.gov.br/api/v1/localidades`;
const resolvers = {
  Query: {
    municipios: (parent, args) =>
      fetch(`${baseUrl}/estados/${args.id}/municipios`).then((res) =>
        res.json()
      ),
    municipio: (parent, args) =>
      fetch(`${baseUrl}/municipios/${args.id}`).then((res) => res.json()),
  },
};

const server = new GraphQLServer({
  typeDefs: [`${__dirname}/schemas/schema.graphql`],
  resolvers,
});

const { PORT = 8080 } = process.env;
server.start({ port: PORT }, () =>
  console.log(`Server started on port ${PORT}`)
);
