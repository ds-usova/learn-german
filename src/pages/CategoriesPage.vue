<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>

    <b-row>
      <b-row cols="3">
        <b-col v-for="(category, index) in categories" :key="index">
          <category-card :category="category" class="h-100"/>
        </b-col>
      </b-row>
    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import Header from "../components/common/Header.vue";
import CategoryCard from "../components/category/CategoryCard.vue";
import categoryApi from "../api/CategoryApi";

const categories = categoryApi.getCategories()
</script>

<style scoped>

</style>