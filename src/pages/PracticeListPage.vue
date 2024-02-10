<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>
    <b-row cols="3">
      <b-col v-for="(practice, index) in practiceList" :key="index">
        <b-card class="mt-3">
          <b-card-title class="text">
            <router-link class="nav-link" :to="{ name: 'practice', params: { id: practice.id }}">
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

const practiceList = ref([])

onMounted(() => {
  practiceList.value = wordPracticeApi.getPracticeList()
})
</script>

<style scoped>

</style>