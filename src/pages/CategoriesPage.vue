<template>
  <page>
    <b-row>
      <b-row cols="3">
        <b-col class="mb-4" v-for="(category, index) in categories" :key="index">
          <new-category-card v-if="index === 0" :category="category" class="h-100" @created="onCreated"/>
          <category-card v-else :category="category" class="h-100"/>
        </b-col>
      </b-row>
    </b-row>
  </page>
</template>

<script setup lang="ts">
import CategoryCard from "../components/category/CategoryCard.vue";
import categoryApi from "../api/CategoryApi";
import {Category} from "../model/Category";
import NewCategoryCard from "../components/category/NewCategoryCard.vue";
import {ref} from "vue";
import Page from "./Page.vue";

const newCategory: Category = {
  id: 'undefined',
  name: 'New category',
  pictureUrl: 'https://cdn4.iconfinder.com/data/icons/basic-ui-elements-blod/1/10-1024.png',
  wordCount: 0
}
const categories = ref(categoryApi.getAllCategories())
categories.value.unshift(newCategory)

function onCreated(category: Category) {
  categories.value.push(category)
}
</script>

<style scoped>

</style>