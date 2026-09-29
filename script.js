 const form = document.querySelector("form");
        const input = document.querySelector("#location")
        const city = document.querySelector(".city");
        const temperature = document.querySelector(".temperature");
        const toggleTemp = document.querySelector("#toggle-temp");
        const condition = document.querySelector(".condition");



let currentTemperature;
let isCelsius = false;


        async function getWeather(location){
    
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=CBSCTZV6YRVADF524ZTKQX7D6`);
            const data = await response.json();
           return data;
            
            
       
        }
       

        function processWeatherData(data){
            return {
                location: data.resolvedAddress,
                temperature: data.currentConditions.temp,
                condition: data.currentConditions.conditions
            };
        }

        // async function test(){
        //     const data = await getWeather("lucknow");
        //     const weather = processWeatherData(data);
        //     console.log(weather);
        // }

        


        form.addEventListener("submit", async function(event){
            event.preventDefault();

            const location = input.value;

            const data = await getWeather(location);
            const weather = processWeatherData(data);

            city.textContent = weather.location;
            condition.textContent = weather.condition;
            currentTemperature = weather.temperature;
            temperature.textContent = `${currentTemperature} °F`;
        });

       toggleTemp.addEventListener("click", function(){
        if(isCelsius){
            temperature.textContent = `${currentTemperature.toFixed(1)} °F`;
            toggleTemp.textContent = "Show °C";
            isCelsius = false;
        } else {
            const celsius = (currentTemperature -32) * 5/9;
            temperature.textContent = `${celsius.toFixed(1)} °C`;
            toggleTemp.textContent = "Show °F"
            isCelsius = true;
        }
       })
