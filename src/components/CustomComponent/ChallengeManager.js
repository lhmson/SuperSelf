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
import { Avatar } from "react-native-elements";
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
import Colors from "../../utils/Colors";
import VerticalBarGraph from "@chartiful/react-native-vertical-bar-graph";
import { LinearGradient } from "expo-linear-gradient";
import { Card as CardShadow } from "react-native-shadow-cards";
import * as Progress from "react-native-progress";
import moment from "moment";
import { UserContext } from "../../context/UserContext";
import { UserFirebaseContext } from "../../context/UserFirebaseContext";
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { ChallengeFirebaseContext } from "../../context/ChallengeFirbaseContext";
import ChallengeEvent_TempData from "../../utils/ChallengeEvent_TempData";
import getURLAvatarElement from "../../utils/ElementURL_Data";
import { ChallengeContext } from "../../context/ChallengeContext";
import { useIsFocused } from "@react-navigation/native";
import SkeletonSample from "../SkeletonSample";

const CardsMangement = (props) => {
  const challenge = props.challenge;
  // console.log("\nBlackpink");
  // console.log(challenge);
  const Background = challenge.BackgroundURL;
  const percent = Math.round(challenge.percent * 100);
  const textPercent = percent + "%";
  const title = challenge.NameChallenge;
  console.log("\nalo" + title);
  navigation = props.navigation;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Details Challenge", { value: challenge });
      }}
    >
      <View
        style={{ backgroundColor: "white", borderRadius: 12, marginBottom: 16 }}
      >
        <Image
          source={{ uri: Background }}
          resizeMode="cover"
          style={{
            height: 230,
            zIndex: 1,
            margin: 16,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View style={{ width: 16 }}></View>
          <Avatar
            size="small"
            rounded
            title="?"
            activeOpacity={0.7}
            source={{ uri: getURLAvatarElement(challenge.NameElement) }}
          />
          <Text h6 color="black" style={{ marginBottom: 0, marginLeft: 16 }}>
            {title}
          </Text>
        </View>

        <View style={{ alignItems: "center", marginHorizontal: 16 }}>
          <Progress.Bar
            progress={percent / 100}
            height={25}
            width={width - 16 * 5}
            style={{ marginVertical: 0, marginBottom: 16 }}
            color={Colors.greenPastel}
          />
          <Text
            h7
            color="black"
            bold
            style={{ marginBottom: 32, marginLeft: 16, marginTop: -40 }}
          >
            {textPercent}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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

const FlatListCardMyChallenge = (props) => {
  const navigation = props.navigation;
  const data = props.data;
  console.log(data);
  if (data === undefined || data === null || data.length === 0)
    return (
      <Image
        source={{
          uri:
            "https://i.pinimg.com/564x/3d/09/ca/3d09cad6a03f0bad68c8e2454af4f87e.jpg",
        }}
        resizeMode="cover"
        style={{
          width: width * 0.85,
          height: 230,
          zIndex: 1,
          marginBottom: 50,
          alignItems: "center",
        }}
      />
    );

  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      style={{ alignContent: "flex-start" }}
      data={data}
      renderItem={({ item }) => (
        <CardsMangement
          navigation={props.navigation}
          challenge={item}
        ></CardsMangement>
      )}
    ></FlatList>
  );
};

let dataMyChallenge = [];

const ChallengeManager = (props) => {
  const isFocused = useIsFocused();
  const CoverImage =
    "https://i.pinimg.com/originals/a5/15/c9/a515c9702536e568e72a47bae8114f8a.gif";

  const [user, setUser] = useContext(UserContext);
  const challenge = useContext(ChallengeFirebaseContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [challengeContext, setChallengeContext] = useContext(ChallengeContext);

  useEffect(() => {
    const getDataMyChallenge = async () => {
      if (
        challengeContext.currentlyUpdateChallenge ||
        challengeContext.currentlyAddChallenge ||
        challengeContext.currentlyDeleteChallenge ||
        dataMyChallenge.length === 0
      ) {
        dataMyChallenge = await challenge.getMyChallenge(user.uid);
        // console.log(dataMyChallenge);
        setIsLoaded(!isLoaded);
        setChallengeContext({
          ...challengeContext,
          currentlyUpdateChallenge: false,
          currentlyAddChallenge: false,
          currentlyDeleteChallenge: false,
        });
      }
    };
    getDataMyChallenge();
  }, [
    challengeContext.currentlyUpdateChallenge,
    challengeContext.currentlyAddChallenge,
    challengeContext.currentlyDeleteChallenge,
  ]);

  useEffect(() => {
    const getDataMyChallenge = async () => {
      if (
        challengeContext.currentlyAddChallenge ||
        dataMyChallenge.length === 0
      ) {
        dataMyChallenge = await challenge.getMyChallenge(user.uid);
        // console.log(dataMyChallenge);
        setIsLoaded(!isLoaded);
        setChallengeContext({
          ...challengeContext,
          currentlyAddChallenge: false,
        });
      }
    };
    getDataMyChallenge();
  }, [challengeContext.currentlyAddChallenge]);

  useEffect(() => {
    const getDataMyChallenge = async () => {
      if (
        challengeContext.currentlyUpdateChallenge ||
        dataMyChallenge.length === 0
      ) {
        dataMyChallenge = await challenge.getMyChallenge(user.uid);
        // console.log(dataMyChallenge);
        setIsLoaded(!isLoaded);
        setChallengeContext({
          ...challengeContext,
          currentlyUpdateChallenge: false,
        });
      }
    };
    getDataMyChallenge();
  }, [challengeContext.currentlyUpdateChallenge]);

  useEffect(() => {
    const getDataMyChallenge = async () => {
      if (
        challengeContext.currentlyDeleteChallenge ||
        dataMyChallenge.length === 0
      ) {
        dataMyChallenge = await challenge.getMyChallenge(user.uid);
        // console.log(dataMyChallenge);
        setIsLoaded(!isLoaded);
        setChallengeContext({
          ...challengeContext,
          currentlyDeleteChallenge: false,
        });
      }
    };
    getDataMyChallenge();
  }, [challengeContext.currentlyDeleteChallenge]);

  useEffect(() => {
    const getDataMyChallenge = async () => {
      if (isFocused || dataMyChallenge.length === 0) {
        dataMyChallenge = await challenge.getMyChallenge(user.uid);
        // console.log(dataMyChallenge);
        setIsLoaded(!isLoaded);
      }
    };
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    getDataMyChallenge();
  }, [isFocused]);

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
        subtitle="Continue"
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
          {loading ? (
            <SkeletonSample />
          ) : (
            <FlatListCardMyChallenge
              navigation={props.navigation}
              data={dataMyChallenge}
            ></FlatListCardMyChallenge>
          )}
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
    backgroundColor: "whitesmoke",
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
