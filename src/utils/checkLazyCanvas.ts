import { type Data, EATS_Error } from 'easy-api.ts'
import { packageName } from '..'

/**
 * Checks if the canvas instance exists.
 * @param d Data from the compiled function.
 * @throws {EATS_Error} If the canvas instance does not exist.
 * @returns {boolean} True if the canvas instance exists.
 */
export default function checkLazyCanvas(d: Data): boolean {
    if (d.internalVarExists(packageName) === false) {
        throw new EATS_Error('Canvas instance does not exist. Ensure you have created a canvas instance using $createLazyCanvas.')
    }
    return true
}
