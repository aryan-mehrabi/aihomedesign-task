<script setup lang="ts">
import { useDropZone } from "@vueuse/core"
import { ref } from "vue"
import IconUpload from "./icons/IconUpload.vue"
import IconLoading from "./icons/IconLoading.vue"

const dropZoneRef = ref<HTMLDivElement>()
const inputRef = ref<HTMLInputElement>()
const isLoading = ref(false)

const emit = defineEmits(["onFileUpload"])

const uploadFile = async (file: File) => {
  isLoading.value = true
  await new Promise<void>((res) => setTimeout(() => res(), 2000))
  emit("onFileUpload", file)
}

const onDrop = (files: File[] | null) => {
  if (files?.length) {
    uploadFile(files[0])
  }
}

const onInputChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files?.length) {
    uploadFile(Array.from(input.files)[0])
  }
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ["image/png", "image/jpg", "image/jpeg"]
})
</script>

<template>
  <div class="flex items-center justify-center h-screen" v-if="isLoading">
    <div class="space-y-2">
      <IconLoading />
      <p class="text-[#A8A8BA]">Loading...</p>
    </div>
  </div>
  <div v-else class="space-y-6">
    <h1 class="text-2xl">Upload Photo</h1>
    <div
      ref="dropZoneRef"
      class="bg-brand bg-opacity-40 px-6 py-4 rounded-2xl flex flex-col items-center justify-center gap-6 min-h-[366px] sm:min-h-[490px]"
      :class="{ 'opacity-50': isOverDropZone }"
    >
      <h2 class="text-xl font-bold text-[#CECEEE] text-center">Drag or Select Your Photo</h2>
      <button
        @click="inputRef?.click()"
        class="bg-brand flex items-center justify-center gap-2 py-2 pr-6 pl-4 rounded-full"
      >
        <IconUpload />
        <p class="text-sm font-medium">Upload</p>
      </button>
      <input type="file" class="hidden" ref="inputRef" accept="image/*" @change="onInputChange" />
    </div>
    <slot></slot>
  </div>
</template>
