import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";

const Ranking = () => {
  return (
    <View style={styles.center}>
      <ImageBackground
        source={require("../utils/comesoon1.jpg")}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          resizeMode: "cover",
        }}
      ></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Ranking;
