import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import Weather from "./components/weather";
import SearchBar from "./components/searchBar";

const API_KEY = "c8c9463e7616eda05f71e74e54e02af1";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

  async function fetchWeatherData(cityName) {
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

    try {
      const response = await fetch(API);
      if (response.status == 200) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWeatherData("Islamabad");
    console.log(weatherData);
  }, []);
  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="red" size={36} />
      </View>
    );
  } else if (weatherData === null) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchBar fetchWeatherData={fetchWeatherData} />
        <Text style={{ margin: 20, fontSize: 28 }}>
          City Not Found! Try Different City
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
      <StatusBar style="light" backgroundColor="darkgray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
