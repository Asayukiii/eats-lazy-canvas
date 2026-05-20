import { type Base, type BaseLayer } from '@hitomihiumi/lazy-canvas'
import { APIFunction, Data, ParamType } from 'easy-api.ts'
import { packageName } from '../index'
import type { CompiledFunction } from 'easy-api.ts/lib/classes/internal/CompiledFunction'

export default class SetAlpha extends APIFunction {
    override name = '$setAlpha'
    override description = 'Set alpha of the layer.'
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
            name: 'Alpha',
            description: 'Alpha value of the layer.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    override returns = ParamType.Unknown
    override compile = true
    override run = async function (this: CompiledFunction, d: Data, values: string[]) {
        const [id, alpha] = values
        if (isNaN(parseFloat(alpha!))) throw new Error('Alpha must be a number')
        
        const layer = d.getInternalVar<BaseLayer<Base>>(`${packageName}_layer_${id}`)
        if (!layer) throw new Error('Layer not found');
        if (!('setAlpha' in layer && typeof layer.setAlpha === 'function')) {
            throw new Error('Layer does not support setting alpha')
        }

        layer.setAlpha(parseFloat(alpha!))
    }
}
