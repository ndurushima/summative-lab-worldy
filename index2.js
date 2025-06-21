const getData = async(word) => {
    document.querySelector(".word").value = "";
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`; // or at the end en/" + word
    const response = await fetch(url)
    const data = await response.json();
    console.log(data)
    displayData(data)
};

const displayData = (data) => {
    const phonetic = data[0].phonetic;
    const meanings = data[0].meanings[0].definitions;
    const phoneticsAudio = data[0].phonetics[0].audio;
    console.log(meanings);
    console.log(phonetic);

    const definition = document.querySelector('.definition');
    const synonym = document.querySelector('.synonym');
    const pronunciation = document.querySelector('.pronunciation');
    const audio = document.querySelector('.audio');

    let html = ``;
    let synonyms = [];

    meanings.forEach((meaning) => {
        html += `<li>${meaning.definition}</li>`
        if (meaning.synonyms && meaning.synonyms.length > 0) {
            synonyms.push(...meaning.synonyms); 
        }
    })
    definition.innerHTML = `<h3>Definition:</h3><ol>${html}</ol>`;
    pronunciation.innerHTML = `<h3>Pronunciation:</h3><li>${phonetic}</li>`
    
    const uniqueSynonyms = [...new Set(synonyms)];
    synonym.innerHTML = uniqueSynonyms.length > 0
        ? `<h3>Synonyms:</h3><p>${uniqueSynonyms.join(', ')}</p>`
        : `<h3>Synonyms:</h3><p>No synonyms found.</p>`;

    if (phoneticsAudio) {
        audio.innerHTML = `
        <h3>Audio:</h3>
        <button id="play-audio">Play Pronunciation</button>
        <audio id="audio-player" src="${phoneticsAudio}"></audio>
        `;

        const playButton = document.getElementById("play-audio");
        const audioPlayer = document.getElementById("audio-player");

        playButton.addEventListener("click", () => {
            audioPlayer.play();
        });
    } else {
        audio.innerHTML = `<h3>Audio:</h3><p>Audio not available</p>`
    }
};

const form = document.querySelector("form");
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const word = document.querySelector(".word").value;
    console.log(word);
    document.querySelector('.definition').innerHTML = "";
    document.querySelector('.synonym').innerHTML = "";
    document.querySelector('.pronunciation').innerHTML = "";
    getData(word);
});