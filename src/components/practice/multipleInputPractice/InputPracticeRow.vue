<template>
  <div class="mt-2 d-flex align-items-center gap-3">
    <b-col cols="3">
      <div class="mt-2">
        <span>{{ label }}</span>
      </div>
    </b-col>

    <b-col cols="8">
      <b-input-group>
        <b-form-input type="text" ref="inputRef" :disabled="disabled" v-model="input"/>
        <template #append v-if="showAppend">
          <div style="min-width: 25%" class="input-group-text d-flex justify-content-start">
            <span>{{ appendText }}</span>
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
import {defineModel, ref} from "vue";

interface Props {
  label: string
  appendText: string
  disabled: boolean
  showAppend: boolean
  state: State
}

const props = defineProps<Props>()

const input = defineModel()
const inputRef = ref(null)
const focusOn = () => inputRef.value.focus()

defineExpose({focusOn})
</script>

<style scoped>

</style>