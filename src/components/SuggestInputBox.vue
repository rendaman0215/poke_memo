<template>
  <span class="autocomplete">
    <input
      type="text"
      v-model="query"
      @input="onInput"
      @keydown.down.prevent="onArrowDown"
      @keydown.up.prevent="onArrowUp"
      @keydown.enter.prevent="onEnter"
    />
    <ul v-if="suggestions.length" class="suggestions">
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        :class="{ active: index === selectedIndex }"
        @mousedown.prevent="selectSuggestion(suggestion)"
      >
        {{ suggestion }}
      </li>
    </ul>
  </span>
</template>

<script setup>
import { ref, computed } from "vue";

const query = ref("");
const suggestions = ref([]);
const selectedIndex = ref(-1);

// サジェストデータのサンプル
const sampleData = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Fig",
  "Grape",
  "Honeydew",
];

const onInput = () => {
  if (query.value) {
    suggestions.value = sampleData.filter((item) =>
      item.toLowerCase().includes(query.value.toLowerCase())
    );
  } else {
    suggestions.value = [];
  }
};

const onArrowDown = () => {
  if (selectedIndex.value < suggestions.value.length - 1) {
    selectedIndex.value++;
  }
};

const onArrowUp = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--;
  }
};

const onEnter = () => {
  if (
    selectedIndex.value >= 0 &&
    selectedIndex.value < suggestions.value.length
  ) {
    selectSuggestion(suggestions.value[selectedIndex.value]);
  }
};

const selectSuggestion = (suggestion) => {
  query.value = suggestion;
  suggestions.value = [];
  selectedIndex.value = -1;
};
</script>

<style scoped>
.autocomplete {
  position: relative;
}
.suggestions {
  position: absolute;
  border: 1px solid #ccc;
  background: white;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
.suggestions li {
  padding: 8px;
  cursor: pointer;
}
.suggestions li.active {
  background: #b3d4fc;
}

input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
}
</style>
