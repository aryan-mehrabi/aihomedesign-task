<script setup lang="ts">
import { convertByteToKb, getImageURL } from "@/common/helpers"
import type { Photo } from "@/types"
import IconEdit from "./icons/IconEdit.vue"
import IconTrash from "./icons/IconTrash.vue"
import { ref } from "vue"
import BaseModal from "./BaseModal.vue"
import BaseInput from "./BaseInput.vue"
import BaseDropdown from "./BaseDropdown.vue"
import { ROOM_TYPES } from "@/common/constants"

const emit = defineEmits(["editPhoto", "deletePhoto"])
const props = defineProps<{ photo: Photo }>()

const isEditModal = ref(false)
const isDeleteModal = ref(false)
const selectedRoomType = ref(props.photo.roomType)
const name = ref(props.photo.name)

const onClickSave = () => {
  emit("editPhoto", { id: props.photo.id, name, roomType: selectedRoomType })
  isEditModal.value = false
}
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="rounded-lg overflow-hidden w-24 h-24">
      <img :src="getImageURL(photo.file)" alt="" class="w-full h-full object-cover" />
    </div>
    <div class="text-xs text-[#868695] self-start space-y-1">
      <h2 class="text-base font-bold text-white">{{ photo.name }}</h2>
      <p>
        Size: <span>{{ Math.floor(convertByteToKb(photo.file.size)) }}KB</span>
      </p>
      <p>Dimension: <span>1080 x 720</span></p>
      <p>Ratio: <span>16:9</span></p>
    </div>
    <div class="ml-auto flex gap-2">
      <button class="p-2 cursor-pointer">
        <IconEdit @click="isEditModal = true" />
      </button>
      <BaseModal title="Change Image Name" v-if="isEditModal" @close-modal="isEditModal = false">
        <div class="flex flex-col gap-2">
          <BaseInput v-model="name" />
          <BaseDropdown
            :value="selectedRoomType.value"
            :on-change="(roomType) => (selectedRoomType = roomType)"
            :options="ROOM_TYPES"
          />
        </div>
        <div class="flex flex-col md:flex-row gap-4">
          <button @click="onClickSave" class="bg-[#4D4DBD] grow rounded-full py-2 px-6">
            Save
          </button>
          <button @click="isEditModal = false" class="text-[#A3A3DE] grow rounded-full py-2 px-6">
            Cancel
          </button>
        </div>
      </BaseModal>
      <BaseModal title="Delete Photo?" v-if="isDeleteModal" @close-modal="isDeleteModal = false">
        <div class="flex flex-col md:flex-row gap-4">
          <button
            @click="emit('deletePhoto', props.photo.id)"
            class="bg-[#BD4D4D] grow rounded-full py-2 px-6"
          >
            Delete
          </button>
          <button @click="isDeleteModal = false" class="text-[#A3A3DE] grow rounded-full py-2 px-6">
            Cancel
          </button>
        </div>
      </BaseModal>
      <button @click="isDeleteModal = true" class="p-2">
        <IconTrash />
      </button>
    </div>
  </div>
</template>
