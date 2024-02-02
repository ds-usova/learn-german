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
import {computed, onMounted, ref} from "vue"
import MultipleChoice from "./MultipleChoicePractice.vue"
import FlashcardsPractice from "./FlashcardsPractice.vue"
import {RoundData, PracticeType, AnswerSubmitData, PracticeResult} from "./types/RoundData"
import CompletedPractice from "./CompletedPractice.vue"

enum State { PENDING, ANSWER_SUBMITTED, COMPLETED }

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

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardInput)
})

function updateResults(answerSubmitData: AnswerSubmitData) {
  if (answerSubmitData.correct) {
    correctAnswerCount.value++
  }

  state.value = State.ANSWER_SUBMITTED
}

function handleKeyboardInput(event) {
  const key = event.key

  if (state.value == State.ANSWER_SUBMITTED && key === 'Enter') {
    if (currentCount.value == roundCount) {
      state.value = State.COMPLETED
      result.value = new PracticeResult(correctAnswerCount.value, roundCount)
    } else {
      currentCount.value++
      state.value = State.PENDING
    }
  }
}
</script>

<style scoped>
.counter {
  font-size: 19px;
  color: grey;
}
</style>