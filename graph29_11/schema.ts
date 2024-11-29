export const schema = `#graphql
type Compania{
  id: ID!
  origen: String!
  destino: String!
fecha: String!
}

type Query {
getFlights(origen: String, destino: String): [Compania!]!
getFlight(id: ID!): Compania
}

type Mutation {
  addFlight(origen: String!, destino: String!, fecha: String!): Compania!
}
`;