<template>
  <b-row>
    <b-input-group>
      <b-form-input ref="searchRef"
                    type="text"
                    placeholder="Search"
                    v-model="searchValue"
                    @keyup.enter="filter"
                    id="search"></b-form-input>
      <b-input-group-append v-if="searchMode">
        <b-button @click="addNewWord">Add</b-button>
      </b-input-group-append>
    </b-input-group>

    <b-form-text class="m-1" id="search">Use '{{ separator }}' to separate the word and the translation.</b-form-text>
  </b-row>

  <b-row class="p-2">
    <b-table-simple>
      <b-tbody>
        <word-row v-for="word in words"
                  :key="word.id"
                  :word="word"
                  @save-value="(value) => updateValue(word, value)"
                  @save-translation="(value) => updateTranslation(word, value)"
        />
      </b-tbody>
    </b-table-simple>
  </b-row>
</template>

<script setup lang="ts">
import {Word} from "../../model/Word";
import {computed, ref} from "vue";
import WordRow from "../dictionary/WordRow.vue";

interface Props {
  words: Array<Word>
}

interface Emits {
  (e: 'create', word: Word),
  (e: 'update', word: Word),
  (e: 'filter', value: string),
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const separator = '='

const searchRef = ref(null)
const searchValue = ref('')
const searchMode = computed(() => searchValue.value.trim().length > 0)

function updateValue(word: Word, value: string) {
  word.value = value
  emits('update', word)
}

function updateTranslation(word: Word, translation: string) {
  word.translation = translation
  emits('update', word)
}

function filter() {
  emits('filter', searchValue.value)
}

function addNewWord() {
  const wordTranslation = searchValue.value.split(separator)
  emits('create', {id: '', value: wordTranslation[0], translation: wordTranslation[1], example: '', categories: []})
  searchValue.value = ''
  searchRef.value.focus()
}
</script>

<style scoped>

</style>