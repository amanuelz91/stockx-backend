const logger = require('pino')()

// Error Handling Utilities

const logAndThrow = (e,optional_message) => {
    logger.info(e,optional_message)
    throw(e)
}

module.exports = {
    logAndThrow
}