<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>

    <word-list :words="words" @create="create" @update="update" @filter="filter"/>
  </b-container>
</template>

<script setup lang="ts">
import Header from "../components/common/Header.vue";
import WordList from "../components/common/WordList.vue";
import {ref} from "vue";
import wordApi from "../api/WordApi";
import {Word} from "../model/Word";

const words = ref(wordApi.getWordsBy(null))

function create(word: Word) {
  word.categories = []
  words.value.push(word)
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