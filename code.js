const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2/'
const allPokemons = {};
window.onload = async function() {
    const pokemonsKanto = await getAllPokemonKanto();
    const ulPokeList = document.getElementById('poke-list');
    for(const pokemon of pokemonsKanto){ 
        const pokeItem = document.createElement('li');
        pokeItem.textContent = pokemon.name;
        pokeItem.addEventListener('click', () => showPokemonDetails(pokemon.name));
        ulPokeList.appendChild(pokeItem);
    }
}


async function getAllPokemonKanto(){
    const response = await fetch(`${POKE_API_BASE_URL}pokemon?limit=151`);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const pokemonArray = jsonResponse.results;
    return jsonResponse.results;
}


async function getPokemonDetails(pokemonName){
    const response = await fetch(`${POKE_API_BASE_URL}pokemon/${pokemonName}`);
    const jsonResponse = await response.json();
    return jsonResponse;
}