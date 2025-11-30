/**
 * GraphQL Type Definitions
 * Schema matches the root schema.graphql file
 */

export const typeDefs = `#graphql
  scalar DateTime
  scalar JSON

  type User {
    id: ID!
    username: String!
    email: String!
    firstName: String
    lastName: String
    avatar: String
    createdAt: DateTime!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    author: User!
    tags: [String!]!
    createdAt: DateTime!
    updatedAt: DateTime!
    metadata: JSON
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
    firstName: String
    lastName: String
  }

  input UpdateUserInput {
    username: String
    email: String
    firstName: String
    lastName: String
  }

  input CreatePostInput {
    title: String!
    content: String!
    published: Boolean
    tags: [String!]
  }

  input UpdatePostInput {
    title: String
    content: String
    published: Boolean
    tags: [String!]
  }

  type Query {
    user(id: ID!): User
    users(limit: Int, offset: Int): [User!]!
    post(id: ID!): Post
    posts(limit: Int, offset: Int, authorId: ID): [Post!]!
    me: User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post!
    deletePost(id: ID!): Boolean!
  }
`;

