<script setup>
import { ref, computed } from "vue";
import TripDetail from "./TripDetail.vue";
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  max: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["addMytriplist"]);

const addMytriplist = (data) => {
  emit("addMytriplist", data);
};

const list = computed(() => props.list);
</script>
<template>
  <div class="container">
    <TripDetail
      v-for="info in list"
      :key="info.contentid"
      :info="info"
      :max="max"
      @addMytriplist="addMytriplist"
    />
  </div>
</template>
<style scoped>
.container {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
