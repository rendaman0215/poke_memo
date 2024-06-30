<template>
  <div class="container">
    <h1>ポケメモ</h1>
    <div class="main">
      <section class="selected">
        <h2>相手の選出</h2>
        <div class="selected__poke">
          <PokemonCard
            class="selected__poke__card"
            v-for="poke in selectedPoke"
            :pokemon="poke"
          />
        </div>
      </section>
      <section class="party">
        <h2>相手のパーティ</h2>
        <div class="party__poke">
          <PokeButton
            v-for="poke in partyPokes"
            class="party__poke__button"
            :key="poke.id"
            :poke="poke"
            :deletable="true"
            @selected="selectPokeFromParty(poke)"
            @remove="removeFromParty(poke)"
          />
        </div>
      </section>
      <section class="ranking">
        <h2>使用率ランキング</h2>
        <SearchBox
          class="searchbox"
          @searchWord="(newVal:string) => (keyword = newVal)"
        />
        <div class="ranking__list">
          <PokeButton
            v-for="poke in rankedPokes"
            :key="poke.rank"
            :ranked="true"
            class="ranking__list__poke"
            :poke="poke"
            @selected="selectPokeFromRank(poke)"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pokeRank } from "@/data/data";

const baseRankedPokes = ref<Pokemon[]>([]);
const partyPokes = ref<Pokemon[]>([]);
const selectedPoke = ref<Pokemon[]>([]);
const keyword = ref<string>("");

onMounted(() => {
  for (const poke of pokeRank) {
    baseRankedPokes.value.push(NewPokemon(poke.id, poke.form));
  }
});

const rankedPokes = computed(() => {
  keyword.value = hiraganaToKatakana(keyword.value);
  return baseRankedPokes.value.filter((poke) =>
    poke.name.includes(keyword.value)
  );
});

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
  margin: 1rem 0.5rem;
  flex-wrap: wrap;
}

.selected {
  flex: 1 1 100%;
  height: 500px;
  display: block;
  &__poke {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
    &__card {
      margin: 0 1rem;
    }
  }
}

.party {
  display: block;
  &__poke {
    display: flex;
    flex-wrap: wrap;
    &__button {
      flex: 3 2 33%;
      margin: 1rem 0;
    }
  }
}

.ranking {
  flex: 1 1 100%;
  align-items: center;

  &__list {
    display: flex;
    flex-wrap: wrap;
    &__poke {
      display: flex;
      align-items: center;
      margin: 0.5rem;
      box-sizing: content-box;
    }
  }
}

.searchbox {
  margin: 1rem;
}
</style>
