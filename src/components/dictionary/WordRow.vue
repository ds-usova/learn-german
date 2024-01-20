<template>
  <b-tr>
    <b-th class="col-6">{{ word }}</b-th>
    <b-td class="col-6">
      <span v-if="!editTranslation" @dblclick="changeTranslationMode">
        {{ translationInput }}
      </span>
      <span v-else>
        <editable-input :value="translationInput"
                        @submit="saveTranslation"
                        @cancel="changeTranslationMode"/>
      </span>
    </b-td>
  </b-tr>
</template>

<script setup lang="ts">
import {ref} from "vue";
import EditableInput from "../common/EditableInput.vue";

interface Props {
  word: string
  translation: string
}

const props = defineProps<Props>()
const editWord = ref(false)

const editTranslation = ref(false)
const translationInput = ref(props.translation)

function changeTranslationMode() {
  editTranslation.value = !editTranslation.value
}

function cancel() {
  translationInput.value = props.translation
  changeTranslationMode()
}

function saveTranslation(value: string) {
  translationInput.value = value
  changeTranslationMode()
}
</script>

<style scoped>

</style>