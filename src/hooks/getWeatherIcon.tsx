import { useEffect, useState } from "react"

import sunnyIcon from '../assets/images/icon-sunny.webp'
import partlyCloudyIcon from '../assets/images/icon-partly-cloudy.webp'
import overcastIcon from '../assets/images/icon-overcast.webp'
import fogIcon from '../assets/images/icon-fog.webp'
import drizzleIcon from '../assets/images/icon-drizzle.webp'
import rainIcon from '../assets/images/icon-rain.webp'
import snowIcon from '../assets/images/icon-snow.webp'
import stormIcon from '../assets/images/icon-storm.webp'

export const getWeatherIcon = (weatherCode:Array<number|string>=[]) => {
    
    const weatherIcons:string[] = []

    const [icons, setIcons] = useState<Array<string>>()

    const [loaded, setLoaded] = useState<boolean>(false)

    const extractWeatherIcon = async() => {
        try {
            for(let weaCode=0;weaCode<weatherCode.length;weaCode++) {
                if(weatherCode[weaCode] == 0 || weatherCode[weaCode] == 1) {
                    weatherIcons[weaCode] = (sunnyIcon);
                }
                else if(weatherCode[weaCode] == 2) {
                    weatherIcons[weaCode] = (partlyCloudyIcon);
                }
                else if(weatherCode[weaCode] == 3) {
                    weatherIcons[weaCode] = (overcastIcon);
                }
                else if(weatherCode[weaCode] == 45 || weatherCode[weaCode] == 48) {
                    weatherIcons[weaCode] = (fogIcon);
                }
                else if(weatherCode[weaCode] == 51 || weatherCode[weaCode] == 53 || weatherCode[weaCode] == 55) {
                    weatherIcons[weaCode] = (drizzleIcon);
                }
                else if(weatherCode[weaCode] == 61 || weatherCode[weaCode] == 63 || weatherCode[weaCode] == 65 || weatherCode[weaCode] == 80 || weatherCode[weaCode] == 81 || weatherCode[weaCode] == 82) {
                    weatherIcons[weaCode] = (rainIcon);
                }

                else if(weatherCode[weaCode] == 71 || weatherCode[weaCode] == 73 || weatherCode[weaCode] == 75 || weatherCode[weaCode] == 77 || weatherCode[weaCode] == 85 || weatherCode[weaCode] == 86) {
                    weatherIcons[weaCode] = (snowIcon);
                }

                else if(weatherCode[weaCode] == 95 || weatherCode[weaCode] == 96 || weatherCode[weaCode] == 99) {
                    weatherIcons[weaCode] = (stormIcon);
                }
            }
            return weatherIcons
            }
            catch(error) {
                console.log('Failed to get weather icons.',`${error}`)
            }
        } 

        useEffect(() => {
            const getIcons = async() => {
                const icons = await extractWeatherIcon()
                setIcons(icons)
                setLoaded(true)
            }

            getIcons()
        },[weatherCode])
    
        return {icons, loaded};
}
