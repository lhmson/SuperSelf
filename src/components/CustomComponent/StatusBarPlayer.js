import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import Colors from "../../utils/Colors";
import { Avatar } from "react-native-elements";
import { Text } from "galio-framework";
const { width, height } = Dimensions.get("screen");
import { LinearGradient } from "expo-linear-gradient";

const StatusBarPlayer = (props) => {
  const level = props.level;
  const coins = props.coins;
  return (
    <View
      style={{
        width:"100%",
        alignItems:"center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        marginTop: Dimensions.get('screen').height/23
      }}
    >
      <StatusLevelCard level={level}></StatusLevelCard>
      {/* <View style={{ width: 50 }}></View> */}
      <StatusCoinsCard coins={coins}></StatusCoinsCard>
    </View>
  );
};

const StatusLevelCard = (props) => {
  const level = props.level;
  return (
    <ImageBackground
      source={require("../../utils/StatusBar/StatusLevel.png")}
      resizeMode="stretch"
      style={{
        width: 150,
        height: 50,
        marginTop: -10,
        zIndex: 1,
        backgroundColor: "transparent",
        alignContent: "center",
      }}
    >
      <Text h5 bold color="white" style={{ marginLeft: 65, marginTop: 8 }}>
        {level}
      </Text>
    </ImageBackground>
  );
};

const StatusCoinsCard = (props) => {
  const coins = props.coins;
  return (
    <ImageBackground
      source={require("../../utils/StatusBar/StatusCoins.png")}
      resizeMode="stretch"
      style={{
        width: 180,
        height: 47,
        marginTop: -7,
        zIndex: 1,
        backgroundColor: "transparent",
        alignContent: "center",
      }}
    >
      <Text h5 bold color="white" style={{ marginLeft: 65, marginTop: 6 }}>
        {coins}
      </Text>
    </ImageBackground>
  );
};

export default StatusBarPlayer;
