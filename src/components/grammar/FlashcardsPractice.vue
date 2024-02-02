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
      <div class="d-flex justify-content-center gap-4">
        <b-button variant="outline-dark" pill>
          <font-awesome-icon :icon="['fas', 'arrow-left']"/>
        </b-button>

        <b-button variant="outline-dark" pill>
          <font-awesome-icon :icon="['fas', 'arrow-right']"/>
        </b-button>
      </div>
    </b-row>

    <template #footer>
      <div class="footer">
        Submit your answer
      </div>
    </template>
  </b-card>
</template>

<script setup lang="ts">
import {AnswerSubmitData, FlashcardsQuestion} from "./types/RoundData.js";

interface Props {
  question: FlashcardsQuestion
}

interface Emits {
  (e: 'submit', answerSubmitData: AnswerSubmitData)
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
</script>

<style scoped>
.footer {
  text-align: right;
  color: grey;
  font-size: 14px;
}
</style>