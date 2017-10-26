const api = "http://localhost:3000/nigeria_api/state";

const states = [];

const prom = fetch(api)
                .then(blob => blob.json())
                .then(data => states.push(...data))

function findMatch(searchMatch, states) {
    return states.filter(place => {
        const regex = new RegExp(searchMatch, 'gi');
        return place.state.match(regex);
    });
}

function showMatch() {
    const matchArray = findMatch(this.value, states);
    console.log(matchArray);
}

const stateSearch = document.querySelector('.stateSearch');
const searchDrop = document.querySelector('.searchDrop');

stateSearch.addEventListener('change', showMatch);
stateSearch.addEventListener('keyup', showMatch);