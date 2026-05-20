import { type Base, type BaseLayer } from '@hitomihiumi/lazy-canvas'
import { APIFunction, Data, ParamType } from 'easy-api.ts'
import { PACKAGE_NAME } from '../index'
import type { CompiledFunction } from 'easy-api.ts/lib/classes/internal/CompiledFunction'

export default class SetRadius extends APIFunction {
    override name = '$setRadius'
    override description = 'Set radius of the layer.'
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
            name: 'Radius',
            description: 'Radius value of the layer.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    override returns = ParamType.Unknown
    override compile = true
    override run = async function (this: CompiledFunction, d: Data, values: string[]) {
        const [id, radius] = values
        if (isNaN(parseFloat(radius!))) throw new Error('Radius must be a number')
        
        const layer = d.getInternalVar<BaseLayer<Base>>(`${PACKAGE_NAME}_layer_${id}`)
        if (!layer) throw new Error('Layer not found');
        if (!('setRadius' in layer && typeof layer.setRadius === 'function')) {
            throw new Error('Layer does not support setting radius')
        }

        layer.setRadius(parseFloat(radius!))
    }
}
