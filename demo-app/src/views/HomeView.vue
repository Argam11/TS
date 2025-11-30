<script setup lang="ts">
import { ref } from 'vue';

interface Feature {
  title: string;
  description: string;
  icon: string;
  route: string;
}

const features = ref<Feature[]>([
  {
    title: 'Basic Types',
    description: 'Primitives, arrays, tuples, enums, and special types',
    icon: 'mdi-alpha-t-box',
    route: '/basic-types',
  },
  {
    title: 'Generics',
    description: 'Reusable, type-safe code with generic types',
    icon: 'mdi-code-brackets',
    route: '/generics',
  },
  {
    title: 'Utility Types',
    description: 'Built-in type transformations (Partial, Pick, Omit, etc.)',
    icon: 'mdi-toolbox',
    route: '/utility-types',
  },
  {
    title: 'Conditional Types',
    description: 'Types that depend on conditions with infer keyword',
    icon: 'mdi-help-circle',
    route: '/conditional-types',
  },
  {
    title: 'Mapped Types',
    description: 'Transform existing types into new types',
    icon: 'mdi-map',
    route: '/mapped-types',
  },
  {
    title: 'Type Guards',
    description: 'Safely narrow types at runtime',
    icon: 'mdi-shield-check',
    route: '/type-guards',
  },
  {
    title: 'Template Literals',
    description: 'Type-level string manipulation',
    icon: 'mdi-format-text',
    route: '/template-literals',
  },
  {
    title: 'API Integration',
    description: 'Type-safe API clients and error handling',
    icon: 'mdi-api',
    route: '/api-integration',
  },
  {
    title: 'GraphQL Types',
    description: 'Generate TypeScript types from GraphQL schema',
    icon: 'mdi-graphql',
    route: '/graphql-types',
  },
  {
    title: 'REST API Types',
    description: 'Generate types from OpenAPI/Swagger specs',
    icon: 'mdi-web',
    route: '/rest-api-types',
  },
  {
    title: 'Form Validation',
    description: 'Type-safe forms with Zod and Vuetify',
    icon: 'mdi-form-select',
    route: '/form-validation',
  },
  {
    title: 'State Management',
    description: 'Type-safe stores with Pinia',
    icon: 'mdi-database',
    route: '/state-management',
  },
]);
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="text-center mb-8">
            <h1 class="text-h2 font-weight-bold mb-4">
              TypeScript & Vue 3 Demo
            </h1>
            <p class="text-h5 text-grey">
              Explore all TypeScript features with interactive examples
            </p>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          v-for="feature in features"
          :key="feature.route"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            :to="feature.route"
            hover
            class="h-100"
          >
            <v-card-text class="text-center">
              <v-icon
                :icon="feature.icon"
                size="64"
                color="primary"
                class="mb-4"
              />
              <h3 class="text-h5 mb-2">{{ feature.title }}</h3>
              <p class="text-body-2 text-grey">{{ feature.description }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-8">
        <v-col cols="12">
          <v-card color="primary" variant="tonal">
            <v-card-title>About This Demo</v-card-title>
            <v-card-text>
              <p class="mb-4">
                This demo application showcases all TypeScript features and their
                real-world applications with Vue 3. Each section includes:
              </p>
              <ul class="mb-4">
                <li>Comprehensive code examples</li>
                <li>Interactive demonstrations</li>
                <li>Best practices and patterns</li>
                <li>Real-world use cases</li>
              </ul>
              <p>
                All code is fully typed with TypeScript and follows modern best practices.
                Explore the navigation menu to dive into specific topics.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.h-100 {
  height: 100%;
}
</style>

