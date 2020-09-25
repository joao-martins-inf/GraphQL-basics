const { GraphQLServer } = require("graphql-yoga");

// The typeDefs constant defines your GraphQL schema (more about this in a bit). Here, it defines a
// simple Query type with one field called info. This field has the type String!. The exclamation
// mark in the type definition means that this field is required and can never be null.

/*
const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Mutation {
  post(url: String!, description: String!): Link!
}

type Link {
  id: ID!
  description: String!
  url: String!
  teste: String
}
`; */

// The links variable is used to store the links at runtime. For now, everything is stored only
// in-memory rather than being persisted in a database.
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
  {
    id: "link-1",
    url: "ww.test1.com",
    description: "um teste",
  },
];

// You’re adding a new integer variable that simply serves as a very rudimentary way to generate
// unique IDs for newly created Link elements.
let idCount = links.length;

// The resolvers object is the actual implementation of the GraphQL schema. Notice how its structure
// is identical to the structure of the type definition inside typeDefs: Query.info.
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // You’re adding a new resolver for the feed root field. Notice that a resolver always has to
    //be named exactly after the corresponding field from the schema definition.
    feed: () => links,
  },

  Mutation: {
    // The implementation of the post resolver first creates a new link object, then adds it to the
    // existing links list and finally returns the new link.
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
  },

  // Finally, you’re adding three more resolvers for the fields on the Link type from the schema
  // definition. We’ll discuss what the parent argument that’s passed into the resolver here is in a bit.

  //its possibel to ommit the code above is here just to understand whats happening beeing the scenes
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
};

// Finally, the schema and resolvers are bundled and passed to the GraphQLServer which is imported
// from graphql-yoga. This tells the server what API operations are accepted and how they should be resolved.
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
