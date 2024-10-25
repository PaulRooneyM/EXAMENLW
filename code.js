const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2/'
const allPokemons = {};
let team = [];
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


async function showPokemonDetails(pokemonName) {
    const pokemonData = await getPokemonDetails(pokemonName);

    const name = pokemonData.name;
    const id = pokemonData.id;
    const imageUrl = pokemonData.sprites.front_default 
    let types = '';
    for (let i = 0; i < pokemonData.types.length; i++) {
        types += pokemonData.types[i].type.name;
        if (i < pokemonData.types.length - 1) {
            types += ', ';
        }
    }

    const detailsContainer = document.getElementById('pokemon-details');
    detailsContainer.innerHTML = `
        <h2>${name}</h2>
        <p><strong>ID:</strong> ${id}</p>
        <img src="${imageUrl}" alt="${name}" width="200">
        <p><strong>Types:</strong> ${types}</p>
    `;
}
/*
function searchCharacter(form) {
    const formElements = form.elements;                    
    searchformElement = formElements.search;               
    const PokemonName = searchformElement.value;
    searchformElement.value = '';

    getPokemonDetails(PokemonName).then( async (pokemon) => {
        if (!pokemon) {
            alert('Pokemon not found');
            return;
        }
        const divCharacterInfo = document.getElementById('pokemon-details');
        divCharacterInfo.innerHTML =`<h3>Informació del Pokémon</h3>
            <p><strong>Nom:</strong> ${pokemon.name}</p>
            <p><strong>ID:</strong> ${pokemon.id}</p>
        `;

    });
    return false;
}
*/

async function searchCharacter(form){

    
}
