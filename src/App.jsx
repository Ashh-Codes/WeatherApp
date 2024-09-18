import { useEffect, useState} from 'react'
import imageMedia from  './assets/weather.png'
import React from 'react'

import './App.css'
import { Card, Form } from 'react-bootstrap'
import axios from 'axios'
import { useRef } from 'react'


function App() {
  // const [city,setCity]= useState('')
  const [weather,setweather] = useState(false)
  const [error,seterror] = useState(null)
  const inputRef =useRef()

 
  
      const date = new Date()
      const dateString = date.toString(); 
  

  useEffect(()=>{
    handlesearch("London")
 
  },[])
  const handlesearch=async(city)=>{
   // Replace with your OpenWeatherMap API key
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    try {
      // const response= await axios.get(url)
      const response =await fetch(url)
      const data =await response.json()
      console.log(data);
      
      setweather({
        humidity:data.main.humidity,
        windspeed:data.wind.speed,
        pressure:data.main.pressure,
        temperature:Math.floor(data.main.temp),
         location:data.name,
         country:data.sys.country

      })
      seterror(null)
      
    } catch (error) {
      seterror("City not found")
      setweather(null)
      
    }

  }
  

  return (
    <>
     <div className='d-flex justify-content-center ' style={{minHeight:'100vh',width:'100%',backgroundImage:"linear-gradient(#81D4FA, #2196F3)"}}>
       <div style={{width:'700px',backgroundImage: "linear-gradient(#2196F3, #81D4FA)"}} className='row d-flex bg-light rounded p-5 mt-5 mb-5' >
        
          <div className="col-lg-7" >
            <h2>Weather</h2>
            <img src={imageMedia} style={{width:'100%'}} className='mb-5' alt="" />
             <h1>{weather.location}</h1> 
          <h2>{weather.temperature}°C</h2> 
            
            <p>{dateString}</p>
            


          </div>
          <div className="col-lg-5" style={{backgroundColor: "#607D8B"}}>
            <div className='d-flex mt-3'>
            <Form.Control ref={inputRef} style={{width:'150px'}} type="text" placeholder="Select city" />
            <button  onClick={()=>handlesearch(inputRef.current.value)} className='btn btn-info ms-2'><i className='fa-solid fa-magnifying-glass text-dark '></i></button>
            {
              error&& 
                <p>{error}</p>
            }

            
            </div>
            <Card className='mt-5' style={{height:'400px',backgroundImage:"linear-gradient(#81D4FA, #2196F3)"}}>
      <Card.Body>
        <Card.Title>Weather Details</Card.Title>
        
        <Card.Text className='mt-5 mb-2'>
        
          
          <p>Country:{weather.country}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Pressure:{weather.pressure}</p>
          <p>Wind Speed:{weather.windspeed} Km/h</p> 


        </Card.Text>
        
        
      </Card.Body>
    </Card>
         
           
          </div>

        </div>
        
       
     </div>
    </>
  )
}

export default App
