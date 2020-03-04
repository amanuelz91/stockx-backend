// Error Handling Utilities

const logger = require('pino')()

const logAndThrow = (e,optional_message) => {
    logger.info(e,optional_message)
    throw(e)
}

module.exports = {
    logAndThrow
}