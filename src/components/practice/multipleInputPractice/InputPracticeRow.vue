<template>
    <div class="mt-2 d-flex align-items-center gap-3">
      <b-col cols="3">
        <div class="mt-2">
          <span>{{ label }}</span>
        </div>
      </b-col>

      <b-col cols="8">
        <b-form-input type="text" ref="inputRef" :disabled="correct" v-model="input"/>
      </b-col>

      <b-col cols="1">
        <span>
           <font-awesome-icon v-if="state === State.PENDING" class="default" :icon="['fas', 'spinner']"/>
           <font-awesome-icon v-else-if="correct" class="correct" :icon="['fas', 'check']"/>
           <font-awesome-icon v-else class="wrong" :icon="['fas', 'xmark']"/>
        </span>
      </b-col>
    </div>
</template>

<script setup lang="ts">
import {State} from "../types/RoundData";
import {defineModel, onMounted, onUpdated, ref} from "vue";

interface Props {
  label: string
  correct: boolean
  state: State
  focus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  focus: false
})

const input = defineModel()
const inputRef = ref(null)

onMounted(() => {
  focus()
})

onUpdated(() => {
  focus()
})

function focus() {
  if (props.focus) {
    inputRef.value.focus()
  }
}
</script>

<style scoped>

</style>