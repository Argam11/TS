<script setup lang="ts">
import { examples } from '@/examples/mapped-types';
import CodeBlock from '@/components/CodeBlock.vue';
import InfoSection from '@/components/InfoSection.vue';
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">Mapped Types</h1>
          <p class="text-body-1 mb-8">
            Transform existing types into new types with key remapping and modifiers.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Basic Mapped Type</v-card-title>
            <v-card-text>
              <CodeBlock :code="`type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

interface Features {
  darkMode: () => void;
  newProfile: () => void;
}

type FeatureOptions = OptionsFlags<Features>;
// { darkMode: boolean; newProfile: boolean; }`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Remove Readonly Modifier</v-card-title>
            <v-card-text>
              <CodeBlock :code="`type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type ReadonlyPerson = {
  readonly name: string;
  readonly age: number;
};

type MutablePerson = CreateMutable<ReadonlyPerson>;
// { name: string; age: number; }`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Key Remapping with 'as'</v-card-title>
            <v-card-text>
              <CodeBlock :code="`type Getters<Type> = {
  [Property in keyof Type as 
    \`get\${Capitalize<string & Property>}\`]: () => Type[Property]
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number; }`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Filter Keys with never</v-card-title>
            <v-card-text>
              <CodeBlock :code="`type RemoveKindField<T> = {
  [K in keyof T as Exclude<K, &quot;kind&quot;>]: T[K]
};

interface Circle {
  kind: &quot;circle&quot;;
  radius: number;
}

type CircleWithoutKind = RemoveKindField<Circle>;
// { radius: number }`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <InfoSection 
            title="Key Concepts"
            :items="[
              '<strong>[K in keyof T]</strong> - Iterate over all keys',
              '<strong>-readonly</strong> - Remove readonly modifier',
              '<strong>-?</strong> - Remove optional modifier',
              '<strong>as</strong> - Remap keys to new names',
              '<strong>never</strong> - Filter out keys'
            ]"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
