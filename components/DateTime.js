import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import moment from "moment-timezone";
import WeatherScroll from "./WeatherScroll";
import App from "../App";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const WeatherItem = ({ title, value, unit }) => {
  return (
    <View style={styles.weatherItem}>
      <Text style={styles.weatherItemTitle}>{title}</Text>
      <Text style={styles.weatherItemTitle}>
        {value} {unit}
      </Text>
    </View>
  );
};

const DateTime = ({ current, lat, lon, timezone }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    // Interval for updating time and date

    setInterval(() => {
      const time = new Date();
      const month = time.getMonth();
      const date = time.getDate();
      const day = time.getDay();
      const hour = time.getHours();
      const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
      const minutes = time.getMinutes();
      const ampm = hour >= 12 ? "pm" : "am";

      setTime(
        (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
          ":" +
          (minutes < 10 ? "0" + minutes : minutes) +
          ampm
      );

      setDate(days[day] + ", " + date + " " + months[month]);
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.heading}>
          <Text style={styles.timezone}>{timezone}</Text>
          {/* <Text style={styles.latlong}>
            {lat}N {lon}E
          </Text> */}
        </View>
        <View>
          <Text style={styles.subheading}>{time}</Text>
        </View>
        <View>
          <Text style={styles.subheading}>{date}</Text>
        </View>
        <View style={styles.weatherContainer}>
          <View style={styles.iconContainer}>
            {/* Image Icon */}
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={{
                uri: `http://openweathermap.org/img/wn/${current?.weather[0].icon}@4x.png`,
              }}
            />
            {/* Weather */}
            <Text style={styles.weatherType}>
              {current?.weather[0].description}
            </Text>
          </View>
          <View style={styles.currentWeatherContainer}>
            <Text style={styles.currentWeather}>{current?.temp}°C</Text>
          </View>
        </View>

        <View style={styles.weatherItemContainer}>
          <WeatherItem
            title="Humidity"
            value={current ? current.humidity : ""}
            unit="%"
          />
          <WeatherItem
            title="Sunrise"
            value={
              current
                ? moment.tz(current.sunrise * 1000, timezone).format("HH:mm")
                : ""
            }
            unit="am"
          />
          <WeatherItem
            title="Sunset"
            value={
              current
                ? moment.tz(current.sunset * 1000, timezone).format("HH:mm")
                : ""
            }
            unit="pm"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  heading: {
    fontSize: 45,
    color: "white",
    fontWeight: "100",
  },
  subheading: {
    fontSize: 25,
    color: "#eee",
    fontWeight: "300",
  },
  rightAlign: {
    textAlign: "right",
    marginTop: 20,
  },
  timezone: {
    fontSize: 40,
    color: "white",
  },
  weatherItemContainer: {
    backgroundColor: "#18181b99",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  weatherItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weatherItemTitle: {
    color: "#eee",
    fontSize: 14,
    fontWeight: "100",
  },
  image: {
    width: 150,
    height: 150,
  },
  day: {
    fontSize: 20,
    color: "white",
    backgroundColor: "#3c3c44",
    padding: 10,
    textAlign: "center",
    borderRadius: 50,
    fontWeight: "200",
    marginBottom: 15,
  },
  temp: {
    fontSize: 16,
    color: "white",
    fontWeight: "100",
    textAlign: "center",
  },
  otherContainer: {
    paddingRight: 40,
  },
  weatherContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {},
  icon: {
    width: 150,
    height: 120,
  },
  currentWeatherContainer: {},
  currentWeather: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 40,
  },
  weatherType: {
    fontSize: 20,
    color: "#fff",
  },
});

export default DateTime;
