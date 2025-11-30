/**
 * Utility Types in TypeScript
 * Built-in type transformations
 */

// ==================== BASE INTERFACE ====================

interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  tags: string[];
}

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  age: number;
  isActive: boolean;
}

// ==================== PARTIAL ====================

// Makes all properties optional
export type PartialTodo = Partial<Todo>;
// { title?: string; description?: string; completed?: boolean; ... }

export function updateTodo(todo: Todo, updates: PartialTodo): Todo {
  return { ...todo, ...updates };
}

export const todo: Todo = {
  title: "Learn TypeScript",
  description: "Master all utility types",
  completed: false,
  createdAt: new Date(),
  tags: ["typescript", "learning"],
};

export const updated = updateTodo(todo, { completed: true });

// ==================== REQUIRED ====================

// Makes all properties required
interface PartialUser {
  username?: string;
  email?: string;
  age?: number;
}

export type RequiredUser = Required<PartialUser>;
// { username: string; email: string; age: number }

// ==================== READONLY ====================

// Makes all properties readonly
export type ReadonlyTodo = Readonly<Todo>;
// { readonly title: string; readonly description: string; ... }

export const readonlyTodo: ReadonlyTodo = {
  title: "Read only",
  description: "Cannot modify",
  completed: true,
  createdAt: new Date(),
  tags: ["readonly"],
};

// readonlyTodo.completed = false; // ❌ Error: Cannot assign to 'completed'

// ==================== PICK ====================

// Select specific properties
export type TodoPreview = Pick<Todo, "title" | "completed">;
// { title: string; completed: boolean }

export function showPreview(preview: TodoPreview): void {
  console.log(`${preview.title}: ${preview.completed ? "Done" : "Pending"}`);
}

// ==================== OMIT ====================

// Remove specific properties
export type TodoWithoutDates = Omit<Todo, "createdAt">;
// { title: string; description: string; completed: boolean; tags: string[] }

export type UserWithoutPassword = Omit<User, "password">;
// Safe to send to frontend

export const publicUser: UserWithoutPassword = {
  id: 1,
  username: "alice",
  email: "alice@example.com",
  age: 30,
  isActive: true,
};

// ==================== RECORD ====================

// Create object type with specific keys and value type
export type PageInfo = Record<"home" | "about" | "contact", { title: string; url: string }>;

export const pages: PageInfo = {
  home: { title: "Home", url: "/" },
  about: { title: "About Us", url: "/about" },
  contact: { title: "Contact", url: "/contact" },
};

// Dynamic keys with Record
export type StringNumberMap = Record<string, number>;

export const scores: StringNumberMap = {
  alice: 100,
  bob: 95,
  charlie: 87,
};

// ==================== EXCLUDE ====================

// Remove types from union
export type T0 = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"
export type T1 = Exclude<string | number | (() => void), Function>; // string | number

// Practical example
export type Primitive = string | number | boolean | null | undefined;
export type NonNullablePrimitive = Exclude<Primitive, null | undefined>;
// string | number | boolean

// ==================== EXTRACT ====================

// Extract types from union
export type T2 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
export type T3 = Extract<string | number | (() => void), Function>; // () => void

// ==================== NONNULLABLE ====================

// Remove null and undefined
export type T4 = NonNullable<string | number | undefined | null>; // string | number

export function processValue(value: string | null | undefined): void {
  const nonNull: NonNullable<typeof value> = value!; // string
  console.log(nonNull.toUpperCase());
}

// ==================== RETURNTYPE ====================

// Get function return type
function getUser(): { name: string; age: number } {
  return { name: "Alice", age: 30 };
}

export type UserType = ReturnType<typeof getUser>;
// { name: string; age: number }

function asyncGetData(): Promise<{ id: number; data: string }> {
  return Promise.resolve({ id: 1, data: "example" });
}

export type AsyncData = ReturnType<typeof asyncGetData>;
// Promise<{ id: number; data: string }>

// ==================== PARAMETERS ====================

// Get function parameters as tuple
function createUser(name: string, age: number, email: string): User {
  return { id: 1, username: name, email, password: "", age, isActive: true };
}

export type CreateUserParams = Parameters<typeof createUser>;
// [name: string, age: number, email: string]

export function callCreateUser(...args: CreateUserParams): User {
  return createUser(...args);
}

// ==================== CONSTRUCTORPARAMETERS ====================

// Get constructor parameters
class Person {
  constructor(public name: string, public age: number, public email: string) {}
}

export type PersonParams = ConstructorParameters<typeof Person>;
// [name: string, age: number, email: string]

export function createPerson(...args: PersonParams): Person {
  return new Person(...args);
}

// ==================== INSTANCETYPE ====================

// Get instance type of class
export type PersonInstance = InstanceType<typeof Person>;
// Person

export function isPerson(obj: any): obj is PersonInstance {
  return obj instanceof Person;
}

// ==================== AWAITED ====================

// Get type from Promise (TypeScript 4.5+)
export type A = Awaited<Promise<string>>;                    // string
export type B = Awaited<Promise<Promise<number>>>;           // number
export type C = Awaited<boolean | Promise<number>>;          // boolean | number

async function fetchUserData(): Promise<{ id: number; name: string }> {
  return { id: 1, name: "Alice" };
}

export type UserData = Awaited<ReturnType<typeof fetchUserData>>;
// { id: number; name: string }

// ==================== STRING MANIPULATION TYPES ====================

// Uppercase
export type UppercaseGreeting = Uppercase<"hello world">;  // "HELLO WORLD"

// Lowercase
export type LowercaseGreeting = Lowercase<"HELLO WORLD">;  // "hello world"

// Capitalize
export type CapitalizedGreeting = Capitalize<"hello">;     // "Hello"

// Uncapitalize
export type UncapitalizedGreeting = Uncapitalize<"Hello">; // "hello"

// Practical use case
export type HttpMethod = "get" | "post" | "put" | "delete";
export type UppercaseHttpMethod = Uppercase<HttpMethod>;
// "GET" | "POST" | "PUT" | "DELETE"

// ==================== THISPARAMETERTYPE ====================

function toHex(this: Number): string {
  return this.toString(16);
}

export type ThisType = ThisParameterType<typeof toHex>; // Number

// ==================== OMITTHISPARAMETER ====================

export type ToHexFunc = OmitThisParameter<typeof toHex>; // () => string

// ==================== CUSTOM UTILITY TYPES ====================

// Mutable - Remove readonly
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type ReadonlyPerson = { readonly name: string; readonly age: number };
export type MutablePerson = Mutable<ReadonlyPerson>;
// { name: string; age: number }

// DeepPartial - Make all properties deeply optional
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface NestedConfig {
  server: {
    host: string;
    port: number;
    ssl: {
      enabled: boolean;
      cert: string;
    };
  };
}

export type PartialConfig = DeepPartial<NestedConfig>;
// All properties at all levels are optional

// ==================== EXAMPLES ====================

export const examples = {
  partial: updated,
  pick: { title: "Preview", completed: false } as TodoPreview,
  omit: publicUser,
  record: pages,
  returnType: getUser(),
  stringManipulation: {
    uppercase: "HELLO" as UppercaseGreeting,
    lowercase: "hello" as LowercaseGreeting,
  },
};

