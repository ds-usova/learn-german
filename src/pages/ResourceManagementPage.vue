<template>
  <page>
    <b-row>
      <b-col cols="2">
        <b-list-group>
          <b-list-group-item v-for="(tab, index) in tabs"
                             button
                             @click="select(index)"
                             :active="currentTab === tab.type">
            {{ tab.text }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="10">
        <edit-categories v-if="currentTab === TabType.CATEGORY"/>
      </b-col>
    </b-row>
  </page>
</template>

<script setup lang="ts">
import Page from "./Page.vue";
import EditCategories from "../components/category/EditCategories.vue";
import {ref} from "vue";

enum TabType { CATEGORY, TEST}

class Tab {
  type: TabType
  text: string

  constructor(type: TabType, text: string) {
    this.type = type;
    this.text = text;
  }
}

const tabs = [new Tab(TabType.CATEGORY, 'Category'), new Tab(TabType.TEST, 'Test')]
const currentTab = ref(TabType.CATEGORY)

function select(tab: TabType) {
  currentTab.value = tab
}
</script>

<style scoped>
.list-group-item.active {
  background-color: #3E424B;
  border-color: #3E424B;
}
</style>