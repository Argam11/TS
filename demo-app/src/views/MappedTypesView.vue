<script setup lang="ts">
import { examples } from '@/examples/mapped-types';
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
        <v-col cols="12">
          <v-card>
            <v-card-title>Examples</v-card-title>
            <v-card-text>
              <p>Mapped types, key remapping, filtering, and advanced transformations.</p>
              <p>See <code>/demo-app/src/examples/mapped-types.ts</code> for complete code.</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

