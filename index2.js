const getData = async(word) => {
    document.querySelector(".word").value = "";
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`; // or at the end en/" + word
    const response = await fetch(url)
    const data = await response.json();
    console.log(data)
    displayData(data)
};

const displayData = (data) => {
    const meanings = data[0].meanings[0].definitions;
    //const synonyms = data[0].meanings[];
    console.log(meanings);
    const definition = document.querySelector('.definition');
    let html = ``;
    meanings.forEach((meaning) => {
        html += `
        <li>${meaning.definition}</li>
        `
    })
    definition.innerHTML = `<ol>${html}</ol>`;
    //console.log(meaning)
};

const form = document.querySelector("form");
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const word = document.querySelector(".word").value;
    console.log(word);
    document.querySelector('.definition').innerhtml = "";
    getData(word);
});