require('dotenv').config()

const _returnPort = () => {return process.env.PORT||3000}

module.exports = {
    returnPort: _returnPort
}