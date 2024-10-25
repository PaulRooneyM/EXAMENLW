const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2/'
const allPokemons = {};
const team = [];
window.onload = async function() {
    showTeam();
    const pokemonsKanto = await getAllPokemonKanto();
    const ulPokeList = document.getElementById('poke-list');
    for(const pokemon of pokemonsKanto){ 
        const pokeItem = document.createElement('li');
        pokeItem.textContent = pokemon.name;
        const addButton = document.createElement('button');
        addButton.textContent = 'Afegir a equip';
        pokeItem.appendChild(addButton);
        addButton.addEventListener('click', () => addToTeam(pokemon));
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


async function showPokemonDetails(pokemonName) {
    const pokemonData = await getPokemonDetails(pokemonName);


    if (!pokemonData) { 
        alert('Pokémon no trobat!'); 
        return; 
    }
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


function addToTeam(pokemon) {
    if (team.length < 6) {
        team.push(pokemon);
        alert(`${pokemon.name} afegit a l'equip!`);
        console.log('Equip actual:', team);
    } else {
        alert('Equip ja te 6 Pokemons. No es poden afegir mes.');
    }
    showTeam();
}

function showTeam() {
    const teamContainer = document.getElementById('team-details');
    teamContainer.innerHTML = `<h3>Equip actual</h3>`; 
    if (team.length === 0) {
        teamContainer.innerHTML += '<p>No hi ha Pokemon en equip.</p>';
        return;
    }
    for (pokemon of team) {
        teamContainer.innerHTML += `<p>${pokemon.name}</p>`;
    }

}


function searchPokemon(form) {
    const formElements = form.elements;
    const searchformElement = formElements.search;
    const pokemonName = searchformElement.value; 
    searchformElement.value = ''; 

    showPokemonDetails(pokemonName); 
    return false; 
}




async function getPokemonDetails(pokemonName) {
    try {
        const response = await fetch(`${POKE_API_BASE_URL}pokemon/${pokemonName}`);
        const jsonResponse = await response.json();
        return jsonResponse; 
    } catch (error) {
        return null; 
    }
}