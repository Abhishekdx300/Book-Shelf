const graphql = require("graphql");
const _ = require("lodash");
const bookModel = require("../models/book");
const authorModel = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// var books = [
// {name:'Name of the Wind', genre: 'Fantasy', id:1, authorId:1},
// {name:'The Final Empire', genre: 'Fantasy', id:2, authorId : 2},
// {name:'The Long Earth', genre: 'Sci-Fi', id:3, authorId : 3},
// {name:'The Hero of Ages', genre: 'Fantasy', id:4, authorId : 2},
// {name:'The Colour of Magic', genre: 'Fantasy', id:5, authorId : 3},
// {name:'The Light Fantastic', genre: 'Fantasy', id:6, authorId : 3},
// ]
// var authors = [
//   {name:'Patrick Rothfuss', age:44, id:1},
//   {name:'Brando Sanderson', age:42, id:2},
//   {name:'Terry Pratchett', age:66, id:3},
// ]

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
        return authorModel.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //  return _.filter(books, { authorId: parent.id });
        return bookModel.find({ authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other source
        //   return _.find(books, { id: args.id });
        return bookModel.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code
        // return _.find(authors, { id: args.id });
        return authorModel.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //   return books;
        return bookModel.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //      return authors;
        return authorModel.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new authorModel({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let book = new bookModel({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
