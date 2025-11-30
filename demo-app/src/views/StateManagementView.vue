<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue';
import InfoSection from '@/components/InfoSection.vue';
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
          <v-card class="mb-4">
            <v-card-title>Composition API Store</v-card-title>
            <v-card-text>
              <CodeBlock :code="`import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  
  // Getters (computed)
  const isAuthenticated = computed(() => user.value !== null);
  const fullName = computed(() => 
    user.value ? \`\${user.value.firstName} \${user.value.lastName}\` : ''
  );
  
  // Actions
  async function login(email: string, password: string): Promise<void> {
    isLoading.value = true;
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      user.value = await response.json();
    } finally {
      isLoading.value = false;
    }
  }
  
  return { user, isLoading, isAuthenticated, fullName, login };
});`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>Options API Store</v-card-title>
            <v-card-text>
              <CodeBlock :code="`export const usePostsStore = defineStore('posts', {
  state: (): PostsState => ({
    posts: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    publishedPosts(state): Post[] {
      return state.posts.filter(post => post.published);
    },

    getPostById: (state) => (id: number): Post | undefined => {
      return state.posts.find(post => post.id === id);
    },
  },

  actions: {
    async fetchPosts(): Promise<void> {
      this.isLoading = true;
      try {
        const response = await fetch('/api/posts');
        this.posts = await response.json();
      } finally {
        this.isLoading = false;
      }
    },
  },
});`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <InfoSection 
            title="Pinia with TypeScript"
            :items="[
              '<strong>Composition API</strong> - Uses <code>ref()</code> and <code>computed()</code> with full type inference',
              '<strong>Options API</strong> - Type-safe state, getters, and actions',
              '<strong>Full autocomplete</strong> - IDE knows all store properties',
              '<strong>Type safety</strong> - Catch errors at compile time'
            ]"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
