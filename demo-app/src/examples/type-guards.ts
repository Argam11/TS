/**
 * Type Guards and Narrowing in TypeScript
 * Safely narrow types at runtime
 */

// ==================== TYPEOF TYPE GUARDS ====================

export function padLeft(value: string, padding: string | number): string {
  if (typeof padding === "number") {
    return " ".repeat(padding) + value;
  }
  return padding + value;
}

export function processValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    return value ? "YES" : "NO";
  }
}

// ==================== INSTANCEOF TYPE GUARDS ====================

class Dog {
  bark(): void {
    console.log("Woof!");
  }
}

class Cat {
  meow(): void {
    console.log("Meow!");
  }
}

export function makeSound(animal: Dog | Cat): void {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript knows it's Dog
  } else {
    animal.meow(); // TypeScript knows it's Cat
  }
}

// With Date
export function formatDate(input: Date | string): string {
  if (input instanceof Date) {
    return input.toISOString();
  }
  return new Date(input).toISOString();
}

// ==================== USER-DEFINED TYPE GUARDS ====================

// Using 'is' keyword
interface Fish {
  swim: () => void;
}

interface Bird {
  fly: () => void;
}

export function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

export function move(pet: Fish | Bird): void {
  if (isFish(pet)) {
    pet.swim(); // TypeScript knows it's Fish
  } else {
    pet.fly(); // TypeScript knows it's Bird
  }
}

// More complex type guard
interface ApiSuccess {
  status: "success";
  data: any;
}

interface ApiError {
  status: "error";
  error: string;
}

export function isApiSuccess(response: ApiSuccess | ApiError): response is ApiSuccess {
  return response.status === "success";
}

export function handleResponse(response: ApiSuccess | ApiError): void {
  if (isApiSuccess(response)) {
    console.log("Data:", response.data);
  } else {
    console.error("Error:", response.error);
  }
}

// ==================== DISCRIMINATED UNIONS ====================

// Using a common discriminant property
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; sideLength: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

export function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

// API Response pattern
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

export function handleResult<T>(result: Result<T>): void {
  if (result.success) {
    console.log("Success:", result.data);
  } else {
    console.error("Error:", result.error);
  }
}

// ==================== ASSERTION FUNCTIONS ====================

// Using 'asserts' keyword
export function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg || "Assertion failed");
  }
}

export function yell(str: any): string {
  assert(typeof str === "string", "Must be a string");
  return str.toUpperCase(); // TypeScript knows str is string
}

// Assertion with type predicate
export function assertIsString(val: any): asserts val is string {
  if (typeof val !== "string") {
    throw new Error("Not a string!");
  }
}

export function processString(value: unknown): string {
  assertIsString(value);
  return value.toUpperCase(); // TypeScript knows value is string
}

// Assert non-null
export function assertNonNull<T>(value: T | null | undefined): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error("Value is null or undefined");
  }
}

export function getLength(str: string | null): number {
  assertNonNull(str);
  return str.length; // TypeScript knows str is not null
}

// ==================== IN OPERATOR NARROWING ====================

type Fish2 = { swim: () => void; name: string };
type Bird2 = { fly: () => void; name: string };

export function moveAnimal(animal: Fish2 | Bird2): void {
  if ("swim" in animal) {
    animal.swim(); // TypeScript knows it has swim
  } else {
    animal.fly(); // TypeScript knows it has fly
  }
}

// With optional properties
interface A {
  x: number;
}

interface B {
  y: string;
}

export function doSomething(obj: A | B): void {
  if ("x" in obj) {
    console.log(obj.x);
  } else {
    console.log(obj.y);
  }
}

// ==================== TRUTHINESS NARROWING ====================

export function printAll(strs: string | string[] | null): void {
  if (strs && typeof strs === "object") {
    // Array
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
  // null case handled implicitly
}

export function multiplyByTwo(value: number | null | undefined): number {
  if (value) {
    return value * 2;
  }
  return 0;
}

// ==================== EQUALITY NARROWING ====================

export function example(x: string | number, y: string | boolean): void {
  if (x === y) {
    // TypeScript knows both must be string
    x.toUpperCase();
    y.toUpperCase();
  }
}

// With null checking
export function printName(name: string | null | undefined): void {
  if (name != null) {
    // Both null and undefined eliminated
    console.log(name.toUpperCase());
  }
}

// ==================== CONTROL FLOW ANALYSIS ====================

export function processUser(user: { name: string; age?: number } | null): void {
  if (!user) {
    return;
  }
  // TypeScript knows user is not null here
  console.log(user.name);

  if (!user.age) {
    return;
  }
  // TypeScript knows age exists here
  console.log(user.age);
}

// Unreachable code detection
export function unreachableExample(value: string | number): void {
  if (typeof value === "string") {
    return;
  } else if (typeof value === "number") {
    return;
  }
  // TypeScript knows this is unreachable
  // value; // never type
}

// ==================== ARRAY ISARRAY ====================

export function processInput(input: string | string[]): void {
  if (Array.isArray(input)) {
    // TypeScript knows it's string[]
    input.forEach(item => console.log(item));
  } else {
    // TypeScript knows it's string
    console.log(input.toUpperCase());
  }
}

// ==================== PRACTICAL EXAMPLES ====================

// 1. Form validation with type guards
interface FormData {
  name: string;
  email: string;
  age?: number;
}

export function isValidFormData(data: any): data is FormData {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.name === "string" &&
    typeof data.email === "string" &&
    (data.age === undefined || typeof data.age === "number")
  );
}

export function submitForm(data: unknown): void {
  if (isValidFormData(data)) {
    // Type-safe form submission
    console.log(`Name: ${data.name}, Email: ${data.email}`);
  } else {
    throw new Error("Invalid form data");
  }
}

// 2. API Response handling
interface User {
  id: number;
  name: string;
  email: string;
}

export function isUser(obj: any): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string"
  );
}

export async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  
  if (isUser(data)) {
    return data;
  }
  
  throw new Error("Invalid user data");
}

// 3. Error handling with type guards
class NetworkError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

class ValidationError extends Error {
  constructor(public fields: Record<string, string>) {
    super("Validation failed");
  }
}

export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof NetworkError;
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

export function handleError(error: unknown): void {
  if (isNetworkError(error)) {
    console.error(`Network error ${error.statusCode}: ${error.message}`);
  } else if (isValidationError(error)) {
    console.error("Validation errors:", error.fields);
  } else if (error instanceof Error) {
    console.error("General error:", error.message);
  } else {
    console.error("Unknown error:", error);
  }
}

// 4. Union type narrowing
type Input = string | number | boolean | null | undefined;

export function processInput2(input: Input): string {
  if (input == null) {
    return "No value";
  }
  
  if (typeof input === "boolean") {
    return input ? "True" : "False";
  }
  
  if (typeof input === "number") {
    return input.toFixed(2);
  }
  
  return input.toUpperCase();
}

// ==================== EXAMPLES ====================

export const examples = {
  typeof: processValue("hello"),
  instanceof: formatDate(new Date()),
  discriminated: getArea({ kind: "circle", radius: 5 }),
  truthiness: printAll(["a", "b", "c"]),
  array: processInput(["one", "two", "three"]),
};

