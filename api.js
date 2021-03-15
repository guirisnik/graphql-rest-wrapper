const { GraphQLServer } = require('graphql-yoga');
const fetch = require('node-fetch');

require('dotenv').config();

const baseUrl = `https://servicodados.ibge.gov.br/api/v1/localidades`;

const resolverDistritos = {
  distritos: (parent, args) =>
    fetch(`${baseUrl}/distritos`).then((res) => res.json()),
  distritoById: (parent, { id }) =>
    fetch(`${baseUrl}/distritos/${id}`).then((res) => res.json()),
  distritoByUf: (parent, { id }) =>
    fetch(`${baseUrl}/estados/${id}/distritos`).then((res) => res.json()),
  distritoByMesorregiao: (parent, { id }) =>
    fetch(`${baseUrl}/mesorregioes/${id}/distritos`).then((res) => res.json()),
  distritoByMicrorregiao: (parent, { id }) =>
    fetch(`${baseUrl}/microrregioes/${id}/distritos`).then((res) => res.json()),
  distritoByMunicipio: (parent, { id }) =>
    fetch(`${baseUrl}/municipios/${id}/distritos`).then((res) => res.json()),
  distritoByRegiaoImediata: (parent, { id }) =>
    fetch(`${baseUrl}/regioes-imediatas/${id}/distritos`).then((res) =>
      res.json()
    ),
  distritoByRegiaoIntermediaria: (parent, { id }) =>
    fetch(`${baseUrl}/regioes-intermediarias/${id}/distritos`).then((res) =>
      res.json()
    ),
  distritoByRegiao: (parent, { id }) =>
    fetch(`${baseUrl}/regioes/${id}/distritos`).then((res) => res.json()),
};

const resolverMunicipios = {
  municipios: (parent, { id }) =>
    fetch(`${baseUrl}/municipios`).then((res) => res.json()),
  municipio: (parent, { id }) =>
    fetch(`${baseUrl}/municipios/${id}`).then((res) => res.json()),
  municipiosByUf: (parent, { id }) =>
    fetch(`${baseUrl}/estados/${id}/municipios`).then((res) => res.json()),
  municipiosByMesorregiao: (parent, { id }) =>
    fetch(`${baseUrl}/mesorregioes/${id}/municipios`).then((res) => res.json()),
  municipiosByMicrorregiao: (parent, { id }) =>
    fetch(`${baseUrl}/microrregioes/${id}/municipios`).then((res) =>
      res.json()
    ),
  municipiosByRegiaoImediata: (parent, { id }) =>
    fetch(`${baseUrl}/regioes-imediatas/${id}/municipios`).then((res) =>
      res.json()
    ),
  municipiosByRegiaoIntermediaria: (parent, { id }) =>
    fetch(`${baseUrl}/regioes-intermediarias/${id}/municipios`).then((res) =>
      res.json()
    ),
  municipiosByRegiao: (parent, { id }) =>
    fetch(`${baseUrl}/regioes/${id}/municipios`).then((res) => res.json()),
};

const resolvers = {
  Query: {
    ...resolverMunicipios,
    ...resolverDistritos,
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
