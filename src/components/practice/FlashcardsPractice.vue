<template>
  <b-card footer-tag="footer" align="">
    <b-row>
      <div class="p-3 text-center">
        <span>
          {{ question.text }}
        </span>
      </div>
    </b-row>

    <b-row>
      <div class="text-center">
        <span v-if="state !== State.PENDING" :class="state === State.CORRECT ? 'correct' : 'wrong'">
            {{ question.correctAnswer }}
        </span>
      </div>
    </b-row>

    <b-row class="mt-4" v-if="state === State.PENDING">
      <b-col cols="3">
        <div class="d-flex justify-content-end">
          <b-button @click="submitWrong" variant="outline-dark" pill class="no-border">
            <font-awesome-icon :icon="['fas', 'arrow-left']"/>
          </b-button>
        </div>
      </b-col>

      <b-col cols="3">
        <div class="d-flex justify-content-end">
          <b-button @click="submitWrong" variant="outline-dark" class="w-100">
            Don't know
          </b-button>
        </div>
      </b-col>

      <b-col cols="3">
        <div class="d-flex justify-content-start">
          <b-button @click="submitCorrect" variant="outline-dark" class="w-100">
            Know
          </b-button>
        </div>
      </b-col>

      <b-col cols="3">
        <div class="d-flex justify-content-start">
          <b-button @click="submitCorrect" variant="outline-dark" pill class="no-border">
            <font-awesome-icon :icon="['fas', 'arrow-right']"/>
          </b-button>
        </div>
      </b-col>
    </b-row>

    <b-row class="mt-4" v-if="state === State.CORRECT">
      <b-col cols="3">
        <div class="d-flex justify-content-end">
          <b-button @click="toRevision" variant="outline-dark" pill class="no-border">
            <font-awesome-icon :icon="['fas', 'arrow-left']"/>
          </b-button>
        </div>
      </b-col>

      <b-col cols="3">
        <div class="d-flex justify-content-end">
          <b-button @click="toRevision" variant="outline-dark" class="w-100">
            To revision
          </b-button>
        </div>
      </b-col>

      <b-col cols="3">
        <div class="d-flex justify-content-start">
          <b-button @click="submit" variant="outline-dark" class="w-100">
            Continue
          </b-button>
        </div>
      </b-col>

      <b-col cols="3">
        <div class="d-flex justify-content-start">
          <b-button @click="submit" variant="outline-dark" pill class="no-border">
            <font-awesome-icon :icon="['fas', 'arrow-right']"/>
          </b-button>
        </div>
      </b-col>
    </b-row>

    <b-row class="mt-4" v-if="state === State.WRONG">
      <div class="d-flex align-items-center">
        <b-col cols="4"></b-col>
        <b-col cols="4">
          <div class="d-flex justify-content-center">
            <b-button @click="submit" variant="outline-dark" class="w-70">
              Continue
            </b-button>
          </div>
        </b-col>
        <b-col cols="4">
          <div class="margin--10">
            <span class="default sub-text">Enter</span>
          </div>
        </b-col>
      </div>
    </b-row>

    <template #footer>
      <practice-default-footer :state="state"/>
    </template>
  </b-card>
</template>

<script setup lang="ts">
import {AnswerSubmitData, FlashcardsQuestion, State} from "./types/RoundData.js";
import PracticeDefaultFooter from "./PracticeDefaultFooter.vue";
import {onMounted, ref} from "vue";

interface Props {
  question: FlashcardsQuestion
}

interface Emits {
  (e: 'submit', answerSubmitData: AnswerSubmitData),
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const state = ref(State.PENDING)

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardInput)
})

function submitCorrect() {
  state.value = State.CORRECT
}

function submitWrong() {
  state.value = State.WRONG
}

function toRevision() {
  emits('submit', {correct: false})
}

function submit() {
  emits('submit', {correct: state.value === State.CORRECT})
}

function handleKeyboardInput(event) {
  switch (state.value) {
    case State.PENDING:
      processKeyInput(event.keyCode, submitWrong, submitCorrect)
      break
    case State.CORRECT:
      processKeyInput(event.keyCode, toRevision, submit)
      break
    case State.WRONG:
      processEnter(event.key)
      break
  }
}

function processKeyInput(keyCode: string, leftCallback: () => void, rightCallback: () => void) {
  if (left(keyCode)) {
    leftCallback()
  } else if (right(keyCode)) {
    rightCallback()
  }
}

function processEnter(key: string) {
  if (key === 'Enter') {
    submit()
  }
}

function left(keyCode: string): boolean {
  return keyCode == '37'
}

function right(keyCode: string): boolean {
  return keyCode == '39'
}
</script>

<style scoped>
</style>