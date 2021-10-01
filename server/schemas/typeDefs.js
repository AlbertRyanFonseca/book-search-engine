const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
}
type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}
type Query {
    me: User
    users: [User]
}
type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): User
    addBook(authors: [String!], description: String!, bookId: String!, image: String!, link: String, title: String!): User
    deleteBook(bookID: ID!): User
}
 type Auth {
     token : ID!
     user: User
 }`;


module.exports = typeDefs;