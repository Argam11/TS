<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue';
import InfoSection from '@/components/InfoSection.vue';
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">Utility Types</h1>
          <p class="text-body-1 mb-8">
            Built-in type transformations: Partial, Pick, Omit, Record, and more.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Partial&lt;T&gt;</v-card-title>
            <v-card-text>
              <p class="mb-2">Makes all properties optional</p>
              <CodeBlock :code="`interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type PartialTodo = Partial<Todo>;
// { title?: string; description?: string; completed?: boolean; }

function updateTodo(todo: Todo, updates: PartialTodo): Todo {
  return { ...todo, ...updates };
}`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Required&lt;T&gt;</v-card-title>
            <v-card-text>
              <p class="mb-2">Makes all properties required</p>
              <CodeBlock :code="`interface PartialUser {
  username?: string;
  email?: string;
  age?: number;
}

type RequiredUser = Required<PartialUser>;
// { username: string; email: string; age: number; }`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Pick&lt;T, K&gt;</v-card-title>
            <v-card-text>
              <p class="mb-2">Select specific properties</p>
              <CodeBlock :code="`type TodoPreview = Pick<Todo, &quot;title&quot; | &quot;completed&quot;>;
// { title: string; completed: boolean; }

function showPreview(preview: TodoPreview) {
  console.log(\`\${preview.title}: \${preview.completed}\`);
}`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Omit&lt;T, K&gt;</v-card-title>
            <v-card-text>
              <p class="mb-2">Remove specific properties</p>
              <CodeBlock :code="`interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

type UserWithoutPassword = Omit<User, &quot;password&quot;>;
// { id: number; username: string; email: string; }`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Record&lt;K, T&gt;</v-card-title>
            <v-card-text>
              <p class="mb-2">Create object type with specific keys</p>
              <CodeBlock :code="`type PageInfo = Record<&quot;home&quot; | &quot;about&quot; | &quot;contact&quot;, 
  { title: string; url: string }>;

const pages: PageInfo = {
  home: { title: &quot;Home&quot;, url: &quot;/&quot; },
  about: { title: &quot;About&quot;, url: &quot;/about&quot; },
  contact: { title: &quot;Contact&quot;, url: &quot;/contact&quot; }
};`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>ReturnType&lt;T&gt;</v-card-title>
            <v-card-text>
              <p class="mb-2">Get function return type</p>
              <CodeBlock :code="`function getUser() {
  return { name: &quot;Alice&quot;, age: 30 };
}

type User = ReturnType<typeof getUser>;
// { name: string; age: number; }`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <InfoSection 
            title="All Utility Types"
            :items="[
              '<code>Partial&lt;T&gt;</code>, <code>Required&lt;T&gt;</code>, <code>Readonly&lt;T&gt;</code>',
              '<code>Pick&lt;T, K&gt;</code>, <code>Omit&lt;T, K&gt;</code>, <code>Record&lt;K, T&gt;</code>',
              '<code>Exclude&lt;T, U&gt;</code>, <code>Extract&lt;T, U&gt;</code>, <code>NonNullable&lt;T&gt;</code>',
              '<code>ReturnType&lt;T&gt;</code>, <code>Parameters&lt;T&gt;</code>, <code>ConstructorParameters&lt;T&gt;</code>',
              '<code>Awaited&lt;T&gt;</code>, <code>Uppercase&lt;T&gt;</code>, <code>Lowercase&lt;T&gt;</code>, <code>Capitalize&lt;T&gt;</code>'
            ]"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
