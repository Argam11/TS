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
              <pre class="code-block"><code>paths:
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
                $ref: '#/components/schemas/User'</code></pre>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Generated TypeScript Types</v-card-title>
            <v-card-text>
              <p class="mb-4">Run <code>npm run openapi:generate</code></p>
              <pre class="code-block"><code>export interface paths {
  "/users/{userId}": {
    get: {
      parameters: {
        path: { userId: string };
      };
      responses: {
        200: {
          content: {
            "application/json": User;
          };
        };
      };
    };
  };
}</code></pre>
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
</style>

