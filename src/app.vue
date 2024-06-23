<template>
  <div class="container">
    <h1 class="title">ポケメモ</h1>
    <section class="selected"><Cross /><PokeButton /></section>
    <section class="partry"><Cross /><PokeButton /></section>
    <section class="ranking">
      <SearchBox />
      <PokeButton />
    </section>
    {{ pokes }}
  </div>
</template>

<script setup lang="ts">
const { $pokenode } = useNuxtApp();
const pokes = ref();

onMounted(async () => {
  console.log("mounted");
  pokes.value = await $pokenode.listPokemons();
});
</script>

<style scoped lang="scss">
.container {
  margin: 0 auto;
  max-width: 1024px;
}

.title {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: white;
  background-color: #f53b4c;
  padding: 1rem 0;
  text-align: center;
}
</style>
