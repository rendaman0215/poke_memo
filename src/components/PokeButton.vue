<template>
  <div class="container">
    <span class="cross" v-if="deletable" @click="remove()">x</span>
    <div @click="select()" class="box">
      <span v-if="ranked" class="rank">{{ poke.rank }}</span>
      <img
        class="icon"
        :src="GetPokeiIconName(poke.id, poke.form)"
        alt="poke"
      />
      <span class="name">{{ poke.name }}</span>
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
  ranked: {
    type: Boolean,
    required: false,
    default: false,
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
  font-size: 13px;
  color: #222;
  cursor: pointer;
  background-color: #eee;
  border-radius: 12px;
  padding: 5px 10px;
  width: 160px;
  display: flex;
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
  margin-right: 5px;
}

.rank {
  margin-right: 8px;
}
</style>
