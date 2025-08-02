const hostUrl = "https://falloutdle.net"
const todayUrl = hostUrl + "/api/characters/today"
const randomUrl = hostUrl +"/api/characters/random"
const guessUrl = hostUrl +"/api/guess"

let nbGuess = 5

async function fetchURL(url) {
    const response = await fetch(url);
    return await response.json();
}

async function today() {
    const response = await fetchURL(todayUrl);
    console.log(response);
    return response.data
}

async function random() {
    const response = await fetchURL(randomUrl);
    const char = response.data
    const pNode = document.getElementById("resultRandom");

    pNode.textContent = "Random character: " + char.name;
}

async function guess() {

    var name = document.getElementById('character_name').value;
    if (name === "") {
        text = "Empty field ! Nb guess left: " + nbGuess;

        const pNode = document.getElementById("result");
        pNode.textContent = text;
        return
    }

    nbGuess--
    if (nbGuess <= 0) {
        let char = await today()
        text = "Wrong ! Today's character was " + char.name;

        const pNode = document.getElementById("result");
        pNode.textContent = text;
        return
    }

    const response = await fetch(guessUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            character_name: name
        })
    });

    const json = await response.json();
    const isCorrect = json.data.isGuessed

    if (isCorrect === true) {
        text = "Success ! Today's character was " + char.name;
    }
    else {
        text = "Wrong ! Nb guess left: " + nbGuess;
    }

    const pNode = document.getElementById("result");
    pNode.textContent = text;
}            