<script setup lang="ts">
import { ref } from 'vue';
import { z } from 'zod';

// Define Zod schema
const formSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  
  email: z.string()
    .email('Invalid email address'),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  
  age: z.number()
    .int('Age must be an integer')
    .min(18, 'Must be 18 or older')
    .max(120, 'Invalid age'),
  
  terms: z.boolean()
    .refine(val => val === true, 'You must accept the terms and conditions'),
});

// Infer TypeScript type from Zod schema
type FormData = z.infer<typeof formSchema>;

// Form state
const formData = ref<FormData>({
  username: '',
  email: '',
  password: '',
  age: 18,
  terms: false,
});

// Errors
const errors = ref<Partial<Record<keyof FormData, string>>>({});

// Loading state
const isSubmitting = ref(false);
const submitSuccess = ref(false);

// Validate the form
const validate = (): boolean => {
  try {
    formSchema.parse(formData.value);
    errors.value = {};
    return true;
  } catch (err) {
    if (err instanceof z.ZodError) {
      errors.value = {};
      err.errors.forEach(error => {
        if (error.path[0]) {
          errors.value[error.path[0] as keyof FormData] = error.message;
        }
      });
    }
    return false;
  }
};

// Clear error for a specific field
const clearError = (field: keyof FormData): void => {
  delete errors.value[field];
};

// Handle form submission
const handleSubmit = async (): Promise<void> => {
  if (!validate()) {
    return;
  }

  isSubmitting.value = true;
  submitSuccess.value = false;

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData.value);
    submitSuccess.value = true;
    
    // Reset form
    formData.value = {
      username: '',
      email: '',
      password: '',
      age: 18,
      terms: false,
    };
  } catch (error) {
    console.error('Submission error:', error);
  } finally {
    isSubmitting.value = false;
  }
};

// Reset form
const resetForm = (): void => {
  formData.value = {
    username: '',
    email: '',
    password: '',
    age: 18,
    terms: false,
  };
  errors.value = {};
  submitSuccess.value = false;
};
</script>

<template>
  <v-card>
    <v-card-title>Type-Safe Form with Zod & Vuetify</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="formData.username"
          label="Username"
          :error-messages="errors.username"
          @input="() => clearError('username')"
          outlined
          class="mb-2"
        />
        
        <v-text-field
          v-model="formData.email"
          label="Email"
          type="email"
          :error-messages="errors.email"
          @input="() => clearError('email')"
          outlined
          class="mb-2"
        />
        
        <v-text-field
          v-model="formData.password"
          label="Password"
          type="password"
          :error-messages="errors.password"
          @input="() => clearError('password')"
          outlined
          class="mb-2"
        />
        
        <v-text-field
          v-model.number="formData.age"
          label="Age"
          type="number"
          :error-messages="errors.age"
          @input="() => clearError('age')"
          outlined
          class="mb-2"
        />
        
        <v-checkbox
          v-model="formData.terms"
          label="I accept the terms and conditions"
          :error-messages="errors.terms"
          @update:model-value="() => clearError('terms')"
        />
        
        <v-alert
          v-if="submitSuccess"
          type="success"
          variant="tonal"
          class="mb-4"
        >
          Form submitted successfully!
        </v-alert>
        
        <div class="d-flex gap-2">
          <v-btn
            type="submit"
            color="primary"
            :loading="isSubmitting"
          >
            Submit
          </v-btn>
          
          <v-btn
            @click="resetForm"
            variant="outlined"
          >
            Reset
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>

