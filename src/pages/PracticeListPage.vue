<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>

    <b-row class="d-flex justify-content-end">
      <b-col cols="2">
        <b-form-select v-model="selectedCategory">
          <b-form-select-option :value="null">All</b-form-select-option>
          <b-form-select-option v-for="category in categories" :value="category" :disabled="category.wordCount < 1">
            {{ category.name }} ({{ category.wordCount }})
          </b-form-select-option>
        </b-form-select>
      </b-col>
    </b-row>

    <b-row cols="3">
      <b-col v-for="(practice, index) in practiceList" :key="index">
        <b-card class="mt-3">
          <b-card-title class="text">
            <router-link class="nav-link" @click="setCategory" :to="{ name: 'practice', params: { id: practice.id }}">
              {{ practice.name }}
            </router-link>
          </b-card-title>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import Header from "../components/common/Header.vue";
import wordPracticeApi from "../api/WordPracticeApi";
import {onMounted, ref} from "vue";
import categoryApi from "../api/CategoryApi";
import {useCategoryStore} from "../store/categoryData";

const categoryStore = useCategoryStore()

const practiceList = ref([])
const selectedCategory = ref(categoryStore.category)
const categories = ref([])

onMounted(() => {
  practiceList.value = wordPracticeApi.getPracticeList()
  categories.value = categoryApi.getCategories()
})

function setCategory() {
  categoryStore.category = selectedCategory.value
}
</script>

<style scoped>

</style>