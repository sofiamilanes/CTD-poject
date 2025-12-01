const LAT = 35.7796;   // example: Raleigh, NC
const LON = -78.6382;

// Fetch Current Weather
async function getCurrentWeather() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const cur = data.current_weather;

        document.getElementById("current-weather").innerHTML = `
            <p><strong>Temperature:</strong> ${cur.temperature}°C</p>
            <p><strong>Wind Speed:</strong> ${cur.windspeed} km/h</p>
            <p><strong>Weather Code:</strong> ${cur.weathercode}</p>
        `;
    } catch (error) {
        document.getElementById("current-weather").textContent = "Error loading weather data.";
    }
}

// Fetch 7-Day Forecast
async function getForecast() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const dates = data.daily.time;
        const max = data.daily.temperature_2m_max;
        const min = data.daily.temperature_2m_min;

        let html = "<ul>";
        for (let i = 0; i < dates.length; i++) {
            html += `<li>${dates[i]} — High: ${max[i]}°C | Low: ${min[i]}°C</li>`;
        }
        html += "</ul>";

        document.getElementById("forecast").innerHTML = html;

    } catch (error) {
        document.getElementById("forecast").textContent = "Error loading forecast.";
    }
}
