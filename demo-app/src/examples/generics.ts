/**
 * Generics in TypeScript
 * Reusable, type-safe code with generic types
 */

// ==================== BASIC GENERICS ====================

// Generic function
export function identity<T>(arg: T): T {
  return arg;
}

export const num = identity(42);           // T is number
export const str = identity("hello");      // T is string
export const obj = identity({ key: "value" }); // T is { key: string }

// Generic function with array
export function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

export const firstNum = firstElement([1, 2, 3]);     // number | undefined
export const firstName = firstElement(["a", "b"]);   // string | undefined

// ==================== GENERIC INTERFACES ====================

export interface Box<T> {
  value: T;
}

export const numberBox: Box<number> = { value: 42 };
export const stringBox: Box<string> = { value: "hello" };
export const arrayBox: Box<number[]> = { value: [1, 2, 3] };

// Generic interface with multiple type parameters
export interface Pair<K, V> {
  key: K;
  value: V;
}

export const pair1: Pair<string, number> = { key: "age", value: 30 };
export const pair2: Pair<number, boolean> = { key: 1, value: true };

// ==================== GENERIC CLASSES ====================

export class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

export const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);

export const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");

// ==================== GENERIC CONSTRAINTS ====================

// Constraint with extends
interface Lengthwise {
  length: number;
}

export function logLength<T extends Lengthwise>(arg: T): T {
  console.log(`Length: ${arg.length}`);
  return arg;
}

logLength("hello");                    // ✅ string has length
logLength([1, 2, 3]);                  // ✅ array has length
logLength({ length: 10, value: 42 }); // ✅ object has length
// logLength(42);                      // ❌ number doesn't have length

// Using type parameters in constraints
export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 30, email: "alice@example.com" };
const userName = getProperty(user, "name");   // string
const userAge = getProperty(user, "age");     // number
// const invalid = getProperty(user, "invalid"); // ❌ Error

// ==================== GENERIC DEFAULTS ====================

// Generic with default type
export interface Response<T = any> {
  data: T;
  status: number;
  message: string;
}

export type UserResponse = Response<{ id: number; name: string }>;
export type AnyResponse = Response; // Uses default 'any'

// ==================== VARIADIC TUPLE TYPES ====================

// Spread in tuple types
export function concat<T extends any[], U extends any[]>(
  arr1: T,
  arr2: U
): [...T, ...U] {
  return [...arr1, ...arr2];
}

const result1 = concat([1, 2], ["a", "b"]);
// Type: [number, number, string, string]

// ==================== GENERIC TYPE ALIASES ====================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export const nullableNumber: Nullable<number> = null;
export const optionalString: Optional<string> = undefined;
export const maybeBoolean: Maybe<boolean> = true;

// ==================== GENERIC FUNCTIONS WITH CONSTRAINTS ====================

export function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge(
  { name: "Alice", age: 30 },
  { email: "alice@example.com", active: true }
);
// Type: { name: string; age: number; email: string; active: boolean }

// ==================== ADVANCED GENERIC PATTERNS ====================

// Generic factory function
export class Animal {
  constructor(public name: string) {}
}

export class Dog extends Animal {
  bark(): void {
    console.log("Woof!");
  }
}

export class Cat extends Animal {
  meow(): void {
    console.log("Meow!");
  }
}

export function createAnimal<T extends Animal>(
  AnimalClass: new (name: string) => T,
  name: string
): T {
  return new AnimalClass(name);
}

const dog = createAnimal(Dog, "Buddy"); // Type: Dog
dog.bark(); // ✅ TypeScript knows it's a Dog

const cat = createAnimal(Cat, "Whiskers"); // Type: Cat
cat.meow(); // ✅ TypeScript knows it's a Cat

// ==================== GENERIC PROMISE HANDLING ====================

export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json() as Promise<T>;
}

interface User {
  id: number;
  name: string;
  email: string;
}

// Usage
export async function getUser(id: number): Promise<User> {
  return fetchData<User>(`/api/users/${id}`);
}

// ==================== GENERIC UTILITY CLASS ====================

export class Result<T, E = Error> {
  private constructor(
    private readonly ok: boolean,
    private readonly value?: T,
    private readonly error?: E
  ) {}

  static success<T, E = Error>(value: T): Result<T, E> {
    return new Result<T, E>(true, value, undefined);
  }

  static failure<T, E = Error>(error: E): Result<T, E> {
    return new Result<T, E>(false, undefined, error);
  }

  isOk(): this is { value: T } {
    return this.ok;
  }

  isError(): this is { error: E } {
    return !this.ok;
  }

  getValue(): T {
    if (!this.ok) {
      throw new Error("Cannot get value from error result");
    }
    return this.value!;
  }

  getError(): E {
    if (this.ok) {
      throw new Error("Cannot get error from success result");
    }
    return this.error!;
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    if (this.ok) {
      return Result.success(fn(this.value!));
    }
    return Result.failure(this.error!);
  }
}

// Usage
export function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return Result.failure("Division by zero");
  }
  return Result.success(a / b);
}

const result = divide(10, 2);
if (result.isOk()) {
  console.log(`Result: ${result.getValue()}`);
} else {
  console.error(`Error: ${result.getError()}`);
}

// ==================== EXAMPLES ====================

export const examples = {
  basic: {
    identity: identity(42),
    firstElement: firstElement([1, 2, 3]),
  },
  classes: {
    numberStack,
    stringStack,
  },
  constraints: {
    getProperty: getProperty({ name: "Alice", age: 30 }, "name"),
  },
  advanced: {
    merge: merged,
    result: divide(10, 2),
  },
};

