<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue';
import InfoSection from '@/components/InfoSection.vue';
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
let message = &quot;Hello&quot;;     // inferred as string
let count = 42;          // inferred as number
let price = 19.99;       // inferred as number
let isActive = true;     // inferred as boolean
let isValid = false;     // inferred as boolean`" />
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
let price: number = 19.99;
let isActive: boolean = true;
let isValid: boolean = false;`" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- When to Use Each -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 mb-4">When to Use Each Approach</h2>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>✅ Good Use of Inference</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// Clear and obvious types
let username = &quot;Alice&quot;;        // ✅ Obviously string
let age = 30;                 // ✅ Obviously number
let isLoggedIn = false;       // ✅ Obviously boolean

// Calculations preserve types
let total = 100;              // number
let discount = 0.15;          // number
let finalPrice = total * (1 - discount);  // ✅ number

// String operations
let firstName = &quot;John&quot;;
let lastName = &quot;Doe&quot;;
let fullName = firstName + &quot; &quot; + lastName;  // ✅ string`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>✅ Good Use of Explicit Types</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// When you want to be clear and intentional
let userId: string = &quot;user123&quot;;
let timeout: number = 5000;
let shouldRetry: boolean = true;

// When value might change later
let score: number;
score = 0;        // Starts at 0
score = 100;      // Updated later

// When you need a wider type
let id: string | number;
id = 123;         // Can be number
id = &quot;abc123&quot;;    // Or string`" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Common Scenarios -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 mb-4">Common Scenarios</h2>
        </v-col>

        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>Uninitialized Variables</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// ❌ Bad: No type, defaults to 'any'
let value;
value = &quot;hello&quot;;
value = 42;        // No error, but loses type safety

// ✅ Good: Explicit type
let value: string;
// value = 42;     // ❌ Error! Can't assign number to string
value = &quot;hello&quot;;   // ✅ OK`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>Type Widening</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// Inference: type is widened to general type
let status = &quot;pending&quot;;     // Type: string (wide)
// status = &quot;approved&quot;;     // ✅ OK
// status = &quot;rejected&quot;;     // ✅ OK
// status = &quot;anything&quot;;     // ✅ OK (maybe too permissive)

// Explicit: restrict to specific values
let status: &quot;pending&quot; | &quot;approved&quot; | &quot;rejected&quot;;
status = &quot;pending&quot;;        // ✅ OK
status = &quot;approved&quot;;       // ✅ OK
// status = &quot;anything&quot;;    // ❌ Error!`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>Nullable Values</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// Problem: Starting with null
let name = null;          // Type: null (too narrow)
// name = &quot;Alice&quot;;        // ❌ Error!

// Solution: Explicit union type
let name: string | null = null;
name = &quot;Alice&quot;;           // ✅ OK

// Or use undefined for uninitialized
let count: number | undefined;
if (someCondition) {
  count = 42;
}`" />
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
              '<strong>Use inference</strong> when the type is immediately clear from the value',
              '<strong>Use explicit types</strong> for uninitialized variables',
              '<strong>Be explicit</strong> when you need specific literal types or unions',
              '<strong>Trust inference</strong> for simple assignments with primitive values',
              '<strong>Explicit is better</strong> for variables that will be reassigned later',
              '<strong>Consider your team</strong> - sometimes explicit types aid readability even when inference works'
            ]"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

