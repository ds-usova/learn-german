<template>
  <b-card footer-tag="footer">
    <b-card-body class="p-3">
      <b-row>
        <b-col cols="3"></b-col>
        <b-col cols="9">
          <div class="mb-1" style="font-weight: 500">
            {{ question.text }}
          </div>
        </b-col>
      </b-row>

      <b-row v-for="(input, index) in inputs">
        <input-practice-row v-model="input.value"
                            :label="input.label"
                            :correct="input.correct()"
                            :state="state"
                            :focus="index == 0"/>
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

                <b-button variant="outline-dark" class="w-25">
                  Skip
                </b-button>
              </template>

              <template v-else>
                <b-button variant="outline-dark" class="w-25">
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
  value: string

  constructor(label: string, answer: string, value: string) {
    this.label = label;
    this.answer = answer;
    this.value = value;
  }

  correct(): boolean {
    return this.answer === this.value
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

const inputs = props.question.questions.map((it) => new Input(it.question, it.answer, ''))
const state = ref(State.PENDING)

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardInput)
})

function checkInputs() {
  const allCorrect = inputs.reduce((result, current) => result && current.correct(), true)
  state.value = allCorrect ? State.CORRECT : State.WRONG
}

function handleKeyboardInput(event) {

}
</script>

<style scoped>
</style>