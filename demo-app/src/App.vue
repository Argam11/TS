<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(true);

interface MenuItem {
  title: string;
  icon: string;
  to: string;
}

const menuItems: MenuItem[] = [
  { title: 'Home', icon: 'mdi-home', to: '/' },
  { title: 'Basic Types', icon: 'mdi-alpha-t-box', to: '/basic-types' },
  { title: 'Generics', icon: 'mdi-code-brackets', to: '/generics' },
  { title: 'Utility Types', icon: 'mdi-toolbox', to: '/utility-types' },
  { title: 'Conditional Types', icon: 'mdi-help-circle', to: '/conditional-types' },
  { title: 'Mapped Types', icon: 'mdi-map', to: '/mapped-types' },
  { title: 'Type Guards', icon: 'mdi-shield-check', to: '/type-guards' },
  { title: 'Template Literals', icon: 'mdi-format-text', to: '/template-literals' },
  { title: 'API Integration', icon: 'mdi-api', to: '/api-integration' },
  { title: 'GraphQL Types', icon: 'mdi-graphql', to: '/graphql-types' },
  { title: 'REST API Types', icon: 'mdi-web', to: '/rest-api-types' },
  { title: 'Form Validation', icon: 'mdi-form-select', to: '/form-validation' },
  { title: 'State Management', icon: 'mdi-database', to: '/state-management' },
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
      <v-btn icon href="https://github.com" target="_blank">
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

