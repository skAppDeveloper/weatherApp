import React, { useState } from "react";

import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
function SearchBar({ fetchWeatherData }) {
  const [cityName, setCityName] = useState("");
  return (
    <View style={styles.searchBar}>
      <StatusBar style="light" backgroundColor="darkgray" />
      <TextInput
        placeholder="Search Your City"
        value={cityName}
        onChangeText={(text) => setCityName(text)}
      />
      <FontAwesome5
        name="search-location"
        size={24}
        color="black"
        onPress={() => fetchWeatherData(cityName)}
      />
    </View>
  );
}
export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("screen").width - 20,
    borderWidth: 1.5,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: "lightgray",
    borderColor: "lightgray",
  },
});
