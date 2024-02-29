<template>
  <b-row v-for="category in categories">
    <editable-category-card :key="category.id" :category="category" @delete="deleteCategory"/>
  </b-row>
</template>

<script setup lang="ts">
import categoryApi from "../../api/CategoryApi";
import EditableCategoryCard from "./EditableCategoryCard.vue";
import {Category} from "../../model/Category";
import {ref} from "vue";

const categories = ref(categoryApi.getUserCategories())

function deleteCategory(category: Category) {
  const index = categories.value.findIndex(it => it.id === category.id)
  if (index !== -1) {
    categories.value.splice(index, 1)
  }
}
</script>

<style scoped>

</style>