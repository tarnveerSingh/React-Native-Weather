import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import * as Location from "expo-location";

import DateTime from "./components/DateTime";
import WeatherScroll from "./components/WeatherScroll";
const API_KEY = "49cc8c821cd2aff9af04c9f98c36eb74";
const img = require("./assets/image2.jpeg");
export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      // Checking for location permisson
      let { status } = await Location.requestForegroundPermissionsAsync();
      // If location permission not granted will check the weather of default coordinates provided and break the function
      if (status !== "granted") {
        fetchDataFromApi("40.7128", "-74.0060");
        return;
      }
      // If location permission is granted, then using the user coordinates to fetch the data from weather api
      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  // Function to fetch the weather data from api based on location coordinates
  const fetchDataFromApi = (latitude, longitude) => {
    if (latitude && longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
        });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
        <DateTime
          current={data.current}
          timezone={data.timezone}
          lat={data.lat}
          lon={data.lon}
        />
        <WeatherScroll weatherData={data.daily} />
      </ImageBackground>
    </View>
  );
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
