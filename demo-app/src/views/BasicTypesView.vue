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

        <v-col cols="12">
          <InfoSection 
            title="Key Takeaways"
            :items="[
              '<strong>string, number, boolean</strong> - Basic primitives',
              '<strong>bigint, symbol</strong> - Advanced primitives',
              '<strong>any</strong> - Avoid in production! Use <code>unknown</code> instead',
              '<strong>unknown</strong> - Type-safe alternative to <code>any</code>',
              '<strong>never</strong> - Type for functions that never return',
              '<strong>void</strong> - Type for functions with no return value',
              '<strong>Arrays</strong> - Use <code>Type[]</code> or <code>Array&lt;Type&gt;</code>',
              '<strong>Tuples</strong> - Fixed-length arrays with specific types',
              '<strong>Enums</strong> - Named constants (numeric or string)'
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
}
</style>

