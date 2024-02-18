<template>
  <b-tr>
    <b-td class="col-5" style="font-weight: 500">
      <editable-input :value="wordValue" @submit="saveValue" :rules="wordRules"/>
    </b-td>
    <b-td class="col-5">
      <editable-input :value="translationValue" @submit="saveTranslation"/>
    </b-td>
    <b-td class="d-flex justify-content-end gap-3">
      <editable-select :value="category"
                       @submit="saveCategory"
                       :options="categories"
                       :default-option-text="'All'"
                       :messageMapper="(it) => it.name"
                       :to="word.category?.id ? { name: 'category', params: { id: word.category.id }} : {}"/>
      <b-link class="nav-link" target="_blank" :href="word.leoLink">
        <font-awesome-icon :icon="['fas', 'paw']"/>
      </b-link>
    </b-td>
  </b-tr>
</template>

<script setup lang="ts">
import EditableInput from "./EditableInput.vue";
import {ref} from "vue";
import {required} from '@vuelidate/validators'
import {Word} from "../../model/Word";
import EditableSelect from "./EditableSelect.vue";
import {Category} from "../../model/Category";

interface Props {
  word: Word
  categories: Array<Category>
}

interface Emits {
  (e: 'update', word: Word)
  (e: 'saveValue', value: string),
  (e: 'saveTranslation', translation: string),
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const wordValue = ref(props.word.value)
const translationValue = ref(props.word.translation)
const category = ref(props.word.category)

const wordRules = {
  input: {required}
}

function saveValue(value: string) {
  wordValue.value = value
  props.word.value = value
  emits('update', props.word)
}

function saveTranslation(value: string) {
  translationValue.value = value
  props.word.translation = value
  emits('update', props.word)
}

function saveCategory(value: Category) {
  category.value = value
  props.word.category = value
  emits('update', props.word)
}
</script>

<style scoped>

</style>