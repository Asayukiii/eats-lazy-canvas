import { type Base, type BaseLayer } from '@hitomihiumi/lazy-canvas'
import { APIFunction, Data, ParamType } from 'easy-api.ts'
import { packageName } from '../index'
import type { CompiledFunction } from 'easy-api.ts/lib/classes/internal/CompiledFunction'

export default class SetShadowOffsetY extends APIFunction {
    override name = '$setShadowOffsetY'
    override description = 'Set shadow offset Y of the layer.'
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
            name: 'Shadow offset Y',
            description: 'Shadow offset Y amount of the layer.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    override returns = ParamType.Unknown
    override compile = true
    override run = async function (this: CompiledFunction, d: Data, values: string[]) {
        const [id, shadowOffsetY] = values
        if (isNaN(parseFloat(shadowOffsetY!))) throw new Error('Shadow offset Y must be a number')
        
        const layer = d.getInternalVar<BaseLayer<Base>>(`${packageName}_layer_${id}`)
        if (!layer) throw new Error('Layer not found');
        if (!('setShadowOffsetY' in layer && typeof layer.setShadowOffsetY === 'function')) {
            throw new Error('Layer does not support setting shadow offset Y')
        }

        layer.setShadowOffsetY(parseFloat(shadowOffsetY!))
    }
}
