import type { CompiledFunction } from 'easy-api.ts/lib/classes/internal/CompiledFunction'
import { APIFunction, Data, EATS_Error, ParamType } from 'easy-api.ts'
import { LazyCanvas } from '@hitomihiumi/lazy-canvas'
import { PACKAGE_NAME } from '..'

export default class CreateLazyCanvas extends APIFunction {
    override name = '$createLazyCanvas'
    override description = 'Create new lazy canvas instance.'
    override parameters = [
        {
            name: 'Width',
            description: 'Width of the canvas.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        },
        {
            name: 'Height',
            description: 'Height of the canvas.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    override usage = '$createLazyCanvas[width;height]'
    override returns = ParamType.Unknown
    override compile = true
    override run = async function (this: CompiledFunction, d: Data, values: string[]) {
        const [newCanvasWidth, newCanvasHeight] = values.map((value) => parseInt(value))
        if (isNaN(newCanvasWidth!) || isNaN(newCanvasHeight!)) {
            throw new EATS_Error('Invalid canvas dimensions')
        }

        const canvas = new LazyCanvas()
            .createNewCanvas(newCanvasWidth!, newCanvasHeight!)

        d.setInternalVar(PACKAGE_NAME, canvas)
    }
}
