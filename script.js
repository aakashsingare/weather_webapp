const input = document.getElementById('input');
const button = document.getElementById('search');
const container = document.getElementById('container');
const apiKey = 'ec224bde787c4001b0281007251802'

async function weather(params) {
    
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${params}&aqi=yes`);
        
        if (!response.ok) {  
            throw new Error(`City not found! (${response.status})`);  
        }

        return await response.json();
    } catch (error) {
        console.log("❌ Error fetching data:", error.message);
    }
}

button.addEventListener('click', async ()=>{
    let city = input.value.trim()
    if(!city){
        alert('city name cannot be empty'); return;
    }
    let result = await weather(city);
   container.innerHTML= `<h3>🌍 Weather in ${result.location.name}, ${result.location.country}</h3>,
   <p>🌡️ Temperature: ${result.current.temp_c}°C</p>,
   <p>☁️ Condition: ${result.current.condition.text}</p>,
   <p>💨 Wind Speed: ${result.current.wind_kph} km/h</p>,
   <p>🌬️ Air Quality Index: ${result.current.air_quality.pm10}</p>`;
});