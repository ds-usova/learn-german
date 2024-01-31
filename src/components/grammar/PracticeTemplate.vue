<template>
  <template v-if="state !== State.COMPLETED">
    <b-row>
      Question {{ currentCount }} / {{ roundCount }}
    </b-row>

    <template v-if="roundData.practiceType === PracticeType.MULTIPLE_CHOICE">
      <div :key="currentCount">
        <multiple-choice :question="currentQuestion" @submit="updateResults"/>
      </div>
    </template>
  </template>

  <template v-else>
    Completed: {{ correctAnswerCount }} / {{ roundCount }}
  </template>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import MultipleChoice from "./MultipleChoice.vue";
import {RoundData, PracticeType, AnswerSubmitData} from "./types/RoundData";

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
    } else {
      currentCount.value++
      state.value = State.PENDING
    }
  }
}
</script>

<style scoped>

</style>