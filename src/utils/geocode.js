const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FmZXNob3AiLCJhIjoiY2swY2R0NXR4MTB4MDNsbnd6a3BqMzdjbCJ9.tnkRxL4MjK9dtoYbIOmfEA'

    request({ url, json:true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the server!', undefined)
        } else if (body.features.length === 0) {
            callback(undefined, 'Unable to find the location.')
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode