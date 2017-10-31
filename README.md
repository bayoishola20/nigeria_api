# Nigeria API

A node app built with Vanilla js (es6), express, node and mongodb.

![Preview](https://github.com/bayoishola20/nigeria_api/blob/master/public/bayoishola20_nigeria_api.png "Preview")


## To use

* Clone the repo: `git clone https://github.com/bayoishola20/nigeria_api.git`

* `npm install`

## You should have installed (most recent versions)

* Node
* MongoDB localhost or use mlab
* Express

## Sample Data and Use

`const api = 'insert api endpoint'`

`const states = []`

`fetch(api).then(blob => blob.json()).then(data => states.push(...data));`

`{
    "_id": "59f1b06dd2f0b85f2a9778ea",
    "state": "Lagos",
    "capital": "Ikeja",
    "__v": 0,
    "location": {
        "coordinates": [
            6.234,
            3.783
        ],
        "type": "Point"
    },
    "entry_date": "2017-10-26T09:52:23.481Z"
}`

PS: I had to rollback jsonwebtoken due to sign payload issues: `"jsonwebtoken": "^7.4.3",`

Visit project url: [https://nigeria-api.herokuapp.com/](https://nigeria-api.herokuapp.com/) ``

[bayoishola20](github.bayoishola20.io)