import checkLazyCanvas from '../utils/checkLazyCanvas'
import type { CompiledFunction } from 'easy-api.ts/lib/classes/internal/CompiledFunction'
import { APIFunction, Data, ParamType, Util } from 'easy-api.ts'
import { ALLOWED_OUTLINE_TYPES, PACKAGE_NAME } from '../index'
import { Outline, type StringOutlineType } from '@hitomihiumi/lazy-canvas'

export default class CreateOutline extends APIFunction {
    override name = '$createOutline'
    override description = 'Create an outline to use in a layer.'
    override parameters = [
        {
            name: 'ID',
            description: 'ID of the outline.',
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null
        },
        {
            name: 'Stroke',
            description: 'Stroke amount of the outline.',
            type: ParamType.Number,
            required: true,
            rest: false,
            defaultValue: '1'
        },
        {
            name: 'Type',
            description: `Type of the outline.`,
            type: ParamType.String,
            required: true,
            rest: false,
            defaultValue: null,
            allowedValues: ALLOWED_OUTLINE_TYPES
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
    override usage = '$createOutline[id]'
    override returns = ParamType.Unknown
    override compile = false
    override run = async function (this: CompiledFunction, d: Data, values: string[]) {
        const data = d.extend(d._, d.__)
        let [outlineId, stroke, type, builders] = values
        checkLazyCanvas(d)

        let max = 3
        for (let i = 0; i < 3; i++) {
            switch (i) {
                case 0:
                    outlineId = await Util.resolveCode(data, outlineId!, 'code')
                    break
                case 1:
                    stroke = await Util.resolveCode(data, stroke!, 'code')
                    break
                case 2:
                    type = await Util.resolveCode(data, type!, 'code')
                    break
            }
        }

        const builtID = `${PACKAGE_NAME}_layer_${outlineId}`
        const outline = new Outline()
            .setStroke(parseInt(stroke!) || 1)
            .setType(<StringOutlineType>type)

        data.setInternalVar(builtID, outline)
        if (builders) {
            await Util.resolveCode(data, builders)
        }
        
        d.setInternalVar(builtID, outline)
    }
}
