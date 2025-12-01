---
theme: default
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
highlighter: shiki
lineNumbers: true
info: |
  ## TypeScript & Vue 3 Mastery
  Comprehensive guide to TypeScript features and Vue 3 integration
drawings:
  persist: false
transition: slide-left
title: TypeScript & Vue 3 Mastery
mdc: true
---

# TypeScript & Vue 3 Mastery

A Deep Dive into Modern Type-Safe Development

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: intro
---

# What We'll Cover Today

<v-clicks>

- 📚 **TypeScript History** - From inception to modern day
- 🔥 **Complete Type System** - Every TypeScript feature
- 🎮 **Interactive Game** - Test your knowledge
- 🛠️ **Real-World Applications** - API generation, forms, CI/CD
- 🎨 **Vue 3 Integration** - Type-safe components
- 💻 **Live Coding** - Build something together

</v-clicks>

---
layout: section
---

# Part 1: TypeScript History & Evolution

---

# The Birth of TypeScript

<v-clicks>

## Origins (2012)

- **Created by**: Anders Hejlsberg at Microsoft
- **Why**: JavaScript at scale was painful
  - No IDE support
  - No type checking
  - Difficult refactoring
  - Runtime errors everywhere

## The Problem It Solved

```javascript
// JavaScript - 2012
function greet(person) {
  return "Hello, " + person.name; // What if person is null? What if no name property?
}
```

```typescript
// TypeScript - The solution
function greet(person: { name: string }): string {
  return `Hello, ${person.name}`; // Guaranteed to be safe!
}
```

</v-clicks>

---

# TypeScript Evolution Timeline

<v-clicks>

## Major Milestones

- **October 2012**: TypeScript 0.8 announced
- **April 2014**: TypeScript 1.0 - Production ready
- **September 2016**: TypeScript 2.0 - Null checking, readonly
- **July 2018**: TypeScript 3.0 - Project references, tuples
- **August 2020**: TypeScript 4.0 - Variadic tuples, labeled tuples
- **November 2023**: TypeScript 5.0 - Decorators, const type parameters
- **Today**: TypeScript 5.3+ - Continuous improvements

## Adoption Growth

- Used by **78%** of JavaScript developers
- **Microsoft**, **Google**, **Facebook**, **Airbnb** use it
- Over **90% of npm packages** have type definitions
- De facto standard for large-scale JavaScript

</v-clicks>

---
layout: section
---

# Complete TypeScript Type System

Every feature, every detail

---

# Basic Types

The foundation of TypeScript's type system

```typescript
// Primitive types
let username: string = "Alice";
let age: number = 30;
let isActive: boolean = true;
let bigNumber: bigint = 9007199254740991n;
let uniqueId: symbol = Symbol("id");

// Special types
let nothing: null = null;
let notDefined: undefined = undefined;

// any - Escape hatch (avoid!)
let anything: any = "could be anything";
anything = 42; // No error

// unknown - Type-safe any
let something: unknown = "safer than any";
// something.toUpperCase(); // Error! Must check type first
if (typeof something === "string") {
  something.toUpperCase(); // OK now!
}

// never - Represents values that never occur
function throwError(message: string): never {
  throw new Error(message);
}

// void - Function returns nothing
function logMessage(msg: string): void {
  console.log(msg);
}
```

---

# Type Inference vs Type Annotations

TypeScript can infer types automatically or you can be explicit

```typescript
// Implicit (Type Inference) - TypeScript figures it out
let message = "Hello";        // inferred as string
let count = 42;               // inferred as number
let isActive = true;          // inferred as boolean

// Explicit (Type Annotations) - You tell TypeScript
let message: string = "Hello";
let count: number = 42;
let isActive: boolean = true;
```

## Best Practices

- Use inference for simple, obvious cases
- Use explicit types for function parameters and return values
- Use explicit types for complex objects or when clarity helps

```typescript
// Good: Explicit for function signatures
function greet(name: string): string {
  return `Hello, ${name}`;
}

// Good: Inference for simple variables
const doubled = count * 2;  // inferred as number
```

---

# Arrays, Tuples & Enums

Collections and enumerations

```typescript
// Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];
let mixed: (number | string)[] = [1, "two", 3];

// Tuples - Fixed length arrays with specific types
let person: [string, number] = ["Alice", 30];
let rgb: [number, number, number] = [255, 0, 128];

// Named tuples (TS 4.0+)
type Point = [x: number, y: number];
let point: Point = [10, 20];

// Enums - Numeric
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

// String enums
enum Status {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED"
}

// Const enums (inlined at compile time)
const enum Color {
  Red = "#FF0000",
  Green = "#00FF00",
  Blue = "#0000FF"
}
```

---

# Object Types & Interfaces

Describing object shapes

```typescript
// Type aliases
type User = {
  id: number;
  name: string;
  email?: string; // Optional property
  readonly createdAt: Date; // Cannot be modified
};

// Interfaces
interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
}

// Extending interfaces
interface Electronics extends Product {
  warranty: number;
  brand: string;
}

// Type vs Interface - Key differences
type Animal = { name: string };
type Bear = Animal & { honey: boolean }; // Intersection

interface Vehicle { wheels: number; }
interface Car extends Vehicle { doors: number; } // Extension

// Index signatures - Dynamic keys
interface StringMap {
  [key: string]: string;
}

interface NumberDictionary {
  [index: string]: number;
  length: number; // OK
  name: string;   // Error! Must be number
}
```

---

# Functions in TypeScript

Type-safe function signatures

```typescript
// Function type
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;

// Optional and default parameters
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

// Function overloads
function createElement(tag: "div"): HTMLDivElement;
function createElement(tag: "span"): HTMLSpanElement;
function createElement(tag: string): HTMLElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

// this parameter type
interface Database {
  connect(this: Database): void;
  query(this: Database, sql: string): any[];
}

const db: Database = {
  connect() {
    console.log("Connected");
  },
  query(sql) {
    return [];
  }
};
```

---

# Generics - Part 1

Reusable, type-safe code

```typescript
// Basic generic
function identity<T>(arg: T): T {
  return arg;
}

const num = identity(42);      // T is number
const str = identity("hello"); // T is string

// Generic interfaces
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "hello" };

// Generic classes
class Stack<T> {
  private items: T[] = [];
  
  push(item: T): void {
    this.items.push(item);
  }
  
  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
```

---

# Generics - Part 2

Constraints and advanced patterns

```typescript
// Generic constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");     // OK
logLength([1, 2, 3]);   // OK
logLength({ length: 10, value: 3 }); // OK
// logLength(42);       // Error! No length

// Using type parameters in constraints
function getProperty<T, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 30 };
const name = getProperty(user, "name"); // string
const age = getProperty(user, "age");   // number

// Generic defaults (TS 2.3+)
interface Response<T = any> {
  data: T;
  status: number;
}

type UserResponse = Response<User>;
type AnyResponse = Response; // Uses default
```

---

# Utility Types - Part 1

Built-in type transformations

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

// Partial - Makes all properties optional
type PartialTodo = Partial<Todo>;
// { title?: string; description?: string; completed?: boolean; createdAt?: Date; }

// Required - Makes all properties required
type RequiredTodo = Required<PartialTodo>;

// Readonly - Makes all properties readonly
type ReadonlyTodo = Readonly<Todo>;
// { readonly title: string; readonly description: string; ... }

// Pick - Select specific properties
type TodoPreview = Pick<Todo, "title" | "completed">;
// { title: string; completed: boolean; }

// Omit - Remove specific properties
type TodoWithoutDate = Omit<Todo, "createdAt">;
// { title: string; description: string; completed: boolean; }

// Record - Create object type with specific keys
type PageInfo = Record<"home" | "about" | "contact", { title: string; url: string }>;
```

---

# Utility Types - Part 2

More advanced utilities

```typescript
// Exclude - Remove types from union
type T0 = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"
type T1 = Exclude<string | number | (() => void), Function>; // string | number

// Extract - Extract types from union
type T2 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T3 = Extract<string | number | (() => void), Function>; // () => void

// NonNullable - Remove null and undefined
type T4 = NonNullable<string | number | undefined | null>; // string | number

// ReturnType - Get function return type
function getUser() {
  return { name: "Alice", age: 30 };
}
type User = ReturnType<typeof getUser>; // { name: string; age: number; }

// Parameters - Get function parameters as tuple
type T5 = Parameters<(a: string, b: number) => void>; // [string, number]

// ConstructorParameters - Get constructor parameters
class Person {
  constructor(name: string, age: number) {}
}
type PersonParams = ConstructorParameters<typeof Person>; // [string, number]

// InstanceType - Get instance type of class
type PersonInstance = InstanceType<typeof Person>; // Person
```

<!--
as
-->

---

# Utility Types - Part 3

String manipulation and advanced utilities

```typescript
// Uppercase, Lowercase, Capitalize, Uncapitalize (TS 4.1+)
type Greeting = "hello world";
type LoudGreeting = Uppercase<Greeting>;     // "HELLO WORLD"
type QuietGreeting = Lowercase<Greeting>;    // "hello world"
type CapitalGreeting = Capitalize<Greeting>; // "Hello world"
type UnCapitalGreeting = Uncapitalize<Uppercase<Greeting>>; // "hELLO WORLD"

// Awaited - Get type from Promise (TS 4.5+)
type A = Awaited<Promise<string>>;                    // string
type B = Awaited<Promise<Promise<number>>>;           // number
type C = Awaited<boolean | Promise<number>>;          // boolean | number

// ThisParameterType - Extract 'this' parameter type
function toHex(this: Number) {
  return this.toString(16);
}
type T = ThisParameterType<typeof toHex>; // Number

// OmitThisParameter - Remove 'this' parameter
type Func = OmitThisParameter<typeof toHex>; // () => string

// Custom utility type
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type ReadonlyPerson = { readonly name: string; readonly age: number };
type MutablePerson = Mutable<ReadonlyPerson>; // { name: string; age: number }
```

---

# Conditional Types

Types that depend on conditions

```typescript
// Basic conditional type
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// With infer keyword - Extract types
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Func = () => number;
type FuncReturn = ReturnType<Func>; // number

// Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;
type StrArrOrNumArr = ToArray<string | number>; // string[] | number[]

// Recursive conditional types
type Awaited<T> = T extends Promise<infer U>
  ? U extends Promise<any>
    ? Awaited<U>
    : U
  : T;

type T1 = Awaited<Promise<string>>;                  // string
type T2 = Awaited<Promise<Promise<number>>>;         // number
type T3 = Awaited<Promise<Promise<Promise<boolean>>>>; // boolean

// Real-world example - Flatten array type
type Flatten<T> = T extends Array<infer U> ? U : T;
type Str = Flatten<string[]>;   // string
type Num = Flatten<number>;     // number
```

---

# Mapped Types

Transform existing types

```typescript
// Basic mapped type
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<Features>;
// { darkMode: boolean; newUserProfile: boolean; }

// Mapping modifiers
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

// Key remapping with 'as' clause (TS 4.1+)
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;
// { getName: () => string; getAge: () => number; getLocation: () => string; }

// Filter out keys
type RemoveKindField<T> = {
  [K in keyof T as Exclude<K, "kind">]: T[K]
};
```

---

# Type Guards & Narrowing

Safely narrowing types

```typescript
// typeof type guards
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + value;
  }
  return padding + value;
}

// instanceof type guards
class Dog { bark() {} }
class Cat { meow() {} }

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript knows it's Dog
  } else {
    animal.meow(); // TypeScript knows it's Cat
  }
}

// User-defined type guards with 'is'
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function example(x: unknown) {
  if (isString(x)) {
    x.toUpperCase(); // TypeScript knows x is string
  }
}

// Discriminated unions
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; sideLength: number }
  | { kind: "rectangle"; width: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}
```

---

# Type Guards - Advanced

Assertion functions and control flow

```typescript
// Assertion functions with 'asserts'
function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

function yell(str: any) {
  assert(typeof str === "string");
  return str.toUpperCase(); // TypeScript knows str is string
}

// Assertion signatures with type predicates
function assertIsString(val: any): asserts val is string {
  if (typeof val !== "string") {
    throw new AssertionError("Not a string!");
  }
}

function processValue(value: unknown) {
  assertIsString(value);
  value.toUpperCase(); // TypeScript knows value is string
}

// 'in' operator narrowing
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim();
  } else {
    animal.fly();
  }
}

// Truthiness narrowing
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
```

---

# Template Literal Types

Type-level string manipulation

```typescript
// Basic template literal type
type World = "world";
type Greeting = `hello ${World}`; // "hello world"

// With unions
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"

// String manipulation types
type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
type MainID = ASCIICacheKey<"my_app">; // "ID-MY_APP"

// Practical example - Event system
type PropEventSource<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void
  ): void;
};

declare function makeWatchedObject<T>(obj: T): T & PropEventSource<T>;

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});

person.on("firstNameChanged", newName => {
  console.log(`new name is ${newName.toUpperCase()}`);
});

person.on("ageChanged", newAge => {
  if (newAge < 0) {
    console.warn("warning! negative age");
  }
});
```

---

# Template Literal Types - Advanced

Combining with mapped types

```typescript
// Extract route parameters
type ExtractRouteParams<T extends string> = 
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractRouteParams<Rest>]: string }
    : T extends `${infer _Start}:${infer Param}`
    ? { [K in Param]: string }
    : {};

type Route1 = ExtractRouteParams<"/user/:id/post/:postId">;
// { id: string; postId: string }

// API endpoint builder
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = "users" | "posts" | "comments";
type APIRoute = `/${Lowercase<HTTPMethod>}/${Endpoint}`;

// "/get/users" | "/get/posts" | ... | "/delete/comments"

// CSS property builder
type CSSValue = number | string;
type CSSProperty = "color" | "background" | "fontSize";
type CSSRule = `${CSSProperty}: ${string};`;

const rule: CSSRule = "color: red;"; // Valid
// const invalid: CSSRule = "color red"; // Error

// Intrinsic string manipulation types
type LowercaseGreeting = Lowercase<"HELLO WORLD">; // "hello world"
type UppercaseGreeting = Uppercase<"hello world">; // "HELLO WORLD"
type CapitalizedGreeting = Capitalize<"hello">; // "Hello"
type UncapitalizedGreeting = Uncapitalize<"Hello">; // "hello"
```

---

# Advanced Features - Part 1

Const assertions and satisfies

```typescript
// Const assertions (as const)
const numbers = [1, 2, 3]; // number[]
const constNumbers = [1, 2, 3] as const; // readonly [1, 2, 3]

const config = {
  endpoint: "https://api.example.com",
  timeout: 5000
}; // { endpoint: string; timeout: number }

const constConfig = {
  endpoint: "https://api.example.com",
  timeout: 5000
} as const; // { readonly endpoint: "https://api.example.com"; readonly timeout: 5000 }

// Satisfies operator (TS 4.9+)
type Color = { r: number; g: number; b: number } | string;

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255]
} satisfies Record<string, Color>;

// Now we keep precise types!
palette.red.map(x => x); // [255, 0, 0] - knows it's array
palette.green.toUpperCase(); // "#00FF00" - knows it's string

// Without satisfies, we'd lose precision
const palette2: Record<string, Color> = {
  red: [255, 0, 0],
  green: "#00ff00",
};
// palette2.red.map(x => x); // Error! Type is Color, not specific array
```

---

# Advanced Features - Part 2

Decorators (Experimental & Stage 3)

```typescript
// Class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  type = "report";
  title: string;
  
  constructor(title: string) {
    this.title = title;
  }
}

// Method decorator
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    return originalMethod.apply(this, args);
  };
  
  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

// Property decorator
function readonly(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false
  });
}

class Person {
  @readonly
  name: string = "Alice";
}
```

---

# Advanced Features - Part 3

Modules, namespaces, and declaration merging

```typescript
// Module augmentation
import { Observable } from "rxjs";

declare module "rxjs" {
  interface Observable<T> {
    customMethod(): Observable<T>;
  }
}

Observable.prototype.customMethod = function() {
  return this;
};

// Declaration merging - Interfaces
interface Box {
  height: number;
  width: number;
}

interface Box {
  scale: number;
}

const box: Box = { height: 5, width: 6, scale: 10 };

// Namespace merging
namespace Animals {
  export class Zebra {}
}

namespace Animals {
  export interface Legged {
    numberOfLegs: number;
  }
  export class Dog {}
}

// Both are available
const zebra = new Animals.Zebra();
const dog = new Animals.Dog();
```

---

# Advanced Features - Part 4

Abstract classes, intersections, and assertions

```typescript
// Abstract classes
abstract class Animal {
  abstract makeSound(): void;
  
  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

// Intersection types (&)
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: number;
  department: string;
};

type EmployeePerson = Person & Employee;

const worker: EmployeePerson = {
  name: "Alice",
  age: 30,
  employeeId: 123,
  department: "Engineering"
};

// Union types (|)
type Result = Success | Error;
type ID = string | number;

// Type assertions
const input = document.getElementById("input") as HTMLInputElement;
const input2 = <HTMLInputElement>document.getElementById("input");

// Non-null assertion operator (!)
function liveDangerously(x?: number | null) {
  console.log(x!.toFixed()); // I know x is not null!
}

// Definite assignment assertion (!)
let x!: number;
initialize();
console.log(x + x);

function initialize() {
  x = 10;
}
```

---
layout: center
class: text-center
---

# 🎮 Time for a Game!

## Kahoot Quiz - 20 Minutes

Visit **kahoot.it** and enter the game PIN

<div class="text-6xl mt-8 font-bold">
  GAME PIN: XXXX
</div>

<div class="mt-8 text-xl opacity-75">
  15-20 questions to test what we've learned!
</div>

---
layout: section
---

# Part 2: Real-World Applications

TypeScript in production

---

# tsconfig.json Deep Dive

Understanding every compiler option

```json
{
  "compilerOptions": {
    /* Language and Environment */
    "target": "ES2022",                    // ECMAScript target: ES3, ES5, ES2015-ES2023, ESNext
    "lib": ["ES2022", "DOM"],              // Built-in APIs available
    "jsx": "preserve",                     // JSX: preserve, react, react-jsx, react-native
    "experimentalDecorators": true,        // Enable decorators
    "emitDecoratorMetadata": true,         // Emit metadata for decorators
    "useDefineForClassFields": true,       // Use Define semantics for class fields

    /* Modules */
    "module": "ESNext",                    // Module system: CommonJS, AMD, UMD, ESNext
    "moduleResolution": "bundler",         // node, classic, bundler, node16, nodenext
    "baseUrl": ".",                        // Base directory for resolving modules
    "paths": {                             // Path mapping (like aliases)
      "@/*": ["./src/*"]
    },
    "resolveJsonModule": true,             // Allow importing .json files
    "allowImportingTsExtensions": true,    // Import .ts files (with bundlers)
    "types": ["node", "vite/client"],      // Type declaration packages to include
```

---

# tsconfig.json - Part 2

Emit and type checking options

```json
    /* Emit */
    "declaration": true,                   // Generate .d.ts files
    "declarationMap": true,                // Sourcemap for .d.ts files
    "sourceMap": true,                     // Generate .map files
    "outDir": "./dist",                    // Output directory
    "removeComments": false,               // Keep comments in output
    "noEmit": true,                        // Don't emit (for type-checking only)
    "importHelpers": true,                 // Use tslib helpers
    "downlevelIteration": true,            // Full support for iterables

    /* Interop */
    "isolatedModules": true,               // Each file must be transpilable alone
    "allowSyntheticDefaultImports": true,  // Allow default imports from modules
    "esModuleInterop": true,               // Better CommonJS/ESM interop
    "forceConsistentCasingInFileNames": true, // Case-sensitive imports

    /* Strict Type Checking */
    "strict": true,                        // Enable ALL strict checks (recommended!)
    "noImplicitAny": true,                 // Error on implied 'any'
    "strictNullChecks": true,              // null/undefined handled properly
    "strictFunctionTypes": true,           // Strict function type checking
    "strictBindCallApply": true,           // Strict bind/call/apply
    "strictPropertyInitialization": true,  // Class properties must be initialized
    "noImplicitThis": true,                // Error when 'this' has type 'any'
    "alwaysStrict": true,                  // Parse in strict mode
    "useUnknownInCatchVariables": true,    // catch (e) - e is unknown
```

---

# tsconfig.json - Part 3

Additional checks and best practices

```json
    /* Additional Checks */
    "noUnusedLocals": true,                // Report unused local variables
    "noUnusedParameters": true,            // Report unused parameters
    "noImplicitReturns": true,             // All code paths must return value
    "noFallthroughCasesInSwitch": true,    // No fallthrough in switch
    "noUncheckedIndexedAccess": true,      // Add undefined to index access
    "noImplicitOverride": true,            // Must use 'override' keyword
    "noPropertyAccessFromIndexSignature": true, // Use bracket notation for index signatures
    "allowUnusedLabels": false,            // Report unused labels
    "allowUnreachableCode": false,         // Report unreachable code

    /* Completeness */
    "skipLibCheck": true                   // Skip checking .d.ts files (performance)
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Key Recommendations:**
- Always use `"strict": true"`
- Enable `noUnusedLocals` and `noUnusedParameters` for clean code
- Use `noUncheckedIndexedAccess` for safer array/object access
- Set `moduleResolution: "bundler"` for modern bundlers (Vite, webpack)

---
layout: two-cols
---

# GraphQL Type Generation

Automatic types from GraphQL schema

**Setup:**
```bash
npm install -D @graphql-codegen/cli \
  @graphql-codegen/typescript \
  @graphql-codegen/typescript-operations
```

**codegen.yml:**
```yaml
schema: "./schema.graphql"
documents: "./src/**/*.graphql"
generates:
  ./src/generated/graphql.ts:
    plugins:
      - "typescript"
      - "typescript-operations"
    config:
      skipTypename: false
      enumsAsTypes: true
```

**Schema (schema.graphql):**
```graphql
type User {
  id: ID!
  username: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}
```

::right::

**Query (queries.graphql):**
```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    username
    email
    posts {
      id
      title
    }
  }
}
```

**Generated Types:**
```typescript
export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  posts: Array<Post>;
};

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetUserQuery = {
  user?: {
    id: string;
    username: string;
    email: string;
    posts: Array<{
      id: string;
      title: string;
    }>;
  };
};
```

**Benefits:**
✅ 100% type-safe queries
✅ Autocomplete in IDE
✅ Refactoring support

---

# REST API Type Generation

OpenAPI/Swagger to TypeScript

**Setup:**
```bash
npm install -D openapi-typescript
```

**OpenAPI Spec (api-spec.yaml):**
```yaml
openapi: 3.0.0
paths:
  /users/{userId}:
    get:
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'

components:
  schemas:
    User:
      type: object
      required: [id, username, email]
      properties:
        id: { type: string, format: uuid }
        username: { type: string }
        email: { type: string, format: email }
```

---

# REST API Types - Usage

Generated types in action

**Generate types:**
```bash
npm run openapi:generate
```

**Generated (types/api.ts):**
```typescript
export interface paths {
  "/users/{userId}": {
    get: {
      parameters: {
        path: { userId: string };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["User"];
          };
        };
      };
    };
  };
}

export interface components {
  schemas: {
    User: {
      id: string;
      username: string;
      email: string;
    };
  };
}
```

**Type-safe API client:**
```typescript
import type { paths } from "./types/api";

async function getUser(userId: string) {
  const response = await fetch(`/users/${userId}`);
  const data: paths["/users/{userId}"]["get"]["responses"][200]["content"]["application/json"] 
    = await response.json();
  
  // data is fully typed!
  console.log(data.username); // ✅ TypeScript knows this exists
  // console.log(data.invalid); // ❌ Error!
  
  return data;
}
```

---

# TypeScript in CI/CD

Automated type checking

**.github/workflows/typescript-check.yml:**
```yaml
name: TypeScript Type Check

on: [push, pull_request]

jobs:
  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: TypeScript type check
        run: npm run type-check
      
      - name: Build check
        run: npm run build
```

**package.json scripts:**
```json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch",
    "ci:check": "npm run type-check && npm run build"
  }
}
```

**Benefits:**
- ✅ Catch type errors before merge
- ✅ Ensure code compiles
- ✅ Prevent breaking changes
- ✅ Fast feedback loop

---

# Forms with Zod & Vuetify

Type-safe form validation

**Define schema with Zod:**
```typescript
import { z } from "zod";

const userSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
  email: z.string()
    .email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain uppercase letter")
    .regex(/[0-9]/, "Password must contain a number"),
  age: z.number()
    .min(18, "Must be 18 or older")
    .max(120, "Invalid age"),
  terms: z.boolean()
    .refine(val => val === true, "You must accept terms")
});

// Infer TypeScript type from Zod schema!
type UserFormData = z.infer<typeof userSchema>;
// { username: string; email: string; password: string; age: number; terms: boolean }
```

---

# Vuetify Form Component

Type-safe Vue 3 + Vuetify + Zod

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { z } from 'zod';
import type { VForm } from 'vuetify/components';

const userSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

type UserFormData = z.infer<typeof userSchema>;

const formData = ref<UserFormData>({
  username: '',
  email: '',
  password: '',
});

const errors = ref<Partial<Record<keyof UserFormData, string>>>({});
const form = ref<VForm | null>(null);

const validate = () => {
  try {
    userSchema.parse(formData.value);
    errors.value = {};
    return true;
  } catch (err) {
    if (err instanceof z.ZodError) {
      errors.value = {};
      err.errors.forEach(error => {
        if (error.path[0]) {
          errors.value[error.path[0] as keyof UserFormData] = error.message;
        }
      });
    }
    return false;
  }
};

const handleSubmit = () => {
  if (validate()) {
    console.log('Form is valid!', formData.value);
    // Submit to API
  }
};
</script>
```

---

# Vuetify Form Template

```vue
<template>
  <v-form ref="form" @submit.prevent="handleSubmit">
    <v-text-field
      v-model="formData.username"
      label="Username"
      :error-messages="errors.username"
      @input="() => delete errors.username"
    />
    
    <v-text-field
      v-model="formData.email"
      label="Email"
      type="email"
      :error-messages="errors.email"
      @input="() => delete errors.email"
    />
    
    <v-text-field
      v-model="formData.password"
      label="Password"
      type="password"
      :error-messages="errors.password"
      @input="() => delete errors.password"
    />
    
    <v-btn type="submit" color="primary">
      Submit
    </v-btn>
  </v-form>
</template>
```

**Benefits:**
- ✅ Single source of truth (Zod schema)
- ✅ Runtime validation
- ✅ Compile-time type safety
- ✅ Great DX with autocomplete

---
layout: default
---

# Pinia + TypeScript

Type-safe state management

```typescript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// Option 1: Composition API style (recommended)
export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  
  // Getters (computed)
  const isAuthenticated = computed(() => user.value !== null);
  const fullName = computed(() => 
    user.value ? `${user.value.firstName} ${user.value.lastName}` : ''
  );
  
  // Actions
  async function login(username: string, password: string): Promise<void> {
    isLoading.value = true;
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      user.value = await response.json();
    } finally {
      isLoading.value = false;
    }
  }
  
  function logout(): void {
    user.value = null;
  }
  
  return { user, isLoading, isAuthenticated, fullName, login, logout };
});

// Usage in component - fully typed!
const userStore = useUserStore();
userStore.login('alice', 'pass123'); // ✅ TypeScript knows the signature
console.log(userStore.fullName); // ✅ Typed as string
```

---

# Vue 3 Components with TypeScript

Type-safe props, emits, and refs

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

// Define prop types
interface Props {
  title: string;
  count?: number;
  items: string[];
  disabled?: boolean;
}

// Props with defaults
const props = withDefaults(defineProps<Props>(), {
  count: 0,
  disabled: false,
});

// Define emits with types
interface Emits {
  (e: 'update', value: number): void;
  (e: 'delete', id: string): void;
  (e: 'submit', data: { name: string; age: number }): void;
}

const emit = defineEmits<Emits>();

// Template refs with types
const inputRef = ref<HTMLInputElement | null>(null);
const formRef = ref<InstanceType<typeof SomeComponent> | null>(null);

// Computed with inference
const doubleCount = computed(() => props.count * 2); // number

// Methods
function handleClick(): void {
  emit('update', props.count + 1);
  inputRef.value?.focus(); // Safe navigation
}

// Expose methods to parent
defineExpose({
  reset() {
    // ...
  }
});
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <input ref="inputRef" />
    <button @click="handleClick" :disabled="disabled">
      Count: {{ count }}
    </button>
  </div>
</template>
```

---

# Error Handling Patterns

Type-safe error handling

```typescript
// Result type pattern
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

async function fetchUser(id: string): Promise<Result<User>> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      return { success: false, error: new Error(`HTTP ${response.status}`) };
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

// Usage - exhaustive checking
const result = await fetchUser("123");
if (result.success) {
  console.log(result.data.username); // ✅ TypeScript knows data exists
} else {
  console.error(result.error.message); // ✅ TypeScript knows error exists
}

// Discriminated union for specific errors
type ApiError =
  | { type: 'network'; message: string }
  | { type: 'validation'; fields: Record<string, string> }
  | { type: 'auth'; code: 401 | 403 }
  | { type: 'notfound'; resource: string };

function handleError(error: ApiError): void {
  switch (error.type) {
    case 'network':
      showToast(error.message);
      break;
    case 'validation':
      Object.entries(error.fields).forEach(([field, message]) => {
        showFieldError(field, message);
      });
      break;
    case 'auth':
      redirectToLogin();
      break;
    case 'notfound':
      show404(error.resource);
      break;
  }
}
```

---

# Advanced Design Patterns

Type-safe patterns in TypeScript

```typescript
// Builder pattern
class QueryBuilder<T> {
  private conditions: string[] = [];
  private orderBy?: string;
  
  where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }
  
  order(field: keyof T, direction: 'ASC' | 'DESC'): this {
    this.orderBy = `${String(field)} ${direction}`;
    return this;
  }
  
  build(): string {
    let query = 'SELECT * FROM table';
    if (this.conditions.length > 0) {
      query += ' WHERE ' + this.conditions.join(' AND ');
    }
    if (this.orderBy) {
      query += ' ORDER BY ' + this.orderBy;
    }
    return query;
  }
}

interface User { name: string; age: number; }

const query = new QueryBuilder<User>()
  .where('active = true')
  .where('age > 18')
  .order('name', 'ASC') // ✅ Autocomplete for 'name' | 'age'
  .build();

// Factory pattern with generics
interface Product { id: string; name: string; }

class ProductFactory<T extends Product> {
  constructor(private creator: (id: string, name: string) => T) {}
  
  create(id: string, name: string): T {
    return this.creator(id, name);
  }
}
```

---

# Live Coding Time! 💻

Let's build a **Type-Safe Database Query Builder**

**We'll create:**
1. Generic `QueryBuilder<T>` class
2. Type-safe `.where()` method with `keyof`
3. Type-safe `.select()` with `Pick<T, K>`
4. Method chaining with `.orderBy()`, `.limit()`
5. Full autocomplete & type checking!

<div class="mt-8 p-4 bg-blue-500 bg-opacity-20 rounded">
  ⏱️ ~7 minutes • Follow along or watch • Code available in repo!
</div>

---
layout: section
---

# Demo App Showcase

Explore all examples interactively

---

# What's in the Demo App?

<v-clicks>

## 📚 TypeScript Feature Gallery
- Interactive examples for every TS feature
- Edit code live and see results
- Side-by-side comparisons

## 🛠️ Real-World Examples
- GraphQL & REST API type generation
- Form validation with Zod + Vuetify
- Pinia store with TypeScript
- Complete mini applications

## 🎮 Try It Yourself
- Clone the repository
- Run locally
- Experiment with types

<div class="mt-8 text-center">
  <a href="http://localhost:5555" target="_blank" class="text-blue-400 hover:text-blue-300">
    🚀 Open Demo App
  </a>
</div>
</v-clicks>


---
layout: default
---

# Key Takeaways

<v-clicks>

## 1. TypeScript is JavaScript with superpowers
Type safety prevents bugs before runtime

## 2. The type system is incredibly powerful
Generics, conditional types, mapped types - solve real problems

## 3. Tooling makes it worthwhile
API generation, CI/CD checks, IDE support

## 4. Vue 3 + TypeScript = ❤️
Perfect integration with modern Vue

## 5. Start strict, stay strict
`"strict": true` from day one

</v-clicks>

---

# Resources & Links

## Official Documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vue 3 + TypeScript Guide](https://vuejs.org/guide/typescript/overview.html)
- [Pinia with TypeScript](https://pinia.vuejs.org/core-concepts/type-safety.html)

## Tools & Libraries
- [Zod](https://zod.dev/) - Schema validation
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)
- [openapi-typescript](https://github.com/drwpow/openapi-typescript)
- [Vuetify](https://vuetifyjs.com/)

## This Presentation
- GitHub Repository: [Link to your repo]
- Demo App: [Link to demo]
- Slides (Markdown): Available in repo

## Keep Learning
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Type Challenges](https://github.com/type-challenges/type-challenges)
- [Total TypeScript](https://www.totaltypescript.com/)

---
layout: end
class: text-center
---

# Thank You! 🎉

## Questions?

<div class="mt-12">
  <div class="text-2xl mb-4">Let's connect!</div>
  <div class="flex justify-center gap-8">
    <div>📧 your-email@example.com</div>
    <div>🐙 github.com/yourusername</div>
    <div>🐦 @yourtwitter</div>
  </div>
</div>

<div class="mt-12 text-sm opacity-75">
  Made with ❤️ using Slidev, Vue 3, and TypeScript
</div>
