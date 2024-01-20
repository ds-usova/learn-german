<template>
  <span v-if="!editMode" @dblclick="toEditMode">
        {{ value }}
      </span>
  <span v-else>
    <b-form-input v-model="input"
                  ref="inputComponent"
                  @keyup.enter="submit"/>
  </span>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {onClickOutside} from '@vueuse/core'

interface Props {
  value?: string
}

interface Emits {
  (e: 'submit', value: string)
}

const props = withDefaults(defineProps<Props>(), {value: ''})
const emits = defineEmits<Emits>()

const editMode = ref(false)
const inputComponent = ref(props.value)
const input = ref(props.value)

onClickOutside(inputComponent, () => cancel())

function submit() {
  emits('submit', input.value)
  toReadMode()
}

function cancel() {
  input.value = props.value
  toReadMode()
}

function toReadMode() {
  editMode.value = false
}

function toEditMode() {
  editMode.value = true
}
</script>

<style scoped>

</style>