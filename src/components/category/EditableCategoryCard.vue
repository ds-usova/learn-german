<template>
  <b-card class="mb-3">
    <b-row class="mb-2">
      <div class="d-flex justify-content-end gap-3">
        <template v-if="readMode">
          <b-button variant="link" class="nav-link" @click="changeMode">
            <font-awesome-icon :icon="['far', 'pen-to-square']"/>
          </b-button>
        </template>

        <template v-if="!readMode">
          <b-button variant="link" class="nav-link" @click="updateCategory">
            <font-awesome-icon :icon="['fas', 'check']" />
          </b-button>

          <b-button variant="link" class="nav-link" @click="cancel">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </b-button>
        </template>

        <b-button variant="link" class="nav-link" @click="deleteCategory">
          <font-awesome-icon :icon="['fas', 'trash']" />
        </b-button>
      </div>
    </b-row>

    <b-row>
      <b-col cols="10">
        <b-card-body>
          <category-form ref="categoryForm" :category="category" :disabled="readMode"/>
        </b-card-body>
      </b-col>
      <b-col cols="2" class="align-items-center d-flex">
        <b-card-img class="w-75" :src="imageSrc"/>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup lang="ts">
import {Category} from "../../model/Category";
import CategoryForm from "./CategoryForm.vue";
import {ref} from "vue";
import categoryApi from "../../api/CategoryApi";

interface Props {
  category: Category
}

interface Emits {
  (e: 'delete', category: Category)
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const editableCategory = ref(props.category)
const readMode = ref(true)
const categoryForm = ref(null)
const imageSrc = ref(props.category.pictureUrl)

function changeMode() {
  readMode.value = !readMode.value
}

function updateCategory() {
  const category = categoryForm.value.getCategory()
  categoryApi.update(category)
  changeMode()
  imageSrc.value = category.pictureUrl
}

function cancel() {
  categoryForm.value.reset()
  changeMode()
}

function deleteCategory() {
  categoryApi.delete(editableCategory.value)
  emits('delete', editableCategory.value)
}
</script>

<style scoped>

</style>