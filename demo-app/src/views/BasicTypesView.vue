<script setup lang="ts">
import { examples } from '@/examples/basic-types';
import CodeBlock from '@/components/CodeBlock.vue';
import InfoSection from '@/components/InfoSection.vue';
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">Basic Types in TypeScript</h1>
          <p class="text-body-1 mb-8">
            Comprehensive examples of all primitive and basic types in TypeScript.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Primitives</v-card-title>
            <v-card-text>
              <CodeBlock :code="`const stringExample: string = &quot;Hello TypeScript&quot;;
const numberExample: number = 42;
const booleanExample: boolean = true;
const bigintExample: bigint = 9007199254740991n;
const symbolExample: symbol = Symbol(&quot;unique&quot;);`" />
              
              <v-divider class="my-4" />
              
              <div class="examples-section">
                <div class="examples-title mb-3">💡 Live Examples</div>
                <div class="example-item">
                  <span class="example-label">String:</span>
                  <code class="example-value">{{ examples.primitives.string }}</code>
                </div>
                <div class="example-item">
                  <span class="example-label">Number:</span>
                  <code class="example-value">{{ examples.primitives.number }}</code>
                </div>
                <div class="example-item">
                  <span class="example-label">Boolean:</span>
                  <code class="example-value">{{ examples.primitives.boolean }}</code>
                </div>
                <div class="example-item">
                  <span class="example-label">BigInt:</span>
                  <code class="example-value">{{ examples.primitives.bigint.toString() }}</code>
                </div>
                <div class="example-item">
                  <span class="example-label">Symbol:</span>
                  <code class="example-value">{{ examples.primitives.symbol.toString() }}</code>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Special Types</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// any - Escape hatch (avoid!)
let anyExample: any = &quot;can be anything&quot;;

// unknown - Type-safe any
let unknownExample: unknown = &quot;safer&quot;;

// never - Represents values that never occur
function throwError(msg: string): never {
  throw new Error(msg);
}

// void - Function returns nothing
function logMessage(msg: string): void {
  console.log(msg);
}`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Arrays & Tuples</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// Arrays
const numbers: number[] = [1, 2, 3];
const strings: Array<string> = [&quot;a&quot;, &quot;b&quot;];

// Tuples
const person: [string, number] = [&quot;Alice&quot;, 30];
const rgb: [number, number, number] = [255, 128, 0];

// Named tuples
type Point = [x: number, y: number];
const point: Point = [10, 20];`" />
              
              <v-divider class="my-4" />
              
              <div class="examples-section">
                <div class="examples-title mb-3">💡 Live Examples</div>
                <div class="example-item">
                  <span class="example-label">Numbers:</span>
                  <code class="example-value">{{ examples.arrays.numbers }}</code>
                </div>
                <div class="example-item">
                  <span class="example-label">Strings:</span>
                  <code class="example-value">{{ examples.arrays.strings }}</code>
                </div>
                <div class="example-item">
                  <span class="example-label">Person:</span>
                  <code class="example-value">{{ examples.tuples.person }}</code>
                </div>
                <div class="example-item">
                  <span class="example-label">Point:</span>
                  <code class="example-value">{{ examples.tuples.point }}</code>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Enums</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// Numeric enum
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

// String enum
enum Color {
  Red = &quot;RED&quot;,
  Green = &quot;GREEN&quot;,
  Blue = &quot;BLUE&quot;
}

// Const enum (inlined at compile time)
const enum HttpStatus {
  OK = 200,
  NotFound = 404,
  InternalServerError = 500
}`" />
              
              <v-divider class="my-4" />
              
              <div class="examples-section">
                <div class="examples-title mb-3">💡 Live Examples</div>
                <div class="example-item">
                  <span class="example-label">Direction:</span>
                  <code class="example-value">{{ examples.enums.direction }}</code>
                </div>
                <div class="example-item">
                  <span class="example-label">Color:</span>
                  <code class="example-value">{{ examples.enums.color }}</code>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Objects & Interfaces</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// Object type
const user: { name: string; age: number } = {
  name: &quot;Alice&quot;,
  age: 30
};

// Interface
interface Person {
  name: string;
  age: number;
  email?: string;  // Optional property
}

const person: Person = {
  name: &quot;Bob&quot;,
  age: 25
};

// Type alias
type Point = {
  x: number;
  y: number;
};`" />
              
              <v-divider class="my-4" />
              
              <div class="examples-section">
                <div class="examples-title mb-3">💡 Live Examples</div>
                <div class="example-item">
                  <span class="example-label">User Object:</span>
                  <code class="example-value">{ name: "Alice", age: 30 }</code>
                </div>
                <div class="example-item">
                  <span class="example-label">Point:</span>
                  <code class="example-value">{{ examples.tuples.point }}</code>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Functions</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// Function declaration
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Function type
type MathOperation = (a: number, b: number) => number;

// Optional and default parameters
function greet(name: string, greeting?: string): string {
  return \`\${greeting || &quot;Hello&quot;}, \${name}\`;
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Union & Intersection Types</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// Union type - can be one of several types
let id: string | number;
id = 123;      // ✅ OK
id = &quot;abc&quot;;    // ✅ OK

type Status = &quot;pending&quot; | &quot;approved&quot; | &quot;rejected&quot;;
let status: Status = &quot;pending&quot;;

// Intersection type - combines multiple types
type Person = { name: string };
type Employee = { employeeId: number };

type Worker = Person &amp; Employee;

const worker: Worker = {
  name: &quot;Alice&quot;,
  employeeId: 12345
};`" />
              
              <v-divider class="my-4" />
              
              <div class="examples-section">
                <div class="examples-title mb-3">💡 Live Examples</div>
                <div class="example-item">
                  <span class="example-label">Union ID (number):</span>
                  <code class="example-value">123</code>
                </div>
                <div class="example-item">
                  <span class="example-label">Union ID (string):</span>
                  <code class="example-value">"abc123"</code>
                </div>
                <div class="example-item">
                  <span class="example-label">Worker Object:</span>
                  <code class="example-value">{ name, age, employeeId, department }</code>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Literal Types</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// String literals
let direction: &quot;up&quot; | &quot;down&quot; | &quot;left&quot; | &quot;right&quot;;
direction = &quot;up&quot;;     // ✅ OK
// direction = &quot;center&quot;;  // ❌ Error

// Number literals
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceRoll = 3;

// Boolean literal
let isTrue: true = true;

// as const - makes values readonly and literal
const config = {
  api: &quot;https://api.example.com&quot;,
  timeout: 5000
} as const;

// config.api = &quot;other&quot;;  // ❌ Error - readonly`" />
              
              <v-divider class="my-4" />
              
              <div class="examples-section">
                <div class="examples-title mb-3">💡 Live Examples</div>
                <div class="example-item">
                  <span class="example-label">Direction:</span>
                  <code class="example-value">"up"</code>
                </div>
                <div class="example-item">
                  <span class="example-label">Dice Roll:</span>
                  <code class="example-value">3</code>
                </div>
                <div class="example-item">
                  <span class="example-label">Config (as const):</span>
                  <code class="example-value">{{ examples.assertions.config }}</code>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>null & undefined</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// null and undefined are types
let empty: null = null;
let notSet: undefined = undefined;

// Optional properties use undefined
interface User {
  name: string;
  email?: string;  // string | undefined
}

// Nullable types
let value: string | null = null;
value = &quot;hello&quot;;

// Use union for nullable values
function findUser(id: number): User | null {
  // Returns User or null if not found
  return null;
}`" />
              
              <v-divider class="my-4" />
              
              <div class="examples-section">
                <div class="examples-title mb-3">💡 Live Examples</div>
                <div class="example-item">
                  <span class="example-label">null:</span>
                  <code class="example-value">null</code>
                </div>
                <div class="example-item">
                  <span class="example-label">undefined:</span>
                  <code class="example-value">undefined</code>
                </div>
                <div class="example-item">
                  <span class="example-label">Nullable value:</span>
                  <code class="example-value">"hello"</code>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Type Assertions</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// as syntax (preferred)
const input = document.getElementById(&quot;input&quot;) as HTMLInputElement;
input.value = &quot;Hello&quot;;

// Angle bracket syntax (not in JSX/TSX)
const value = &lt;string&gt;someValue;

// Double assertion (use sparingly!)
const num = &quot;100&quot; as unknown as number;

// satisfies operator (TypeScript 4.9+)
const colors = {
  red: [255, 0, 0],
  green: &quot;#00FF00&quot;,
  blue: [0, 0, 255]
} satisfies Record&lt;string, string | [number, number, number]&gt;;

// colors.red is [number, number, number]
// colors.green is string`" />
              
              <v-divider class="my-4" />
              
              <div class="examples-section">
                <div class="examples-title mb-3">💡 Live Examples</div>
                <div class="example-item">
                  <span class="example-label">Config (as const):</span>
                  <code class="example-value">{{ examples.assertions.config }}</code>
                </div>
                <div class="example-item">
                  <span class="example-label">Colors (as const):</span>
                  <code class="example-value">{{ examples.assertions.colors }}</code>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <InfoSection 
            title="Key Takeaways"
            :items="[
              '<strong>Primitives:</strong> string, number, boolean, bigint, symbol',
              '<strong>Special Types:</strong> any, unknown, never, void',
              '<strong>Arrays & Tuples:</strong> Fixed or dynamic collections',
              '<strong>Enums:</strong> Named constants (numeric or string)',
              '<strong>Objects:</strong> Use interfaces or type aliases',
              '<strong>Functions:</strong> Always type parameters and return values',
              '<strong>Union Types:</strong> Value can be one of several types (A | B)',
              '<strong>Intersection Types:</strong> Combines multiple types (A & B)',
              '<strong>Literal Types:</strong> Exact values (e.g., &quot;pending&quot; | &quot;approved&quot;)',
              '<strong>Type Assertions:</strong> Use <code>as</code> and <code>satisfies</code> carefully',
              '<strong>null & undefined:</strong> Handle nullable values explicitly'
            ]"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.examples-section {
  padding: 16px;
  background: linear-gradient(135deg, rgba(66, 165, 245, 0.05), rgba(156, 39, 176, 0.05));
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.examples-title {
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.3px;
}

.example-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  flex-wrap: wrap;
  gap: 8px;
}

.example-item:last-child {
  border-bottom: none;
}

.example-label {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  min-width: 100px;
  font-size: 14px;
}

.example-value {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 4px 12px;
  border-radius: 6px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  color: #4fc3f7;
  border: 1px solid rgba(79, 195, 247, 0.2);
  font-weight: 500;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  display: inline-block;
}
</style>

