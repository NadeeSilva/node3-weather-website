const request =require('postman-request')

const forecast =(latitude, longitude, callback)=>{

    //oldconst url = 'http://api.weatherstack.com/current?access_key=835fe97b2a94a32a54e5b8aebc28c0d4&query='+latitude +','+ longitude +'&units=m'
    const url = 'http://api.weatherstack.com/current?access_key=2e1a675fa4883afbfe58634f0081db84&query='+latitude +','+ longitude +'&units=m'

    request({url, json:true}, (error,{body}={})=>{
        //callback(undefined, url)
        if(error){
            callback('Unable to connect to internet', undefined)
        }
        else if(body.error){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, (body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out' ))
        }
    })

}
module.exports = forecast








// request({ url: url, json: true }, (error, response) => {
//     //console.log(response.body.current)
//     if (error) {
//         console.log('Unable to connect to weather service')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     }
//     else {
//         console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out')
//     }
// })