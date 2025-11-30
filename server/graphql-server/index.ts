/**
 * Apollo GraphQL Server
 * Runs on http://localhost:4000/graphql
 */

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = 4000;

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.log(`🚀 GraphQL Server ready at: ${url}`);
  console.log(`📊 GraphQL Playground available at: ${url}`);
  console.log(`\n💡 Try running: npm run generate:gql (from root) to generate types\n`);
}

startServer().catch((error) => {
  console.error('Failed to start GraphQL server:', error);
  process.exit(1);
});

