<template>
  <b-row>
    <b-input-group>
      <b-form-input ref="searchRef"
                    type="text"
                    placeholder="Search"
                    v-model="searchValue"
                    @keyup="filter"
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
                  :categories="categories"
                  @update="update"
                  @delete="deleteWord"
        />
      </b-tbody>
    </b-table-simple>
  </b-row>
</template>

<script setup lang="ts">
import {Word} from "../../model/Word";
import {computed, ref, watch} from "vue";
import WordRow from "./WordRow.vue";
import {Category} from "../../model/Category";
import {useKeyboardStore} from "../../store/keyboardStore";

interface Props {
  words: Array<Word>
  categories: Array<Category>
}

interface Emits {
  (e: 'create', word: Word),
  (e: 'update', word: Word),
  (e: 'delete', word: Word),
  (e: 'filter', value: string),
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const keyboard = useKeyboardStore()
const keyboardSymbolVersion = computed(() => keyboard.version)

const separator = '='

const searchRef = ref(null)
const searchValue = ref('')
const searchMode = computed(() => searchValue.value.trim().length > 0)

function update(word: Word) {
  emits('update', word)
}

function filter(event) {
  const empty = event.key === 'Backspace' && searchValue.value.length === 0
  const filterValue = event.key === 'Enter' && searchValue.value
  if (empty || filterValue) {
    emits('filter', searchValue.value)
  }
}

function addNewWord() {
  const wordTranslation = searchValue.value.split(separator)
  emits('create', {id: '', value: wordTranslation[0], translation: wordTranslation[1], example: '', leoLink: ''})
  searchValue.value = ''
  searchRef.value.focus()
}

function deleteWord(word: Word) {
  emits('delete', word)
}

watch(keyboardSymbolVersion, () => {
  console.log(keyboard.symbol)
  searchValue.value = searchValue.value + keyboard.symbol
  searchRef.value.focus()
})
</script>

<style scoped>

</style>