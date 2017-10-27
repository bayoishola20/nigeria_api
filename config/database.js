module.exports = {
    database: process.env.NODE_ENV == 'production' ?'mongodb://bayoishola20:bayoishola20&@ds119675.mlab.com:19675/nigerian_api' : 'mongodb://localhost:27017/nigeria_api',
    secret: 'Juggernaut',
}