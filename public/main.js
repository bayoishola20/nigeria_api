const api = "https://nigeria-api.herokuapp.com/nigeria_api/state";

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
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const stateName = place.state.replace(regex, `<span class="hightlight">${this.value}</span>`)
        return `
            <li>
                <span class="name">${stateName}</span>
                <span class="name">${place.capital}</span>
            </li>
        `;
    }).join('');
    searchDrop.innerHTML = html;
}

const stateSearch = document.querySelector('.stateSearch');
const searchDrop = document.querySelector('.searchDrop');

stateSearch.addEventListener('change', showMatch);
stateSearch.addEventListener('keyup', showMatch);