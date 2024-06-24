<template>
  <div class="container">
    <span class="cross" v-if="deletable" @click="remove()">x</span>
    <div @click="select()" class="box">
      <span v-if="index">{{ index }}</span>
      <img
        class="icon"
        :src="GetPokeiIconName(poke.id, poke.form)"
        alt="poke"
      />{{ poke.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pokemon } from "@/models/Pokemon";

const props = defineProps({
  poke: {
    type: Object as PropType<Pokemon>,
    required: true,
  },
  index: {
    type: Number,
    required: false,
  },
  deletable: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits();
const select = (): void => {
  emit("selected");
};
const remove = (): void => {
  emit("remove");
};
</script>

<style scoped scss>
.container {
  display: flex;
  align-items: center;
  margin: 5px 0;
  max-width: fit-content;
}

.box {
  font-size: 14px;
  cursor: pointer;
  background-color: #eee;
  border-radius: 12px;
  padding: 5px 10px;
  width: 160px;
}

.icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.cross {
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  color: grey;
  margin-right: 3px;
}
</style>
