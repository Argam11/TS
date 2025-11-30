<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  initialCode?: string;
}

const props = withDefaults(defineProps<Props>(), {
  initialCode: '// Start coding here...\n',
});

const code = ref(props.initialCode);
const output = ref('');

const runCode = () => {
  try {
    // Note: In a real implementation, you'd use a sandboxed environment
    // or a service like TypeScript Playground API
    output.value = 'Code execution would happen here in a sandboxed environment';
  } catch (error) {
    output.value = `Error: ${error}`;
  }
};
</script>

<template>
  <div class="playground">
    <div class="editor-section">
      <h3>TypeScript Editor</h3>
      <textarea
        v-model="code"
        class="code-editor"
        spellcheck="false"
      />
      <button @click="runCode" class="run-button">
        Run Code
      </button>
    </div>
    
    <div class="output-section">
      <h3>Output</h3>
      <pre class="output">{{ output || 'No output yet' }}</pre>
    </div>
  </div>
</template>

<style scoped>
.playground {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 2rem 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.editor-section,
.output-section {
  padding: 1rem;
}

.editor-section {
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
}

.editor-section h3,
.output-section h3 {
  margin-top: 0;
}

.code-editor {
  width: 100%;
  height: 300px;
  padding: 1rem;
  font-family: 'Fira Code', 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #282c34;
  color: #abb2bf;
  resize: vertical;
}

.run-button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.run-button:hover {
  background-color: #45a049;
}

.output {
  padding: 1rem;
  background-color: #282c34;
  color: #abb2bf;
  border-radius: 4px;
  min-height: 300px;
  margin: 0;
  font-family: 'Fira Code', 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
}
</style>

