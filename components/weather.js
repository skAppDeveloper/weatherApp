import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  StatusBar,
} from "react-native";
import SearchBar from "./searchBar";
import {
  haze,
  rainy,
  snow,
  sunny,
  clear,
  lightning,
  clouds,
  smoke,
} from "../assets/backgroundImages/index";

function Weather({ weatherData, fetchWeatherData }) {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const {
    weather,
    name,
    main: { temp, humidity, pressure },
    wind: { speed, deg },
  } = weatherData;
  const [{ main }] = weather;

  useEffect(() => {
    setBackgroundImage(getBackgroundImg(main));
  }, [weatherData]);

  function getBackgroundImg(weather) {
    if (weather === "Snow") return snow;
    if (weather === "Clear") return clear;
    if (weather === "Rain") return rainy;
    if (weather === "Haze") return haze;
    if (weather === "Sunny") return sunny;
    if (weather === "Thunderstorm") return lightning;
    if (weather === "Clouds") return clouds;
    if (weather === "Smoke") return smoke;
    return haze;
  }

  let textColor = backgroundImage !== sunny ? "white" : "black";

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="darkgray" />
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImg}
        resizeMode="cover"
      >
        <SearchBar fetchWeatherData={fetchWeatherData} />
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: "bold",
              fontSize: 46,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: "bold",
            }}
          >
            {main}
          </Text>
          <Text style={{ ...styles.headerText, color: textColor }}>
            {temp} °C
          </Text>
          <View style={styles.extraInfo}>
            <View style={styles.info}>
              <Text style={{ fontSize: 22, color: "white" }}>Humidity</Text>
              <Text style={{ fontSize: 22, color: "white" }}>{humidity} %</Text>
            </View>

            <View style={styles.info}>
              <Text style={{ fontSize: 22, color: "white" }}>Wind Speed</Text>
              <Text style={{ fontSize: 22, color: "white" }}>{speed} m/s</Text>
            </View>
          </View>
          <View style={styles.extraInfo}>
            <View style={styles.info}>
              <Text style={{ fontSize: 22, color: "white" }}>Degree</Text>
              <Text style={{ fontSize: 22, color: "white" }}>{deg}°</Text>
            </View>
            <View style={styles.info}>
              <Text style={{ fontSize: 22, color: "white" }}>Pressure</Text>
              <Text style={{ fontSize: 22, color: "white" }}>
                {pressure}hPa
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get("screen").width,
  },
  headerText: {
    fontSize: 36,
    marginTop: 30,
  },
  extraInfo: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    width: Dimensions.get("screen").width - 10,
  },
  info: {
    width: Dimensions.get("screen").width / 2.5,
    backgroundColor: "rgba(0,0,0, 0.5)",
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
  },
});
