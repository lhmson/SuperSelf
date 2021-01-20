import React from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";

import RNMonthly from "react-native-monthly";

const Todo = () => {
  return (
    <View style={styles.center}>
      {/* <RNMonthly numberOfDays={31} activeDays={[1, 5, 6, 11, 21, 31]} activeBackgroundColor={`${Colors.primary}`} /> */}
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

export default Todo;
