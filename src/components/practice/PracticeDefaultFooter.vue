<template>
  <div class="footer sub-text">
    <span v-if="state === State.CORRECT" class="correct">
      Correct answer
    </span>
    <span v-else-if="state === State.WRONG" class="wrong">
          Wrong answer
    </span>
    <span v-else class="default">
      Submit your answer
    </span>
  </div>
</template>

<script setup lang="ts">
import {State} from "./types/RoundData"

interface Props {
  state: State
}

const props = defineProps<Props>()
</script>

<style scoped>
.footer {
  text-align: right;
}
</style>