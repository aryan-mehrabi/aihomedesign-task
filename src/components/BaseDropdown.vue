<script setup lang="ts">
import { ref } from "vue"
import { onClickOutside } from "@vueuse/core"
import type { DropdownOption } from "@/types"
import BaseModal from "./BaseModal.vue"

const isOpen = ref(false)
const target = ref(null)

interface Props {
  options: DropdownOption[]
  value: string
  onChange: (option: DropdownOption) => unknown
}

const props = defineProps<Props>()

onClickOutside(target, () => (isOpen.value = false))
</script>

<template>
  <button
    ref="target"
    @click="isOpen = !isOpen"
    class="relative w-full border border-[#868695] bg-transparent rounded-lg h-14"
  >
    <p class="absolute top-2 left-4 text-xs text-[#DCDCE3]">Category</p>
    <p class="pt-6 pb-2 px-4 text-left">{{ props.value }}</p>
    <ul
      v-show="isOpen"
      class="absolute hidden md:block z-10 w-full rounded-2xl top-[calc(100%+10px)] left-0 font-medium text-[#868695] border border-[#868695] bg-[#222225]"
    >
      <li
        v-for="option in props.options"
        :key="option.id"
        @click="props.onChange(option)"
        class="p-3"
      >
        {{ option.value }}
      </li>
    </ul>
    <BaseModal title="Category" v-show="isOpen" class="top-0 md:hidden">
      <ul class="text-left text-[#868695]">
        <li
          v-for="option in props.options"
          :key="option.id"
          @click="props.onChange(option)"
          class="p-3"
        >
          {{ option.value }}
        </li>
      </ul>
    </BaseModal>
  </button>
</template>
