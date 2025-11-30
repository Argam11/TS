<script setup lang="ts">
import { examples } from '@/examples/conditional-types';
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
        <v-col cols="12">
          <v-card>
            <v-card-title>Examples</v-card-title>
            <v-card-text>
              <p>Conditional types, type inference, and advanced patterns.</p>
              <p>See <code>/demo-app/src/examples/conditional-types.ts</code> for complete code.</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

