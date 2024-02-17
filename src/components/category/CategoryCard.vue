<template>
  <b-card class="mt-3">
    <b-row>
      <b-col cols="9">
        <b-card-body>
          <b-card-title>
            <router-link class="nav-link text" :to="{ name: 'category', params: { id: category.id }}">
              {{ category.name }}
            </router-link>
          </b-card-title>

          <b-card-subtitle class="sub-text">
            {{ category.wordCount }} {{ category.wordCount === 1 ? 'word' : 'words' }}
          </b-card-subtitle>
        </b-card-body>
      </b-col>
      <b-col cols="3">
        <b-card-img :src="category.pictureUrl"/>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup lang="ts">
import {Category} from "../../model/Category";

interface Props {
  category: Category
}

const props = defineProps<Props>()
</script>

<style scoped>

</style>