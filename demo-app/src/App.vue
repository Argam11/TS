<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(true);

interface MenuItem {
  title: string;
  icon: string;
  to: string;
}

const menuItems: MenuItem[] = [
  // Entry
  { title: 'Home', icon: 'mdi-home', to: '/' },
  
  // Foundations
  { title: 'Basic Types', icon: 'mdi-alpha-t-box', to: '/basic-types' },
  { title: 'Type Inference', icon: 'mdi-lightbulb-on', to: '/type-inference' },
  
  // Core TypeScript Features
  { title: 'Generics', icon: 'mdi-code-brackets', to: '/generics' },
  { title: 'Utility Types', icon: 'mdi-toolbox', to: '/utility-types' },
  { title: 'Type Guards', icon: 'mdi-shield-check', to: '/type-guards' },
  
  // Advanced Type Manipulation
  { title: 'Conditional Types', icon: 'mdi-help-circle', to: '/conditional-types' },
  { title: 'Mapped Types', icon: 'mdi-map', to: '/mapped-types' },
  { title: 'Template Literals', icon: 'mdi-format-text', to: '/template-literals' },
  
  // Vue.js Integration
  { title: 'Vue + TypeScript', icon: 'mdi-vuejs', to: '/vue-typescript' },
  { title: 'Form Validation', icon: 'mdi-form-select', to: '/form-validation' },
  { title: 'State Management', icon: 'mdi-database', to: '/state-management' },
  
  // API Integration
  { title: 'API Integration', icon: 'mdi-api', to: '/api-integration' },
  { title: 'GraphQL Types', icon: 'mdi-graphql', to: '/graphql-types' },
  { title: 'REST API Types', icon: 'mdi-web', to: '/rest-api-types' },
];
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          prepend-icon="mdi-typescript"
          title="TypeScript Demo"
          subtitle="All Features"
        />
      </v-list>

      <v-divider />

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
          :value="item.to"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>TypeScript & Vue 3 Demo</v-toolbar-title>
      <v-spacer />
      <v-btn icon href="https://github.com/argam11/ts" target="_blank">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-main {
  padding-top: 64px;
}
</style>

