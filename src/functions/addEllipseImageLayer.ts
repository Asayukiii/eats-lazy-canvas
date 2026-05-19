import checkLazyCanvas from '../utils/checkLazyCanvas'
import type { CompiledFunction } from 'easy-api.ts/lib/classes/internal/CompiledFunction'
import { APIFunction, Data, EATS_Error, ParamType } from 'easy-api.ts'
import { packageName } from '../index'
import { EllipseImageLayer, type LazyCanvas } from '@hitomihiumi/lazy-canvas'

export default class AddEllipseImageLayer extends APIFunction {
    override name = '$addEllipseImageLayer'
    override description = 'Add ellipse image layer to the canvas.'
    override parameters = [
        {
            name: 'URL',
            description: 'URL of the image to add.',
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null
        },
        {
            name: 'X',
            description: 'X coordinate of the image.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        },
        {
            name: 'Y',
            description: 'Y coordinate of the image.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        },
        {
            name: 'Width',
            description: 'Width of the image.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        },
        {
            name: 'Height',
            description: 'Height of the ellipse.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        },
        {
            name: 'Radius',
            description: 'Radius of the ellipse.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        }
    ]
    override usage = '$addEllipseImageLayer[url;x;y;width;height;radius]'
    override returns = ParamType.Unknown
    override compile = true
    override run = async function (this: CompiledFunction, d: Data, values: string[]) {
        const [url, x, y, width, height, radius] = values.map((value) => parseInt(value))
        if (isNaN(x!) || isNaN(y!) || isNaN(width!) || isNaN(height!) || isNaN(radius!)) {
            throw new EATS_Error('Invalid ellipse image layer parameters')
        }

        checkLazyCanvas(d)

        const canvas = d.getInternalVar<LazyCanvas>(packageName)
        const layer = new EllipseImageLayer()
            .setX(x!)
            .setY(y!)
            .setRadius(radius!)
            .setWidth(width!)
            .setHeight(height!)
            .setImage(values[0]!)

        canvas.addLayers(layer)
    }
}
