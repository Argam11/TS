import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/basic-types',
    name: 'BasicTypes',
    component: () => import('../views/BasicTypesView.vue'),
  },
  {
    path: '/type-inference',
    name: 'TypeInference',
    component: () => import('../views/TypeInferenceView.vue'),
  },
  {
    path: '/vue-typescript',
    name: 'VueTypeScript',
    component: () => import('../views/VueTypeScriptView.vue'),
  },
  {
    path: '/generics',
    name: 'Generics',
    component: () => import('../views/GenericsView.vue'),
  },
  {
    path: '/utility-types',
    name: 'UtilityTypes',
    component: () => import('../views/UtilityTypesView.vue'),
  },
  {
    path: '/conditional-types',
    name: 'ConditionalTypes',
    component: () => import('../views/ConditionalTypesView.vue'),
  },
  {
    path: '/mapped-types',
    name: 'MappedTypes',
    component: () => import('../views/MappedTypesView.vue'),
  },
  {
    path: '/type-guards',
    name: 'TypeGuards',
    component: () => import('../views/TypeGuardsView.vue'),
  },
  {
    path: '/template-literals',
    name: 'TemplateLiterals',
    component: () => import('../views/TemplateLiteralsView.vue'),
  },
  {
    path: '/api-integration',
    name: 'ApiIntegration',
    component: () => import('../views/ApiIntegrationView.vue'),
  },
  {
    path: '/graphql-types',
    name: 'GraphQLTypes',
    component: () => import('../views/GraphQLTypesView.vue'),
  },
  {
    path: '/rest-api-types',
    name: 'RestApiTypes',
    component: () => import('../views/RestApiTypesView.vue'),
  },
  {
    path: '/form-validation',
    name: 'FormValidation',
    component: () => import('../views/FormValidationView.vue'),
  },
  {
    path: '/state-management',
    name: 'StateManagement',
    component: () => import('../views/StateManagementView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

