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

    <b-row cols="3" class="mt-3">
      <b-col v-for="(practice, index) in categoryBasedPracticeList" :key="index">
        <b-card class="mb-3">
          <b-card-title class="text">
            <router-link class="nav-link" :to="{ name: 'practice', params: { id: practice.id }}">
              {{ practice.name }}
            </router-link>
          </b-card-title>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <hr/>
      </b-col>
    </b-row>

    <b-row cols="3" class="mt-3">
      <b-col v-for="(practice, index) in generalPracticeList" :key="index">
        <b-card class="mb-3">
          <b-card-title class="text">
            <router-link class="nav-link" :to="{ name: 'practice', params: { id: practice.id }}">
              {{ practice.name }}
            </router-link>
          </b-card-title>
        </b-card>
      </b-col>
    </b-row>
    <b-row>

    </b-row>
  </b-container>
</template>
<script setup lang="ts">
import Header from "../components/common/Header.vue";
import wordPracticeApi from "../api/WordPracticeApi";
import {onMounted, ref, watch} from "vue";
import categoryApi from "../api/CategoryApi";
import {useCategoryStore} from "../store/categoryData";

const categoryStore = useCategoryStore()

const categoryBasedPracticeList = ref([])
const generalPracticeList = ref([])
const selectedCategory = ref(categoryStore.category)
const categories = ref([])

onMounted(() => {
  categoryBasedPracticeList.value = wordPracticeApi.getCategoryBasedPracticeList()
  generalPracticeList.value = wordPracticeApi.getGeneralPracticeList()
  categories.value = categoryApi.getCategories()
})

watch(selectedCategory, () => {
  categoryStore.category = selectedCategory.value
})
</script>


<style scoped>

</style>