<script setup lang="ts">
import MaskItem from "@/components/MaskItem.vue"
import PhotoList from "@/components/PhotoList.vue"
import UploadPhoto from "@/components/UploadPhoto.vue"
import { Steps, type Photo, type RoomType } from "@/types"
import { ref } from "vue"

const photos = ref<Photo[]>([])
const selectedPhoto = ref<File | null>(null)
const step = ref(Steps.UploadPhoto)

const onFileUpload = (file: File) => {
  selectedPhoto.value = file
  step.value++
}

const onFormSubmit = (formData: { name: string; roomType: RoomType }) => {
  photos.value.push({ id: `${Math.random()}`, file: selectedPhoto.value!, ...formData })
  step.value = Steps.UploadPhoto
}

const onPhotoEdit = (editedPhoto: { id: string; name: string; roomType: RoomType }) => {
  photos.value = photos.value.map((photo) => {
    if (photo.id === editedPhoto.id) {
      return { ...photo, ...editedPhoto }
    } else {
      return photo
    }
  })
}

const onPhotoDelete = (photoId: string) => {
  photos.value = photos.value.filter((photo) => photo.id !== photoId)
}
</script>

<template>
  <div v-if="step === Steps.UploadPhoto" class="max-w-[620px] mx-auto py-9 px-4">
    <UploadPhoto @on-file-upload="onFileUpload">
      <PhotoList :photos="photos" @edit-photo="onPhotoEdit" @delete-photo="onPhotoDelete" />
    </UploadPhoto>
  </div>
  <MaskItem
    v-if="step === Steps.MaskItem"
    @on-form-submit="onFormSubmit"
    @previous-step="step--"
    :photo="selectedPhoto!"
  />
</template>
