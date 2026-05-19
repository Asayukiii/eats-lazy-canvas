import { EATSLazyCanvas } from '../src'
import { API } from 'easy-api.ts'

const api = new API({
    addons: [new EATSLazyCanvas(true)],
    dots: false,
    logger: {
        enabled: true,
        msgPrefix: '@eats/api.test.ts'
    },
    reverse: false
})

api.route({
    url: '/hi',
    method: 'get',
    code: `
        $send[
            $setCode[200]
            $setType[json]
            $setBody[{
                message: "Hello world"
            }]
        ]
    `
})

api.connect({
    host: 'localhost',
    port: 2285
})
