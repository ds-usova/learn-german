<template>
  <span v-if="!editMode" @dblclick="toEditMode" :style="value ? '' : 'color: grey; font-style: italic'">
    {{ value ? value : emptyPlaceholder }}
  </span>
  <span v-else>
    <b-form-input v-model="input"
                  ref="inputComponent"
                  :state="!v$.$invalid"
                  @keyup.enter="submit"/>
  </span>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {onClickOutside} from '@vueuse/core'
import {useVuelidate} from '@vuelidate/core'

interface Props {
  value?: string,
  rules?: object,
  emptyPlaceholder?: string
}

interface Emits {
  (e: 'submit', value: string)
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  rules: {},
  emptyPlaceholder: 'empty'
})
const emits = defineEmits<Emits>()

const editMode = ref(false)
const inputComponent = ref(props.value)
const input = ref(props.value)

const v$ = useVuelidate(props.rules, {input})
onClickOutside(inputComponent, () => cancel())

async function submit() {
  const valid = await v$.value.$validate()
  if (valid) {
    emits('submit', input.value)
    toReadMode()
  }
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