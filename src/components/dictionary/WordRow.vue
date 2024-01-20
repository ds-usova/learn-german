<template>
  <b-tr>
    <b-th class="col-6">{{ word }}</b-th>
    <b-td class="col-6">
      <span v-if="!editTranslation" @dblclick="changeTranslationMode">
        {{ translationInput }}
      </span>
      <span v-else>
        <b-form-input v-model="translationInput"
                      ref="translationInputComponent"
                      @keyup.enter="save"/>
      </span>
    </b-td>
  </b-tr>
</template>

<script setup lang="ts">
import {ref} from "vue";
import { onClickOutside } from '@vueuse/core'

interface Props {
  word: string
  translation: string
}

const props = defineProps<Props>()
const editWord = ref(false)

const translationInputComponent = ref(null)
const editTranslation = ref(false)
const translationInput = ref(props.translation)

onClickOutside(translationInputComponent, () => cancel())

function changeTranslationMode() {
  editTranslation.value = !editTranslation.value
}

function cancel() {
  translationInput.value = props.translation
  changeTranslationMode()
}

function save() {
  // todo: save
  changeTranslationMode()
}
</script>

<style scoped>

</style>