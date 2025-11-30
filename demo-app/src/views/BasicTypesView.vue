<script setup lang="ts">
import { examples } from '@/examples/basic-types';
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
              <pre class="code-block"><code>const stringExample: string = "Hello TypeScript";
const numberExample: number = 42;
const booleanExample: boolean = true;
const bigintExample: bigint = 9007199254740991n;
const symbolExample: symbol = Symbol("unique");</code></pre>
              
              <v-divider class="my-4" />
              
              <p><strong>Examples:</strong></p>
              <ul>
                <li>String: {{ examples.primitives.string }}</li>
                <li>Number: {{ examples.primitives.number }}</li>
                <li>Boolean: {{ examples.primitives.boolean }}</li>
                <li>BigInt: {{ examples.primitives.bigint.toString() }}</li>
                <li>Symbol: {{ examples.primitives.symbol.toString() }}</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Special Types</v-card-title>
            <v-card-text>
              <pre class="code-block"><code>// any - Escape hatch (avoid!)
let anyExample: any = "can be anything";

// unknown - Type-safe any
let unknownExample: unknown = "safer";

// never - Represents values that never occur
function throwError(msg: string): never {
  throw new Error(msg);
}

// void - Function returns nothing
function logMessage(msg: string): void {
  console.log(msg);
}</code></pre>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Arrays & Tuples</v-card-title>
            <v-card-text>
              <pre class="code-block"><code>// Arrays
const numbers: number[] = [1, 2, 3];
const strings: Array&lt;string&gt; = ["a", "b"];

// Tuples
const person: [string, number] = ["Alice", 30];
const rgb: [number, number, number] = [255, 128, 0];

// Named tuples
type Point = [x: number, y: number];
const point: Point = [10, 20];</code></pre>
              
              <v-divider class="my-4" />
              
              <p><strong>Examples:</strong></p>
              <ul>
                <li>Numbers: {{ examples.arrays.numbers }}</li>
                <li>Strings: {{ examples.arrays.strings }}</li>
                <li>Person: {{ examples.tuples.person }}</li>
                <li>Point: {{ examples.tuples.point }}</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Enums</v-card-title>
            <v-card-text>
              <pre class="code-block"><code>// Numeric enum
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

// String enum
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

// Const enum (inlined at compile time)
const enum HttpStatus {
  OK = 200,
  NotFound = 404,
  InternalServerError = 500
}</code></pre>
              
              <v-divider class="my-4" />
              
              <p><strong>Examples:</strong></p>
              <ul>
                <li>Direction: {{ examples.enums.direction }}</li>
                <li>Color: {{ examples.enums.color }}</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card color="info" variant="tonal">
            <v-card-title>Key Takeaways</v-card-title>
            <v-card-text>
              <ul>
                <li><strong>string, number, boolean</strong> - Basic primitives</li>
                <li><strong>bigint, symbol</strong> - Advanced primitives</li>
                <li><strong>any</strong> - Avoid in production! Use unknown instead</li>
                <li><strong>unknown</strong> - Type-safe alternative to any</li>
                <li><strong>never</strong> - Type for functions that never return</li>
                <li><strong>void</strong> - Type for functions with no return value</li>
                <li><strong>Arrays</strong> - Use Type[] or Array&lt;Type&gt;</li>
                <li><strong>Tuples</strong> - Fixed-length arrays with specific types</li>
                <li><strong>Enums</strong> - Named constants (numeric or string)</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.code-block {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 16px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.5;
}
</style>

