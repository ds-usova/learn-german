<template>
  <b-form-input v-model="input"
                ref="inputComponent"
                @keyup.enter="emit('submit', input)"/>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import {ref} from "vue";

interface Props {
  value?: string
}

const props = withDefaults(defineProps<Props>(), {
  value: ''
})

const inputComponent = ref(null)
onClickOutside(inputComponent, () => emit('cancel'))

const input = ref(props.value)
const emit = defineEmits<{
  submit: [value: string]
  cancel: []
}>()
</script>

<style scoped>

</style>