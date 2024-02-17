<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>

    <b-row>

    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import Header from "../components/common/Header.vue";
import wordApi from "../api/WordApi";

interface Props {
  id: string
}

const props = defineProps<Props>()
const words = wordApi.getWordsByCategory(props.id)
</script>

<style scoped>

</style>