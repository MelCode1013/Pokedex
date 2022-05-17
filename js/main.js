const mainScreen = document.querySelector('.main-screen-left')
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');

// constants and variables

const types = [
'normal', 'fighting', 'flying',
'poison', 'ground', 'rock',
'bug', 'ghost', 'steel',
'fire', 'water', 'grass',
'electric', 'psychic', 'ice',
'dragon', 'dark', 'fairy'
]

//functions

const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const resetScreen = () => {
    for (const type of types) {
        mainScreen.classList.remove(type);
    }
}


fetch('https://pokeapi.co/api/v2/pokemon/9')
    .then(res => res.json())
    .then(data => {

    resetScreen();

    const dataTypes = data['types'];
    const dataFirstType = dataTypes[0];
    const dataSecondType = dataTypes[1];

    pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
    if (dataSecondType) {
    pokeTypeTwo.classList.remove('hide');
    pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
    } else {
        pokeTypeTwo.classList.add('hide');
        pokeTypeTwo.textContent = '';
    }
    mainScreen.classList.add(dataFirstType['type']['name']);

    pokeName.textContent = capitalize(data['name']);
    pokeId.textContent = data['id']

    const dataSprites = data['sprites']
    pokeFrontImage.src = dataSprites['front_default']
    pokeBackImage.src = dataSprites['back_default']
    
    })

