<script setup lang="ts">
import { examples } from '@/examples/generics';
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
        <v-col cols="12">
          <v-card>
            <v-card-title>Examples</v-card-title>
            <v-card-text>
              <p>Generic functions, classes, constraints, and more examples are implemented.</p>
              <p>See <code>/demo-app/src/examples/generics.ts</code> for complete code.</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

