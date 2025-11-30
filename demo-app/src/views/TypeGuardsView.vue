<script setup lang="ts">
import { examples } from '@/examples/type-guards';
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
        <v-col cols="12">
          <v-card>
            <v-card-title>Examples</v-card-title>
            <v-card-text>
              <p>Type guards, discriminated unions, assertion functions, and control flow analysis.</p>
              <p>See <code>/demo-app/src/examples/type-guards.ts</code> for complete code.</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

