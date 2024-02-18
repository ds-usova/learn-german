<template>
  <span v-if="!editMode && !to" class="sub-text grey" :class="value ? '' : 'italic'">
      {{ value ? messageMapper(value) : 'empty' }}
  </span>

  <router-link v-if="!editMode && to" @contextmenu.prevent="toEditMode" class="nav-link text" :to="to">
    <span class="sub-text grey" :class="value ? '' : 'italic'">
      {{ value ? messageMapper(value) : 'empty' }}
    </span>
  </router-link>

  <span v-else>
    <b-form-select v-model="selectedOption" class="sub-text" ref="inputComponent">
      <b-form-select-option v-if="!value" value="null">
        {{ defaultOptionText }}
      </b-form-select-option>

      <b-form-select-option v-for="(option) in options" :value="option">
        {{ messageMapper(option) }}
      </b-form-select-option>
    </b-form-select>
  </span>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {onClickOutside} from '@vueuse/core'

interface Props {
  value?: any,
  messageMapper: Function
  options: Array<any>
  to?: object
  defaultOptionText?: string
}

interface Emits {
  (e: 'submit', value: any)
}

const props = withDefaults(defineProps<Props>(), {
  value: null
})
const emits = defineEmits<Emits>()

const editMode = ref(false)
const inputComponent = ref(props.value)
const selectedOption = ref(props.value)

onClickOutside(inputComponent, () => submit())

async function submit() {
  if (!editMode.value) return

  if (selectedOption.value !== props.value) {
    emits('submit', selectedOption.value)
  }
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