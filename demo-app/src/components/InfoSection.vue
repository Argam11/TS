<script setup lang="ts">
interface Props {
  title: string;
  items: string[];
}

defineProps<Props>();
</script>

<template>
  <v-card class="info-card" elevation="4">
    <v-card-title class="info-title">
      <v-icon class="mr-2" size="28">mdi-lightbulb-on</v-icon>
      {{ title }}
    </v-card-title>
    <v-card-text class="info-content">
      <div v-for="(item, index) in items" :key="index" class="info-item">
        <v-icon class="item-icon" size="20">mdi-check-circle</v-icon>
        <span class="item-text" v-html="item"></span>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.info-card {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.08), rgba(156, 39, 176, 0.08)) !important;
  border: 2px solid rgba(33, 150, 243, 0.3) !important;
  border-radius: 12px !important;
}

.info-title {
  font-size: 20px !important;
  font-weight: 600 !important;
  color: #42a5f5 !important;
  padding: 20px 24px 12px !important;
  display: flex;
  align-items: center;
}

.info-content {
  padding: 8px 24px 24px !important;
}

.info-item {
  display: flex;
  align-items: flex-start;
  padding: 10px 0;
  gap: 12px;
}

.item-icon {
  color: #66bb6a !important;
  flex-shrink: 0;
  margin-top: 2px;
}

.item-text {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.item-text :deep(strong) {
  color: #42a5f5;
  font-weight: 600;
}

.item-text :deep(code) {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  color: #4fc3f7;
}
</style>

