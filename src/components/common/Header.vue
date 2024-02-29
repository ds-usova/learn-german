<template>
  <b-navbar class="mb-1">
    <b-navbar-nav>
      <b-nav-item href="/dictionary">Dictionary</b-nav-item>
      <b-nav-item href="/categories">Categories</b-nav-item>
      <b-nav-item href="/practice">Word practice</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ms-auto mb-2 mb-lg-0">
      <b-button @click="toggleKeyboard" variant="link" class="nav-link">
        <font-awesome-icon :icon="['far', 'keyboard']" />
      </b-button>
      <b-navbar-nav>
        <b-nav-item href="/resource-management">Resource management</b-nav-item>
      </b-navbar-nav>
    </b-navbar-nav>
  </b-navbar>
</template>

<script setup lang="ts">
import {usePreferencesStore} from "../../store/preferencesStore";

const preferences = usePreferencesStore()

function toggleKeyboard() {
  preferences.toggleKeyboard()
}
</script>

<style scoped>

</style>