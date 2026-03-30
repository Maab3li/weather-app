import type React from 'react'
import './App.css'
import logo from './assets/images/logo.svg'
import settingsIcon from './assets/images/icon-units.svg'
import searchIcon from './assets/images/icon-search.svg'
import bgTodaySm from './assets/images/bg-today-small.svg'
import bgTodayLg from './assets/images/bg-today-large.svg'
import { getWeather } from './hooks/getWeather'
import { Suspense, useState } from 'react'
import { getWeatherIcon } from './hooks/getWeatherIcon'

const App: React.FC = () => {

  const [country, setCountry] = useState<string>('Afghanistan')

  let selectedHourlyDay = 0

  const {weatherData, weatherCodes, count} =  getWeather(country)

  const date = new Date().toDateString().split(' ').join(', ').replace(',',' ').replace(',',' ').replace(' ',',')

  const handleClick = (e:any) => {
    e.preventDefault()
    const selectedCountry = country
  }

  console.log(weatherData)

  const dailyData = [0,1,2,3,4,5,6]

  const getDay = (passedDate:Date, charsToSlice:number) => {
    const date = new Date(passedDate).toLocaleDateString(undefined, {weekday:'long'}).slice(0,charsToSlice)
    return date
  }

  const {icons,loaded} = getWeatherIcon(weatherCodes)

  {/*Function to slice hourly data arrays to extract hourly data for seperate days*/}
  const getHourlyData = (hourlyAttr:Array<number>) => {
    let resultingArray = []

    for(let i=0;i<hourlyAttr?.length;i+=24) {
        resultingArray.push(hourlyAttr.slice(i,i+24))
      }

    console.log(resultingArray)
    return resultingArray
  }

  const handleChange = (e:any) => {
    e.preventDefault()
    selectedHourlyDay = e.target.value
    console.log(selectedHourlyDay)
  }
  
  const hourlyTemperatures = getHourlyData(weatherData?.hourly.temperature_2m)
  const hourlyCodes = getHourlyData(weatherData?.hourly.weather_code)
  console.log(hourlyCodes)

  return (
    <div className='bg-[#03012d] w-[100%] min-h-[100vh]'>
      <header className='inline-flex w-[100%] p-5 justify-between items-center'>
        <span>
          <img src={logo} alt='logo' />
        </span>
        <span className='flex justify-center items-center bg-[#272541] text-[#ffffff] p-2 gap-1 rounded-lg'>
          <img src={settingsIcon} alt='drizzle icon'/>
          <select className='w-16'>
            <optgroup>
                <option value=''>Units</option>
            </optgroup>
          </select>
        </span>
      </header>
      <main>
        {/*App main header*/}
        <h1 id='header' className='text-[#ffffff] text-center font-bricolage font-700 px-10 py-10'>
          How's the sky looking today
        </h1>
        {/*Country search bar*/}
        <div className='flex flex-col justify-center items-center w-[100%] px-5 gap-3 sm:flex-row *:tracking-[.7px] '>
          <div className='inline-flex bg-[#312f4b] w-[100%] px-4 py-3 gap-3 rounded-lg sm:w-[50%]'>
            <img src={searchIcon} alt='search icon' />
            <input name='searchInput' id='searchInput' type='text'  placeholder='Search for a place...' onChange={e => setCountry(e.target.value ==''?'Afghanistan':e.target.value)} className='bg-[#312f4b] border-[#312f4b] w-[100%] placeholder-[#aeaeb7]' />
          </div>
          <button id='submit' type='submit' onClick={handleClick} className='w-[100%] bg-[#4455da] py-3 rounded-lg sm:w-[20%]'>Search</button>
        </div>
        {/*Current weather temprature and date*/}
        <div className='relative bg-red-200 place-self-center justify-center items-center  w-[350px] sm:w-[80%] h-[300px] sm:h-[230px]  sm:mx-15 sm:justify-center mt-10 '>
          <img src={bgTodaySm} alt='bg today small image' className='absolute sm:invisible'/>
          <img src={bgTodayLg} alt='bg today large image' className='absolute justify-center object-fill invisible sm:visible'/>
          <div className='absolute w-[100%] p-10 mr-auto items-center h-[300px] sm:h-[180px] sm:flex sm:flex-row'>
            <div className='relative flex flex-col items-center  w-[100%] h-[100%] text-center sm:mr-auto sm:flex sm:flex-col sm:text-start sm:items-start sm:place-items-center'>
              <div id='location' className='absolute text-[30px] font-900'>{country}</div>
              <div id='date' className='absolute text-[18px] pt-15'>{date}</div>
            </div>
            <div className='flex flex-row justify-between relative w-[100%] justify-center'>
              <img src={loaded?icons[1]:undefined} alt='weather icon' className='w-[80px] h-[80px]' />
              <div id='temperature' className='relative sm:ml-8 text-[60px] font-bold'>{count == 2 && weatherData.current_weather.temperature}{count == 2 && weatherData.current_weather_units.temperature[0]}</div>
            </div>
          </div> 
        </div>

        {/*Current weather info*/}  
        <div className='grid grid-cols-2 px-5 pt-2 gap-5 sm:mt-30 md:grid-cols-4 md:w-[600px] md:px-15'>
          <div className='relative flex flex-col bg-[#272541] p-5 border-1 border-[#3d3b5e] gap-5 rounded-xl'>
            <span className='relative text-[18px] text-[#d5d4d9]'>Feels like</span>
            <span className='relative text-[20px]'>{count == 2 && weatherData.hourly.apparent_temperature[0]}{count == 2 && weatherData.current_weather_units.temperature[0]}</span>
          </div>
          <div className='relative flex flex-col bg-[#272541] p-5 border-1 border-[#3d3b5e] gap-5 rounded-xl'>
            <span className='relative text-[18px] text-[#d5d4d9]'>Humidity</span>
            <span className='relative text-[20px]'>{count == 2 && weatherData.hourly.relative_humidity_2m[0]}%</span>
          </div>
          <div className='relative flex flex-col bg-[#272541] p-5 border-1 border-[#3d3b5e] gap-5 rounded-xl'>
            <span className='relative text-[18px] text-[#d5d4d9]'>Wind</span>
            <span className='relative text-[20px]'>{count == 2 && weatherData.hourly.wind_speed_10m[0]} {count == 2 && weatherData.current_weather_units.windspeed}</span>
          </div>
          <div className='relative flex flex-col bg-[#272541] p-5 border-1 border-[#3d3b5e] gap-5 rounded-xl'>
            <span className='relative text-[18px] text-[#d5d4d9]'>Precipitation</span>
            <span className='relative text-[20px]'>{count == 2 && weatherData.hourly.precipitation[0]} {count == 2 && weatherData.hourly_units.precipitation}</span>
          </div>
        </div>
        {/*Daily forecast*/}
        <div className='px-5 py-10'>
          <div className='text-[18px] text-[#ffffff] font-[500] tracking-[.3px] pb-5'>Daily forecast</div>
          <div className='grid grid-cols-3 gap-5'>
            {dailyData.map((index) => (
              <div key={index} className='flex flex-col bg-[#272541] px-3 py-3 gap-2 border-[#3d3b5e] border-[1px] rounded-xl'>
                <span className='text-center'>{count == 2 && getDay(weatherData?.daily.time[index==6?0:index+1], 3)}</span>
                <span>
                  <Suspense fallback={<span>Loading...</span>}>
                    <img src={loaded?icons[index]:undefined} alt='weather icon' />
                  </Suspense>
                </span>
                <span className='flex justify-between *:tracking-[.5px]'>
                  <span>{count == 2 && weatherData?.daily.temperature_2m_max[index]}{count == 2 && weatherData?.daily_units.temperature_2m_max[0]}</span>
                  <span>{count == 2 && weatherData?.daily.temperature_2m_min[index]}{count == 2 && weatherData?.daily_units.temperature_2m_min[0]}</span>
                </span>
              </div>
            ))}
          </div>
          {/*Hourly forecast part*/}
          <div className='flex flex-col bg-[#272541] mt-10 px-5 py-5 rounded-xl'>
            <div className='flex justify-between'>
              <span>Hourly forecast</span>
              <span className='flex bg-[#3d3b5e] justify-center items-center w-30  rounded-lg'>
                <select onChange={handleChange} className='flex justify-center items-center bg-[#3d3b5e] w-25 py-2'>
                  <optgroup>
                    <option value={0}>{count == 2 && getDay(weatherData?.daily.time[1], 10)}</option>
                    <option value={1}>{count == 2 && getDay(weatherData?.daily.time[2], 10)}</option>
                    <option value={2}>{count == 2 && getDay(weatherData?.daily.time[3], 10)}</option>
                    <option value={3}>{count == 2 && getDay(weatherData?.daily.time[4], 10)}</option>
                    <option value={4}>{count == 2 && getDay(weatherData?.daily.time[5], 10)}</option>
                    <option value={5}>{count == 2 && getDay(weatherData?.daily.time[6], 10)}</option>
                    <option value={6}>{count == 2 && getDay(weatherData?.daily.time[0], 10)}</option>
                  </optgroup>
                </select>
              </span>
            </div>
            <div className='flex-col p-3 *:rounded-lg'>
              {hourlyCodes[selectedHourlyDay]&&hourlyTemperatures[selectedHourlyDay]? (
                <div>
                  <div className='flex flex-row justify-between bg-[#312f4b] border-1 mt-3 border-[#3d3b5e] p-3'>
                    <div className='flex gap-3 items-center'>
                      <img src={loaded?icons[hourlyCodes[selectedHourlyDay][15]]:''} alt='weather code icon' width={30} height={30} />
                      <span>3PM</span>
                    </div>
                    <div>{hourlyTemperatures[selectedHourlyDay][15]}{count == 2 && weatherData.current_weather_units.temperature[0]}</div>
                  </div>
                  <div className='flex flex-row justify-between bg-[#312f4b] border-1 mt-3 border-[#3d3b5e] p-3'>
                    <div className='flex gap-3 items-center'>
                      <img src={loaded?icons[hourlyCodes[selectedHourlyDay][16]]:''} alt='weather code icon' width={30} height={30} />
                      <span>4PM</span>
                    </div>
                    <div>{hourlyTemperatures[selectedHourlyDay][16]}{count == 2 && weatherData.current_weather_units.temperature[0]}</div>
                  </div>
                  <div className='flex flex-row justify-between bg-[#312f4b] border-1 mt-3 border-[#3d3b5e] p-3'>
                    <div className='flex gap-3 items-center'>
                      <img src={loaded?icons[hourlyCodes[selectedHourlyDay][17]]:''} alt='weather code icon' width={30} height={30} />
                      <span>5PM</span> 
                    </div>
                    <div>{hourlyTemperatures[selectedHourlyDay][17]}{count == 2 && weatherData.current_weather_units.temperature[0]}</div>
                  </div>
                  <div className='flex flex-row justify-between bg-[#312f4b] border-1 mt-3 border-[#3d3b5e] p-3'>
                    <div className='flex gap-3 items-center'>
                      <img src={loaded?icons[hourlyCodes[selectedHourlyDay][18]]:''} alt='weather code icon' width={30} height={30} />
                      <span>6PM</span> 
                    </div>
                    <div>{hourlyTemperatures[selectedHourlyDay][18]}{count == 2 && weatherData.current_weather_units.temperature[0]}</div>
                  </div>
                  <div className='flex flex-row justify-between bg-[#312f4b] border-1 mt-3 border-[#3d3b5e] p-3'>
                    <div className='flex gap-3 items-center'>
                      <img src={loaded?icons[hourlyCodes[selectedHourlyDay][19]]:''} alt='weather code icon' width={30} height={30} />
                      <span>7PM</span>
                    </div>
                    <div>{hourlyTemperatures[selectedHourlyDay][20]}{count == 2 && weatherData.current_weather_units.temperature[0]}</div>
                  </div>
                  <div className='flex flex-row justify-between bg-[#312f4b] border-1 mt-3 border-[#3d3b5e] p-3'>
                    <div className='flex gap-3 items-center'>
                      <img src={loaded?icons[hourlyCodes[selectedHourlyDay][21]]:''} alt='weather code icon' width={30} height={30} />
                      <span>8PM</span>
                    </div>
                    <div>{hourlyTemperatures[selectedHourlyDay][21]}{count == 2 && weatherData.current_weather_units.temperature[0]}</div>
                  </div>
                  <div className='flex flex-row justify-between bg-[#312f4b] border-1 mt-3 border-[#3d3b5e] p-3'>
                    <div className='flex gap-3 items-center'>
                      <img src={loaded?icons[hourlyCodes[selectedHourlyDay][22]]:''} alt='weather code icon' width={30} height={30} />
                      <span>9PM</span>
                    </div>
                    <div>{hourlyTemperatures[selectedHourlyDay][22]}{count == 2 && weatherData.current_weather_units.temperature[0]}</div>
                  </div>
                  <div className='flex flex-row justify-between bg-[#312f4b] border-1 mt-3 border-[#3d3b5e] p-3'>
                    <div className='flex gap-3 items-center'>
                      <img src={loaded?icons[hourlyCodes[selectedHourlyDay][23]]:''} alt='weather code icon' width={30} height={30} />
                      <span>10PM</span>
                    </div>
                    <div>{hourlyTemperatures[selectedHourlyDay][23]}{count == 2 && weatherData.current_weather_units.temperature[0]}</div>
                  </div>
              </div>
              ): (
                <div>Data is loading...</div>
              )}
              
            </div>
            </div>
          
        </div>
        
      </main>
    </div>  
  )
}

export default App
