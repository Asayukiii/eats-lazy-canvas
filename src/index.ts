import { Addon, APIFunction, type API } from 'easy-api.ts'
import { join } from 'path'
import { inspect } from 'util'
import { Logger, LogPriority } from './classes/Logger'

/**
 * Directory where the functions are located.
 * @private
 */
const FUNCTIONS_DIRECTORY = join(__dirname, 'functions')

/**
 * Native canvas parent function name.
 * @private
 */
const NATIVE_CANVAS_PARENT_FUNCTION = '$createCanvas'

/**
 * Package name.
 * @private
 */
export const packageName = '@eats/lazy-canvas'

/**
 * Logger instance.
 * @private
 */
const logger = new Logger({
    level: LogPriority.DEBUG,
    prefix: '@eats/lazy-canvas'
})

/**
 * kiss, kiss. <3
 */
export class EATSLazyCanvas extends Addon {
    override name = packageName
    override description = 'lazy-canvas implementation for easy-api.ts.'
    override version = '1.0.0'
    constructor(private readonly debug = false) {
        super()
    }
    override init(api: API): void {
        api.functions.delete(NATIVE_CANVAS_PARENT_FUNCTION.toLowerCase())
        api.functions.load(FUNCTIONS_DIRECTORY)
    }
}
