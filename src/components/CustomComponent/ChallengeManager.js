import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Text as TextOK,
  FlatList,
  Button,
} from "react-native";

import Constants from "expo-constants";

const { statusBarHeight } = Constants;

// galio components
import { Block, Card, Text, Icon, NavBar } from "galio-framework";
import theme from "../../theme";

const { width, height } = Dimensions.get("screen");
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";
import { View } from "react-native";
import { colors } from "react-native-elements";
import {
  Air,
  Earth,
  Metal,
  Plan,
  Water,
  SuperPower,
  Fire,
} from "../../utils/ElementURL_Data";
import { Avatar } from "react-native-elements";
import Colors from "../../utils/Colors";
import VerticalBarGraph from "@chartiful/react-native-vertical-bar-graph";
import { LinearGradient } from "expo-linear-gradient";
import { Card as CardShadow } from "react-native-shadow-cards";
import * as Progress from "react-native-progress";
import moment from "moment";
import { UserContext } from "../../context/UserContext";
import { UserFirebaseContext } from "../../context/UserFirebaseContext";
import {useEffect, useRef, useState } from 'react';
import {useContext } from "react";
import { ChallengeFirebaseContext } from "../../context/ChallengeFirbaseContext";
import ChallengeEvent_TempData from "../../utils/ChallengeEvent_TempData"

const CardsMangement = (props) => {
  const challenge = props.challenge;
  console.log("\nBlackpink");
  console.log(challenge);
  const Background = challenge.BackgroundURL;
  const percent = challenge.percent;
  const textPercent = percent * 100 + "%";
  const title = challenge.NameChallenge;
  return (
    <View elevation={5} style={{ marginTop: 10, alignItems: "center" }}>
      <CardShadow style={{ padding: 10, margin: 10, height: 250 }}>
        <ImageBackground
          source={{ uri: Background }}
          resizeMode="cover"
          style={{
            width: width * 0.85,
            height: 230,
            zIndex: 1,
          }}
        >
          <LinearGradient
            colors={[
              "transparent",
              "transparent",
              "rgba(0,0,0, 0.5)",
              "rgba(0,0,0, 1)",
            ]}
            style={{ width: "100%", height: "100%" }}
          >
            <View style={{ marginLeft: 240, width: 100 }}>
              <SCLAlertButton theme="danger" onPress={() => {}}>
                Give up
              </SCLAlertButton>
            </View>

            <View style={{ height: 100 }}></View>
            <Text h4 color="white" style={{ marginLeft: 10 }}>
              {title}
            </Text>
            <Progress.Bar
              progress={percent}
              width={300}
              height={25}
              style={{ marginLeft: 10 }}
            ></Progress.Bar>

            <View style={{ marginLeft: 150, margin: -28 }}>
              <Text h6 color="white">
                {textPercent}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </CardShadow>
    </View>
  );
};

const ChartCoin = (props) => {
  return (
    <VerticalBarGraph
      data={[20, 45, 28, 80, 99, 43]}
      labels={["Air", "Earth", "Metal", "Plan", "Water", "Fire"]}
      width={Dimensions.get("window").width - 90}
      height={200}
      barRadius={5}
      barWidthPercentage={0.65}
      barColor="#53ae31"
      baseConfig={{
        hasXAxisBackgroundLines: true,
        xAxisLabelStyle: {
          position: "right",
          prefix: "",
        },
      }}
      style={{
        marginBottom: 0,
        padding: 10,
        paddingTop: 20,
        borderRadius: 20,
        backgroundColor: `#dff4d7`,
        width: Dimensions.get("window").width - 70,
      }}
    />
  );
};

const FlatListCardMyChallenge = (props) =>
{
    const data = props.data;
    return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      style={{ alignContent: "flex-start" }}
      data={data}
      renderItem={({ item }) => <CardsMangement challenge={item}></CardsMangement>}>
   </FlatList>);  
} 

let dataMyChallenge = [];

const ChallengeManager = (props) => {
  const CoverImage =
    "https://i.pinimg.com/originals/a5/15/c9/a515c9702536e568e72a47bae8114f8a.gif";

    const [user, setUser] = useContext(UserContext);
    const challenge = useContext(ChallengeFirebaseContext);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      const getDataMyChallenge = async () => {
        dataMyChallenge = await challenge.getMyChallenge(user.uid);
        // console.log(dataMyChallenge);
        setIsLoaded(true);
      };
      getDataMyChallenge();
    });

    const renderitem = ({item}) => {
      console.
      return (
        <Text>abc</Text>
      );
    }
  return (
    <Block>
      <ImageBackground
        source={{ uri: CoverImage }}
        resizeMode="cover"
        style={{
          width: width,
          height: height * 0.9,
          marginTop: -150,
          zIndex: 1,
        }}
      ></ImageBackground>

      {/* Alert Give up */}
      <SCLAlert
        headerIconComponent={
          <Image
            source={require("../../utils/Icon/Giveup.png")}
            style={{ width: 100, height: 100, resizeMode: "cover" }}
          />
        }
        theme="success"
        show={false}
        title="Give up"
        subtitle="Bạn đã hoàn thành được 20% này rồi. Bạn vẫn muốn tiếp tục từ bỏ nó"
      >
        <SCLAlertButton theme="danger" onPress={() => {}}>
          Give up
        </SCLAlertButton>
        <SCLAlertButton theme="success" onPress={() => {}}>
          Cancel
        </SCLAlertButton>
      </SCLAlert>

      <Block center style={{ marginTop: -280, zIndex: 1 }}>
        <Block flex style={styles.header}>
            <FlatListCardMyChallenge data = {dataMyChallenge}></FlatListCardMyChallenge>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  circleArc: {
    width: 120,
    height: 120,
    borderColor: Colors.darkPink,
    borderRadius: 120 / 2,
    borderWidth: width,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: theme.SIZES.BASE * 2,
    borderTopRightRadius: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE * 1.5,
    width: width,
    marginBottom: 10,
  },
  navbar: {
    top: statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 9999,
    position: "absolute",
  },
  stats: {
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 5,
    height: theme.SIZES.BASE * 4,
    marginVertical: theme.SIZES.BASE * 0.875,
  },
  title: {
    justifyContent: "center",
    paddingLeft: theme.SIZES.BASE / 2,
  },
  avatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  middle: {
    justifyContent: "center",
  },
  text: {
    fontSize: theme.SIZES.FONT * 0.875,
    lineHeight: theme.SIZES.FONT * 1.25,
  },
});

export default ChallengeManager;
