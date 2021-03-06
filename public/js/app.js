//console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')


const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()//prevent from refreshing
    
    const location = search.value
    messageOne.textContent ='Loading...'
    messageTwo.textContent =''
    
    //migrate fetch
    fetch('/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent= data.error
                console.log(data.error)
            }
            else{
                messageOne.textContent = data.Location
                messageTwo.textContent = data.forecastData
              //console.log(data)  
              //console.log(data.forecast) 
            }
            

        })
    })
})