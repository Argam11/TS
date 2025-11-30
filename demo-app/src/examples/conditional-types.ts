/**
 * Conditional Types in TypeScript
 * Types that depend on conditions
 */

// ==================== BASIC CONDITIONAL TYPES ====================

// Basic syntax: T extends U ? X : Y
export type IsString<T> = T extends string ? true : false;

export type A = IsString<string>;  // true
export type B = IsString<number>;  // false

export type IsArray<T> = T extends any[] ? true : false;

export type C = IsArray<number[]>;  // true
export type D = IsArray<string>;    // false

// ==================== TYPE INFERENCE WITH INFER ====================

// Extract return type
export type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser(): { name: string; age: number } {
  return { name: "Alice", age: 30 };
}

export type UserReturnType = MyReturnType<typeof getUser>;
// { name: string; age: number }

// Extract array element type
export type ElementType<T> = T extends (infer U)[] ? U : never;

export type StringElement = ElementType<string[]>;  // string
export type NumberElement = ElementType<number[]>;  // number

// Extract Promise type
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export type ResolvedString = UnwrapPromise<Promise<string>>;  // string
export type PlainNumber = UnwrapPromise<number>;              // number

// ==================== DISTRIBUTIVE CONDITIONAL TYPES ====================

// When T is a union, the conditional type distributes
export type ToArray<T> = T extends any ? T[] : never;

export type StrArrOrNumArr = ToArray<string | number>;
// string[] | number[] (not (string | number)[])

// Practical example: Filter out null/undefined
export type NonNullable<T> = T extends null | undefined ? never : T;

export type CleanType = NonNullable<string | number | null | undefined>;
// string | number

// ==================== RECURSIVE CONDITIONAL TYPES ====================

// Flatten nested arrays
export type Flatten<T> = T extends Array<infer U>
  ? U extends Array<any>
    ? Flatten<U>
    : U
  : T;

export type Nested = number[][][];
export type Flat = Flatten<Nested>;  // number

// Deep Readonly
export type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

interface NestedObject {
  user: {
    name: string;
    address: {
      street: string;
      city: string;
    };
  };
}

export type ReadonlyNested = DeepReadonly<NestedObject>;
// All properties at all levels are readonly

// ==================== CONDITIONAL TYPE CONSTRAINTS ====================

export type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object";

export type T1 = TypeName<string>;     // "string"
export type T2 = TypeName<42>;         // "number"
export type T3 = TypeName<true>;       // "boolean"
export type T4 = TypeName<() => void>; // "function"

// ==================== PRACTICAL EXAMPLES ====================

// 1. Extract function argument types
export type ArgumentTypes<F> = F extends (...args: infer A) => any ? A : never;

function createUser(name: string, age: number, email: string): void {}

export type CreateUserArgs = ArgumentTypes<typeof createUser>;
// [name: string, age: number, email: string]

// 2. Get property type by key
export type GetProperty<T, K> = K extends keyof T ? T[K] : never;

interface User {
  id: number;
  name: string;
  email: string;
}

export type UserName = GetProperty<User, "name">;  // string
export type UserId = GetProperty<User, "id">;      // number

// 3. Filter keys by value type
export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

interface Example {
  a: string;
  b: number;
  c: string;
  d: boolean;
}

export type StringKeys = KeysOfType<Example, string>;  // "a" | "c"
export type NumberKeys = KeysOfType<Example, number>;  // "b"

// 4. Required keys vs Optional keys
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

interface PartialUser {
  id: number;
  name: string;
  email?: string;
  phone?: string;
}

export type RequiredUserKeys = RequiredKeys<PartialUser>;  // "id" | "name"
export type OptionalUserKeys = OptionalKeys<PartialUser>;  // "email" | "phone"

// ==================== ADVANCED PATTERNS ====================

// 5. Promisify - Convert function return type to Promise
export type Promisify<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => Promise<R>
  : never;

function syncGetUser(id: number): User {
  return { id, name: "Alice", email: "alice@example.com" };
}

export type AsyncGetUser = Promisify<typeof syncGetUser>;
// (id: number) => Promise<User>

// 6. Function property names
export type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface MixedObject {
  name: string;
  age: number;
  getName: () => string;
  setAge: (age: number) => void;
}

export type FunctionKeys = FunctionPropertyNames<MixedObject>;
// "getName" | "setAge"

// 7. Constructable - Check if type is constructable
export type Constructable<T> = T extends new (...args: any[]) => any ? T : never;

class MyClass {}
function myFunction() {}

export type ClassType = Constructable<typeof MyClass>;      // typeof MyClass
export type NotClass = Constructable<typeof myFunction>;    // never

// ==================== UNION TO INTERSECTION ====================

// Convert union type to intersection
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type A1 = { a: string };
type B1 = { b: number };
type C1 = { c: boolean };

export type Intersection = UnionToIntersection<A1 | B1 | C1>;
// { a: string } & { b: number } & { c: boolean }

// ==================== AWAITED IMPLEMENTATION ====================

// Recursively unwrap Promise types
export type MyAwaited<T> = T extends Promise<infer U>
  ? U extends Promise<any>
    ? MyAwaited<U>
    : U
  : T;

export type Test1 = MyAwaited<Promise<string>>;                  // string
export type Test2 = MyAwaited<Promise<Promise<number>>>;         // number
export type Test3 = MyAwaited<Promise<Promise<Promise<boolean>>>>; // boolean

// ==================== REAL-WORLD EXAMPLE: API RESPONSE ====================

// Conditional type for API responses
export type ApiResponse<T, E = Error> = 
  | { status: "success"; data: T }
  | { status: "error"; error: E };

// Extract success data type
export type ExtractData<T> = T extends { status: "success"; data: infer D }
  ? D
  : never;

// Extract error type
export type ExtractError<T> = T extends { status: "error"; error: infer E }
  ? E
  : never;

type UserResponse = ApiResponse<User, string>;

export type UserData = ExtractData<UserResponse>;    // User
export type UserError = ExtractError<UserResponse>;  // string

// ==================== EXAMPLES ====================

export const examples = {
  basic: {
    isString: "test" as any as IsString<string>,
    isArray: [] as any as IsArray<number[]>,
  },
  inference: {
    returnType: {} as UserReturnType,
    elementType: "string" as StringElement,
  },
  practical: {
    typeName: "string" as TypeName<string>,
    keysOfType: "a" as StringKeys,
  },
};

