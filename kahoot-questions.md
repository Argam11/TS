# TypeScript Kahoot Quiz Questions

## Instructions
- 15-20 questions covering all TypeScript concepts
- Mix of difficulty: Quick (30s), Medium (60s), Advanced (90s)
- Use on Kahoot.com during presentation

---

## Question 1: TypeScript History [Quick - 30s]
**When was TypeScript first released?**
- A) 2012 ✅
- B) 2010
- C) 2015
- D) 2008

---

## Question 2: Basic Types [Quick - 30s]
**Which type represents "a value that will never occur"?**
- A) void
- B) never ✅
- C) undefined
- D) null

---

## Question 3: Type Inference [Medium - 60s]
**What type does TypeScript infer for: `const arr = [1, "hello", true]`?**
- A) any[]
- B) (number | string | boolean)[] ✅
- C) unknown[]
- D) Array<any>

---

## Question 4: Generics [Medium - 60s]
**What does this generic constraint do: `function fn<T extends { length: number }>(arg: T)`?**
- A) T must be a number
- B) T must have a length property ✅
- C) T must be an array
- D) T must be a string

---

## Question 5: Utility Types [Medium - 60s]
**Which utility type makes all properties optional?**
- A) Required<T>
- B) Readonly<T>
- C) Partial<T> ✅
- D) Pick<T, K>

---

## Question 6: Conditional Types [Advanced - 90s]
```typescript
type IsString<T> = T extends string ? "yes" : "no";
type Result = IsString<"hello">;
```
**What is the type of Result?**
- A) "yes" ✅
- B) "no"
- C) boolean
- D) string

---

## Question 7: Type Guards [Medium - 60s]
**What keyword is used to create a user-defined type guard?**
- A) typeof
- B) instanceof
- C) is ✅
- D) as

---

## Question 8: Template Literal Types [Advanced - 90s]
```typescript
type Greeting = `Hello ${string}`;
```
**Which is a valid value for Greeting?**
- A) "Hello World" ✅
- B) "Goodbye"
- C) 123
- D) null

---

## Question 9: Mapped Types [Advanced - 90s]
```typescript
type ReadonlyProps<T> = {
  readonly [K in keyof T]: T[K]
}
```
**What does this type do?**
- A) Makes all properties writable
- B) Makes all properties optional
- C) Makes all properties readonly ✅
- D) Removes all properties

---

## Question 10: Union vs Intersection [Quick - 30s]
**What operator creates an intersection type?**
- A) |
- B) & ✅
- C) +
- D) *

---

## Question 11: Const Assertions [Medium - 60s]
```typescript
const colors = ["red", "blue"] as const;
```
**What is the type of colors?**
- A) string[]
- B) readonly ["red", "blue"] ✅
- C) Array<string>
- D) ["red", "blue"]

---

## Question 12: Satisfies Operator [Advanced - 90s]
**What does the `satisfies` operator do?**
- A) Casts to a type
- B) Validates type without widening ✅
- C) Creates a new type
- D) Checks equality

---

## Question 13: Discriminated Unions [Medium - 60s]
**What makes a union type "discriminated"?**
- A) Common property with unique literals ✅
- B) Different property names
- C) Using the | operator
- D) Using type guards

---

## Question 14: ReturnType Utility [Medium - 60s]
```typescript
function getUser() { return { name: "Alice", age: 30 }; }
type User = ReturnType<typeof getUser>;
```
**What is the type of User?**
- A) Function
- B) { name: string, age: number } ✅
- C) typeof getUser
- D) any

---

## Question 15: Vue 3 + TypeScript [Medium - 60s]
**Which Vue 3 function is used to define typed props in script setup?**
- A) defineProps ✅
- B) props
- C) withDefaults
- D) toRefs

---

## Question 16: Type Narrowing [Quick - 30s]
**Which operator narrows a type by checking if a property exists?**
- A) typeof
- B) instanceof
- C) in ✅
- D) as

---

## Question 17: Tuple Types [Quick - 30s]
**What's the type of: `let tuple: [string, number] = ["hello", 42]`?**
- A) Array<string | number>
- B) [string, number] ✅
- C) (string | number)[]
- D) any[]

---

## Question 18: Enum Types [Quick - 30s]
**What keyword creates a const enum?**
- A) enum
- B) const enum ✅
- C) static enum
- D) readonly enum

---

## Question 19: Index Signatures [Medium - 60s]
```typescript
type StringMap = { [key: string]: number }
```
**What does this allow?**
- A) Fixed properties only
- B) Any string key with number value ✅
- C) Any key with any value
- D) Only number keys

---

## Question 20: infer Keyword [Advanced - 90s]
```typescript
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```
**What does `infer R` do?**
- A) Imports type R
- B) Infers the return type ✅
- C) Creates a generic R
- D) Checks if R exists

---

## Bonus Question: TypeScript Compiler [Quick - 30s]
**Which command type-checks without emitting files?**
- A) tsc
- B) tsc --noEmit ✅
- C) tsc --check
- D) tsc --validate

---

## Answer Key Summary
1. A (2012)
2. B (never)
3. B ((number | string | boolean)[])
4. B (must have length property)
5. C (Partial<T>)
6. A ("yes")
7. C (is)
8. A ("Hello World")
9. C (readonly)
10. B (&)
11. B (readonly ["red", "blue"])
12. B (validates without widening)
13. A (common property with unique literals)
14. B ({ name: string, age: number })
15. A (defineProps)
16. C (in)
17. B ([string, number])
18. B (const enum)
19. B (any string key with number value)
20. B (infers the return type)
Bonus: B (tsc --noEmit)

