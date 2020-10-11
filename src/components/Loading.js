import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "./Text";

const Loading = () => {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" color={`${Colors.lightPurple}`} />
      <Text style={styles.loadingText}>Loading . . .</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingView: {
    margin: 10,
  },
});

export default Loading;
