<template>
  <span v-if="!editMode" @dblclick="changeEditMode">
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
  changeEditMode()
}

function cancel() {
  input.value = props.value
  changeEditMode()
}

function changeEditMode() {
  editMode.value = !editMode.value
}
</script>

<style scoped>

</style>