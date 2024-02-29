<template>
  <page>
    <b-row>
      <div class="mb-3 d-flex align-items-center justify-content-start">
        <b-col cols="1">
          <b-link @click="toCategories" style="color: grey">
            <font-awesome-icon :icon="['fas', 'arrow-left']"/>
          </b-link>
          <b-img thumbnail :src="category.pictureUrl" class="w-40 ml-13"></b-img>
        </b-col>

        <b-col cols="11">
          <span class="ml--2">{{ category.name }} ({{ count }})</span>
        </b-col>
      </div>
    </b-row>
    <word-list :words="words" @create="create" @update="update" :categories="categories" @filter="filter" @delete="deleteWord"/>
  </page>
</template>

<script setup lang="ts">
import wordApi from "../api/WordApi";
import {computed, ref} from "vue";
import {Word} from "../model/Word";
import WordList from "../components/common/WordList.vue"
import categoryApi from "../api/CategoryApi";
import {useRouter} from "vue-router";
import Page from "./Page.vue";

interface Props {
  id: string
}

const props = defineProps<Props>()
const router = useRouter()

const category = categoryApi.getCategoryById(props.id)
const words = ref(wordApi.getWordsBy({categoryId: props.id}))
const categories = categoryApi.getUserCategories()

const count = computed(() => words.value.length)

function create(word: Word) {
  word.category = category
  words.value.unshift(word)
  wordApi.create(word)
}

function update(word: Word) {
  wordApi.update(word)
  if (word.category?.id !== category?.id) {
    const index = words.value.indexOf(word)
    if (index !== -1) {
      words.value.splice(index, 1)
    }
  }
}

function filter(value: string) {
  words.value = wordApi.getWordsBy({word: value, categoryId: props.id})
}

function deleteWord(word: Word) {
  wordApi.delete(word)
  const index = words.value.findIndex(it => it.id === word.id)
  if (index !== -1) {
    words.value.splice(index, 1)
  }
}

function toCategories() {
  router.push('/categories')
}
</script>

<style scoped>

</style>