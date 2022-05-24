const mainScreen = document.querySelector('.main-screen-left')
const screenImage = document.querySelector('.screen-image')
const idDisplay = document.querySelector ('.id-paragraph')
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeListItems = document.querySelectorAll('.list-item');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button'); 

// constants and variables

const TYPES = [
'normal', 'fighting', 'flying',
'poison', 'ground', 'rock',
'bug', 'ghost', 'steel',
'fire', 'water', 'grass',
'electric', 'psychic', 'ice',
'dragon', 'dark', 'fairy'
]

let prevUrl = null;
let nextUrl = null;

//functions

const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const resetScreen = () => {
    screenImage.classList.remove('hide')
    idDisplay.classList.remove('hide')

    for (const type of TYPES) {
    mainScreen.classList.remove(type);
  }
}


const fetchPokeList = url => {
    fetch(url)
    .then(res => res.json())
    .then(data => {

        const {results, previous, next} = data;
        prevUrl = previous;
        nextUrl = next;
        
        
        for(let i = 0; i < pokeListItems.length; i++){
            const pokeListItem = pokeListItems[i];
            const resultData = results[i];

            if (resultData) {
                const {name, url} = resultData;
                const urlArray = url.split('/');
                const id = urlArray[urlArray.length - 2];
                pokeListItem.textContent = id + '. ' + capitalize(name);
            } else {
                pokeListItem.textContent = '';
            }
        }
    });

}

const fetchPokeData = id => {
fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
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
}

const handleRightButtonClick = () => {
    if (nextUrl) {
        fetchPokeList(nextUrl);
    }
};

const handleLeftButtonClick = () => {
    if (prevUrl) {
        fetchPokeList(prevUrl);
    }
};

const selectPokemon = (e) => {
    if(!e.target) return;
    
    const listItem = e.target;
    if (!listItem.textContent) return;

    const id = listItem.textContent.split('.')[0];
    fetchPokeData(id);
}


//gets data for left side 

 //data for right side

    


    //event listeners

    leftButton.addEventListener('click', handleLeftButtonClick)
    rightButton.addEventListener('click', handleRightButtonClick);
    for (const pokeListItem of pokeListItems){
        pokeListItem.addEventListener('click', selectPokemon);
    }
    //initialize app

fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=6')
