<template>
  <b-card footer-tag="footer">
    <b-card-body class="p-3">
      <b-row>
        <div class="d-flex justify-content-center">
          <span>{{question.translation}}</span>
        </div>
      </b-row>

      <b-row>
        <div class="mt-2 d-flex align-items-center gap-3">
          <b-col cols="3"></b-col>
          <b-col cols="8">
            <div class="d-flex justify-content-end">
              <template v-if="state === State.PENDING">
                <b-button @click="skip" variant="outline-dark" class="w-25">
                  Don't know :(
                </b-button>
              </template>

              <template v-else>
                <b-button @click="submitAnswer" variant="outline-dark" class="w-25">
                  Continue
                </b-button>
              </template>
            </div>
          </b-col>
          <b-col cols="1"></b-col>
        </div>
      </b-row>
    </b-card-body>

    <template #footer>
      <practice-default-footer :state="state"/>
    </template>
  </b-card>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {AnswerSubmitData, State} from "../types/RoundData";
import PracticeDefaultFooter from "../PracticeDefaultFooter.vue";
import {TypingQuestion} from "../../../model/Practice";

interface Props {
  question: TypingQuestion
}

interface Emits {
  (e: 'submit', answerSubmitData: AnswerSubmitData)
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardInput)
})

const state = ref(State.PENDING)

function handleKeyboardInput(event) {
  if (state.value === State.PENDING && event.key === 'Enter') {
    skip()
  }
}

function skip() {
  state.value = State.SKIP
}

function submitAnswer() {
  emits('submit', {correct: state.value == State.CORRECT})
}
</script>

<style scoped>
</style>