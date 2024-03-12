<script setup lang="ts">
import type { DropdownOption } from "@/types"
import { ref } from "vue"
import IconClose from "./icons/IconClose.vue"
import BaseDropdown from "./BaseDropdown.vue"
import { ROOM_TYPES } from "@/common/constants"
import BaseInput from "./BaseInput.vue"
import { getImageURL } from "@/common/helpers"

const selectedOption = ref<DropdownOption>(ROOM_TYPES[0])
const name = ref("")

const props = defineProps<{ photo: File }>()
const emit = defineEmits(["onFormSubmit", "previousStep"])
</script>

<template>
  <div class="flex flex-col px-4 pt-8 mb-24 mx-auto space-y-6 max-w-2xl">
    <div class="space-y-0.5">
      <h1 class="text-2xl font-bold">Mask Items</h1>
      <p class="text-[#A8A8BA]">Select a object or brush on object you want to redesign</p>
    </div>
    <div class="relative overflow-hidden rounded-2xl">
      <img :src="getImageURL(props.photo)" class="mx-auto" />
      <button
        @click="emit('previousStep')"
        class="absolute p-1 right-2 top-2 bg-black bg-opacity-60 rounded-full"
      >
        <IconClose />
      </button>
    </div>
    <div class="flex flex-col md:flex-row gap-2">
      <BaseInput v-model="name" class="w-full" />
      <BaseDropdown
        :options="ROOM_TYPES"
        :value="selectedOption.value"
        :on-change="(option) => (selectedOption = option)"
      />
    </div>
    <button
      class="md:self-start border border-[#A3A3DE] text-[#A3A3DE] font-medium py-2 px-6 rounded-full"
    >
      Manual Masking
    </button>
    <div class="fixed left-0 bottom-0 w-full bg-[#222225] p-4 md:text-right">
      <div class="max-w-4xl mx-auto">
        <button
          @click="emit('onFormSubmit', { name, roomType: selectedOption })"
          class="bg-brand text-sm font-medium rounded-full py-2 px-6 w-full md:w-52"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>
