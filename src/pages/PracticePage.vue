<template>
  <page>
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
  </page>
</template>

<script setup lang="ts">
import PracticeTemplate from "../components/practice/PracticeTemplate.vue";
import {onMounted, ref} from "vue";
import wordPracticeApi from "../api/WordPracticeApi";
import {useCategoryStore} from "../store/categoryData";
import Page from "./Page.vue";

interface Props {
  id: string
}

const categoryStore = useCategoryStore()

const props = defineProps<Props>()
const loaded = ref(false)
const round = ref({})

onMounted(() => {
  round.value = wordPracticeApi.getPracticeRound(props.id, categoryStore.category)
  loaded.value = true
})
</script>

<style scoped>

</style>