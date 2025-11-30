<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue';
import InfoSection from '@/components/InfoSection.vue';
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">REST API Type Generation</h1>
          <p class="text-body-1 mb-8">
            Generate TypeScript types from OpenAPI/Swagger specifications.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>OpenAPI Specification</v-card-title>
            <v-card-text>
              <p class="mb-4">Example at <code>/api-spec.yaml</code></p>
              <CodeBlock language="yaml" :code="`paths:
  /users/{userId}:
    get:
      parameters:
        - name: userId
          in: path
          schema:
            type: string
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Generated TypeScript Types</v-card-title>
            <v-card-text>
              <p class="mb-4">Run <code>npm run generate:rest</code></p>
              <CodeBlock :code="`export interface paths {
  &quot;/users/{userId}&quot;: {
    get: {
      parameters: {
        path: { userId: string };
      };
      responses: {
        200: {
          content: {
            &quot;application/json&quot;: User;
          };
        };
      };
    };
  };
}`" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="12">
          <InfoSection 
            title="OpenAPI Type Generation Benefits"
            :items="[
              '<strong>Type-safe API calls</strong> - Know all endpoints and their parameters',
              '<strong>Request/Response types</strong> - Full typing for all API operations',
              '<strong>Path validation</strong> - Catch typos in API paths',
              '<strong>Auto-generated clients</strong> - Create typed API clients automatically',
              '<strong>Contract testing</strong> - Ensure frontend matches backend spec'
            ]"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

