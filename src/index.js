import "./style.css";
import darkModeIcon from "./images/dark-mode.png";
import lightModeIcon from "./images/light-mode.png";
class App {
  constructor() {
    this.cacheDom();
    this.addEventListeners();
  }

  cacheDom() {
    this.toggleBackgroundModeBtn = document.getElementById(
      "toggle-background-mode"
    );
    this.toggleBackgroundModeImg = document.getElementById(
      "toggle-background-mode-img"
    );
    this.form = document.querySelector("form");
    this.formInput = document.getElementById("weather-input");
    this.weatherAppCard = document.getElementById("weather-app-card");
  }

  addEventListeners() {
    this.toggleBackgroundModeBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("light");
      this.changeBackgroundModeBtnImage();
    });


    this.formInput.addEventListener("input", () => this.validateInput());

    this.form.addEventListener("submit", (e) => {
      this.validateInput();
      if (!this.form.checkValidity()) {
        e.preventDefault();
        this.form.reportValidity();
      } else {
        e.preventDefault();
        while (this.weatherAppCard.lastChild != this.form) {
          this.weatherAppCard.removeChild(this.weatherAppCard.lastChild);
        }
        const formData = new FormData(this.form);
        let input = formData.get("weather-input");
        input = input.toLocaleLowerCase();
        this.getData(input)
          .then((response) => {
            const data = response;
            this.renderData(data);
          })
          .catch((error) => {
            alert(error);
          });
        this.form.reset();
      }
    });
  }

  changeBackgroundModeBtnImage() {
    if (document.documentElement.classList.contains("light")) {
      this.toggleBackgroundModeImg.src = darkModeIcon;
    } else {
      this.toggleBackgroundModeImg.src = lightModeIcon;
    }
  }

  async getData(inputCity) {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputCity}?unitGroup=us&key=85MWNWHLAEED86Y8LGBKMX59G&contentType=json`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      console.log(json.days);
      const city = this.titleCase(inputCity);
      const temp = Math.round(((parseInt(json.days[0].temp) - 32) * 5) / 9);
      const description = json.days[0].description;
      const icon = json.days[0].icon;
      return { city: city, temp: temp, description: description, icon: icon };
    } catch (error) {
      alert("Cannot fetch temperature data", error);
    }
  }

  renderData(data) {
    const icons = require.context("./images", false, /\.svg$/);

    const cityDiv = document.createElement("div");
    cityDiv.classList.add("city");
    cityDiv.innerText = `${data.city}`;
    const weatherIconDiv = document.createElement("div");
    weatherIconDiv.classList.add("weather-icon");
    const img = document.createElement("img");
    img.src = icons(`./${data.icon}.svg`);
    weatherIconDiv.appendChild(img);
    const temperatureDiv = document.createElement("div");
    temperatureDiv.classList.add("temperature");
    temperatureDiv.innerText = `${data.temp}\u00B0`;
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description");
    descriptionDiv.innerText = `${data.description}`;

    this.weatherAppCard.append(
      cityDiv,
      weatherIconDiv,
      temperatureDiv,
      descriptionDiv
    );
  }

  titleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  validateInput() {
    if (this.formInput.value === "" || this.formInput.value === null) {
      this.formInput.setCustomValidity("Please enter a city name");
    } else {
      this.formInput.setCustomValidity("");
    }
  }
}

new App();
