import React from "react";
import { View, StyleSheet, Button, Dimensions } from "react-native";

import Colors from "../utils/Colors";
import { ScrollView } from "react-native-gesture-handler";
import ModalInfoChallenge from "../components/ModalInfoChallenge";
import { connect } from "react-redux";
import {
  displayModal,
  hideModal,
  beginChallenge,
  completeChallenge,
  resetPageModal,
} from "../redux/actions/ActionCreators";
import MyCarousel from "../components/CustomComponent/ChallengeCard";
import { ChallengeFirebaseContext } from "../context/ChallengeFirbaseContext";
import { useContext } from "react";
//NOTIFICATION IMPORT
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useState, useEffect, useRef } from "react";

//NOTIFICATION SETUP
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

//NOTIFICATION ADD A NOTIFICATION
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      // alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    // alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const { width, height } = Dimensions.get("screen");
let dataChallenge;

const Challenge = (props) => {
  //NOTIFICATION
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

  const [loadData, setLoadData] = useState(false);

  //NOTIFICATION
  const notificationListener = useRef();
  const responseListener = useRef();
  const challenge = useContext(ChallengeFirebaseContext);

  //NOTIFICATION
  useEffect(() => {
    const getDataChallenge = async () => {
      dataChallenge = await challenge.getAllChallenge();
      setLoadData(true);
    };
    getDataChallenge();

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        // navigate to the screen
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
        
        props.navigation.navigate("Home", { screen: "My Challenge" });
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <View style={styles.center}>
      <ScrollView style={{ width }}>
        {/* <Button
          onPress={async () => {
            await schedulePushNotification();
          }}
          title="Scheduled Notification"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

        <Button
          onPress={async () => {
            await challenge.createChallenge("4", challengeNew);
          }}
          title="Create Challenge"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        /> */}

        <MyCarousel
          navigation={props.navigation}
          data={dataChallenge}
        ></MyCarousel>
        <MyCarousel
          navigation={props.navigation}
          data={dataChallenge}
        ></MyCarousel>
        <MyCarousel
          navigation={props.navigation}
          data={dataChallenge}
        ></MyCarousel>
        <MyCarousel
          navigation={props.navigation}
          data={dataChallenge}
        ></MyCarousel>
        <View style={{ height: 40 }}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  Flat: {
    margin: 10,
  },

  Card: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    marginTop: 2,
    width: 200,
    height: 200,
  },
  ImageChallenge: {
    height: 150,
    width: 180,
    margin: 2,
  },

  Title: {
    fontSize: 15,
    fontWeight: "bold",
    height: 20,
  },

  InfoText: {
    flex: 60,
    fontSize: 15,
    fontWeight: "normal",
    height: 20,
    alignContent: "center",
    alignSelf: "stretch",
  },
  Header: {
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 400,
    height: 30,
    marginTop: 5,
    marginBottom: 0,
  },
  TitleChallenge: {
    fontSize: 22,
    fontWeight: "bold",
    height: 40,
    color: Colors.skin,
    alignItems: "center",
    alignContent: "space-around",
  },
});

const url_IconJoiner =
  "https://ercc.compact.org/wp-content/uploads/sites/43/2018/08/People-Icon-CC-Red-Ombre.png";

const mapStateToProps = (state) => {
  return {
    visible: state.modalChallengeReducer.visible,
    visibleBeginChallenge: state.modalChallengeReducer.visibleModalCreate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayModal: () => {
      dispatch(displayModal());
      dispatch(resetPageModal());
    },
    hideModal: () => dispatch(hideModal()),
    beginChallenge: () => dispatch(beginChallenge()),
    completeChallenge: () => dispatch(completeChallenge()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);

const challengeNew = {
  BackgroundURL:
    "https://i.pinimg.com/564x/1e/2b/3d/1e2b3dc2f5dd1a51943a966437391754.jpg",
  CoinsBuy: 230,
  CoinsWin: 660,
  Description:
    "Đi học là việc quan trọng đừng vì ngủ nướng xíu mà đánh mất bài vở nhé! Hãy thực hiện ngay nào",
  Goal: ["6", "30", "Mỗi ngày"],
  Hot: 20,
  Kind: "Normal",
  NameChallenge: "Xe đạp 10 Km",
  NameElement: "Water",
  NumberElementWin: 20,
  NumberJoiner: 1234,
  Reminder: "12:00 AM",
  Repeat: "Mỗi ngày",
  Subtitle:
    "Đi học là việc quan trọng đừng vì ngủ nướng xíu mà đánh mất bài vở nhé! Hãy thực hiện ngay nào",
  TimeofDay: ["Buổi sáng", "Buổi trưa", "Buổi tối"],
  Content:
    "We organise what we write into sentences and paragraphs. A paragraph begins on a new line within the text and there is often a blank line between paragraphs. A paragraph usually contains more than one sentence and it is usually about one topic" +
    "\nThe first sentence in a paragraph is sometimes called the key or topic sentence because it gives us the key to what the paragraph will be about. The other sentences usually relate to the key sentence. There is usually a conclusion in the final sentence of a paragraph and sometimes there is a link to the next paragraph",
};
