const poke_container = document.getElementById('poke-container')
const searchBtn = document.querySelector('.btn')
const input = document.querySelector('.input');
const listId = document.querySelectorAll('.pokeIds li')
let pokemon_initCount = 1
let pokemon_count = 300
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: 'DEF3FD',
    ground: '#f4e7da',
    rock: 'd5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: 'eaeda1',
    flying: 'F5F5F5',
    fighting: '#E6E0D4',
    normal: 'F5F5F5'
}
const main_types = Object.keys(colors)
const fetchPokemons = async () => {
    for (let i = pokemon_initCount; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}
const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    if (res.status == '404') {
        createErrorCard('Pokemon not found')
        setTimeout(() => document.location.reload(), 4000)

    }
    const data = await res.json()

    createPokemonCard(data)
}
const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, '0')
    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    const types = poke_types[1] ? poke_types[0] + ' ' + poke_types[1] : poke_types[0]
    const color = colors[type]
    pokemonEl.style.backgroundColor = color
    const pokemonInnerHtml = `
    <div class="img-container">
        <img src=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png
            alt="">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${types}</span></small>
    </div>
    `
    pokemonEl.innerHTML = pokemonInnerHtml
    poke_container.appendChild(pokemonEl)
}
searchBtn.addEventListener('click', () => {
    const searchValue = input.value
    if (searchValue.trim() == '') {
        alert('Please enter a pokemon name')
    }
    searchPokemon(searchValue)
})
const searchPokemon = (pokemon) => {
    clearPokemons()
    getPokemon(pokemon)
}
const clearPokemons = () => {
    const pokemons = document.querySelectorAll('.pokemon')
    pokemons.forEach(pokemon => pokemon.remove())
}
const createErrorCard = (msg) => {
    const cardHtml = `<div class="card">
    <h1>${msg}</h1>
    </div>`
    poke_container.innerHTML = cardHtml
}




listId.forEach(list => {
    list.addEventListener('click', () => {
        const text = list.textContent
        const findASeparator = text.indexOf('-')
        pokemon_initCount = text.slice(0, findASeparator)
        pokemon_count = text.slice(findASeparator + 1)
        console.log(pokemon_initCount, pokemon_count)
        clearPokemons()
        fetchPokemons()
    })

})

fetchPokemons()
