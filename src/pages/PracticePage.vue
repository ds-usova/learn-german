<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>

    <b-row class="justify-content-center" v-if="loaded">
      <b-col cols="7">
        <practice-template :round-data="round"/>
      </b-col>
    </b-row>

    <b-row v-else>
      <b-col class="col-12 d-flex justify-content-center">
        <b-spinner></b-spinner>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import Header from "../components/common/Header.vue";
import PracticeTemplate from "../components/practice/PracticeTemplate.vue";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import wordPracticeApi from "../api/WordPracticeApi";

const route = useRoute()
const id = String(route.params.id)
const round = ref({})
const loaded = ref(false)

onMounted(() => {
  round.value = wordPracticeApi.getPracticeRound(id)
  loaded.value = true
})
</script>

<style scoped>

</style>