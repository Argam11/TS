<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue';
import InfoSection from '@/components/InfoSection.vue';
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">API Integration</h1>
          <p class="text-body-1 mb-8">
            Type-safe API clients, error handling, and response patterns.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>Type-Safe API Client</v-card-title>
            <v-card-text>
              <CodeBlock :code="`class ApiClient {
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = \`\${this.config.baseURL}\${endpoint}\`;
    const response = await fetch(url, {
      method: options.method || &quot;GET&quot;,
      headers: { &quot;Content-Type&quot;: &quot;application/json&quot;, ...options.headers },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new ApiError(response.status, \`Request failed\`);
    }

    return response.json() as Promise<T>;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: &quot;GET&quot; });
  }

  async post<T, D = any>(endpoint: string, data: D): Promise<T> {
    return this.request<T>(endpoint, { method: &quot;POST&quot;, body: data });
  }
}`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>Result Type Pattern</v-card-title>
            <v-card-text>
              <CodeBlock :code="`type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

async function fetchUser(id: string): Promise<Result<User>> {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

// Usage with exhaustive checking
const result = await fetchUser(&quot;123&quot;);
if (result.success) {
  console.log(result.data.username); // ✅ TypeScript knows data exists
} else {
  console.error(result.error.message); // ✅ TypeScript knows error exists
}`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <InfoSection 
            title="Key Benefits"
            :items="[
              '<strong>Generic methods</strong> - Type-safe requests and responses',
              '<strong>Custom error classes</strong> - Better error handling',
              '<strong>Result types</strong> - Explicit success/failure handling',
              '<strong>Full autocomplete</strong> - IDE knows all properties'
            ]"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
