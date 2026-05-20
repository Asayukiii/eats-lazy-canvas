import checkLazyCanvas from '../utils/checkLazyCanvas'
import type { CompiledFunction } from 'easy-api.ts/lib/classes/internal/CompiledFunction'
import { APIFunction, Data, EATS_Error, ParamType } from 'easy-api.ts'
import { packageName } from '../index'
import { EllipseLayer, type LazyCanvas, Outline } from '@hitomihiumi/lazy-canvas'

export default class AddEllipseLayer extends APIFunction {
    override name = '$addEllipseLayer'
    override description = 'Add ellipse layer to the canvas.'
    override parameters = [
        {
            name: 'Color',
            description: 'Color of the ellipse layer. (Hexadecimal)',
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
        },
        {
            name: 'Alpha',
            description: 'Alpha of the ellipse layer. (0-1)',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: null
        },
        {
            name: 'OutlineName',
            description: 'Name of the outline layer.',
            type: ParamType.String,
            required: false,
            rest: false,
            defaultValue: null
        }
    ]
    override usage = '$addEllipseLayer[x;y;width;height;radius;alpha;outlineName]'
    override returns = ParamType.Unknown
    override compile = true
    override run = async function (this: CompiledFunction, d: Data, values: string[]) {
        const [, x, y, width, height, radius, alpha, outlineName] = values.map((value) => parseInt(value))
        if (isNaN(x!) || isNaN(y!) || isNaN(width!) || isNaN(height!) || isNaN(radius!)) {
            throw new EATS_Error('Invalid ellipse image layer parameters')
        }

        checkLazyCanvas(d)

        const canvas = d.getInternalVar<LazyCanvas>(packageName)
        const layer = new EllipseLayer()
            .setX(x!)
            .setY(y!)
            .setRadius(radius!)
            .setWidth(width!)
            .setHeight(height!)
            .setAlpha(alpha!)
            .setColor(values[0]!)

        if (values[7]!) {
            const outline = d.getInternalVar<Outline>(values[7]!)
            layer.setOutline(outline)
        }

        canvas.addLayers(layer)
    }
}
