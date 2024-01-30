<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>
    <b-row class="justify-content-center">
      <b-col cols="7">
        <multiple-choice :question="'Katter'" :options="['die', 'das', 'der']" :correct-answer="'die'"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import Header from "../components/common/Header.vue";
import MultipleChoice from "../components/grammar/MultipleChoice.vue";
</script>

<style scoped>

</style>