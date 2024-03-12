<script setup lang="ts">
import { ROOM_TYPES } from "@/common/constants"
import IconCheck from "./icons/IconCheck.vue"
import type { Photo, RoomType } from "@/types"
import { ref } from "vue"
import PhotoListItem from "./PhotoListItem.vue"

const baseStyle = "flex gap-1 items-center border border-[#656570] px-5 py-1 rounded shrink-0"
const activeStyle = "bg-[#7878CD33] text-[#A3A3DE] bg-opacity-20"

const selectedCategory = ref<RoomType | null>(null)

defineProps<{ photos: Photo[] }>()
const emit = defineEmits(["editPhoto", "deletePhoto"])
</script>

<template>
  <div class="flex gap-2 items-center text-[#CBCBD6] overflow-auto">
    <button
      @click="selectedCategory = null"
      :class="`${baseStyle} ${!selectedCategory ? activeStyle : ''}`"
    >
      <IconCheck v-if="!selectedCategory" />
      All
    </button>
    <button
      v-for="roomType in ROOM_TYPES"
      :key="roomType.id"
      :class="`${baseStyle} ${roomType.id === selectedCategory?.id ? activeStyle : ''}`"
      @click="selectedCategory = roomType"
    >
      <IconCheck v-if="selectedCategory?.id === roomType.id" />
      {{ roomType.value }}
    </button>
  </div>
  <div class="flex flex-col gap-4">
    <template v-for="photo in photos" :key="photo.id">
      <PhotoListItem
        v-if="!selectedCategory || photo.roomType.id === selectedCategory?.id"
        :photo="photo"
        @edit-photo="(photo) => emit('editPhoto', photo)"
        @delete-photo="(photoId) => emit('deletePhoto', photoId)"
      />
    </template>
  </div>
</template>
