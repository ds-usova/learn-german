<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>

    <slot/>
  </b-container>

  <b-container fluid>
    <b-row v-if="showKeyboard">
      <footer class="footer mt-auto py-3">
        <div class="d-flex justify-content-center gap-3">
          <letter-card v-for="symbol in symbols"
                       @click="processInput"
                       :clickable="true"
                       :text="symbol"/>
        </div>
      </footer>
    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import Header from "../components/common/Header.vue";
import {usePreferencesStore} from "../store/preferencesStore";
import {computed} from "vue";
import LetterCard from "../components/practice/typingPractice/LetterCard.vue";
import {useKeyboardStore} from "../store/keyboardStore";

const preferences = usePreferencesStore()
const keyboard = useKeyboardStore()

const symbols = ["ä", "ö", "ü", "ß"]
const showKeyboard = computed(() => preferences.showKeyboard)

function processInput(symbol: string) {
  keyboard.updateSymbol(symbol)
}
</script>

<style scoped>
footer.footer {
  position: fixed;
  bottom: 0;
}
</style>