/**
 * 🎬 Live Coding: Type-Safe Database Query Builder
 * 
 * Goal: Build a type-safe query builder that prevents bugs at compile time
 * Time: ~7 minutes
 * 
 * Instructions:
 * 1. Follow along with LIVE_CODING_SCRIPT.md
 * 2. Type each method step by step
 * 3. Demonstrate autocomplete and type errors
 * 4. Show the final result!
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

// ==================== QUERY BUILDER ====================

/**
 * TODO: Create the QueryBuilder class here!
 * 
 * Steps:
 * 1. Create generic class QueryBuilder<T>
 * 2. Add where<K extends keyof T>(field: K, value: T[K]): this
 * 3. Add select<K extends keyof T>(...fields: K[]): Pick<T, K>[]
 * 4. Add orderBy<K extends keyof T>(field: K, direction: 'asc' | 'desc'): this
 * 5. Add limit(count: number): this
 * 6. Add offset(count: number): this
 */

// Start typing here! 👇


// ==================== USAGE EXAMPLES ====================

/**
 * TODO: After building the class, try these examples!
 */

// Example 1: Simple where clause
// const query1 = new QueryBuilder<User>()
//   .where('email', 'alice@example.com');

// Example 2: Select specific fields
// const users = new QueryBuilder<User>()
//   .where('role', 'admin')
//   .select('id', 'name');
// Hover over 'users' to see the inferred type!

// Example 3: Full query with chaining
// const result = new QueryBuilder<User>()
//   .where('role', 'admin')
//   .orderBy('name', 'desc')
//   .limit(10)
//   .offset(20)
//   .select('id', 'name', 'email');

// Example 4: Try to make errors!
// const error1 = new QueryBuilder<User>()
//   .where('invalid', 'test'); // ❌ Should error!

// const error2 = new QueryBuilder<User>()
//   .where('email', 123); // ❌ Should error! (wrong type)

// const error3 = new QueryBuilder<User>()
//   .select('id', 'invalid'); // ❌ Should error!

// ==================== NOTES ====================

/**
 * Key TypeScript Features Used:
 * 
 * 1. Generics (<T>)
 *    - Makes the class reusable for any data model
 * 
 * 2. keyof T
 *    - Gets all property names as a union type
 *    - Ensures only valid field names can be used
 * 
 * 3. T[K]
 *    - Indexed access type
 *    - Gets the type of property K in T
 * 
 * 4. Pick<T, K>
 *    - Utility type that creates a subset of T
 *    - Only includes properties K
 * 
 * 5. Method Chaining (return this)
 *    - Enables fluent API
 *    - Each method returns the builder for chaining
 * 
 * 6. Rest Parameters (...fields: K[])
 *    - Allows multiple arguments
 *    - All must be valid keys
 */

