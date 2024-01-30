<template>
  <b-card footer-tag="footer" align="">
    <b-row @keydown="handleKeyboardInput">
      <b-col cols="3">
        <div class="p-3">
          {{ question }}
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
              <b-button @click="select(option)"
                        class="w-100"
                        style="text-align: left"
                        :disabled="answerSubmitted"
                        :variant="getButtonStyleFor(option)">
                {{ option }}
              </b-button>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>

    <template #footer>
      <div class="footer">
        <span v-if="correctAnswerSubmitted" style="color: green">
          Correct answer
        </span>
        <span v-else-if="wrongAnswerSubmitted" style="color: red">
          Wrong answer
        </span>
        <span v-else>
          Submit your answer
        </span>
      </div>
    </template>
  </b-card>
</template>

<script setup lang="ts">
import {isArrayIndex, isLast, last, shuffle} from "../../utils/arrayUtils";
import {computed, onMounted, ref} from "vue";

interface Props {
  question: string
  options: Array<String>,
  correctAnswer: string
}

const props = defineProps<Props>()
const allOptions = shuffle([...props.options])
allOptions.push('I do not know')

const selected = ref('')
const correct = computed(() => selected.value == props.correctAnswer)
const answerSubmitted = ref(false)
const correctAnswerSubmitted = computed(() => answerSubmitted.value && correct.value)
const wrongAnswerSubmitted = computed(() => answerSubmitted.value && !correct.value)

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardInput)
})

function select(option: string) {
  selected.value = option
  answerSubmitted.value = true
}

function getButtonStyleFor(option: string): string {
  if (answerSubmitted.value && option == props.correctAnswer) {
    return 'outline-success'
  } else if (answerSubmitted.value && !correct.value && option == selected.value) {
    return 'outline-danger'
  } else {
    return 'outline-dark'
  }
}

function handleKeyboardInput(event) {
  if (answerSubmitted.value) return

  const key = event.key
  if (key === 'Enter') {
    select(last(allOptions))
  } else {
    const parsed = parseInt(key) - 1
    if (!isNaN(parsed) && isArrayIndex(allOptions, parsed) && !isLast(allOptions, parsed)) {
      select(allOptions[parsed])
    }
  }
}
</script>

<style scoped>
.footer {
  text-align: right;
  color: grey;
  font-size: 14px;
}
</style>