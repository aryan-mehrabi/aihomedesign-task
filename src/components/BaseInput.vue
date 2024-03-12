<script setup lang="ts">
const value = defineModel()
</script>

<template>
  <div class="relative">
    <label class="absolute top-2 left-4 text-xs text-[#DCDCE3]">Name</label>
    <input
      class="w-full border border-[#868695] bg-transparent rounded-lg pt-6 pb-2 px-4 h-14"
      type="text"
      v-model="value"
    />
  </div>
</template>
