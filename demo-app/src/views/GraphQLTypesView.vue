<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue';
import InfoSection from '@/components/InfoSection.vue';
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">GraphQL Type Generation</h1>
          <p class="text-body-1 mb-8">
            Automatically generate TypeScript types from GraphQL schema.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>GraphQL Schema</v-card-title>
            <v-card-text>
              <p class="mb-4">Example schema at <code>/schema.graphql</code></p>
              <CodeBlock language="graphql" :code="`type User {
  id: ID!
  username: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Generated TypeScript Types</v-card-title>
            <v-card-text>
              <p class="mb-4">Run <code>npm run generate:gql</code></p>
              <CodeBlock :code="`export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  posts: Array<Post>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  content: Scalars['String'];
  author: User;
};`" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="12">
          <InfoSection 
            title="Benefits of Type Generation"
            :items="[
              '<strong>Type Safety</strong> - Catch errors at compile time',
              '<strong>Auto-completion</strong> - IDE knows all available fields',
              '<strong>Refactoring</strong> - Changes to schema automatically update types',
              '<strong>Documentation</strong> - Types serve as inline documentation',
              '<strong>Query Validation</strong> - Ensure queries match schema'
            ]"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

