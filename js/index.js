const input = document.querySelector('input')
const btn = document.querySelector('.btn')


function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    document.getElementById('clock').textContent = time;
}
setInterval(updateTime, 1000);





btn.addEventListener('click', getWeather)


function getWeather() {
    let add = input.value
    let anim = document.querySelector('.animate__animated')
    anim.innerHTML = ''


    let xhr = new XMLHttpRequest()
    xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${add}&appid=69ff08276d2b60c577844250876cd4b2`)

    xhr.onload = function () {
        let arr = JSON.parse(xhr.response)
        let idIcon = arr.weather[0].icon

        console.log(arr)

        function addIcon() {

            let blockIcon = document.querySelector('.block-icon')
            let imgIcon = document.createElement('img')
            imgIcon.src = `https://openweathermap.org/img/wn/${idIcon}.png`
            imgIcon.alt = 'hello'
            blockIcon.innerHTML = ''
            blockIcon.append(imgIcon)
        }

        addIcon()

        function addTemp() {
            let tempInfo = arr.main.temp
            let tempInfoToC = Math.trunc(tempInfo - 273.15)
            let h1 = document.querySelector('h1')
            h1.innerHTML = `${tempInfoToC}℃`
        }

        addTemp()

        function addName() {
            let name = document.querySelector('.name')
            name.innerHTML = `${arr.name}:`
        }

        addName()

        function addMoreInfo() {
            let info1 = document.querySelector('.inf-1')
            let info2 = document.querySelector('.inf-2')
            let info3 = document.querySelector('.inf-3')
            let feelsLike = Math.trunc(arr.main.feels_like - 273.15)
            let humidity = Math.trunc(arr.main.humidity)
            let pressure = Math.trunc(arr.main.pressure)

            info1.innerHTML = `Feels like: ${feelsLike}℃`
            info2.innerHTML = `Humidity: ${humidity}%`
            info3.innerHTML = `Pressure: ${pressure}mbar`

            console.log(arr.main)
        }

        addMoreInfo()

        function addTerms() {
            let terms = document.querySelector('.terms')
            let gifBlock = document.querySelector('.gif-block')
            let getTerms = arr.weather[0].main
            terms.innerHTML = arr.weather[0].description.toUpperCase()

            if (getTerms === 'Clouds') {
                gifBlock.innerHTML = ''
                let img = document.createElement('img')
                img.src = 'image/Clouds.gif'
                img.alt = ''
                gifBlock.append(img)
            } else if (getTerms === 'Rain') {
                gifBlock.innerHTML = ''
                let img = document.createElement('img')
                img.src = 'image/Rain.gif'
                img.alt = ''
                gifBlock.append(img)
            } else if (getTerms === 'Thunderstorm') {
                gifBlock.innerHTML = ''
                let img = document.createElement('img')
                img.src = 'image/storm.gif'
                img.alt = ''
                gifBlock.append(img)

            } else if (getTerms === 'Snow') {
                gifBlock.innerHTML = ''
                let img = document.createElement('img')
                img.src = 'image/snow.gif'
                img.alt = ''
                gifBlock.append(img)
            } else if (getTerms === 'Mist') {
                gifBlock.innerHTML = ''
                let img = document.createElement('img')
                img.src = 'image/mist.gif'
                img.alt = ''
                gifBlock.append(img)
            } else if (getTerms === 'Clear') {
                gifBlock.innerHTML = ''
                let img = document.createElement('img')
                img.src = 'image/sky.gif'
                img.alt = ''
                gifBlock.append(img)
            }

        }

        addTerms()

        function addToSearchBlock() {

            const ulBlock = document.querySelector('.text')
            const item = document.createElement('li')
            const close = document.createElement('span')
            close.innerHTML = '&#10006;'
            close.classList.add('close')

            item.innerHTML = `<span class="item">${add}</span>`
            item.append(close)
            ulBlock.append(item)

        }

        addToSearchBlock()


        function deleteBlock() {
            let arrayClose = document.querySelectorAll('.close')
            arrayClose.forEach(function (elem) {
                elem.addEventListener('click', function () {
                    let deleteObj = elem.parentElement
                    deleteObj.remove()
                })

            })
        }

        deleteBlock()


        function showToMap() {
            let map;

            async function initMap() {
                // The location of Uluru
                const position = {lat: arr.coord.lat, lng: arr.coord.lon};
                // Request needed libraries.
                //@ts-ignore
                const {Map} = await google.maps.importLibrary("maps");
                const {AdvancedMarkerView} = await google.maps.importLibrary("marker");

                // The map, centered at Uluru
                map = new Map(document.getElementById("map"), {
                    zoom: 10,
                    center: position,
                    mapId: 'f653f9278cbf6ad0'

                });

                // The marker, positioned at Uluru
                const marker = new AdvancedMarkerView({
                    map: map,
                    position: position,
                    title: "Uluru",
                });
            }

            initMap();


        }

        showToMap()


    }
    let val = document.querySelector('input')
    val.value = ''

    xhr.send()


}

// Initialize and add the map









