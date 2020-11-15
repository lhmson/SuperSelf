import React from "react";
import { View, StyleSheet, Button } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";

const World = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text>This is the World screen</Text>
      <Button
        title="Go to Ranking Screen"
        onPress={() => navigation.navigate("Ranking")}
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

export default World;
