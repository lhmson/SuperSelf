import React from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";

const Favorites = () => {
  return (
    <View style={styles.center}>
      <Text>This is the Favorites screen</Text>
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

export default Favorites;
