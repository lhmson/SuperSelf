import React from "react";
import { View, Button, StyleSheet, StatusBar } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";
// import {StatusBar} from 'expo-status-bar';

const Home = ({ navigation }) => {
  return (
    <View style={styles.center}>
      {/* <StatusBar translucent backgroundColor="transparent" /> */}
      <Text>This is the home screen</Text>
      <Button
        title="Go to Todo Screen"
        onPress={() => navigation.navigate("Todo")}
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

export default Home;
