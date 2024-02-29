<template>
  <page>
    <word-list :words="words" @create="create" @update="update" :categories="categories" @filter="filter" @delete="deleteWord"/>
  </page>
</template>

<script setup lang="ts">
import WordList from "../components/common/WordList.vue";
import {ref} from "vue";
import wordApi from "../api/WordApi";
import {Word} from "../model/Word";
import categoryApi from "../api/CategoryApi";
import Page from "./Page.vue";

const words = ref(wordApi.getWordsBy(null))
const categories = ref(categoryApi.getUserCategories())

function create(word: Word) {
  word.category = undefined
  const newWord = wordApi.create(word)
  words.value.unshift(newWord)
}

function update(word: Word) {
  wordApi.update(word)
}

function filter(value: string) {
  words.value = wordApi.getWordsBy({word: value})
}

function deleteWord(word: Word) {
  wordApi.delete(word)
  const index = words.value.findIndex(it => it.id === word.id)
  if (index !== -1) {
    words.value.splice(index, 1)
  }
}
</script>

<style scoped>

</style>