export default class ParamError extends Error {
    constructor (message) {
        super(message)
        this.status = 400
    }
}