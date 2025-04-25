import  {useState, useEffect} from 'react';
import axios from 'axios';
import {Box} from "@mui/material";
import {defaultImages, mapping} from "../background_mapping.jsx";
import {styled} from '@mui/material/styles';
import Search from "./Search";
import TodayWeather from "./TodayWeather";
import NextDaysWeather from "./NextDaysWeather";
import {useTheme} from '@mui/material/styles';
// import {RainEffectComponent} from "./RainDrop.jsx";
import Errorpage from "./Errorpage";

const Weather = () => {
    const theme =useTheme();

    const [weatherData4, setWeatherData4] = useState(null);
    const [cityName, setCityName] = useState('');
    const [error,setError]=useState(false);


    const images = mapping[weatherData4?.current.condition?.text ] || defaultImages;

    const DivStyle = styled(Box)(({ theme }) => ({
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        textAlign: "center",
        color: "#ffffff",
        minHeight: "100vh", // always at least screen height
        height: "100%", // grow with content
        [theme.breakpoints.down("sm")]: {
            backgroundImage: `url(${images.mobile[Math.floor(Math.random() * images.mobile.length)]})`,
            margin: "0px",
            minHeight: "100vh", // <-- ADD THIS
            height: "100%", // <-- ADD THIS
        },
        [theme.breakpoints.up("md")]: {
            backgroundImage: `url(${images.desktop[Math.floor(Math.random() * images.desktop.length)]})`,
            backgroundAttachment: "fixed", // optional
        },
    }));





    const getLocation = async () => {
        try {
            const response = await axios.get('https://api.weatherapi.com/v1/ip.json', {
                params: { key: '8b58a5298daa4a31948201219232109', q: 'auto:ip' },
            })
            return { lat: response.data.lat, lon: response.data.lon };
        } catch (e) {
            console.log(e)
        }
    };

    // get weather by lat long
    const getWether4DayByLatLong = async (lat, long) => {


        try {

            const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
                params: {
                    key: "8b58a5298daa4a31948201219232109", q: `${lat},${long}`, days: 4, aqi: "no", alerts: "yes"

                }
            })
            setWeatherData4(res.data)


        } catch (e) {
            console.log(e, "getWether4DayByLatLong error  ")
            setError(true)
        }

    };


    // get weather 4 next days forecast  by city name
    const getWether4DayByCity =  async () => {

        try {
            const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
                params: {
                    key: "8b58a5298daa4a31948201219232109", q: cityName, days: 4

                }
            })
            setWeatherData4(res.data)
            // console.log(weatherData4)
        } catch (e) {
            // console.log(e, "getWether4DayByCity ")
        }

    }
    useEffect(() => {
        let call=true;
        if (cityName) {
            getWether4DayByCity()

                   }
        return () => {
            call = false;
        };
    }, [cityName])


    useEffect(() => {
        let call=true
        getLocation()
            .then((r) => {
                getWether4DayByLatLong(r.lat, r.lon)

            })
            .catch((e) => {
                console.log(e)
            })
        return()=>{ call=false}

    }, []);



// Get the next 3 days.
    const nextThreeDays = [];
    for (let i = 0; i <= 3; i++) {
        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + i);
        nextThreeDays.push(nextDay.toLocaleDateString('fa-IR', {weekday: 'long'}));
    }
    const handleClick=(e)=>{
        setCityName(e.target.value)

    }


    return (
        error? <Errorpage/>:
        <DivStyle >
            {/*weatherData4?.current.condition.text   این استیت باید بعنوان پراپس وارد شود ولی چون هوا آفتابی هست 😂 فعلا  استاتیک مقدار دادم که افکت دیده شه */}
            {/*<RainEffectComponent weatherCondition={weatherData4?.current.condition.text}/>*/}

            <Box>

                <Search setCityName={handleClick} cityName={cityName}/>

            </Box>


                <TodayWeather  weatherData4={weatherData4} nextThreeDays={nextThreeDays}/>

        <Box>
            <NextDaysWeather weatherData4={weatherData4} nextThreeDays={nextThreeDays}/>

        </Box>


        </DivStyle>

    )
};

export default Weather;
