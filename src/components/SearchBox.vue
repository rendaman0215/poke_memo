<template>
  <form class="search-form-4">
    <button type="button" aria-label="検索"></button>
    <label>
      <input
        type="text"
        placeholder="ポケモンを検索"
        @input="changed"
        v-model="keyword"
      />
    </label>
  </form>
</template>

<script setup lang="ts">
const keyword = ref<string>("");

const emit = defineEmits();
const changed = (): void => {
  emit("searchWord", keyword.value);
};
</script>

<style scoped scss>
.search-form-4 {
  background-color: white;
  width: 250px;
  display: flex;
  align-items: center;
  overflow: hidden;
  border: 2px solid #777777;
  border-radius: 25px;
  &:focus-within {
    border-color: #3b54f5;
  }
}

.search-form-4 input {
  height: 45px;
  padding: 5px 15px 5px 0;
  border: none;
  box-sizing: border-box;
  font-size: 16px;
  outline: none;
}

.search-form-4 input::placeholder {
  color: #777777;
}

.search-form-4 button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border: none;
  background-color: transparent;
  cursor: auto;
}

.search-form-4 button::before {
  width: 24px;
  height: 24px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z' fill='%23777777'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  content: "";
}
</style>
