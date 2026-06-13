import { Addon, APIFunction, type API, LogPriority } from 'easy-api.ts'
import { Logger } from 'easy-api.ts/lib/classes/core/Logger'
import { join } from 'path'
import { inspect } from 'util'
import type { LazyCanvasPlugin, StringCentering, StringFontWeight, StringOutlineType } from '@hitomihiumi/lazy-canvas'

/**
 * @private
 */
const FUNCTIONS_DIRECTORY = join(__dirname, 'functions')

/**
 * @private
 */
export const SHARED_FUNCTIONS_DIRECTORY = join(__dirname, 'shared')

/**
 * @private
 */
const NATIVE_CANVAS_PARENT_FUNCTION = '$createCanvas'

/**
 * @private
 */
export const PACKAGE_NAME = '@eats/lazy-canvas'

/**
 * @private
 */
export const ALLOWED_CENTERING_VALUES: StringCentering[] = ['legacy', 'new'] as const

/**
 * @private
 */
export const ALLOWED_FONT_WEIGHTS: StringFontWeight[] = [
    'normal',
    'bold',
    'italic',
    'bold italic',
    'regular',
    'semi-bold',
    'extra-bold',
    'light',
    'extra-light'
] as const

/**
 * @private
 */
export const ALLOWED_OUTLINE_TYPES: StringOutlineType[] = [
    'center',
    'inner',
    'outer'
] as const

/**
 * Global logger instance.
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
    override name = PACKAGE_NAME
    override description = 'lazy-canvas implementation for easy-api.ts.'
    override version = '1.0.0'
    override requiredAddons: string[] = []
    override requiredVersions: string[] = []
    private logger!: Logger
    constructor(private readonly options: EATSLazyCanvasOptions = defaultOptions) {
        super()

        this.logger = new Logger({
            level: this.options.debug ? LogPriority.DEBUG : LogPriority.INFO,
            prefix: PACKAGE_NAME
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
