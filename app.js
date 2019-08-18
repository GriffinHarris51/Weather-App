window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let temperatureSection = document.querySelector('.temperature')
    const temperatureSpan = document.querySelector('.temperature span')

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/f6e9310138cd27beba031c0d9d7bf0fa/${lat},${long}`

            fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const { temperature, summary, icon } = data.currently
                // Set DOM elements from API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                let celsius = (temperature - 32) * (5/9);

                setIcons(icon, document.querySelector('.icon'));

                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else {
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = temperature;
                    }
                })

            })
        })
    }

    function setIcons(icon, iconID) {
        const skycons = new skycons ({color: 'white'});
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();   
        skycons.play();
        return skycons.set(iconId, skycons[currentIcon]);
    }
})