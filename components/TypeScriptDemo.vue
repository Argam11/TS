<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  title: string;
  code: string;
  language?: string;
}

const props = withDefaults(defineProps<Props>(), {
  language: 'typescript',
});

const showCode = ref(true);
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h3>{{ title }}</h3>
      <button @click="showCode = !showCode">
        {{ showCode ? 'Hide' : 'Show' }} Code
      </button>
    </div>
    
    <div v-show="showCode" class="demo-code">
      <pre><code :class="`language-${language}`">{{ code }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.demo-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.demo-header button {
  padding: 0.5rem 1rem;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.demo-header button:hover {
  background-color: #1976D2;
}

.demo-code {
  padding: 1rem;
  background-color: #282c34;
  color: #abb2bf;
  overflow-x: auto;
}

.demo-code pre {
  margin: 0;
}

.demo-code code {
  font-family: 'Fira Code', 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}
</style>

