<template>
  <div class="mt-2 d-flex align-items-center gap-3">
    <b-col cols="3">
      <div class="mt-2">
        <span>{{ label }}</span>
      </div>
    </b-col>

    <b-col cols="8">
      <b-input-group>
        <b-form-input @focus="emits('focus')" type="text" ref="inputRef" :disabled="disabled" v-model="input"/>
        <template #append v-if="showAppend">
          <div style="min-width: 25%" class="input-group-text d-flex justify-content-start">
            <span>{{ correctAnswer }}</span>
          </div>
        </template>
      </b-input-group>
    </b-col>

    <b-col cols="1">
        <span>
           <font-awesome-icon v-if="state === State.PENDING" class="default" :icon="['fas', 'spinner']"/>
           <font-awesome-icon v-else-if="state === State.CORRECT" class="correct" :icon="['fas', 'check']"/>
           <font-awesome-icon v-else class="wrong" :icon="['fas', 'xmark']"/>
        </span>
    </b-col>
  </div>
</template>

<script setup lang="ts">
import {State} from "../types/RoundData";
import {computed, ref} from "vue";

interface Props {
  label: string
  correctAnswer: string
}

interface Emits {
  (e: 'focus')
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const input = ref('')
const inputRef = ref(null)

const state = ref(State.PENDING)
const disabled = computed(() => state.value === State.CORRECT || state.value === State.SKIP)
const showAppend = computed(() => state.value === State.SKIP)

const correct = () => {
  return input.value.trim() === props.correctAnswer
}
const focusOn = () => inputRef.value.focus()
const skip = () => state.value = State.SKIP
const update = () => state.value = correct() ? State.CORRECT : State.WRONG
const empty = () => input.value.length === 0

defineExpose({correct, focusOn, skip, update, empty})
</script>

<style scoped>

</style>