import  {useEffect} from 'react';

export const RainEffectComponent = ({weatherCondition}) => {

    const func = () => {

        if ( weatherCondition && weatherCondition.includes("rain")) {
            createRaindrops()
        }
        else if (weatherCondition && weatherCondition.includes("snow")) {
            createSnowflakes()

        }else {

            return
        }
    }


    useEffect(() => {

        func()
    } , []);


    const createRaindrops = () => {
        const numRaindrops = 40; // Number of raindrops to create

        for (let i = 0; i < numRaindrops; i++) {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';

            // Randomly position the raindrops on the screen
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            raindrop.style.left = `${x}px`;
            raindrop.style.top = `${y}px`;

            document.body.appendChild(raindrop);
        }
    };

    const createSnowflakes = () => {
        const numSnowflakes = 70; // Number of snowflakes to create

        for (let i = 0; i < numSnowflakes; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';

            // Randomly position the snowflakes on the screen
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            snowflake.style.left = `${x}px`;
            snowflake.style.top = `${y}px`;
            document.body.appendChild(snowflake);
        }
    };



};





