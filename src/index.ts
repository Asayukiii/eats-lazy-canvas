import { Addon, type API } from 'easy-api.ts'
import { join } from 'path'

/**
 * Directory where the functions are located.
 * @private
 */
const FUNCTIONS_DIRECTORY = join(__dirname, 'functions')

/**
 * kiss, kiss. <3
 */
export class EATSLazyCanvas extends Addon {
    override name = '@eats/lazy-canvas'
    override description = 'lazy-canvas implementation for easy-api.ts.'
    override version = '1.0.0'
    override init(api: API): void {
        // Storing the current size.
        const currentSize = api.functions.size

        // Removing native canvas functions first.
        api.functions.delete('$createcanvas')
        api.functions.forEach((func, name) => {
            if (func.parent && func.parent.name === '$createCanvas') {
                api.functions.delete(name)
            }
        })

        // Checking if the size has changed.
        if (api.functions.size === currentSize) {
            console.error('No canvas functions found.')
            return
        }

        // Proceeding to load the new canvas functions.
        api.functions.load(FUNCTIONS_DIRECTORY)
    }
}
