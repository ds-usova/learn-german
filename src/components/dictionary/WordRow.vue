<template>
  <b-tr>
    <b-th class="col-6">
      <editable-span :value="wordValue" @submit="saveWord" :rules="wordRules" />
    </b-th>
    <b-td class="col-6">
      <editable-span :value="translationValue" @submit="saveTranslation"/>
    </b-td>
  </b-tr>
</template>

<script setup lang="ts">
import EditableSpan from "../common/EditableSpan.vue";
import {ref} from "vue";
import {required} from '@vuelidate/validators'

interface Props {
  word: string
  translation: string
}

const props = defineProps<Props>()
const wordValue = ref(props.word)
const translationValue = ref(props.translation)
const wordRules = {
  input: { required }
}

function saveWord(value: string) {
  console.log("word saved..." + value)
  wordValue.value = value
}

function saveTranslation(value: string) {
  console.log("translation saved..." + value)
  translationValue.value = value
}
</script>

<style scoped>

</style>