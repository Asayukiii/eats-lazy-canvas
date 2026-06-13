import { EATSLazyCanvas } from '../src'
import { API } from 'easy-api.ts'

const api = new API({
    addons: [new EATSLazyCanvas()],
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
    code: '$oldSend[200;json;{ "message":"hello world" }]'
})

api.connect({
    host: 'localhost',
    port: 2285
})
