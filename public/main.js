const api = "http://localhost:3000/nigeria_api/state";

const states = [];

const prom = fetch(api)
                .then(blob => blob.json())
                .then(data => states.push(...data))