<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue';
import InfoSection from '@/components/InfoSection.vue';
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">Type Guards & Narrowing</h1>
          <p class="text-body-1 mb-8">
            Safely narrow types at runtime with typeof, instanceof, and user-defined type guards.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>typeof Type Guard</v-card-title>
            <v-card-text>
              <CodeBlock :code="`function padLeft(value: string, padding: string | number) {
  if (typeof padding === &quot;number&quot;) {
    return &quot; &quot;.repeat(padding) + value;
  }
  return padding + value;
}`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>instanceof Type Guard</v-card-title>
            <v-card-text>
              <CodeBlock :code="`class Dog { bark() {} }
class Cat { meow() {} }

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript knows it's Dog
  } else {
    animal.meow(); // TypeScript knows it's Cat
  }
}`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>User-Defined Type Guard</v-card-title>
            <v-card-text>
              <CodeBlock :code="`interface Fish { swim: () => void; }
interface Bird { fly: () => void; }

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

if (isFish(pet)) {
  pet.swim(); // ✅ TypeScript knows it's Fish
}`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Discriminated Unions</v-card-title>
            <v-card-text>
              <CodeBlock :code="`type Shape =
  | { kind: &quot;circle&quot;; radius: number }
  | { kind: &quot;square&quot;; sideLength: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case &quot;circle&quot;:
      return Math.PI * shape.radius ** 2;
    case &quot;square&quot;:
      return shape.sideLength ** 2;
  }
}`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <InfoSection 
            title="Type Guard Methods"
            :items="[
              '<strong>typeof</strong> - Check primitive types',
              '<strong>instanceof</strong> - Check class instances',
              '<strong>value is Type</strong> - User-defined type guards',
              '<strong>in operator</strong> - Check if property exists',
              '<strong>Discriminated unions</strong> - Common property for narrowing'
            ]"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
