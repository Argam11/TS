<script setup lang="ts">
import { computed } from 'vue';
import CodeBlock from '@/components/CodeBlock.vue';
import InfoSection from '@/components/InfoSection.vue';

const pitfallsCode = computed(() => `// Problem: Too broad
let data = null;  // Inferred as 'null' (not useful)
data = { name: 'Alice' };  // ❌ Error!

// Solution: Explicit type
let data: { name: string } | null = null;
data = { name: 'Alice' };  // ✅ OK

// Problem: Any type
const result = JSON.parse('{"name":"Alice"}');
// result is 'any' - no type safety!

// Solution: Type assertion or explicit type
interface User { name: string; }
const result = JSON.parse('{"name":"Alice"}') as User;
// Now result is typed as User

// Problem: Empty array
const items = [];  // Inferred as any[]
items.push('text');  // No error
items.push(123);     // No error (not ideal!)

// Solution: Explicit type
const items: string[] = [];
items.push('text');  // ✅ OK
// items.push(123);  // ❌ Error!`);
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">Type Inference vs Type Annotations</h1>
          <p class="text-body-1 mb-8">
            Understanding when TypeScript automatically infers types (implicit) and when to explicitly specify them is fundamental to writing effective TypeScript code.
          </p>
        </v-col>
      </v-row>

      <!-- Type Inference vs Annotations Comparison -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Type Inference (Implicit)</v-card-title>
            <v-card-text>
              <p class="mb-3">TypeScript automatically determines the type:</p>
              <CodeBlock :code="`// TypeScript infers types automatically
let message = &quot;Hello&quot;;     // string
let count = 42;          // number
let isActive = true;     // boolean
let items = [1, 2, 3];   // number[]

// Works great for simple cases
const user = {
  name: &quot;Alice&quot;,        // string
  age: 30              // number
};`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Type Annotations (Explicit)</v-card-title>
            <v-card-text>
              <p class="mb-3">You explicitly specify the type:</p>
              <CodeBlock :code="`// Explicit type annotations
let message: string = &quot;Hello&quot;;
let count: number = 42;
let isActive: boolean = true;
let items: number[] = [1, 2, 3];

// Required for function parameters
function greet(name: string): string {
  return \`Hello, \${name}\`;
}

// Helpful for complex types
let user: { name: string; age: number };`" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Function Examples -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 mb-4">Function Type Annotations</h2>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Always Annotate Parameters</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// ❌ Bad: No type annotations
function add(a, b) {
  return a + b;  // a and b are 'any'
}

// ✅ Good: Explicit parameter types
function add(a: number, b: number): number {
  return a + b;
}

// Return type is inferred, but explicit is better
function multiply(a: number, b: number) {
  return a * b;  // inferred as number
}`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Arrow Function Annotations</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// Explicit types for clarity
const greet = (name: string): string => {
  return \`Hello, \${name}\`;
};

// Type inference works well here
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
// n is inferred as number
// doubled is inferred as number[]

// Callback types
const callback: (value: number) => void = 
  (value) => console.log(value);`" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Object and Array Examples -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 mb-4">Objects & Arrays</h2>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>When Inference Works Well</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// Simple object - inference is great
const point = { x: 10, y: 20 };
// Inferred as { x: number; y: number }

// Array with clear type
const names = ['Alice', 'Bob', 'Charlie'];
// Inferred as string[]

// Inference from function return
function getUser() {
  return { name: 'Alice', age: 30 };
}
const user = getUser();
// Inferred correctly`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>When to Be Explicit</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// Interface for reusability
interface Point {
  x: number;
  y: number;
}

const point: Point = { x: 10, y: 20 };

// Empty arrays need explicit types
const names: string[] = [];
const users: User[] = [];

// Optional properties
const config: {
  theme: string;
  debug?: boolean;
} = { theme: 'dark' };`" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Common Pitfalls -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 mb-4">Common Pitfalls</h2>
        </v-col>

        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>When Inference Goes Wrong</v-card-title>
            <v-card-text>
              <CodeBlock :code="pitfallsCode" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Best Practices -->
      <v-row>
        <v-col cols="12">
          <InfoSection 
            title="Best Practices"
            :items="[
              '<strong>Use inference</strong> for simple, obvious cases where the type is clear',
              '<strong>Always annotate</strong> function parameters and return values',
              '<strong>Be explicit</strong> when the inferred type might be too broad (e.g., <code>any</code> or <code>null</code>)',
              '<strong>Explicit is better</strong> for complex objects, interfaces, and public APIs',
              '<strong>Trust inference</strong> for variable assignments with clear initialization',
              '<strong>Empty arrays and objects</strong> usually need explicit types',
              '<strong>Use type assertions</strong> sparingly and only when you know better than TypeScript'
            ]"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

