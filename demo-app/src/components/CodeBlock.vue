<script setup lang="ts">
import { ref, onMounted, watch, toRefs } from 'vue';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-yaml';

interface Props {
  code: string;
  language?: string;
}

const props = withDefaults(defineProps<Props>(), {
  language: 'typescript'
});

const { language } = toRefs(props);
const highlightedCode = ref('');

const highlight = () => {
  const lang = language.value;
  const grammar = Prism.languages[lang] || Prism.languages.typescript;
  if (grammar) {
    highlightedCode.value = Prism.highlight(
      props.code,
      grammar,
      lang
    );
  }
};

onMounted(() => {
  highlight();
});

watch(() => props.code, () => {
  highlight();
});

watch(language, () => {
  highlight();
});
</script>

<template>
  <div class="code-block-wrapper">
    <pre class="code-block"><code :class="`language-${language}`" v-html="highlightedCode"></code></pre>
  </div>
</template>

<style scoped>
.code-block-wrapper {
  position: relative;
  margin: 0;
}

.code-block {
  background-color: #1e1e1e !important;
  padding: 16px !important;
  border-radius: 8px !important;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.code-block code {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  background: transparent !important;
  padding: 0 !important;
}

/* Scrollbar styling */
.code-block::-webkit-scrollbar {
  height: 8px;
}

.code-block::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.code-block::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.code-block::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>

