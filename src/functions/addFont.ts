import checkLazyCanvas from '../utils/checkLazyCanvas'
import type { CompiledFunction } from 'easy-api.ts/lib/classes/internal/CompiledFunction'
import { APIFunction, Data, EATS_Error, ParamType } from 'easy-api.ts'
import { packageName } from '../index'
import { Font, type LazyCanvas, type StringFontWeight } from '@hitomihiumi/lazy-canvas'

/**
 * Allowed font weights.
 * @private
 */
const ALLOWED_FONT_WEIGHTS: StringFontWeight[] = [
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

export default class AddFont extends APIFunction {
    override name = '$addFont'
    override description = 'Add font to the canvas.'
    override parameters = [
        {
            name: 'Family',
            description: 'Font family to add.',
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null
        },
        {
            name: 'Path',
            description: 'Path to the font file.',
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null
        },
        {
            name: 'Weight',
            description: 'Font weight to add.',
            type: ParamType.String,
            required: false,
            rest: false,
            defaultValue: 'regular',
            allowedValues: ALLOWED_FONT_WEIGHTS
        }
    ]
    override usage = '$addFont[family;path;weight?]'
    override returns = ParamType.Unknown
    override compile = true
    override run = async function (this: CompiledFunction, d: Data, values: string[]) {
        const [fontFamily, fontPath, fontWeight = 'regular'] = values
        checkLazyCanvas(d)

        const canvas = d.getInternalVar<LazyCanvas>(packageName)
        const font = new Font()
            .setFamily(fontFamily!)
            .setPath(fontPath!)
            .setWeight(fontWeight! as StringFontWeight)

        canvas.loadFonts(font)
    }
}
