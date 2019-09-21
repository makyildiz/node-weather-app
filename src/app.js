const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join('__dirname', '../templates/views')
const partialsPath = path.join('__dirname', '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mesut Akyildiz'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mesut Akyildiz'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mesut Akyildiz',
        messageTitle: 'Problems solved'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mesut Akyildiz',
        errorMessage: 'Help article not found'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address entered'
        })
    }
    
    geocode(req.query.address, (error, { longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({error})
        } else if (longitude === undefined ){
            return res.send({
                error: 'Unable to find the location'
            })
        }
    
        weather(longitude, latitude, (error, forecast) => {
            if (error) {
                return res.send({error})
            }    
            
            res.send({
                location,
                summary: `Boylam ${longitude}, Enlem: ${latitude}. Sıcaklık: ${forecast.temperature} derece. ${forecast.summary} Yağmur olasılığı %${forecast.rain}`
            })
        })  
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mesut Akyildiz',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

//******* Extra Info 
//** no need 'get handlers', we are using static pages under public directory
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([
//         {name: 'Mesut'},
//         {name: 'Baha'}
//         ])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })