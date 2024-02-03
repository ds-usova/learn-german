<template>
  <div class="footer">
    <span v-if="state === State.CORRECT" style="color: green">
      Correct answer
    </span>
    <span v-else-if="state === State.WRONG" style="color: red">
          Wrong answer
    </span>
    <span v-else style="color: grey">
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
  font-size: 14px;
}
</style>