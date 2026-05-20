import { type Base, type BaseLayer } from '@hitomihiumi/lazy-canvas'
import { APIFunction, Data, ParamType } from 'easy-api.ts'
import { PACKAGE_NAME } from '../index'
import type { CompiledFunction } from 'easy-api.ts/lib/classes/internal/CompiledFunction'

export default class SetY extends APIFunction {
    override name = '$setY'
    override description = 'Set Y coordinate of the layer.'
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
            name: 'Y',
            description: 'Y coordinate of the layer.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    override returns = ParamType.Unknown
    override compile = true
    override run = async function (this: CompiledFunction, d: Data, values: string[]) {
        const [id, y] = [values[0]!, parseInt(values[1]!)]
        
        const layer = d.getInternalVar<BaseLayer<Base>>(`${PACKAGE_NAME}_layer_${id}`)
        if (!layer) throw new Error('Layer not found');
        if (!('setY' in layer && typeof layer.setY === 'function')) {
            throw new Error('Layer does not support setting Y coordinate')
        }
        if (isNaN(y!)) throw new Error('Y must be a number')

        layer.setY(y!)
    }
}
