import checkLazyCanvas from '../utils/checkLazyCanvas'
import type { CompiledFunction } from 'easy-api.ts/lib/classes/internal/CompiledFunction'
import { APIFunction, Data, EATS_Error, ParamType, Util } from 'easy-api.ts'
import { ALLOWED_CENTERING_VALUES, PACKAGE_NAME, SHARED_FUNCTIONS_DIRECTORY } from '../index'
import { EllipseLayer, type LazyCanvas, Outline, type StringCentering } from '@hitomihiumi/lazy-canvas'

export default class AddEllipseLayer extends APIFunction {
    override name = '$addEllipseLayer'
    override description = 'Add ellipse layer to the canvas.'
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
            name: 'Centering',
            description: `Centering method of the layer.`,
            type: ParamType.String,
            required: false,
            rest: false,
            defaultValue: null,
            allowedValues: ALLOWED_CENTERING_VALUES
        },
        {
            name: 'Builders',
            description: 'Code builders for the layer.\nSee docs for more information.',
            type: ParamType.String,
            required: false,
            rest: false,
            defaultValue: null
        }
    ]
    override usage = '$addEllipseLayer[id]'
    override returns = ParamType.Unknown
    override compile = false
    override run = async function (this: CompiledFunction, d: Data, values: string[]) {
        const data = d.extend(d._, d.__)
        let [id, centering, builders] = values

        checkLazyCanvas(d)

        const builtID = `${PACKAGE_NAME}_layer_${id}`
        const canvas = d.getInternalVar<LazyCanvas>(PACKAGE_NAME)
        const ellipse = new EllipseLayer().setID(builtID)
        data.setInternalVar(builtID, ellipse)

        if (centering) ellipse.setCentering(<StringCentering>centering);

        data.functions.load(SHARED_FUNCTIONS_DIRECTORY)
        if (builders) {
            await Util.resolveCode(data, builders)
        }

        canvas.addLayers(ellipse)
    }
}
