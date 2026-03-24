import axios from "axios"
import { useEffect, useState } from "react"

export const getWeather = (selectedCountry:string) => {

    const [weatherData, setWeatherData] = useState<any>(null)
    const [weatherCodes, setWeatherCodes] = useState<Array<number>>()

    const [loading, setLoading] = useState<boolean>(false)
    const [location, setLocation] = useState<string>('Afghanistan')
    const[latitude, setLatitude] = useState<number>(0)
    const[longitude, setLongitude] = useState<number>(0)
    const[count, setCount] = useState(1)

    const params = new URLSearchParams({
        latitude:latitude.toString(),
        longitude:longitude.toString(),
        current_weather:'true',
        hourly:'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature,precipitation',
        daily:'temperature_2m_max,temperature_2m_min,weather_code',
        timezone:'auto',
        forecast_days:'7'
    })

    const fetchGeoLocation = async() => {
        try {
            const fetchedData = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${selectedCountry}`)
            setLatitude(fetchedData.data.results[0].latitude)
            setLongitude(fetchedData.data.results[0].longitude)
        }
        catch(error) {
            throw new Error('Failed to fetch geolocation.')
        }
    }

    useEffect(() => {
        fetchGeoLocation()
        console.log(latitude, longitude)
    },[location, latitude, longitude])

    const fetchWeatherData = async() => {
        setLoading(true)
        try {
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?${params}`)
            const data = await response.data
            
            return data
        }
        catch(error) {
            throw new Error('Failed to fetch weather data.')
        }
        finally {
            setLoading(false)
            setCount(2)
        }
    }

    useEffect(() => {
        const getData = async() => {
            const data = await fetchWeatherData()
            setWeatherData(data)
            setWeatherCodes(data.daily.weather_code)
            console.log(weatherData)
        }
        getData()
    },[latitude, longitude])

    useEffect(() => {
        const getData = async() => {
            await fetchGeoLocation()
            const data = await fetchWeatherData()
            setWeatherData(data)
            console.log(weatherData)
        }
        getData()
    },[selectedCountry])    

   
    return {weatherData, weatherCodes, location, loading, count}
}
