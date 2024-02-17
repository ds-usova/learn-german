<template>
  <b-card class="mt-3">
    <b-row>
      <b-col cols="9">
        <b-card-body>
          <b-card-title>
            <b-link class="nav-link text" @click="openModal">
              {{ category.name }}
            </b-link>
          </b-card-title>
        </b-card-body>
      </b-col>
      <b-col cols="3">
        <b-card-img :src="category.pictureUrl"/>
      </b-col>

      <b-modal ref="modal" id="new-category-modal" title="New category" @hide.prevent hide-header-close>
        <category-form ref="categoryForm"/>

        <template #footer>
          <b-button @click="cancel" variant="link" class="nav-link mr-2">
            Cancel
          </b-button>

          <b-button @click="addNewCategory" variant="dark">
            Save
          </b-button>
        </template>
      </b-modal>
    </b-row>
  </b-card>
</template>

<script setup lang="ts">
import {Category} from "../../model/Category";
import {ref} from "vue";
import CategoryForm from "./CategoryForm.vue";
import categoryApi from "../../api/CategoryApi";

interface Props {
  category: Category
}

interface Emits {
  (e: 'created', category: Category)
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const modal = ref(null)
const categoryForm = ref(null)

function openModal() {
  modal.value.show()
}

function cancel() {
  categoryForm.value.clear()
  modal.value.hide()
}

function addNewCategory() {
  if (categoryForm.value.isValid()) {
    const newCategory = categoryApi.create(categoryForm.value.getCategory())
    emits('created', newCategory)
    modal.value.hide()
  }
}
</script>

<style scoped>
</style>