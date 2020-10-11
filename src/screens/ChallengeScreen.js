import React from "react";
import { View, StyleSheet, Button } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";

const Challenge = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text>This is the Challenge screen</Text>
      <Button
        title="Go to History Screen"
        onPress={() => navigation.navigate("History")}
      />
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

export default Challenge;
