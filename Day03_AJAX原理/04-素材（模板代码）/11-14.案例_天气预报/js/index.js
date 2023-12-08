/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */
// 封装获取天气数据的函数
function getWeatherData(cityCode) {
    // 调用自己的封装的axios
    myAxios({
        url: 'http://hmajax.itheima.net/api/weather',
        params: {
            city: cityCode
        }
    }).then(result => {
        console.log(result);
        // 1.2 数据展示到页面
        // 1.2.1 获取数据
        const data = result.data;
        // 日期
        const date = `<span class="dateShort">${data.dateShort}</span>
        <span class="calendar">农历&nbsp;
          <span class="dateLunar">${data.dateLunar}</span>
        </span>`

        document.querySelector('.title').innerHTML = date;

        document.querySelector('.area').innerHTML = data.area;

        const weather = `<div class="tem-box">
          <span class="temp">
            <span class="temperature">${data.temperature}</span>
            <span>°</span>
          </span>
        </div>
        <div class="climate-box">
          <div class="air">
            <span class="psPm25">${data.psPm25}</span>
            <span class="psPm25Level">${data.psPm25Level}</span>
          </div>
          <ul class="weather-list">
            <li>
              <img src="${data.weatherImg}" class="weatherImg" alt="">
              <span class="weather">${data.weather}</span>
            </li>
            <li class="windDirection">${data.windDirection}</li>
            <li class="windPower">${data.windPower}</li>
          </ul>
        </div>`

        document.querySelector('.weather-box').innerHTML = weather;

        // 当天天气
        const today = `<div class="range-box">
          <span>今天：</span>
          <span class="range">
            <span class="weather">${data.todayWeather.weather}</span>
            <span class="temNight">${data.todayWeather.temNight}</span>
            <span>-</span>
            <span class="temDay">${data.todayWeather.temDay}</span>
            <span>℃</span>
          </span>
        </div>
        <ul class="sun-list">
          <li>
            <span>紫外线</span>
            <span class="ultraviolet">${data.todayWeather.ultraviolet}</span>
          </li>
          <li>
            <span>湿度</span>
            <span class="humidity">${data.todayWeather.humidity}</span>%
          </li>
          <li>
            <span>日出</span>
            <span class="sunriseTime">${data.todayWeather.sunriseTime}</span>
          </li>
          <li>
            <span>日落</span>
            <span class="sunsetTime">${data.todayWeather.sunsetTime}</span>
          </li>
        </ul>`

        document.querySelector('.today-weather').innerHTML = today;

        // 七日天气预报的展示
        const dayseven = data.dayForecast;
        // 将数组中的每一项都转换成li,返回一个打的数组
        const daysenvenstring = dayseven.map(item => {
            return `<li class="item">
        <div class="date-box">
          <span class="dateFormat">${item.dateFormat}</span>
          <span class="date">${item.date}</span>
        </div>
        <img src="${item.weatherImg}" alt="" class="weatherImg">
        <span class="weather">${item.weather}</span>
        <div class="temp">
          <span class="temNight">${item.temNight}</span>-
          <span class="temDay">${item.temDay}</span>
          <span>℃</span>
        </div>
        <div class="wind">
          <span class="windDirection">${item.windDirection}</span>
          <span class="windPower">${item.windPower}</span>
        </div>
      </li>`
        }).join('')

        document.querySelector('.week-wrap').innerHTML = daysenvenstring;
    })

}

// 根据输入的城市名字获取城市的天气数据
// 绑定input事件获取关键字

document.querySelector('.search-city').addEventListener('input', function (e) {
    console.log(e.target.value);

    // 调用自己的封装的axios
    myAxios({
        url: 'http://hmajax.itheima.net/api/weather/city',
        params: {
            city: e.target.value
        }
    }).then(result => {
        console.log(result);
        // 1.2 数据展示到页面
        // 1.2.1 获取数据
        const data = result.data;
        // 日期
        const citys = data.map(item => {
            return `<li class="city-item" data-code="${item.code}">${item.name}</li>`
        }).join('')

        document.querySelector('.search-list').innerHTML = citys;
    })
})


// 给ul绑定事件委托
document.querySelector('.search-list').addEventListener('click', function (e) {
    if (e.target.classList.contains('city-item')) {
        console.log(e.target.innerText);
        // 调用获取天气数据的函数
        getWeatherData(e.target.dataset.code)
    }
})


// getWeatherData('110100')