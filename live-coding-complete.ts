/**
 * 🎬 Live Coding: Type-Safe Database Query Builder
 * ✅ COMPLETE SOLUTION
 * 
 * This is the final result of the live coding session.
 * Use this as a reference or backup during your presentation.
 */

// ==================== DATA MODEL ====================

/**
 * Example data model - represents a User in the database
 */
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

// You could define other models too!
interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  published: boolean;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

// ==================== QUERY BUILDER ====================

/**
 * Type-safe query builder using TypeScript generics
 * 
 * @template T - The data model type (User, Post, Product, etc.)
 */
class QueryBuilder<T> {
  /**
   * Add a WHERE clause with type-safe field and value
   * 
   * @param field - Must be a valid key of T
   * @param value - Must match the type of T[field]
   * @returns this for method chaining
   */
  where<K extends keyof T>(field: K, value: T[K]): this {
    console.log(`WHERE ${String(field)} = ${value}`);
    return this;
  }

  /**
   * Select specific fields from the result
   * 
   * @param fields - Valid keys of T
   * @returns Array of objects with only selected fields
   */
  select<K extends keyof T>(...fields: K[]): Pick<T, K>[] {
    console.log(`SELECT ${fields.map(String).join(', ')}`);
    return [] as Pick<T, K>[];
  }

  /**
   * Order results by a field
   * 
   * @param field - Must be a valid key of T
   * @param direction - 'asc' or 'desc'
   * @returns this for method chaining
   */
  orderBy<K extends keyof T>(field: K, direction: 'asc' | 'desc'): this {
    console.log(`ORDER BY ${String(field)} ${direction.toUpperCase()}`);
    return this;
  }

  /**
   * Limit the number of results
   * 
   * @param count - Maximum number of results
   * @returns this for method chaining
   */
  limit(count: number): this {
    console.log(`LIMIT ${count}`);
    return this;
  }

  /**
   * Offset for pagination
   * 
   * @param count - Number of results to skip
   * @returns this for method chaining
   */
  offset(count: number): this {
    console.log(`OFFSET ${count}`);
    return this;
  }

  /**
   * BONUS: Group by a field
   * (Optional - add during Q&A if time permits)
   */
  groupBy<K extends keyof T>(field: K): this {
    console.log(`GROUP BY ${String(field)}`);
    return this;
  }
}

// ==================== USAGE EXAMPLES ====================

console.log('=== Example 1: Simple WHERE clause ===');
const query1 = new QueryBuilder<User>()
  .where('email', 'alice@example.com');
// ✅ Type-safe! 'email' must be a key of User
// ✅ Value must be a string (User['email'] is string)

console.log('\n=== Example 2: Select specific fields ===');
const users = new QueryBuilder<User>()
  .where('role', 'admin')
  .select('id', 'name');
// ✅ Return type: Pick<User, 'id' | 'name'>[]
// ✅ Result only has { id: number; name: string }[]

console.log('\n=== Example 3: Complete query with method chaining ===');
const adminUsers = new QueryBuilder<User>()
  .where('role', 'admin')
  .orderBy('name', 'desc')
  .limit(10)
  .offset(20)
  .select('id', 'name', 'email');
// ✅ Fluent API - reads like SQL!
// ✅ Every step is type-checked

console.log('\n=== Example 4: Works with different models ===');
const products = new QueryBuilder<Product>()
  .where('inStock', true)
  .orderBy('price', 'asc')
  .select('id', 'name', 'price');
// ✅ Same builder works for any model!

console.log('\n=== Example 5: Pagination query ===');
const paginatedPosts = new QueryBuilder<Post>()
  .where('published', true)
  .orderBy('id', 'desc')
  .limit(20)
  .offset(40)
  .select('id', 'title', 'authorId');
// ✅ Perfect for paginated APIs

// ==================== ERROR EXAMPLES ====================

console.log('\n=== ❌ These would cause TypeScript errors: ===');

// Uncomment to see errors:

// Error 1: Invalid field name
// const error1 = new QueryBuilder<User>()
//   .where('invalid', 'test');
// ❌ Error: Argument of type '"invalid"' is not assignable to parameter of type 'keyof User'

// Error 2: Wrong value type
// const error2 = new QueryBuilder<User>()
//   .where('email', 123);
// ❌ Error: Argument of type 'number' is not assignable to parameter of type 'string'

// Error 3: Invalid field in select
// const error3 = new QueryBuilder<User>()
//   .select('id', 'invalid');
// ❌ Error: Argument of type '"invalid"' is not assignable to parameter of type 'keyof User'

// Error 4: Wrong direction in orderBy
// const error4 = new QueryBuilder<User>()
//   .orderBy('name', 'wrong');
// ❌ Error: Argument of type '"wrong"' is not assignable to parameter of type '"asc" | "desc"'

// ==================== TYPE DEMONSTRATIONS ====================

console.log('\n=== 🎯 Type Inference Demonstration ===');

// Hover over these variables to see the inferred types!

const result1 = new QueryBuilder<User>()
  .select('id', 'name');
// Type: Pick<User, "id" | "name">[]
// = { id: number; name: string }[]

const result2 = new QueryBuilder<User>()
  .select('email', 'role');
// Type: Pick<User, "email" | "role">[]
// = { email: string; role: "admin" | "user" | "guest" }[]

const result3 = new QueryBuilder<Product>()
  .select('name', 'price', 'category');
// Type: Pick<Product, "name" | "price" | "category">[]
// = { name: string; price: number; category: string }[]

// ==================== REAL-WORLD USAGE ====================

console.log('\n=== 🏭 Real-world Example: API Endpoint ===');

/**
 * Example: GET /api/users endpoint
 */
async function getUsersEndpoint(
  role?: 'admin' | 'user' | 'guest',
  page: number = 1,
  pageSize: number = 20
): Promise<Pick<User, 'id' | 'name' | 'email'>[]> {
  const query = new QueryBuilder<User>();
  
  if (role) {
    query.where('role', role);
  }
  
  return query
    .orderBy('name', 'asc')
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .select('id', 'name', 'email');
}

// Usage:
const apiResult = getUsersEndpoint('admin', 1, 10);
// Return type is fully typed!

console.log('\n=== ✅ Complete! ===');
console.log('Key TypeScript features used:');
console.log('1. Generics (<T>)');
console.log('2. keyof T');
console.log('3. Indexed access (T[K])');
console.log('4. Pick utility type');
console.log('5. Method chaining (return this)');
console.log('6. Type inference');

// ==================== NOTES FOR PRESENTATION ====================

/**
 * 📝 Key Points to Emphasize:
 * 
 * 1. **Zero Runtime Overhead**
 *    - All type checking happens at compile time
 *    - The JavaScript output is just a regular class
 * 
 * 2. **Prevents Bugs Early**
 *    - Typos caught immediately
 *    - Wrong types caught before running
 *    - Refactoring is safe
 * 
 * 3. **Amazing Developer Experience**
 *    - Full autocomplete
 *    - Inline documentation
 *    - Instant feedback
 * 
 * 4. **Reusable Pattern**
 *    - Same builder works for any data model
 *    - No code duplication
 *    - Easy to extend
 * 
 * 5. **Real-World Use**
 *    - Prisma uses this pattern
 *    - TypeORM uses this pattern
 *    - Kysely uses this pattern
 *    - You can build your own!
 */

/**
 * 💡 Possible Questions & Answers:
 * 
 * Q: "Can you add JOIN operations?"
 * A: "Absolutely! You'd add a join<T2>() method. The types get more complex 
 *     but the pattern is the same. Libraries like Kysely do this beautifully."
 * 
 * Q: "What about complex WHERE conditions (AND/OR)?"
 * A: "Great question! You could return a new QueryCondition class that handles
 *     operators. Check out how Prisma does nested where conditions."
 * 
 * Q: "Does this work with NestJS?"
 * A: "Yes! You could create a custom repository decorator that uses this pattern.
 *     Or use it directly in your services."
 * 
 * Q: "Performance impact?"
 * A: "Zero at runtime! TypeScript compiles away. The JavaScript is just a normal
 *     class with methods. No overhead."
 */

