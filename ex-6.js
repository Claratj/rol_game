window.onload = () => {
    showCharacters();
}

let charactersSelected = [];
let playButton = document.createElement('button');
let refreshBtn = document.createElement('button');
let winner = document.createElement('div');
winner.classList.add('winner');
let winPlayer = document.createElement('h2');

const showCharacters = () => {

    fetch('http://localhost:3000/characters').then(res => res.json()).then(characters => {
        
        const div$$ = document.querySelector('.main-container');
        
        for (let character of characters) {
            
            let card = document.createElement('div'); //Contenedor negro
            card.classList.add('card');

            let cardSubBackground = document.createElement('div'); // Contenedor verde
            cardSubBackground.classList.add('green-part');

            let cardFrame = document.createElement('div'); // Contenedor gris
            cardFrame.classList.add('card-frame');

            let frameHeader = document.createElement('div'); //Contenedor Nombre
            frameHeader.classList.add('frameHeader');


            let characterName = document.createElement('h3'); // Nombre
            characterName.classList.add('name');
            characterName.innerHTML = character.name;

            let img$$ = document.createElement('img'); // Imagen
            img$$.setAttribute('src', character.avatar);

            let characteristics = document.createElement('div'); // Texto descriptivo
            characteristics.classList.add('characteristics');

            let damageChar = document.createElement('p'); 
            damageChar.innerHTML = '<strong>Damage:</strong> ' + character.damage;

            let critic = document.createElement('p');
            critic.innerHTML = '<strong>Critic:</strong> '+ character.critic;
            let defense = document.createElement('p');
            defense.innerHTML = '<strong>Defense:</strong> '+ character.defense;
            let vitalityChar = document.createElement('p');
            vitalityChar.innerHTML ='<strong>Vitality:</strong> '+ character.vitality;


            card.appendChild(cardSubBackground);
            cardSubBackground.appendChild(cardFrame);
            cardFrame.appendChild(frameHeader);
            frameHeader.appendChild(characterName);
            cardFrame.appendChild(img$$);
            cardFrame.appendChild(characteristics);
            characteristics.appendChild(damageChar);
            characteristics.appendChild(critic);
            characteristics.appendChild(defense);
            characteristics.appendChild(vitalityChar);

            div$$.appendChild(card);
            card.appendChild(cardSubBackground);
            cardSubBackground.appendChild(cardFrame);
            card.addEventListener('click', () =>{
                card.style.border = "3px solid blue";
                chooseFighters(character);
            });      

        };
    }) 
} 



function chooseFighters(fighter) {

    if (charactersSelected.length < 2 ) {

        charactersSelected.push(fighter);
        if (charactersSelected.length === 2) {
            playButton.innerHTML = 'Lets Play!';
            console.log('aqui');
            document.body.appendChild(playButton);
            playButton.addEventListener('click', ()=>{ 
                letsPlay()
            });
    } 
    }
}

function letsPlay () {

    playButton.remove();

    // Tablero de rondas

    let table = document.createElement('div');
    table.classList.add('table');
    document.body.appendChild(table);

    for (let i = 0; i < charactersSelected.length; i++) {
        // const fighter = charactersSelected[i];
       let fighter = document.createElement('div');
        fighter.classList.add('fighter');
        table.appendChild(fighter);

        
    }

    let fighter = document.createElement('div');
    fighter.classList.add('card-selecter');

    let player1 = charactersSelected[0];
    let player2 = charactersSelected[1];
    let lifeVitalityP2 = player2.vitality;
    let lifeVitalityP1 = player1.vitality;
    while(lifeVitalityP2 > 0 && lifeVitalityP1 > 0 ) {
        //Juega player1
        let score1 = playerTotalDamage(player1.damage) - player2.defense ;
        lifeVitalityP2 = lifeVitalityP2 - score1;
        if(lifeVitalityP2 > 0) {
            // Juega Player2
            let score2 = playerTotalDamage(player2.damage) - player1.defense ;
            lifeVitalityP1 = lifeVitalityP1 - score2;
        }
    }
    if (lifeVitalityP2 <= 0) {
        winPlayer.innerHTML = 'Win Player 1';
    } else {
        winPlayer.innerHTML = 'Win Player 2';
    }
    document.body.appendChild(winner);
    winner.appendChild(winPlayer);
    refreshBtn.innerHTML= "Let's Play Again!";
    winner.appendChild(refreshBtn);
    refreshBtn.addEventListener('click', () => {startAgain()});
    console.log(2, winPlayer);
    
};

function playerTotalDamage (playerDamage) {
    let sixDiceResult =0;
    let tenDiceResult =0;
    let twentyDiceResult = 0;
    let totalDamage = 0;
    for (const damage of playerDamage) {
        if(damage.includes('d6')){
            for (let i = 0; i < parseInt(damage); i++) {
                sixDiceResult =  sixDiceResult +  (Math.floor(Math.random() * 6));
            };
        } else if (damage.includes('d10')) {
            for (let i = 0; i < parseInt(damage); i++) {
                tenDiceResult =  tenDiceResult +  (Math.floor(Math.random() * 10));
            };

        } else if (damage.includes('d20')) {
            for (let i = 0; i < parseInt(damage); i++) {
                twentyDiceResult =  twentyDiceResult +  (Math.floor(Math.random() * 20));
            };
        }
    }
    return totalDamage = sixDiceResult + tenDiceResult + twentyDiceResult;
}

function startAgain() {
    let cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.style.border = "1px solid black";
    });
    charactersSelected = [];
    winner.innerHTML = '';
    console.log(winner);
    
};



