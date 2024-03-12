<script setup lang="ts">
import { onClickOutside } from "@vueuse/core"
import { ref } from "vue"
import IconClose from "./icons/IconClose.vue"

const target = ref()
const emit = defineEmits(["closeModal"])
defineProps<{ title: string }>()
onClickOutside(target, () => emit("closeModal"))
</script>

<template>
  <div
    ref="target"
    class="fixed text-center md:text-left min-w-80 bottom-0 md:top-1/2 md:bottom-auto left-1/2 -translate-x-1/2 md:-translate-y-1/2 p-6 space-y-4 rounded-md z-50 bg-[#222225]"
  >
    <div class="flex justify-center md:justify-between items-center gap-4">
      <h2 class="text-xl font-bold">{{ title }}</h2>
      <div class="hidden md:block" @click="emit('closeModal')">
        <IconClose />
      </div>
    </div>
    <slot></slot>
  </div>
</template>
