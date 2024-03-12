import { ROOM_TYPES } from "@/common/constants"

export const enum Steps {
  UploadPhoto,
  MaskItem
}

export type DropdownOption = {
  id: number
  value: string
}

export type RoomType = (typeof ROOM_TYPES)[number]

export type Photo = {
  id: string // uuid
  name: string
  roomType: RoomType
  file: File
}
