<template>
  <div class="container">
    <h1>ポケメモ</h1>
    <div class="main">
      <section class="selected">
        <h2>相手の選出</h2>
        <PokeButton
          v-for="poke in selectedPoke"
          :key="poke.id"
          class="selected__poke"
          :poke="poke"
          :deletable="true"
          @selected="removeFromSelected(poke)"
          @remove="removeFromSelected(poke)"
        />
      </section>
      <section class="party">
        <h2>相手のパーティ</h2>
        <PokeButton
          v-for="poke in partyPokes"
          class="party__poke"
          :key="poke.id"
          :poke="poke"
          :deletable="true"
          @selected="selectPokeFromParty(poke)"
          @remove="removeFromParty(poke)"
        />
      </section>
      <section class="ranking">
        <h2>使用率ランキング</h2>
        <SearchBox class="searchbox" />
        <div class="ranking__list">
          <PokeButton
            v-for="(poke, index) in rankedPokes"
            :key="index"
            class="ranking__list__poke"
            :index="index + 1"
            :poke="poke"
            @selected="selectPokeFromRank(poke)"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NewPokemon } from "@/models/Pokemon";
import type { Pokemon } from "@/models/Pokemon";
import { pokeRank, pDetail } from "@/data/data";

const rankedPokes = ref<Pokemon[]>([]);
const partyPokes = ref<Pokemon[]>([]);
const selectedPoke = ref<Pokemon[]>([]);

const selectPokeFromRank = (poke: Pokemon) => {
  if (partyPokes.value.length >= 6) {
    return;
  }
  if (partyPokes.value.includes(poke)) {
    return;
  }
  partyPokes.value.push(poke);
};

const selectPokeFromParty = (poke: Pokemon) => {
  if (selectedPoke.value.length >= 3) {
    return;
  }
  if (selectedPoke.value.includes(poke)) {
    return;
  }
  selectedPoke.value.push(poke);
};

const removeFromParty = (poke: Pokemon) => {
  partyPokes.value = partyPokes.value.filter((p) => p !== poke);
  selectedPoke.value = selectedPoke.value.filter((p) => p !== poke);
};

const removeFromSelected = (poke: Pokemon) => {
  selectedPoke.value = selectedPoke.value.filter((p) => p !== poke);
};

for (const poke of pokeRank) {
  rankedPokes.value.push(NewPokemon(poke.id, poke.form));
}
</script>

<style scoped lang="scss">
h1 {
  font-size: 28px;
  font-weight: 600;
  color: white;
  background-color: #f53b4c;
  padding: 1rem 0;
  text-align: center;
}

h2 {
  font-size: 24px;
  font-weight: 600;
  padding: 0rem 0;
  margin-left: 1rem;
}

.container {
  margin: 0 auto;
  max-width: 1024px;
}

.main {
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  flex-wrap: wrap;
}

.selected {
  flex: 1 1 75%;
  height: 400px;
  display: block;
  &__poke {
    margin: 0 1rem 70px 1rem;
  }
}

.party {
  flex: 1 1 25%;
  height: 400px;
  display: block;
  &__poke {
    margin: 1rem 0;
  }
}

.ranking {
  flex: 1 1 100%;
  align-items: center;

  &__list {
    display: flex;
    flex-wrap: wrap;
    &__poke {
      margin: 0.5rem;
      box-sizing: content-box;
    }
  }
}

.searchbox {
  margin: 1rem;
}
</style>
