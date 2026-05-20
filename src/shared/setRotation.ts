import { type Base, type BaseLayer } from '@hitomihiumi/lazy-canvas'
import { APIFunction, Data, ParamType } from 'easy-api.ts'
import { packageName } from '../index'
import type { CompiledFunction } from 'easy-api.ts/lib/classes/internal/CompiledFunction'

export default class SetRotation extends APIFunction {
    override name = '$setRotation'
    override description = 'Set rotation of the layer.'
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
            name: 'Rotation Angle',
            description: 'Rotation angle of the layer.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    override returns = ParamType.Unknown
    override compile = true
    override run = async function (this: CompiledFunction, d: Data, values: string[]) {
        const [id, rotationAngle] = values
        if (isNaN(parseInt(rotationAngle!))) throw new Error('Rotation angle must be a number')
        
        const layer = d.getInternalVar<BaseLayer<Base>>(`${packageName}_layer_${id}`)
        if (!layer) throw new Error('Layer not found');
        if (!('setRotation' in layer && typeof layer.setRotation === 'function')) {
            throw new Error('Layer does not support setting rotation')
        }

        layer.setRotation(parseInt(rotationAngle!))
    }
}
