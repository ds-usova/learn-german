<template>
  <b-card footer-tag="footer">
    <b-card-body class="p-3">
      <b-row>
        <b-col cols="3"></b-col>
        <b-col cols="9">
          <div class="mb-1" style="font-weight: 500; margin-left: 2%">
            {{ question.text }}
          </div>
        </b-col>
      </b-row>

      <b-row v-for="(input, index) in inputs">
        <input-practice-row :correctAnswer="input.answer"
                            :label="input.label"
                            ref="inputRefs"
                            @focus="focusedIndex = index"
        />
      </b-row>

      <b-row>
        <div class="mt-2 d-flex align-items-center gap-3">
          <b-col cols="3"></b-col>
          <b-col cols="8">
            <div class="d-flex justify-content-end">
              <template v-if="state === State.PENDING">
                <b-button @click="checkInputs" variant="outline-dark" class="w-25">
                  Submit
                </b-button>
              </template>

              <template v-else-if="state === State.WRONG">
                <b-button @click="checkInputs" variant="outline-dark" class="w-25" style="margin-right: 5px">
                  Submit
                </b-button>

                <b-button @click="skip" variant="outline-dark" class="w-25">
                  Skip
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
import {InputQuestion} from "../../../model/Practice";
import InputPracticeRow from "./InputPracticeRow.vue";

class Input {
  label: string
  answer: string

  constructor(label: string, answer: string) {
    this.label = label;
    this.answer = answer;
  }
}

interface Props {
  question: InputQuestion
}

interface Emits {
  (e: 'submit', answerSubmitData: AnswerSubmitData)
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const inputs = props.question.questions.map((it) => new Input(it.question, it.answer))
const inputRefs = ref([])
const state = ref(State.PENDING)
const focusedIndex = ref(0)

onMounted(() => {
  inputRefs.value[0].focusOn()
  focusedIndex.value = 0
  document.addEventListener('keydown', handleKeyboardInput)
})

function handleKeyboardInput(event) {
  const key = event.key
  if (key === 'Backspace' && focusedIndex.value > 0 && inputRefs.value[focusedIndex.value].empty()) {
    event.preventDefault()
    inputRefs.value[focusedIndex.value - 1].focusOn()
  }
}

function checkInputs() {
  const firstWrongIndex = inputRefs.value.findIndex((it) => !it.correct())

  state.value = firstWrongIndex == -1 ? State.CORRECT : State.WRONG
  if (state.value == State.WRONG) {
    inputRefs.value[firstWrongIndex].focusOn()
  }

  updateInputs()
}

function skip() {
  state.value = State.SKIP
  inputRefs.value.forEach((it) => it.skip())
}

function submitAnswer() {
  emits('submit', {correct: state.value == State.CORRECT})
}

function updateInputs() {
  inputRefs.value.forEach((it) => it.update())
}
</script>

<style scoped>
</style>