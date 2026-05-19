import { Addon, APIFunction, type API } from 'easy-api.ts'
import { join } from 'path'
import { inspect } from 'util'
import { Logger, LogPriority } from './classes/Logger'
import type { LazyCanvasPlugin } from '@hitomihiumi/lazy-canvas'

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
export let logger: Logger

/**
 * Options for the EATSLazyCanvas class.
 */
export interface EATSLazyCanvasOptions {
    /**
     * Debug mode.
     * @default false
     */
    debug?: boolean
    /**
     * Plugins for the canvas.
     * @default []
     */
    plugins?: LazyCanvasPlugin[]
}

/**
 * Default options for the EATSLazyCanvas class.
 * @private
 */
const defaultOptions: Required<EATSLazyCanvasOptions> = {
    debug: false,
    plugins: []
}

/**
 * kiss, kiss. <3
 */
export class EATSLazyCanvas extends Addon {
    override name = packageName
    override description = 'lazy-canvas implementation for easy-api.ts.'
    override version = '1.0.0'
    private logger!: Logger
    constructor(private readonly options: EATSLazyCanvasOptions = defaultOptions) {
        super()

        this.logger = new Logger({
            level: this.options.debug ? LogPriority.DEBUG : LogPriority.INFO,
            prefix: packageName
        })
        logger = this.logger
    }
    override init(api: API): void {
        this.logger.debug('Initializing EATSLazyCanvas...')
        api.functions.delete(NATIVE_CANVAS_PARENT_FUNCTION.toLowerCase())
        api.functions.load(FUNCTIONS_DIRECTORY)
        this.logger.debug('Initialized EATSLazyCanvas successfully.')
    }
}
