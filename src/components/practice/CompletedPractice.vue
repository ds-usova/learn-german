<template>
  <b-card>
    <b-row>
      <div class="d-flex justify-content-center mt-1">
        <h5 v-if="perfectScore">
          Perfect score! You nailed all {{ result.correctAnswerCount }} questions!
        </h5>
        <h5 v-else>
          Almost there!
        </h5>
      </div>
    </b-row>

    <b-row>
      <div class="d-flex justify-content-center">
        {{ result.correctAnswerCount }} learned, {{ inProgress }} in progress
      </div>
    </b-row>

    <b-row>
      <div class="d-flex justify-content-center mt-3">
        <div class="col-3">
          <b-button class="w-100" variant="outline-dark" @click="nextRound">Next round</b-button>
        </div>
      </div>
    </b-row>

    <b-row>
      <div class="d-flex justify-content-center mt-1">
        <div>
          <b-button class="w-100" variant="link" @click="toPractice">To the practice list</b-button>
        </div>
      </div>
    </b-row>
  </b-card>
</template>

<script setup lang="ts">
import {PracticeResult} from "./types/RoundData";
import {useRouter} from "vue-router";

interface Props {
  result: PracticeResult
}

const props = defineProps<Props>()
const perfectScore = props.result.correctAnswerCount == props.result.from
const inProgress = props.result.from - props.result.correctAnswerCount

const router = useRouter()

function toPractice() {
  router.push('/practice')
}

function nextRound() {
  location.reload()
}
</script>

<style scoped>

</style>