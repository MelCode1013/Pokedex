const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');

fetch('https://pokeapi.co/api/v2/pokemon/1')
    .then(res => res.json())
    .then(data => {
    console.log(data);

    pokeName.textContent = data['name'];
    pokeId.textContent = data['id']

    const dataSprites = data['sprites']
    console.log(dataSprites)

    pokeFrontImage.src = dataSprites['versions']['generation-i']['red-blue']['front_default']
    pokeBackImage.src = dataSprites['versions']['generation-i']['red-blue']['back_default']

    const dataTypes = data['types'];
    pokeTypeOne.textContent = dataTypes[0]['type']['name']
    pokeTypeTwo.textContent = dataTypes[1]['type']['name']
    })

