import { type Base, type BaseLayer } from '@hitomihiumi/lazy-canvas'
import { APIFunction, Data, ParamType } from 'easy-api.ts'
import { PACKAGE_NAME } from '../index'
import type { CompiledFunction } from 'easy-api.ts/lib/classes/internal/CompiledFunction'

export default class SetWidth extends APIFunction {
    override name = '$setWidth'
    override description = 'Set width of the layer.'
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
            name: 'Width',
            description: 'Width value of the layer.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    override returns = ParamType.Unknown
    override compile = true
    override run = async function (this: CompiledFunction, d: Data, values: string[]) {
        const [id, width] = values
        if (isNaN(parseFloat(width!))) throw new Error('Width must be a number')
        
        const layer = d.getInternalVar<BaseLayer<Base>>(`${PACKAGE_NAME}_layer_${id}`)
        if (!layer) throw new Error('Layer not found');
        if (!('setWidth' in layer && typeof layer.setWidth === 'function')) {
            throw new Error('Layer does not support setting width')
        }

        layer.setWidth(parseFloat(width!))
    }
}
