# TypeScript & Vue 3 Mastery Presentation

A comprehensive presentation and demo application covering all TypeScript features with real-world applications in Vue 3.

## 📋 Table of Contents

🎯 [Overview](#-overview)  
📁 [Project Structure](#-project-structure)  
✨ [Features](#-features)  
🚀 [Installation](#-installation)  
💻 [Usage](#-usage)  
📚 [Presentation Content](#-presentation-content)  
🎮 [Demo App](#-demo-app)  
💻 [Backend Servers](#-backend-servers)  
🔧 [TypeScript Configuration](#-typescript-configuration)  
🔄 [CI/CD](#-cicd)  
🎬 [Live Coding](#-live-coding)  
⚡ [Technologies Used](#-technologies-used)  
📚 [Resources](#-resources)  
🎯 [Key Takeaways](#-key-takeaways)  
🤝 [Contributing](#-contributing)  
📝 [License](#-license)  
👤 [Author](#-author)  
🙏 [Acknowledgments](#-acknowledgments)

## 🎯 Overview

This project provides a complete educational resource for TypeScript and Vue 3, including:

- **Slidev Presentation**: 70-minute comprehensive presentation covering all TypeScript features
- **Interactive Demo App**: Vue 3 application demonstrating every TypeScript concept
- **Real-World Examples**: API integration, form validation, state management, and more
- **Production-Ready Setup**: Complete CI/CD, type checking, and best practices

## 📁 Project Structure

```
TS/
├── slides.md                          # Main Slidev presentation (70 min)
├── package.json                       # Root dependencies and scripts
├── tsconfig.json                      # Comprehensive TypeScript configuration
├── codegen.yml                        # GraphQL Code Generator configuration
├── schema.graphql                     # Example GraphQL schema
├── api-spec.yaml                      # Example OpenAPI specification
├── kahoot-questions.md                # 20 quiz questions for Kahoot
├── live-coding-starter.ts             # Live coding starting point
├── live-coding-complete.ts            # Live coding complete solution
├── LIVE_CODING_SCRIPT.md              # Step-by-step live coding guide
├── LIVE_CODING_TIPS.md                # Tips for successful live coding
├── .github/workflows/
│   └── typescript-check.yml           # CI/CD pipeline for type checking
├── components/                        # Vue components for slides
│   ├── TypeScriptDemo.vue
│   └── LiveCodingPlayground.vue
└── demo-app/                          # Interactive demo application
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── src/
    │   ├── main.ts
    │   ├── App.vue
    │   ├── router/
    │   │   └── index.ts
    │   ├── views/                     # Page components
    │   │   ├── HomeView.vue
    │   │   ├── BasicTypesView.vue
    │   │   ├── GenericsView.vue
    │   │   ├── FormValidationView.vue
    │   │   └── ...
    │   ├── components/                # Reusable components
    │   │   └── TypeSafeForm.vue
    │   ├── examples/                  # TypeScript feature examples
    │   │   ├── basic-types.ts
    │   │   ├── generics.ts
    │   │   ├── utility-types.ts
    │   │   ├── conditional-types.ts
    │   │   ├── mapped-types.ts
    │   │   ├── type-guards.ts
    │   │   └── template-literals.ts
    │   └── real-world/                # Real-world implementations
    │       ├── api-integration.ts
    │       ├── form-validation.ts
    │       └── state-management.ts
    └── generated/                     # Generated types
        └── graphql.ts
```

## ✨ Features

### TypeScript Coverage (100%)

- **Basic Types**: Primitives, arrays, tuples, enums
- **Object Types**: Interfaces, type aliases, index signatures
- **Functions**: Signatures, overloads, this parameter
- **Generics**: Constraints, inference, variadic tuples
- **Utility Types**: All built-in utilities (Partial, Pick, Omit, etc.)
- **Conditional Types**: infer keyword, distributive types
- **Mapped Types**: Key remapping, modifiers
- **Type Guards**: typeof, instanceof, user-defined, assertion functions
- **Template Literals**: String manipulation at type level
- **Advanced Features**: Decorators, const assertions, satisfies operator

### Real-World Applications

- **API Integration**: Type-safe clients, error handling, caching
- **GraphQL Server**: Live Apollo Server with type generation
- **REST API Server**: Live Express server with OpenAPI/Swagger
- **Type Generation**: Auto-generate types from live APIs
- **Form Validation**: Zod + Vuetify integration
- **State Management**: Pinia with full type safety
- **CI/CD**: Automated type checking in GitHub Actions

## 🚀 Installation

### Prerequisites

- Node.js 18+ or 20+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd TS

# Install all dependencies (root + demo-app + servers)
npm run setup

# Or install manually:
npm install                  # Root dependencies
cd demo-app && npm install   # Demo app
cd ../server && npm install  # Servers
cd ..
```

## 💻 Usage

### Running the Presentation

```bash
# Start Slidev presentation in development mode
npm run dev

# Build static presentation
npm run build

# Export to PDF
npm run export
```

The presentation will be available at `http://localhost:3030`

### Running the Demo App

```bash
# Start demo app
npm run demo:dev
```

The demo app will be available at `http://localhost:5555`

### Running the Servers

```bash
# Start GraphQL server (port 4000)
npm run server:graphql

# Start REST API server (port 3000)
npm run server:rest

# Start both servers simultaneously
npm run server:both
```

**Server URLs:**
- GraphQL API: http://localhost:4000/graphql
- GraphQL Playground: http://localhost:4000/graphql
- REST API: http://localhost:3000/api
- Swagger UI: http://localhost:3000/api-docs
- OpenAPI Spec: http://localhost:3000/api/swagger.json

### Type Generation from Live Servers

```bash
# Make sure servers are running first!
npm run server:both

# In a new terminal, generate types:

# Generate TypeScript types from live GraphQL server
npm run generate:gql

# Generate types from live REST API (OpenAPI spec)
npm run generate:rest
```

Generated types will be in:
- GraphQL: `demo-app/src/generated/graphql.ts`
- REST API: `demo-app/src/generated/rest-api.ts`

### Type Checking

```bash
# Type check root project
npm run type-check

# Type check in watch mode
npm run type-check:watch

# Type check demo app
npm run demo:type-check

# Type check everything (for CI)
npm run ci:check
```

## 📚 Presentation Content

### Part 1: TypeScript Fundamentals (27 min)

1. **Introduction & History** (3 min)
   - TypeScript origins (Anders Hejlsberg, Microsoft, 2012)
   - Why it was created
   - Evolution timeline
   - Current adoption

2. **Complete Type System** (24 min)
   - Basic types (primitives, arrays, tuples, enums)
   - Object types & interfaces
   - Functions
   - Generics
   - Utility types
   - Conditional types
   - Mapped types
   - Type guards
   - Template literals
   - Advanced features

### Part 2: Real-World Applications (38 min)

4. **tsconfig.json Deep Dive** (5 min)
   - All compiler options explained
   - Best practices
   - Project configurations

5. **API Type Generation** (6 min)
   - GraphQL Code Generator
   - OpenAPI/Swagger to TypeScript
   - Live examples

6. **TypeScript Tooling & CI/CD** (4 min)
   - Type checking commands
   - GitHub Actions integration
   - Pre-commit hooks

7. **Forms with Zod & Vuetify** (6 min)
   - Schema definition
   - Type inference
   - Complete form example

8. **Other Real-World Patterns** (12 min)
   - State management (Pinia)
   - Error handling
   - Vue 3 components
   - Design patterns

9. **Live Coding Demo** (5 min)
   - Build feature from scratch
   - Real-time type checking

### Part 3: Wrap-up (5 min)

10. **Demo App Showcase** (3 min)
11. **Q&A & Resources** (2 min)

## 🎮 Demo App

The demo application provides interactive examples for:

- **Basic Types**: All primitive types with examples
- **Generics**: Reusable type-safe code
- **Utility Types**: Built-in type transformations
- **Conditional Types**: Type inference and conditions
- **Mapped Types**: Type transformations
- **Type Guards**: Runtime type narrowing
- **Template Literals**: String type manipulation
- **API Integration**: Type-safe API clients
- **GraphQL Types**: Generated types from live server
- **REST API Types**: Generated types from live OpenAPI
- **Form Validation**: Zod + Vuetify forms
- **State Management**: Pinia stores with types

Each section includes:
- Comprehensive code examples
- Interactive demonstrations
- Best practices
- Real-world use cases

## 💻 Backend Servers

Two live backend servers for demonstrating real-world type generation:

### GraphQL Server (Apollo Server)
- **Port**: 4000
- **Technology**: Apollo Server 4.x
- **Features**:
  - GraphQL Playground for testing queries
  - Full CRUD operations for Users and Posts
  - Type-safe resolvers
  - Matches schema in `/schema.graphql`

### REST API Server (Express.js)
- **Port**: 3000
- **Technology**: Express.js with TypeScript
- **Features**:
  - Swagger UI for interactive API testing
  - Auto-generated OpenAPI specification
  - Full CRUD operations for Users and Posts
  - CORS enabled for frontend integration

### Shared Mock Data
- 4 users with realistic data
- 7 posts with various content
- In-memory storage (resets on restart)
- Shared between both servers

### Type Generation Workflow

1. **Start servers**:
   ```bash
   npm run server:both
   ```

2. **Make changes to schema or API**

3. **Regenerate types**:
   ```bash
   npm run generate:gql
   npm run generate:rest
   ```

4. **Frontend automatically gets updated types** with full autocomplete!

## 🔧 TypeScript Configuration

The project uses a comprehensive `tsconfig.json` with all important options:

### Key Settings

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Strict Mode Flags (All Enabled)

- `strict` - Enable all strict type checking
- `noImplicitAny` - Error on implied any
- `strictNullChecks` - Strict null/undefined handling
- `strictFunctionTypes` - Strict function type checking
- `strictBindCallApply` - Strict bind/call/apply
- `strictPropertyInitialization` - Class properties must be initialized
- `noImplicitThis` - Error when this has type any
- `alwaysStrict` - Parse in strict mode
- `useUnknownInCatchVariables` - catch variables are unknown

## 🔄 CI/CD

### GitHub Actions Workflow

The project includes automatic type checking on push and pull requests:

```yaml
name: TypeScript Type Check

on: [push, pull_request]

jobs:
  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run type-check
      - run: npm run demo:type-check
      - run: npm run build
```

### Scripts

```json
{
  "type-check": "tsc --noEmit",
  "type-check:watch": "tsc --noEmit --watch",
  "ci:check": "npm run type-check && npm run demo:type-check"
}
```

## 🎬 Live Coding

The presentation includes a **7-minute live coding session** where you'll build a Type-Safe Database Query Builder from scratch.

### Files Provided

- **`live-coding-starter.ts`** - Starting point with TODO comments
- **`live-coding-complete.ts`** - Complete solution with extensive comments
- **`LIVE_CODING_SCRIPT.md`** - Step-by-step script with timing and talking points
- **`LIVE_CODING_TIPS.md`** - Best practices and troubleshooting guide

### What You'll Build

A type-safe query builder demonstrating:
- **Generics** (`<T>`) for reusability
- **`keyof T`** for field name validation
- **`Pick<T, K>`** for return type inference
- **Method chaining** for fluent API
- **Full autocomplete** and type checking

### Example Usage

```typescript
const users = new QueryBuilder<User>()
  .where('role', 'admin')      // ✅ Type-safe field & value
  .orderBy('name', 'desc')     // ✅ Autocomplete works
  .limit(10)
  .offset(20)
  .select('id', 'name', 'email'); // ✅ Result type: Pick<User, 'id' | 'name' | 'email'>[]
```

### Preparation Tips

1. **Practice 3-5 times** using the script
2. **Increase font size** to 16-18px for visibility
3. **Show autocomplete** by pressing Ctrl+Space
4. **Demonstrate errors** by intentionally making mistakes
5. **Keep it under 7 minutes** - quality over quantity

See `LIVE_CODING_TIPS.md` for complete preparation guide.

## ⚡ Technologies Used

### Core

- **TypeScript 5.3+** - Type system
- **Vue 3** - UI framework
- **Vite** - Build tool
- **Slidev** - Presentation framework

### Libraries

- **Vuetify 3** - UI component library
- **Pinia** - State management
- **Zod** - Schema validation
- **Vue Router** - Routing

### Type Generation

- **@graphql-codegen/cli** - GraphQL type generation
- **openapi-typescript** - REST API type generation

### Development

- **vue-tsc** - Vue TypeScript checker
- **GitHub Actions** - CI/CD

## 📚 Resources

### Official Documentation

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vue 3 TypeScript Guide](https://vuejs.org/guide/typescript/overview.html)
- [Pinia TypeScript](https://pinia.vuejs.org/core-concepts/type-safety.html)
- [Zod Documentation](https://zod.dev/)

### Tools

- [TypeScript Playground](https://www.typescriptlang.org/play)
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)
- [Vuetify](https://vuetifyjs.com/)
- [Slidev](https://sli.dev/)

### Learning

- [Type Challenges](https://github.com/type-challenges/type-challenges)
- [Total TypeScript](https://www.totaltypescript.com/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

## 🎯 Key Takeaways

1. **TypeScript is JavaScript with superpowers** - Type safety prevents bugs before runtime
2. **The type system is incredibly powerful** - Generics, conditional types, mapped types solve real problems
3. **Tooling makes it worthwhile** - API generation, CI/CD checks, IDE support
4. **Vue 3 + TypeScript = ❤️** - Perfect integration with modern Vue
5. **Start strict, stay strict** - `"strict": true` from day one

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your-email@example.com

## 🙏 Acknowledgments

- Anders Hejlsberg and the TypeScript team
- Vue.js core team
- The amazing open-source community

---

Made with ❤️ using TypeScript, Vue 3, and Slidev

**Happy Learning! 🚀**

