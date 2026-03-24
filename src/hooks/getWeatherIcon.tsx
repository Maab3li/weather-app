import { useEffect, useState } from "react"

export const getWeatherIcon = (weatherCode:Array<number|string>=[]) => {
    
    const weatherIcons:string[] = []

    const [icons, setIcons] = useState<Array<string>>()

    const [loaded, setLoaded] = useState<boolean>(false)

    const extractWeatherIcon = async() => {
        try {
            for(let weaCode=0;weaCode<weatherCode.length;weaCode++) {
                if(weatherCode[weaCode] == 0 || weatherCode[weaCode] == 1) {
                    weatherIcons[weaCode] = ('/src/assets/images/icon-sunny.webp');
                }
                else if(weatherCode[weaCode] == 2) {
                    weatherIcons[weaCode] = ('/src/assets/images/icon-partly-cloudy.webp');
                }
                else if(weatherCode[weaCode] == 3) {
                    weatherIcons[weaCode] = ('/src/assets/images/icon-overcast.webp');
                }
                else if(weatherCode[weaCode] == 45 || weatherCode[weaCode] == 48) {
                    weatherIcons[weaCode] = ('/src/assets/images/icon-fog.webp');
                }
                else if(weatherCode[weaCode] == 51 || weatherCode[weaCode] == 53 || weatherCode[weaCode] == 55) {
                    weatherIcons[weaCode] = ('/src/assets/images/icon-drizzle.webp');
                }
                else if(weatherCode[weaCode] == 61 || weatherCode[weaCode] == 63 || weatherCode[weaCode] == 65 || weatherCode[weaCode] == 80 || weatherCode[weaCode] == 81 || weatherCode[weaCode] == 82) {
                    weatherIcons[weaCode] = ('/src/assets/images/icon-rain.webp');
                }

                else if(weatherCode[weaCode] == 71 || weatherCode[weaCode] == 73 || weatherCode[weaCode] == 75 || weatherCode[weaCode] == 77 || weatherCode[weaCode] == 85 || weatherCode[weaCode] == 86) {
                    weatherIcons[weaCode] = ('/src/assets/images/icon-snow.webp');
                }

                else if(weatherCode[weaCode] == 95 || weatherCode[weaCode] == 96 || weatherCode[weaCode] == 99) {
                    weatherIcons[weaCode] = ('/src/assets/images/icon-storm.webp');
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
