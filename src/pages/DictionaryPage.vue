<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>
    <b-row>
      <b-input-group>
        <b-form-input ref="search"
                      type="text"
                      placeholder="Search"
                      v-model="searchValue"
                      id="search"></b-form-input>
        <b-input-group-append v-if="searchMode">
          <b-button @click="addNewWord">Add</b-button>
        </b-input-group-append>
      </b-input-group>

      <BFormText id="search">Use '/' to separate the word and the translation.</BFormText>
    </b-row>

    <b-row>
      <b-table-simple>
        <b-tbody>
          <word-row v-for="row in filteredWords" :word="row.word" :translation="row.translation"/>
        </b-tbody>
      </b-table-simple>
    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import Header from "../components/common/Header.vue";
import {computed, ref} from "vue";
import WordRow from "../components/dictionary/WordRow.vue";

const search = ref(null)
const searchValue = ref('')
const searchMode = computed(() => searchValue.value.trim().length > 0)
const words = ref([])
const filteredWords = computed(() => words.value.filter(it => it.word.includes(searchValue.value)))

function addNewWord() {
  const wordTranslation = searchValue.value.split('/')
  words.value.push({word: wordTranslation[0], translation: wordTranslation[1]})
  searchValue.value = ''
  search.value.focus()
}
</script>

<style scoped>

</style>