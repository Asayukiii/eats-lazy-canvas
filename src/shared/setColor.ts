import { type Base, type BaseLayer } from '@hitomihiumi/lazy-canvas'
import { APIFunction, Data, ParamType } from 'easy-api.ts'
import { PACKAGE_NAME } from '../index'
import type { CompiledFunction } from 'easy-api.ts/lib/classes/internal/CompiledFunction'

export default class SetColor extends APIFunction {
    override name = '$setColor'
    override description = 'Set color of the layer.'
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
            name: 'Color',
            description: 'Color value of the layer.',
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    override returns = ParamType.Unknown
    override compile = true
    override run = async function (this: CompiledFunction, d: Data, values: string[]) {
        const [id, color] = values
        if (typeof color !== 'string') throw new Error('Color must be a string')
        
        const layer = d.getInternalVar<BaseLayer<Base>>(`${PACKAGE_NAME}_layer_${id}`)
        if (!layer) throw new Error('Layer not found');
        if (!('setColor' in layer && typeof layer.setColor === 'function')) {
            throw new Error('Layer does not support setting color')
        }

        layer.setColor(color)
    }
}
