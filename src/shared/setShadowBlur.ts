import { type Base, type BaseLayer } from '@hitomihiumi/lazy-canvas'
import { APIFunction, Data, ParamType } from 'easy-api.ts'
import { PACKAGE_NAME } from '../index'
import type { CompiledFunction } from 'easy-api.ts/lib/classes/internal/CompiledFunction'

export default class SetShadowBlur extends APIFunction {
    override name = '$setShadowBlur'
    override description = 'Set shadow blur of the layer.'
    override parameters = [
        {
            name: 'ID',
            description: 'ID of the layer.',
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null
        },
        {
            name: 'Shadow blur',
            description: 'Shadow blur amount of the layer.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    override returns = ParamType.Unknown
    override compile = true
    override run = async function (this: CompiledFunction, d: Data, values: string[]) {
        const [id, shadowBlur] = values
        if (isNaN(parseFloat(shadowBlur!))) throw new Error('Shadow blur must be a number')
        
        const layer = d.getInternalVar<BaseLayer<Base>>(`${PACKAGE_NAME}_layer_${id}`)
        if (!layer) throw new Error('Layer not found');
        if (!('setShadowBlur' in layer && typeof layer.setShadowBlur === 'function')) {
            throw new Error('Layer does not support setting shadow blur')
        }

        layer.setShadowBlur(parseFloat(shadowBlur!))
    }
}
