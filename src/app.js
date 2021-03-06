
const path =require('path')
const express = require('express')
const hbs =require('hbs')

//loading libraries of geocode and forecast
const geocode = require('./utils/geocode.js')
const forecast =require('./utils/forecast')

const app = express()

//create port value for horeku
const port =process.env.PORT || 3000
//Define paths for express config

const publicDirectoryPath =path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views locations
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
//app.com

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather',
        name:'Andrew'
    })
})


app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About me',
        name:'Andrew'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        message:'Search for help',
        title:'Help',
        name:'Andrew'
    })
})
//weather
app.get('/weather',(req, res) => {

    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    
      geocode(req.query.address,(error, {Latitude, Longitude, Location}={})=>{
        if(error){
            return res.send({error})
            //return console.log(error)
        }

        forecast(Latitude, Longitude, (error, forecastData)=> {
        
        if(error){
            return res.send({error})
        }
        res.send({Location, forecastData})
        //res.send({Location, 'forecast':forecastData})
        //console.log({Location, 'Weather forecast':forecastData})
        })  
      })
    }

)

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Error',
        errorTxt:'Help article not found',
        name:'Andrew'
    })
    //res.send('Help article not found')
})
app.get('*', (req, res) =>{
    res.render('404',{
        title:'Error',
        errorTxt:'Page not found',
        name:'Andrew'
    })
    //res.send('My 404 page')
})


app.listen(port, () =>{
    console.log('Server is up on port '+port)
})