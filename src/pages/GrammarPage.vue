<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>
    <b-row class="justify-content-center">
      <b-col cols="7">
        <practice-template :round-data="flashcardsData"/>
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

const flashcardsQuestions = [
  {text: 'der Tisch', correctAnswer: 'table'},
  {text: 'die Tür', correctAnswer: 'door'},
  {text: 'das Buch', correctAnswer: 'book'},
]

const multipleChoiceData = {
  practiceType: PracticeType.MULTIPLE_CHOICE,
  questions: multipleChoiceQuestions
}

const flashcardsData = {
  practiceType: PracticeType.FLASHCARDS,
  questions: flashcardsQuestions
}
</script>

<style scoped>

</style>