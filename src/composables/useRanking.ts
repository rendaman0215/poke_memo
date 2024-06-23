export const useRanking = () => {
  const rankedPokemon = useState<Pokemon[] | null>("ranking", () => null);

  const setRanking = async () => {
    const apiResponse = await fetch(
      "https://api.battle.pokemon-home.com/cbd/competition/rankmatch/list",
      {
        method: "POST",
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          countrycode: "304",
          langcode: "1",
          "content-type": "application/json",
          authorization: "Bearer",
        },
        body: JSON.stringify({
          soft: "Sc",
        }),
      }
    ).catch((error) => {
      console.error("Error fetching ranking data", error);
    });
    console.log(apiResponse);
  };

  return {
    setRanking,
  };
};
