<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue';
import InfoSection from '@/components/InfoSection.vue';
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">Vue 3 with TypeScript</h1>
          <p class="text-body-1 mb-8">
            Leverage TypeScript's type system for type-safe Vue 3 components, props, emits, and composables.
          </p>
        </v-col>
      </v-row>

      <!-- Props Typing -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 mb-4">Props Type Safety</h2>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Runtime Props Declaration</v-card-title>
            <v-card-text>
              <CodeBlock :code="`<script setup lang=&quot;ts&quot;>
// Runtime declaration with type inference
const props = defineProps({
  title: String,
  count: {
    type: Number,
    required: true
  },
  items: Array as PropType<string[]>,
  user: Object as PropType<User>
});
</script>`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Type-Based Props Declaration</v-card-title>
            <v-card-text>
              <CodeBlock :code="`<script setup lang=&quot;ts&quot;>
interface Props {
  title?: string;
  count: number;
  items?: string[];
  user: User;
}

// Pure TypeScript - no runtime overhead
const props = defineProps<Props>();

// With defaults
const props = withDefaults(defineProps<Props>(), {
  title: 'Default Title',
  items: () => []
});
</script>`" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Emits Typing -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 mb-4">Type-Safe Emits</h2>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Runtime Emits</v-card-title>
            <v-card-text>
              <CodeBlock :code="`<script setup lang=&quot;ts&quot;>
const emit = defineEmits(['update', 'delete']);

// Usage
emit('update', payload);
emit('delete', id);
</script>`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Type-Based Emits</v-card-title>
            <v-card-text>
              <CodeBlock :code="`<script setup lang=&quot;ts&quot;>
// Typed emits with payload validation
const emit = defineEmits<{
  update: [value: string];
  delete: [id: number];
  submit: [data: FormData];
}>();

// TypeScript ensures correct usage
emit('update', 'new value'); // ✅
emit('delete', 123);          // ✅
// emit('update', 123);       // ❌ Type error!
</script>`" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Refs and Reactive -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 mb-4">Refs & Reactive Types</h2>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Typed Refs</v-card-title>
            <v-card-text>
              <CodeBlock :code="`import { ref, Ref } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
}

// Type inference
const count = ref(0);        // Ref<number>
const message = ref('hello'); // Ref<string>

// Explicit typing
const user = ref<User | null>(null);
const items = ref<string[]>([]);

// Type assertion for complex types
const data = ref<User>({
  id: 1,
  name: 'Alice',
  email: 'alice@example.com'
});`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Reactive Objects</v-card-title>
            <v-card-text>
              <CodeBlock :code="`import { reactive } from 'vue';

interface State {
  count: number;
  user: User | null;
  items: string[];
}

const state = reactive<State>({
  count: 0,
  user: null,
  items: []
});

// Type-safe access
state.count++;           // ✅
state.items.push('new'); // ✅
// state.invalid;        // ❌ Type error!`" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Computed -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 mb-4">Computed Properties</h2>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Type Inference</v-card-title>
            <v-card-text>
              <CodeBlock :code="`import { ref, computed } from 'vue';

const count = ref(0);

// Type automatically inferred as ComputedRef<number>
const doubled = computed(() => count.value * 2);

// Type inferred as ComputedRef<string>
const message = computed(() => 
  \`Count is \${count.value}\`
);`" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Explicit Typing</v-card-title>
            <v-card-text>
              <CodeBlock :code="`import { ref, computed, ComputedRef } from 'vue';

interface User {
  firstName: string;
  lastName: string;
}

const user = ref<User>({
  firstName: 'John',
  lastName: 'Doe'
});

// Explicit return type
const fullName: ComputedRef<string> = computed(
  () => \`\${user.value.firstName} \${user.value.lastName}\`
);`" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Template Refs -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 mb-4">Template Refs</h2>
        </v-col>

        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>Typed Template References</v-card-title>
            <v-card-text>
              <CodeBlock :code="`<script setup lang=&quot;ts&quot;>
import { ref, onMounted } from 'vue';

// DOM element refs
const inputRef = ref<HTMLInputElement | null>(null);
const divRef = ref<HTMLDivElement | null>(null);

// Component refs
import MyComponent from './MyComponent.vue';
const componentRef = ref<InstanceType<typeof MyComponent> | null>(null);

onMounted(() => {
  // Type-safe access to DOM properties
  inputRef.value?.focus();
  
  // Access component methods
  componentRef.value?.someMethod();
});
</script>

<template>
  <input ref=&quot;inputRef&quot; />
  <div ref=&quot;divRef&quot;>Content</div>
  <MyComponent ref=&quot;componentRef&quot; />
</template>`" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Composables -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 mb-4">Typed Composables</h2>
        </v-col>

        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>Custom Composable with TypeScript</v-card-title>
            <v-card-text>
              <CodeBlock :code="`import { ref, Ref } from 'vue';

interface UseCounterReturn {
  count: Ref<number>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export function useCounter(initialValue = 0): UseCounterReturn {
  const count = ref(initialValue);

  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    count.value--;
  };

  const reset = () => {
    count.value = initialValue;
  };

  return {
    count,
    increment,
    decrement,
    reset
  };
}

// Usage in component
const { count, increment, decrement } = useCounter(10);`" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Component Instance Type -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 mb-4">Component Instance Types</h2>
        </v-col>

        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>Typing Component Instances</v-card-title>
            <v-card-text>
              <CodeBlock :code="`// MyComponent.vue
<script setup lang=&quot;ts&quot;>
interface Props {
  message: string;
}

const props = defineProps<Props>();

const exposed = {
  reset: () => console.log('Reset'),
  getData: () => ({ value: 42 })
};

// Expose methods to parent
defineExpose(exposed);
</script>

// Parent.vue
<script setup lang=&quot;ts&quot;>
import { ref } from 'vue';
import MyComponent from './MyComponent.vue';

// Get component instance type
const myComponentRef = ref<InstanceType<typeof MyComponent>>();

const handleClick = () => {
  // Type-safe access to exposed methods
  myComponentRef.value?.reset();
  const data = myComponentRef.value?.getData();
};
</script>`" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Generic Components -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 mb-4">Generic Components</h2>
        </v-col>

        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>Type-Safe Generic Components</v-card-title>
            <v-card-text>
              <CodeBlock :code="`<script setup lang=&quot;ts&quot; generic=&quot;T&quot;>
// Generic List Component
defineProps<{
  items: T[];
  renderItem: (item: T) => string;
}>();
</script>

<template>
  <ul>
    <li v-for=&quot;(item, index) in items&quot; :key=&quot;index&quot;>
      {{ renderItem(item) }}
    </li>
  </ul>
</template>

<!-- Usage -->
<script setup lang=&quot;ts&quot;>
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
</script>

<template>
  <GenericList 
    :items=&quot;users&quot; 
    :render-item=&quot;(user) => user.name&quot;
  />
</template>`" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Info Section -->
      <v-row class="mt-4">
        <v-col cols="12">
          <InfoSection 
            title="Vue 3 + TypeScript Benefits"
            :items="[
              '<strong>Type-safe props</strong> - Catch prop type errors at compile time',
              '<strong>Typed emits</strong> - Ensure correct event payloads',
              '<strong>IDE support</strong> - Full autocomplete for refs, computed, and reactive',
              '<strong>Composables</strong> - Reusable logic with full type inference',
              '<strong>Template refs</strong> - Type-safe access to DOM elements and components',
              '<strong>Generic components</strong> - Create flexible, reusable components',
              '<strong>Better refactoring</strong> - Rename and restructure with confidence'
            ]"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

