<template>
  <template v-if="state !== State.COMPLETED">
    <b-row>
      <div class="d-flex justify-content-end counter mb-1">
        {{ currentCount }}/{{ roundCount }}
      </div>
    </b-row>

    <template v-if="roundData.practiceType === PracticeType.MULTIPLE_CHOICE">
      <div :key="currentCount">
        <multiple-choice :question="currentQuestion" @submit="updateResults"/>
      </div>
    </template>
    <template v-else-if="roundData.practiceType === PracticeType.FLASHCARDS">
      <div :key="currentCount">
        <flashcards-practice :question="currentQuestion" @submit="updateResults"/>
      </div>
    </template>
  </template>

  <template v-else>
    <completed-practice :result="result"/>
  </template>
</template>

<script setup lang="ts">
import {computed, ref} from "vue"
import MultipleChoice from "./MultipleChoicePractice.vue"
import FlashcardsPractice from "./FlashcardsPractice.vue"
import {RoundData, PracticeType, AnswerSubmitData, PracticeResult} from "./types/RoundData"
import CompletedPractice from "./CompletedPractice.vue"

enum State { PENDING, COMPLETED }

interface Props {
  roundData: RoundData
}

const props = defineProps<Props>()
const roundCount = props.roundData.questions.length

const currentCount = ref(1)
const currentQuestion = computed(() => props.roundData.questions[currentCount.value - 1])
const state = ref(State.PENDING)

const correctAnswerCount = ref(0)
const result = ref({})

function updateResults(answerSubmitData: AnswerSubmitData) {
  if (answerSubmitData.correct) {
    correctAnswerCount.value++
  }

  if (currentCount.value == roundCount) {
    state.value = State.COMPLETED
    result.value = new PracticeResult(correctAnswerCount.value, roundCount)
  } else {
    currentCount.value++
  }
}
</script>

<style scoped>
.counter {
  font-size: 19px;
  color: grey;
}
</style>