import pokemon from './pokemon.js';

const pokemonChoices = document.querySelector('form');
const body = window.document.body;

pokemon.forEach((ball) => {
    const label = document.createElement('label');
    const pokeName = document.createElement('p');
    const radio = document.createElement('input');
    const avatar = document.createElement('img');

    pokeName.textContent = ball.name;

    avatar.src = ball.img;
    label.style.backgroundImage = `URL(${ball.background})`;
    label.style.backgroundSize = '75%';
    radio.name = 'pokemon';
    radio.type = 'radio';
    radio.value = ball.name;


    label.appendChild(pokeName);
    label.appendChild(radio);
    label.appendChild(avatar);

    pokemonChoices.appendChild(label);
});

const inputs = document.querySelectorAll('input');
const avatars = document.querySelectorAll('img');
const names = document.querySelectorAll('p');
const labels = document.querySelectorAll('label');

for(let i = 0; i < inputs.length; i++) {
    let input = inputs[i];

    input.addEventListener('click', function() {
        if(input.checked === true) {
            input.parentElement.style.width = '150px';
            avatars[i].style.display = 'initial';
            names[i].style.display = 'initial';
            body.style.backgroundImage = labels[i].style.backgroundImage;
        }
        let allFreePokemon = document.getElementsByClassName('free');
        if (allFreePokemon.length > 0) {
            let first = allFreePokemon[0];
            document.removeChild(first);
        }
        
        let freePoke = document.createElement('img');
        freePoke.src = avatars[i].src;
        
        freePoke.style.position = 'absolute';
        freePoke.classList.add('free');
        freePoke.setAttribute('id', 'move');
        freePoke.style.top = '310px';
        if (window.innerWidth < 770) {
            freePoke.style.left = '50px';
        }
        if (window.innerWidth > 770) {
            freePoke.style.left = '200px';
        }
        freePoke.style.zIndex = '0';
        body.appendChild(freePoke);
        
        
    });
}

document.onkeydown = checkKey;

function checkKey(e) {
    let freePoke = document.getElementById('move');
    freePoke.style.transitionDuration = '.1s';
    let styleLeft = parseInt(freePoke.style.left);
    let styleTop = parseInt(freePoke.style.top);

    if (e.keyCode == '38' && styleTop > 310) {
        styleTop -= 5;
        freePoke.style.top = styleTop + 'px';
        console.log('up');
    } else if (e.keyCode == '40' && styleTop < 420) {
        styleTop += 5;
        freePoke.style.top = styleTop + 'px';
        console.log('down');
    } else if (e.keyCode == '37') {
        styleLeft -= 5;
        freePoke.style.left = styleLeft + 'px';
        console.log('left');
    } else if (e.keyCode == '39') {
        styleLeft += 5;
        freePoke.style.left = styleLeft + 'px';
        console.log('right');
    } 
    requestAnimationFrame(checkKey);
}

console.log(window.innerWidth);

let div = document.querySelector('div');

function reportWindowSize() {

    console.log('width' + window.innerWidth);
    div.innerHTML = window.innerWidth;
    console.log('height' + window.innerHeight);
}

window.onresize = reportWindowSize;