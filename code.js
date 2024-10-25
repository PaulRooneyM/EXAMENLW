const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2/'

window.onload = async function() {
    const pokemonsKanto = await getAllPokemonKanto();
    const ulPokeList = document.getElementById('poke-list');
    for(const pokemon of pokemonsKanto){ 
        const pokeItem = document.createElement('li');
        pokeItem.textContent = pokemon.title;
        ulPokeList.appendChild(pokeItem);
    }
}


async function getAllPokemonKanto(){
    const response = await fetch(`${POKE_API_BASE_URL}pokemon?limit=151`);
    const jsonResponse = await response.json();
    const pokemonArray = jsonResponse.results;
    return jsonRespone;
}