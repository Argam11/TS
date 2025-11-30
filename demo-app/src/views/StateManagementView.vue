<script setup lang="ts">
// State management with Pinia examples
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">State Management with Pinia</h1>
          <p class="text-body-1 mb-8">
            Type-safe state management using Pinia with Vue 3.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Pinia Store Examples</v-card-title>
            <v-card-text>
              <p>Comprehensive Pinia stores with full TypeScript support.</p>
              <p>See <code>/demo-app/src/real-world/state-management.ts</code> for:</p>
              <ul class="mt-2">
                <li>User authentication store (Composition API)</li>
                <li>Posts store (Options API)</li>
                <li>Shopping cart store</li>
                <li>Notifications store</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

