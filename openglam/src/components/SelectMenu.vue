<script setup lang="ts">
type OptionsType = {
  name: string
  key: string
}

const props = defineProps<{
  placeholder?: string
  data: Array<Object>
  keyBy: string
  labelBy: string
}>()
</script>
<template>
  <select class="select select-bordered select-primary w-full max-w-xs">
    <option v-if="placeholder" disabled="disabled" selected="selected">
      {{ placeholder }}
    </option>
    <option v-for="item in data" :key="item[keyBy]" :value="item[keyBy]">
      {{ item[labelBy] }}
    </option>
  </select>
</template>
