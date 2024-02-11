<template>
  <b-card @click="onClick" :class="clickable ? 'clickable' : ''" class="square text-center align-items-center justify-content-center d-flex position-relative">
    <div>
      {{ text }}
    </div>

    <b-badge v-if="count > 1" class="mini-text" text-indicator>
      {{ count }}
    </b-badge>
  </b-card>
</template>

<script setup lang="ts">
interface Props {
  text?: string,
  active?: boolean
  count?: number
  clickable?: boolean
}

interface Emits {
  (e: 'click', value: string)
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  text: '',
  count: 0,
  clickable: false
})
const emits = defineEmits<Emits>()

function onClick() {
  if (props.clickable) {
    emits('click', props.text)
  }
}
</script>

<style scoped>
div {
  color: #ffffff;
  font-weight: bold;
}

.square {
  width: 60px;
  height: 60px;
}

.default {
  background: #f5f2f2;
}

.active {
  border-color: #383F51;
}

.readonly, .badge {
  background: #383F51 !important;
}

.badge {
  border: 1px solid;
  border-radius: 10px;
}

.submitted {
  background: #048A81;
  color: white;
}
</style>