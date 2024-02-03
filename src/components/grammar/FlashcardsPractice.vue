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
        <b-button size="lg" variant="outline-dark" pill>
          <font-awesome-icon :icon="['fas', 'arrow-left']"/>
        </b-button>

        <b-button size="lg" variant="outline-dark" pill>
          <font-awesome-icon :icon="['fas', 'arrow-right']"/>
        </b-button>
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

interface Props {
  question: FlashcardsQuestion
}

interface Emits {
  (e: 'submit', answerSubmitData: AnswerSubmitData)
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const state = State.PENDING
</script>

<style scoped>
</style>