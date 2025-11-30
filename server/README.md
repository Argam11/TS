# TypeScript Demo Servers

Two backend servers for demonstrating TypeScript type generation from live APIs.

## Structure

- **GraphQL Server** (Apollo Server) - Port 4000
- **REST API Server** (Express.js) - Port 3000
- **Shared Data** - In-memory mock data used by both servers

## Quick Start

### Install Dependencies

```bash
npm install
```

### Run GraphQL Server

```bash
npm run dev:graphql
```

GraphQL API will be available at:
- API: http://localhost:4000/graphql
- Playground: http://localhost:4000/graphql

### Run REST API Server

```bash
npm run dev:rest
```

REST API will be available at:
- API: http://localhost:3000/api
- Swagger UI: http://localhost:3000/api-docs
- OpenAPI spec: http://localhost:3000/api/swagger.json

### Run Both Servers

```bash
npm run dev:both
```

## Type Generation

### GraphQL Types

From the **root directory**:

```bash
# Make sure GraphQL server is running
npm run server:graphql

# Generate types
npm run generate:gql
```

Types will be generated in `demo-app/src/generated/graphql.ts`

### REST API Types

From the **root directory**:

```bash
# Make sure REST server is running
npm run server:rest

# Generate types
npm run generate:rest
```

Types will be generated in `demo-app/src/generated/rest-api.ts`

## API Endpoints

### GraphQL

**Queries:**
- `user(id: ID!): User`
- `users(limit: Int, offset: Int): [User!]!`
- `post(id: ID!): Post`
- `posts(authorId: ID, limit: Int): [Post!]!`
- `me: User`

**Mutations:**
- `createUser(input: CreateUserInput!): User!`
- `updateUser(id: ID!, input: UpdateUserInput!): User!`
- `deleteUser(id: ID!): Boolean!`
- `createPost(input: CreatePostInput!): Post!`
- `updatePost(id: ID!, input: UpdatePostInput!): Post!`
- `deletePost(id: ID!): Boolean!`

### REST API

**Users:**
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

**Posts:**
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

## Mock Data

The servers use shared in-memory mock data:

**Users:**
- 4 users (John Doe, Jane Smith, Bob Johnson, Alice Williams)

**Posts:**
- 7 posts with various authors, tags, and published states

## Tech Stack

- **GraphQL**: Apollo Server 4.x
- **REST**: Express.js with TypeScript
- **API Docs**: Swagger/OpenAPI with swagger-ui-express
- **Type Generation**: GraphQL Code Generator, openapi-typescript

## Scripts

- `npm run dev:graphql` - Start GraphQL server
- `npm run dev:rest` - Start REST API server
- `npm run dev:both` - Start both servers concurrently
- `npm run build` - Build TypeScript to JavaScript
- `npm run start:graphql` - Start compiled GraphQL server
- `npm run start:rest` - Start compiled REST API server

