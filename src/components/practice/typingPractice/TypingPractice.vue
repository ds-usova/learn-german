<template>
  <b-card footer-tag="footer">
    <b-card-body class="p-3">
      <b-row>
        <div class="d-flex justify-content-center">
          <span class="question-font">{{ question.translation }}</span>
        </div>
      </b-row>

      <b-row class="gap-2 d-flex justify-content-center mt-4">
        <letter-card v-for="i in symbolCount"
                     :class="[isActive(i - 1) ? 'active' : '',
                              isSubmitted(i - 1) ? 'submitted' : 'default']"
                     :text="getCharByIndex(i - 1)"
                     :active="false"/>
      </b-row>

      <b-row class="gap-2 d-flex justify-content-center mt-4">
        <letter-card v-for="[symbol, count] in symbols"
                     @click="processInput"
                     :clickable="true"
                     class="readonly"
                     :text="symbol"
                     :count="count"/>
      </b-row>

      <b-row class="mt-4 align-items-center">
        <b-col cols="9">
          <div class="d-flex justify-content-end">
            <span style="color: grey">Enter</span>
          </div>
        </b-col>
        <b-col cols="3">
          <div class="d-flex justify-content-end">
            <template v-if="state === State.PENDING">
              <b-button @click="skip" variant="outline-dark" class="w-100">
                Skip
              </b-button>
            </template>

            <template v-else>
              <b-button @click="submitAnswer" variant="outline-dark" class="w-100">
                Continue
              </b-button>
            </template>
          </div>
        </b-col>
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
import LetterCard from "./LetterCard.vue";
import {shuffle} from "../../../utils/arrayUtils";

interface Props {
  question: TypingQuestion
}

interface Emits {
  (e: 'submit', answerSubmitData: AnswerSubmitData)
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const state = ref(State.PENDING)
const answer = props.question.answer.toLowerCase()
const symbolCount = answer.length
const symbols = ref(getSymbols(answer))

const activeIndex = ref(0)

function getSymbols(answer: string): Map<string, number> {
  const chars = Array.from(answer)

  shuffle(chars)
  const result = new Map<string, number>()
  chars.forEach((char) => {
    if (result.has(char)) {
      result.set(char, result.get(char)! + 1)
    } else {
      result.set(char, 1)
    }

  })
  return result

}

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardInput)

})

function handleKeyboardInput(event) {
  const key = event.key
  if (key === 'Enter') {
    state.value === State.PENDING ? skip() : submitAnswer()
  } else if (isNextLetter(key)) {
    processInput(key)
  }
}

function isNextLetter(key: string) {
  return key === answer[activeIndex.value]
}

function processInput(value: string) {
  if (!isNextLetter(value)) return

  activeIndex.value = activeIndex.value + 1
  const symbolCount = symbols.value.get(value)
  if (symbolCount === 1) {
    symbols.value.delete(value)
  } else {
    symbols.value.set(value, symbolCount - 1)
  }

  if (symbols.value.size == 0) {
    state.value = State.CORRECT
  }
}

function getCharByIndex(i: number): string {
  return isSubmitted(i) ? answer[i] : ''
}

function isActive(index: number): boolean {
  return index === activeIndex.value
}

function isSubmitted(index: number): boolean {
  return index < activeIndex.value
}

function skip() {
  state.value = State.SKIP
  activeIndex.value = answer.length
  symbols.value.clear()
}

function submitAnswer() {
  emits('submit', {correct: state.value == State.CORRECT})
}
</script>

<style scoped>
</style>