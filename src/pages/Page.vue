<template>
  <b-container>
    <b-row>
      <Header/>
    </b-row>

    <slot/>
  </b-container>
</template>

<script setup lang="ts">
import Header from "../components/common/Header.vue";
</script>

<style scoped>

</style>