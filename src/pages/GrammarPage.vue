<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>
    <b-row class="justify-content-center">
      <b-col cols="7">
        <practice-template :round-data="roundData"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import Header from "../components/common/Header.vue";
import PracticeTemplate from "../components/grammar/PracticeTemplate.vue";
import {PracticeType} from "../components/grammar/types/RoundData";

const multipleChoiceQuestions = [
  {text: 'Tisch', options: ['der', 'die', 'das'], correctAnswer: 'der'},
  {text: 'Tür', options: ['der', 'die', 'das'], correctAnswer: 'die'},
  {text: 'Buch', options: ['der', 'die', 'das'], correctAnswer: 'das'},
]

const roundData = {
  practiceType: PracticeType.MULTIPLE_CHOICE,
  questions: multipleChoiceQuestions
}
</script>

<style scoped>

</style>