import { type Base, type BaseLayer } from '@hitomihiumi/lazy-canvas'
import { APIFunction, Data, ParamType } from 'easy-api.ts'
import { packageName } from '../index'
import type { CompiledFunction } from 'easy-api.ts/lib/classes/internal/CompiledFunction'

export default class SetShadowColor extends APIFunction {
    override name = '$setShadowColor'
    override description = 'Set shadow color of the layer.'
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
            name: 'Shadow color',
            description: 'Shadow color of the layer.',
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    override returns = ParamType.Unknown
    override compile = true
    override run = async function (this: CompiledFunction, d: Data, values: string[]) {
        const [id, shadowColor] = values
        
        const layer = d.getInternalVar<BaseLayer<Base>>(`${packageName}_layer_${id}`)
        if (!layer) throw new Error('Layer not found');
        if (!('setShadowColor' in layer && typeof layer.setShadowColor === 'function')) {
            throw new Error('Layer does not support setting shadow color')
        }

        layer.setShadowColor(shadowColor!)
    }
}
