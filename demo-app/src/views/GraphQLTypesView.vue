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
              <pre class="code-block"><code>type User {
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
}</code></pre>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Generated TypeScript Types</v-card-title>
            <v-card-text>
              <p class="mb-4">Run <code>npm run graphql:codegen</code></p>
              <pre class="code-block"><code>export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  posts: Array&lt;Post&gt;;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  content: Scalars['String'];
  author: User;
};</code></pre>
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

