<template>
  <b-card footer-tag="footer" align="">
    <b-row>
      <b-col cols="3">
        <div class="p-2 question-font">
          {{ question.text }}
        </div>
      </b-col>
      <b-col cols="9">
        <div class="p-3">
          <b-row class="d-flex align-items-center mb-2" v-for="(option, index) in allOptions">
            <b-col cols="2" style="text-align: right; color: grey">
              <span v-if="!isLast(allOptions, index)">{{ index + 1 }}</span>
              <span v-else>Enter</span>
            </b-col>
            <b-col cols="10">
              <b-button v-if="!isLast(allOptions, index) || pending"
                        @click="select(option)"
                        class="w-100"
                        style="text-align: left"
                        :disabled="!pending"
                        :variant="getButtonStyleFor(option)">
                {{ option }}
              </b-button>
              <b-button v-else
                        @click="submit"
                        class="w-100"
                        style="text-align: left"
                        variant="outline-dark">
                Continue
              </b-button>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>

    <template #footer>
      <practice-default-footer :state="state"/>
    </template>
  </b-card>
</template>

<script setup lang="ts">
import {isArrayIndex, isLast, last, shuffle} from "../../utils/arrayUtils";
import {computed, onMounted, ref} from "vue";
import {AnswerSubmitData, State} from "./types/RoundData";
import PracticeDefaultFooter from "./PracticeDefaultFooter.vue";
import {MultipleChoiceQuestion} from "../../model/Practice";

interface Props {
  question: MultipleChoiceQuestion
}

interface Emits {
  (e: 'submit', answerSubmitData: AnswerSubmitData)
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const allOptions = shuffle([...props.question.options])
allOptions.push('I do not know')

const selected = ref('')
const state = ref(State.PENDING)
const pending = computed(() => state.value === State.PENDING)

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardInput)
})

function select(option: string) {
  selected.value = option
  state.value = option == props.question.correctAnswer ? State.CORRECT : State.WRONG
}

function getButtonStyleFor(option: string): string {
  if (state.value !== State.PENDING && option == props.question.correctAnswer) {
    return 'outline-success'
  } else if (state.value === State.WRONG && option == selected.value) {
    return 'outline-danger'
  } else {
    return 'outline-dark'
  }
}

function handleKeyboardInput(event) {
  if (state.value === State.PENDING) {
    const selectedOption = findSelectedOption(event)
    if (selectedOption !== null) {
      select(selectedOption)
    }
  } else {
    if (event.key === 'Enter') {
      submit()
    }
  }
}

function submit() {
  emits('submit', {correct: state.value == State.CORRECT})
}

function findSelectedOption(event): string | null {
  const key = event.key
  if (key === 'Enter') {
    return last(allOptions)
  }

  const parsed = parseInt(key) - 1
  if (!isNaN(parsed) && isArrayIndex(allOptions, parsed) && !isLast(allOptions, parsed)) {
    return allOptions[parsed]
  }

  return null
}
</script>

<style scoped>
</style>