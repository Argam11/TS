/**
 * Basic Types in TypeScript
 * Comprehensive examples of all primitive and basic types
 */

// ==================== PRIMITIVES ====================

export const stringExample: string = "Hello TypeScript";
export const numberExample: number = 42;
export const booleanExample: boolean = true;
export const bigintExample: bigint = 9007199254740991n;
export const symbolExample: symbol = Symbol("unique");

// ==================== SPECIAL TYPES ====================

export const nullExample: null = null;
export const undefinedExample: undefined = undefined;

// any - Escape hatch (avoid in production!)
export let anyExample: any = "can be anything";
anyExample = 42;
anyExample = { key: "value" };

// unknown - Type-safe version of any
export let unknownExample: unknown = "safer than any";

// Type guard required before use
export function useUnknown(value: unknown): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // ✅ OK after checking
  }
}

// never - Represents values that never occur
export function throwError(message: string): never {
  throw new Error(message);
}

export function infiniteLoop(): never {
  while (true) {
    // Never returns
  }
}

// void - Function returns nothing
export function logMessage(msg: string): void {
  console.log(msg);
  // No return statement
}

// ==================== ARRAYS ====================

export const numberArray: number[] = [1, 2, 3, 4, 5];
export const stringArray: Array<string> = ["a", "b", "c"];
export const mixedArray: (number | string)[] = [1, "two", 3, "four"];

// Array methods are type-safe
export const doubled: number[] = numberArray.map(n => n * 2);
export const filtered: number[] = numberArray.filter(n => n > 2);

// ==================== TUPLES ====================

// Fixed-length arrays with specific types
export const personTuple: [string, number] = ["Alice", 30];
export const rgbTuple: [number, number, number] = [255, 128, 0];

// Named tuples (TypeScript 4.0+)
export type Point = [x: number, y: number];
export const point: Point = [10, 20];

// Optional tuple elements
export type OptionalTuple = [string, number?];
export const tuple1: OptionalTuple = ["hello", 42];
export const tuple2: OptionalTuple = ["world"];

// Rest elements in tuples
export type StringNumberBooleans = [string, number, ...boolean[]];
export const snb: StringNumberBooleans = ["hello", 1, true, false, true];

// ==================== ENUMS ====================

// Numeric enum
export enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

export const currentDirection: Direction = Direction.Up;

// Numeric enum with custom start
export enum Status {
  Pending = 1,
  Approved = 2,
  Rejected = 3
}

// String enum
export enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

export const favoriteColor: Color = Color.Blue;

// Const enum (inlined at compile time)
export const enum HttpStatus {
  OK = 200,
  NotFound = 404,
  InternalServerError = 500
}

export function checkStatus(status: HttpStatus): string {
  switch (status) {
    case HttpStatus.OK:
      return "Success";
    case HttpStatus.NotFound:
      return "Not Found";
    case HttpStatus.InternalServerError:
      return "Server Error";
  }
}

// Computed enum
export enum FileAccess {
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  Execute = 1 << 3
}

// ==================== TYPE ASSERTIONS ====================

// Using 'as' syntax
export const inputElement = document.getElementById("input") as HTMLInputElement;

// Using angle bracket syntax (not in JSX/TSX)
export const inputElement2 = <HTMLInputElement>document.getElementById("input");

// const assertion
export const config = {
  endpoint: "https://api.example.com",
  timeout: 5000
} as const;
// Type: { readonly endpoint: "https://api.example.com"; readonly timeout: 5000 }

// Array with const assertion
export const colors = ["red", "green", "blue"] as const;
// Type: readonly ["red", "green", "blue"]

// ==================== LITERAL TYPES ====================

export type YesNo = "yes" | "no";
export type OneToFive = 1 | 2 | 3 | 4 | 5;
export type Boolish = true | false | "maybe";

export function handleYesNo(answer: YesNo): void {
  if (answer === "yes") {
    console.log("Confirmed!");
  } else {
    console.log("Denied!");
  }
}

// ==================== UNION AND INTERSECTION ====================

// Union type
export type StringOrNumber = string | number;

export function printId(id: StringOrNumber): void {
  if (typeof id === "string") {
    console.log(`ID is string: ${id.toUpperCase()}`);
  } else {
    console.log(`ID is number: ${id.toFixed(2)}`);
  }
}

// Intersection type
export type Person = {
  name: string;
  age: number;
};

export type Employee = {
  employeeId: number;
  department: string;
};

export type EmployeePerson = Person & Employee;

export const worker: EmployeePerson = {
  name: "Alice",
  age: 30,
  employeeId: 12345,
  department: "Engineering"
};

// ==================== EXAMPLES ====================

export const examples = {
  primitives: {
    string: stringExample,
    number: numberExample,
    boolean: booleanExample,
    bigint: bigintExample,
    symbol: symbolExample,
  },
  special: {
    null: nullExample,
    undefined: undefinedExample,
    any: anyExample,
    unknown: unknownExample,
  },
  arrays: {
    numbers: numberArray,
    strings: stringArray,
    mixed: mixedArray,
  },
  tuples: {
    person: personTuple,
    point: point,
  },
  enums: {
    direction: currentDirection,
    color: favoriteColor,
  },
};

