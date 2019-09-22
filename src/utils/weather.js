const request = require('request');

const weather = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/9b2860dd6cc8a80668b7ac6def95a250/${latitude},${longitude}?lang=tr&units=si`
    request({ url, json:true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast server!', undefined)
        } else if (body.error) {
            callback(undefined, 'Unable to find the location. Try another!')
        } else {
            callback(undefined, 'Boylam: ' + longitude + ' Enlem: ' + latitude + ' ' + body.daily.data[0].summary + ' Şu anda ' + body.currently.temperature + ' derece. ' + 'Yağmur olasılığı %' + body.currently.precipProbability)
        }
    })
}

module.exports = weather