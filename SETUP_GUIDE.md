# Quick Setup Guide

Complete setup guide for the TypeScript & Vue 3 presentation project with backend servers.

## 📦 Installation

### Option 1: One Command Setup (Recommended)

```bash
npm run setup
```

This will install dependencies for:
- Root project (Slidev)
- Demo app (Vue 3)
- Backend servers (GraphQL + REST)

### Option 2: Manual Installation

```bash
# Root dependencies
npm install

# Demo app dependencies
cd demo-app
npm install
cd ..

# Server dependencies
cd server
npm install
cd ..
```

## 🚀 Running the Project

### Start Everything

In separate terminals, run:

**Terminal 1 - Presentation:**
```bash
npm run dev
```
Opens at: http://localhost:3030

**Terminal 2 - Demo App:**
```bash
npm run demo:dev
```
Opens at: http://localhost:5173

**Terminal 3 - Backend Servers:**
```bash
npm run server:both
```
- GraphQL: http://localhost:4000/graphql
- REST API: http://localhost:3000/api
- Swagger UI: http://localhost:3000/api-docs

## 🔄 Type Generation Workflow

### 1. Start the servers

```bash
npm run server:both
```

Wait for both servers to be running:
- ✓ GraphQL Server ready at http://localhost:4000/graphql
- ✓ REST API Server ready at http://localhost:3000/api

### 2. Generate Types

**GraphQL Types:**
```bash
npm run generate:gql
```
Generates: `demo-app/src/generated/graphql.ts`

**REST API Types:**
```bash
npm run generate:rest
```
Generates: `demo-app/src/generated/rest-api.ts`

### 3. Use Generated Types

The demo app can now import and use the generated types:

```typescript
// Import GraphQL types
import type { GetUsersQuery, User } from '@/generated/graphql';

// Import REST API types (after generation)
import type { components } from '@/generated/rest-api';

type RestUser = components['schemas']['User'];
```

## 🎯 Quick Start Checklist

- [ ] Run `npm run setup` to install all dependencies
- [ ] Start servers: `npm run server:both`
- [ ] Verify GraphQL Playground: http://localhost:4000/graphql
- [ ] Verify Swagger UI: http://localhost:3000/api-docs
- [ ] Generate GraphQL types: `npm run generate:gql`
- [ ] Generate REST types: `npm run generate:rest`
- [ ] Start demo app: `npm run demo:dev`
- [ ] Start presentation: `npm run dev`

## 🧪 Testing the APIs

### GraphQL Playground

Go to http://localhost:4000/graphql and try:

```graphql
query {
  users {
    id
    username
    email
    firstName
    lastName
  }
}
```

### Swagger UI

Go to http://localhost:3000/api-docs and try:
- Expand GET `/api/users`
- Click "Try it out"
- Click "Execute"
- See the response

### Using the REST Client

In the demo app, you can use the REST client:

```typescript
import { restClient } from '@/api/restClient';

// Get all users
const users = await restClient.getUsers();

// Get specific user
const user = await restClient.getUser('1');

// Create new user
const newUser = await restClient.createUser({
  username: 'newuser',
  email: 'new@example.com',
  password: 'password123',
  firstName: 'New',
  lastName: 'User',
});
```

## 📝 Preparing for Presentation

1. **Setup Kahoot Quiz**
   - Go to kahoot.com
   - Create new quiz
   - Copy questions from `kahoot-questions.md`
   - Get game PIN ready

2. **Test All Systems**
   ```bash
   npm run server:both    # Terminal 1
   npm run demo:dev       # Terminal 2
   npm run dev           # Terminal 3
   ```

3. **Verify Type Generation**
   ```bash
   npm run generate:gql
   npm run generate:rest
   ```

4. **Check All URLs**
   - ✓ Presentation: http://localhost:3030
   - ✓ Demo App: http://localhost:5173
   - ✓ GraphQL: http://localhost:4000/graphql
   - ✓ REST API: http://localhost:3000/api-docs

## 🐛 Troubleshooting

### Servers Won't Start

**Issue**: Port already in use

**Solution**:
```bash
# Find process on port 4000
lsof -i :4000
kill -9 <PID>

# Find process on port 3000
lsof -i :3000
kill -9 <PID>
```

### Type Generation Fails

**Issue**: Cannot reach server

**Solution**:
- Ensure servers are running: `npm run server:both`
- Check server logs for errors
- Verify URLs are accessible

### Demo App Can't Connect to APIs

**Issue**: CORS or connection error

**Solution**:
- Servers must be running
- Check browser console for errors
- Verify API URLs in demo app match server ports

## 📚 Additional Resources

- **GraphQL Playground**: Interactive GraphQL testing
- **Swagger UI**: Interactive REST API testing  
- **TypeScript Docs**: https://www.typescriptlang.org/docs/
- **Vue 3 Docs**: https://vuejs.org/
- **Apollo Server**: https://www.apollographql.com/docs/apollo-server/
- **GraphQL Codegen**: https://the-guild.dev/graphql/codegen

## 🎉 You're Ready!

Once all systems are running, you have:
- ✅ Live GraphQL server with Playground
- ✅ Live REST API with Swagger documentation
- ✅ Type generation from live APIs
- ✅ Interactive demo application
- ✅ Comprehensive presentation slides
- ✅ Kahoot quiz ready

**Have a great presentation! 🚀**

