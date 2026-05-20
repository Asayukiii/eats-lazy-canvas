import { type Base, type BaseLayer } from '@hitomihiumi/lazy-canvas'
import { APIFunction, Data, ParamType } from 'easy-api.ts'
import { packageName } from '../index'
import type { CompiledFunction } from 'easy-api.ts/lib/classes/internal/CompiledFunction'

export default class SetShadowOffsetX extends APIFunction {
    override name = '$setShadowOffsetX'
    override description = 'Set shadow offset X of the layer.'
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
            name: 'Shadow offset X',
            description: 'Shadow offset X amount of the layer.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    override returns = ParamType.Unknown
    override compile = true
    override run = async function (this: CompiledFunction, d: Data, values: string[]) {
        const [id, shadowOffsetX] = values
        if (isNaN(parseFloat(shadowOffsetX!))) throw new Error('Shadow offset X must be a number')
        
        const layer = d.getInternalVar<BaseLayer<Base>>(`${packageName}_layer_${id}`)
        if (!layer) throw new Error('Layer not found');
        if (!('setShadowOffsetX' in layer && typeof layer.setShadowOffsetX === 'function')) {
            throw new Error('Layer does not support setting shadow offset X')
        }

        layer.setShadowOffsetX(parseFloat(shadowOffsetX!))
    }
}
