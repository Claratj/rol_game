window.onload = () => {
    intro();
    // showCharacters();
}

let charactersSelected = [];
let playButton = document.createElement('button');
let refreshBtn = document.createElement('button');
let winner = document.createElement('div');
winner.classList.add('winner');
let winPlayer = document.createElement('h2');
winPlayer.classList.add('ml15');
let player1Game = [];
let table = document.createElement('div');
let pOne = document.createElement('p');
pOne.classList.add('p-battle');
let pTwo = document.createElement('p');
pTwo.classList.add('p-battle');
let divOne = document.createElement('div');
let imgOne = document.createElement('div');
let divTwo = document.createElement('div');
let imgTwo = document.createElement('div');

let p1 = [];
let p2 = [];

let text='';
let z=0;



const intro= () => {
    const splash = document.querySelector('.splash');
    const title = document.querySelector('h1');
    setTimeout(()=> {
        showCharacters(), 
        splash.className = 'none';
        title.style.display = 'none';
        console.log(splash);
    }, 2000);
    
}

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


//Eligiendo personajes
function chooseFighters(fighter) {
    
    if (charactersSelected.length < 2 ) {
        
        charactersSelected.push(fighter);
        if (charactersSelected.length === 2) {
            playButton.innerHTML = 'Lets Play!';
            document.body.appendChild(playButton);
            playButton.addEventListener('click', ()=>{ 
                letsPlay()
            });
        } 
    }
}

//Efecto descripci??n de las rondas
function typeWriter() {
 
    if ((z < text1.length) || (z < text2.length))  {
        pOne.innerHTML += text1.charAt(z);
        pTwo.innerHTML += text2.charAt(z);
        z++;
        setTimeout(typeWriter, 100);
    }
}

function delay(i) {
    
    text1=p1[i];
    text2=p2[i];
    z=0;
    w=0;
    pOne.innerHTML="";
    pTwo.innerHTML="";
    
    typeWriter();
    
    
    //Efectos ataque
    if(i<p1.length-1){ 

        if (i%2==0){
            // console.log("Ronda" + i +"jugador1 atacando");
            imgTwo.style.animation = "glitch 1s linear infinite";
            imgTwo.style.border = "4px solid red";
            imgOne.style.animation = "none";
            imgOne.style.animation = "bounce 1s linear infinite";
            imgOne.style.border = "4px solid blue";


        }else{
            // console.log("Ronda" + i +"jugador2 atacando");
            imgTwo.style.animation = "none";
            imgOne.style.animation = "glitch 1s linear infinite";
            imgTwo.style.animation = "bounce 1s linear infinite";
            imgTwo.style.border = "4px solid blue";
            imgOne.style.border = "4px solid red";




        }
        setTimeout(function(){
            delay(i+1);;
        }, 6000);
    }else{
        
        //Ganador y bot??n de jugar de nuevo
        document.body.appendChild(winner);
        winner.appendChild(winPlayer);
        refreshBtn.innerHTML= "Let's Play Again!";
        document.body.appendChild(refreshBtn);
        refreshBtn.addEventListener('click', () => {startAgain()});
        
        //Efecto Winner
        anime.timeline({loop: true}).add({
            targets: '.ml15 .word',
            scale: [14,1],
            opacity: [0,1],
            easing: "easeOutCirc",
            duration: 600,
            delay: (el, i) => 800 * i
        }).add({
            targets: '.ml15',
            opacity: 0,
            duration: 600,
            easing: "easeOutExpo",
            delay: 800
        });
    }
}


//Juguemos
function letsPlay () {
    
    playButton.remove();
    pOne.innerHTML = '';
    pTwo.innerHTML = '';
    divOne.style.border = "0px";
    divTwo.style.border = "0px";
    
    
    //Jugando
    
    let player1 = charactersSelected[0];
    let player2 = charactersSelected[1];
    let lifeVitalityP2 = player2.vitality;
    let lifeVitalityP1 = player1.vitality;
    let scorePlayer1 = [];
    let scorePlayer2 = [];
    let vitalityPlayer1 = [];
    let vitalityPlayer2 = [];
    
    
    while(lifeVitalityP2 > 0 && lifeVitalityP1 > 0 ) {
        //Juega player1
        let score1 = playerTotalDamage(player1.damage) - player2.defense ;
        lifeVitalityP2 = lifeVitalityP2 - score1;
        
        scorePlayer1.push(score1);
        vitalityPlayer2.push(lifeVitalityP2);
        
        if(lifeVitalityP2 > 0) {
            // Juega player2
            let score2 = playerTotalDamage(player2.damage) - player1.defense ;
            lifeVitalityP1 = lifeVitalityP1 - score2;
            
            scorePlayer2.push(score2);
            vitalityPlayer1.push(lifeVitalityP1);  
        }
    }
    if (lifeVitalityP2 <= 0) {
        winPlayer.innerHTML = '<span class="word">Win</span> <span class="word">Player 1</span>';
    } else {
        winPlayer.innerHTML = '<span class="word">Win</span> <span class="word">Player 2</span>';
    }
    
    // Tablero de rondas
    table.classList.add('table');
    document.body.appendChild(table);
    
    
    //Div Player 1
    divOne.classList.add('fighter');
    imgOne.classList.add('fighter-img-one');
    imgOne.style.backgroundImage = `url('${charactersSelected[0].avatar}')`;
    divOne.appendChild(imgOne);
    // pOne.classList.add('ml12');
    
    //Div Player 2
    divTwo.classList.add('fighter');
    imgTwo.classList.add('fighter-img-two');
    imgTwo.style.backgroundImage = `url('${charactersSelected[1].avatar}')`;
    divTwo.appendChild(imgTwo);
    // pTwo.classList.add('ml12');
    
    
    //Print todo
    let x = 0;
    let j = 0;
    
    
    
    for (let index = 1; index < (scorePlayer1.length*2); index++) {
        // console.log(index);
        
        if (index % 2 === 0 && index < (scorePlayer1.length*2)-1){
            
            p2.push(`Ronda ${index} : Ataca infligiendo ${scorePlayer2[j]} de da??o`);
            p1.push(`Ronda ${index} : Su vitalidad se ve reducida a ${vitalityPlayer1[j]}.`);
            j++;
        } else if (index % 2 !== 0 && index < (scorePlayer1.length*2)-1) {
            p2.push(`Ronda ${index} : Su vitalidad se ve reducida a ${vitalityPlayer2[x]}.`);
            p1.push(`Ronda ${index} : Ataca infligiendo ${scorePlayer1[x]} de da??o`);
            x++;
        } else {
            if (vitalityPlayer1[j] <= 0) {
                p1.push(`El jugador fue derrotado durante la batalla.`);
                p2.push(`??Vencedor de la batalla!`);
                // divTwo.style.border = "3px solid blue";
            } else if (vitalityPlayer2[x] <= 0) {
                p2.push(`El jugador fue derrotado durante la batalla.`);
                p1.push(`??Vencedor de la batalla!`);
                // divOne.style.border = "3px solid blue";
            }
        }
    }
    
    divOne.appendChild(pOne);
    divTwo.appendChild(pTwo);
    
    delay(0)
    
    table.appendChild(divOne);
    table.appendChild(divTwo);



};


//Juego de datos
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
    refreshBtn.remove();

    let cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.style.border = "1px solid black";
    });

    charactersSelected = [];
    table.remove();
    winner.innerHTML = '';
    divOne.innerHTML = '';
    divTwo.innerHTML = '';
    
};



