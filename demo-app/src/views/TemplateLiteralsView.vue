<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue';
import InfoSection from '@/components/InfoSection.vue';
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">Template Literal Types</h1>
          <p class="text-body-1 mb-8">
            Type-level string manipulation with template literals and intrinsic string types.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Basic Template Literal</v-card-title>
            <v-card-text>
              <CodeBlock :code="`type World = &quot;world&quot;;
type Greeting = \`hello \${World}\`;  // &quot;hello world&quot;

type EmailDomain = &quot;example.com&quot;;
type Email = \`user@\${EmailDomain}\`;  // &quot;user@example.com&quot;`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>String Unions</v-card-title>
            <v-card-text>
              <CodeBlock :code="`type Size = &quot;small&quot; | &quot;medium&quot; | &quot;large&quot;;
type Color = &quot;red&quot; | &quot;green&quot; | &quot;blue&quot;;

type Variant = \`\${Size}-\${Color}\`;
// &quot;small-red&quot; | &quot;small-green&quot; | &quot;small-blue&quot; | 
// &quot;medium-red&quot; | ...`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Intrinsic String Types</v-card-title>
            <v-card-text>
              <CodeBlock :code="`type Greeting = &quot;hello world&quot;;

type Loud = Uppercase<Greeting>;      // &quot;HELLO WORLD&quot;
type Quiet = Lowercase<Greeting>;     // &quot;hello world&quot;
type Cap = Capitalize<Greeting>;      // &quot;Hello world&quot;
type Uncap = Uncapitalize<Loud>;      // &quot;hELLO WORLD&quot;`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Event Handlers Pattern</v-card-title>
            <v-card-text>
              <CodeBlock :code="`type EventName = &quot;click&quot; | &quot;focus&quot; | &quot;blur&quot;;
type EventHandler = \`on\${Capitalize<EventName>}\`;
// &quot;onClick&quot; | &quot;onFocus&quot; | &quot;onBlur&quot;

type Action = &quot;create&quot; | &quot;read&quot; | &quot;update&quot;;
type Permission = \`\${Action}:user\`;
// &quot;create:user&quot; | &quot;read:user&quot; | &quot;update:user&quot;`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <InfoSection 
            title="Key Features"
            :items="[
              '<strong>Template syntax</strong> - Use backticks with <code>${}</code> for type interpolation',
              '<strong>Union expansion</strong> - Creates all combinations automatically',
              '<strong>Uppercase, Lowercase, Capitalize, Uncapitalize</strong> - Built-in transformations',
              'Perfect for creating type-safe event names, CSS classes, API routes'
            ]"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
