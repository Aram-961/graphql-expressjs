const express = require("express");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const expressGraphQL = require("express-graphql").graphqlHTTP;

const app = express();

const books = [
  { id: 1, name: "Harry Potter", authorId: 1 },
  { id: 2, name: "The Hobbit", authorId: 2 },
  { id: 3, name: "To Kill a Mockingbird", authorId: 3 },
  { id: 4, name: "The Great Gatsby", authorId: 4 },
  { id: 5, name: "1984", authorId: 5 },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book written by an author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: "List of Books",
      resolve: () => books,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

// dummy graphql schema
// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: "HelloWorld",
//     fields: () => ({
//       message: { type: GraphQLString, resolve: () => "Hello world" },
//     }),
//   }),
// });

app.use("/graphql", expressGraphQL({ graphiql: true, schema: schema }));
app.listen(5000, () => {
  console.log("server is running on port 5000");
});
