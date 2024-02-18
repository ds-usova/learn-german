<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>

    <word-list :words="words" @create="create" @update="update" :categories="categories" @filter="filter"/>
  </b-container>
</template>

<script setup lang="ts">
import Header from "../components/common/Header.vue";
import WordList from "../components/common/WordList.vue";
import {ref} from "vue";
import wordApi from "../api/WordApi";
import {Word} from "../model/Word";
import categoryApi from "../api/CategoryApi";

const words = ref(wordApi.getWordsBy(null))
const categories = ref(categoryApi.getCategories())

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
</script>

<style scoped>

</style>