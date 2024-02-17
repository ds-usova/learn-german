<template>
  <b-row>
    <div class="d-flex align-items-center">
      <b-col cols="3">
        <label for="name" class="required">Name</label>
      </b-col>
      <b-col cols="9">
        <b-form-input type="text" id="name" v-model="name" :state="!v$.name.$invalid"/>
      </b-col>
    </div>

    <div class="d-flex align-items-center mt-3">
      <b-col cols="3">
        <label for="img">Image url</label>
      </b-col>
      <b-col cols="9">
        <b-form-input type="text" id="img" v-model="imageUrl" :state="!v$.imageUrl.$invalid"/>
      </b-col>
    </div>
  </b-row>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {required, url} from "@vuelidate/validators";
import {Category} from "../../model/Category";

const name = ref('')
const imageUrl = ref('')

const state = {name, imageUrl}
const rules = {
  name: {required},
  imageUrl: {url}
}

const v$ = useVuelidate(rules, state)

function clear() {
  name.value = ''
  imageUrl.value = ''
}

async function isValid() {
  return await v$.value.$validate()
}

function getCategory(): Category {
  return {
    id: 'undefined',
    name: name.value,
    pictureUrl: imageUrl.value,
    wordCount: 0
  }
}

defineExpose({clear, isValid, getCategory})
</script>

<style scoped>

</style>