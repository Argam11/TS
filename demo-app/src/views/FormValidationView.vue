<script setup lang="ts">
import TypeSafeForm from '@/components/TypeSafeForm.vue';
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">Form Validation with Zod & Vuetify</h1>
          <p class="text-body-1 mb-8">
            Type-safe form validation using Zod schemas with Vuetify components.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="8">
          <TypeSafeForm />
        </v-col>

        <v-col cols="12" md="4">
          <v-card color="info" variant="tonal">
            <v-card-title>How It Works</v-card-title>
            <v-card-text>
              <p class="mb-4">
                This form uses <strong>Zod</strong> for schema validation, providing:
              </p>
              <ul class="mb-4">
                <li>Runtime type checking</li>
                <li>Compile-time type inference</li>
                <li>Automatic TypeScript types</li>
                <li>Custom validation rules</li>
              </ul>
              
              <p class="mb-2"><strong>Schema Definition:</strong></p>
              <pre class="code-small">const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().min(18),
  terms: z.boolean()
});

// Infer type!
type FormData = z.infer&lt;typeof schema&gt;;</pre>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="12">
          <v-card>
            <v-card-title>Schema Code</v-card-title>
            <v-card-text>
              <pre class="code-block"><code>import { z } from 'zod';

const formSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores'),
  
  email: z.string()
    .email('Invalid email address'),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[a-z]/, 'Must contain lowercase letter')
    .regex(/[0-9]/, 'Must contain number'),
  
  age: z.number()
    .int('Age must be an integer')
    .min(18, 'Must be 18 or older')
    .max(120, 'Invalid age'),
  
  terms: z.boolean()
    .refine(val => val === true, 'Must accept terms'),
});

// Automatically infer TypeScript type from schema!
type FormData = z.infer&lt;typeof formSchema&gt;;
// {
//   username: string;
//   email: string;
//   password: string;
//   age: number;
//   terms: boolean;
// }</code></pre>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.code-block {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 16px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.5;
}

.code-small {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.4;
}
</style>

