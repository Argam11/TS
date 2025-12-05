<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue';
import InfoSection from '@/components/InfoSection.vue';
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">Conditional Types</h1>
          <p class="text-body-1 mb-8">
            Types that depend on conditions with the infer keyword and distributive patterns.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Basic Conditional Type</v-card-title>
            <v-card-text>
              <CodeBlock :code="`type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Type Inference with infer</v-card-title>
            <v-card-text>
              <CodeBlock :code="`type ReturnType<T> = T extends (...args: any[]) => infer R 
  ? R 
  : never;

type Func = () => number;
type FuncReturn = ReturnType<Func>; // number`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Distributive Conditional Types</v-card-title>
            <v-card-text>
              <CodeBlock :code="`type ToArray<T> = T extends any ? T[] : never;

type StrArrOrNumArr = ToArray<string | number>;
// string[] | number[]`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Flatten Array Type</v-card-title>
            <v-card-text>
              <CodeBlock :code="`type Flatten<T> = T extends Array<infer U> ? U : T;

type Str = Flatten<string[]>;  // string
type Num = Flatten<number>;    // number`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <InfoSection 
            title="Key Concepts"
            :items="[
              '<strong>T extends U ? X : Y</strong> - Conditional type syntax',
              '<strong>infer</strong> - Extract types from within other types',
              '<strong>Distributive</strong> - Union types distribute over conditionals',
              'Used to build powerful type utilities and transformations'
            ]"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
