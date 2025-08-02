const host = "https://falloutdle.net"

const characterTodayUrl = host + "/api/characters/today"
const gameGuessUrl = host +"/api/games/guess"
const charRandomUrl = host +"/api/characters/random"

let nbGuess = 5

async function fetchURL(url) {
    const response = await fetch(url);
    return await response.json();
}

async function today() {
    const response = await fetchURL(characterTodayUrl);
    console.log(response);
    return response.data
}

async function random() {
    const response = await fetchURL(charRandomUrl);
    const character = response.data
    const pNode = document.getElementById("resultRandom");

    pNode.textContent = character.name;
}

async function guess() {

    var name = document.getElementById('character_name').value;
    if (name === "") {
        text = "Empty field ! Nb guess left: " + nbGuess;

        const pNode = document.getElementById("result");
        pNode.textContent = text;
        return
    }

    const response = await fetch(gameGuessUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            character_name: name
        })
    });

    const reponseJSON = await response.json();
    console.log(reponseJSON)
    const isCorrect = reponseJSON.data.isGuessed

    nbGuess--
    if (isCorrect === true) {
        text = "Success !";
    }
    else if (nbGuess <= 0){

        let character = await today()
        text = "Wrong ! Today's character was " + character.name + " from " + character.main_game;

        const pNode = document.getElementById("result");
        pNode.textContent = text;    
    }
    else {
        text = "Wrong ! Nb guess left: " + nbGuess;
    }

    const pNode = document.getElementById("result");
    pNode.textContent = text;
}            