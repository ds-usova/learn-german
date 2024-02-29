<template>
  <b-row>
    <div class="d-flex align-items-center">
      <b-col cols="3">
        <label for="name" :class="{required: !disabled}">Name</label>
      </b-col>
      <b-col cols="9">
        <b-form-input type="text" id="name" v-model="name" :disabled="disabled"
                      :state="disabled ? null : !v$.name.$invalid"/>
      </b-col>
    </div>

    <div class="d-flex align-items-center mt-3">
      <b-col cols="3">
        <label for="img">Image url</label>
      </b-col>
      <b-col cols="9">
        <b-form-input type="text" id="img" v-model="imageUrl" :disabled="disabled"
                      :state="disabled ? null : !v$.imageUrl.$invalid"/>
      </b-col>
    </div>
  </b-row>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {required, url} from "@vuelidate/validators";
import {Category} from "../../model/Category";

interface Props {
  category?: Category
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const name = ref(props.category ? props.category.name : '')
const imageUrl = ref(props.category ? props.category.pictureUrl : '')

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

function reset() {
  name.value = props.category.name
  imageUrl.value = props.category.pictureUrl
}

async function isValid() {
  return await v$.value.$validate()
}

function getCategory(): Category {
  return {
    id: props.category.id,
    name: name.value,
    pictureUrl: imageUrl.value,
    wordCount: 0
  }
}

defineExpose({clear, isValid, getCategory, reset})
</script>

<style scoped>

</style>