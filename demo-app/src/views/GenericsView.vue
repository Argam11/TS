<script setup lang="ts">
import { examples } from '@/examples/generics';
import CodeBlock from '@/components/CodeBlock.vue';
import InfoSection from '@/components/InfoSection.vue';
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">Generics in TypeScript</h1>
          <p class="text-body-1 mb-8">
            Reusable, type-safe code with generic types, constraints, and advanced patterns.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Basic Generic Function</v-card-title>
            <v-card-text>
              <CodeBlock :code="`function identity<T>(arg: T): T {
  return arg;
}

const num = identity(42);      // T is number
const str = identity(&quot;hello&quot;); // T is string`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Generic Interface</v-card-title>
            <v-card-text>
              <CodeBlock :code="`interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: &quot;hello&quot; };`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Generic Class</v-card-title>
            <v-card-text>
              <CodeBlock :code="`class Stack<T> {
  private items: T[] = [];
  
  push(item: T): void {
    this.items.push(item);
  }
  
  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Generic Constraints</v-card-title>
            <v-card-text>
              <CodeBlock :code="`interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength(&quot;hello&quot;);     // ✅ OK
logLength([1, 2, 3]);   // ✅ OK
// logLength(42);       // ❌ Error!`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>Using Type Parameters in Constraints</v-card-title>
            <v-card-text>
              <CodeBlock :code="`function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: &quot;Alice&quot;, age: 30 };
const name = getProperty(user, &quot;name&quot;); // string
const age = getProperty(user, &quot;age&quot;);   // number
// const invalid = getProperty(user, &quot;invalid&quot;); // ❌ Error!`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <InfoSection 
            title="Key Takeaways"
            :items="[
              '<strong>Generics</strong> make code reusable while maintaining type safety',
              '<strong>Constraints</strong> limit what types can be used (<code>extends</code> keyword)',
              '<strong>Type inference</strong> automatically determines generic types',
              '<strong>keyof</strong> ensures type-safe property access',
              'Works with functions, classes, interfaces, and type aliases'
            ]"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


