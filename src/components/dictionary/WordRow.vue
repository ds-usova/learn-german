<template>
  <b-tr>
    <b-td class="col-5" style="font-weight: 500">
      <editable-span :value="wordValue" @submit="saveValue" :rules="wordRules"/>
    </b-td>
    <b-td class="col-5">
      <editable-span :value="translationValue" @submit="saveTranslation"/>
    </b-td>
    <b-td class="d-flex justify-content-end">
      <b-link class="nav-link" target="_blank" :href="word.leoLink">
        <font-awesome-icon :icon="['fas', 'paw']"/>
      </b-link>
    </b-td>
  </b-tr>
</template>

<script setup lang="ts">
import EditableSpan from "../common/EditableSpan.vue";
import {ref} from "vue";
import {required} from '@vuelidate/validators'
import {Word} from "../../model/Word";

interface Props {
  word: Word
}

interface Emits {
  (e: 'saveValue', value: string),
  (e: 'saveTranslation', translation: string),
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const wordValue = ref(props.word.value)
const translationValue = ref(props.word.translation)
const wordRules = {
  input: {required}
}

function saveValue(value: string) {
  wordValue.value = value
  emits('saveValue', value)
}

function saveTranslation(value: string) {
  translationValue.value = value
  emits('saveTranslation', value)
}
</script>

<style scoped>

</style>