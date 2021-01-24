import {
  SettingsDividerShort,
  SettingsDividerLong,
  SettingsEditText,
  SettingsCategoryHeader,
  SettingsPicker,
} from "react-native-settings-components";
import React, { Component, useState, useContext } from "react";
import {
  ScrollView,
  Dimensions,
  View,
  StyleSheet,
  Image,
  TextInput
} from "react-native";
import { Avatar } from "react-native-elements";
import moment from "moment";
import { UserContext } from "../context/UserContext";
import { UserFirebaseContext } from "../context/UserFirebaseContext";
import { ChallengeFirebaseContext } from "../context/ChallengeFirbaseContext";

const { width, height } = Dimensions.get("window");
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";
import {  TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../utils/Colors";
import {ChallengeContext} from "../context/ChallengeContext"
import {GameFirebaseContext} from "../context/GameFirebaseContext";

//NOTIFICATION IMPORT
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {useEffect, useRef } from 'react';

//NOTIFICATION SETUP
Notifications.setNotificationHandler({
handleNotification: async () => ({
  shouldShowAlert: true,
  shouldPlaySound: false,
  shouldSetBadge: false,
}),
});


async function registerForPushNotificationsAsync() {
let token;
if (Constants.isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    // alert('Failed to get push token for push notification!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
} else {
  // alert('Must use physical device for Push Notifications');
}

if (Platform.OS === 'android') {
  Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
}

return token;
}

export default function SetupChallengeScreen({route, navigation}) {
  const challengeSelected = route.params;
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(UserFirebaseContext);

  const [mode, setMode] = useState("7 days");
  const [repeat, setRepeat] = useState("Everyday");
  const [reminders, setReminders] = useState(new Date());
  const [timeofday, setTimeofday] = useState("Morning");
  const [goal, setGoal] = useState("Fighting!");
  const [error, setError] = useState("");

  const [isModalGoal, setIsModalGoal] = useState(false);
  const [isModalReminders, setIsModalReminders] = useState(false);
  const [isModalStartDate, setIsModalStartDate] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const [isModalError, setIsModalError] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);

  const [challengContext, setChallengeContext] = useContext(ChallengeContext);
  const challenge = useContext(ChallengeFirebaseContext);
  const gameFirebase = useContext(GameFirebaseContext);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
  });

  const renderImageGoal = () => (
    <Image
      source={require("../utils/superself-icon.png")}
      style={{ width: 80, height: 80, resizeMode: "cover" }}
    />
  );

  const onChangeReminders = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (isModalReminders) setIsModalReminders(false);
    setReminders(currentDate);
    if (isModalStartDate) setIsModalStartDate(false);
  };

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (isModalStartDate) setIsModalStartDate(false);
    setReminders(currentDate);
  };

  const getNumbersOfDay = () => {
    if (mode === "3 days")
      return 3;
    if (mode === "7 days")
      return 7;
    if (mode === "30 days")
      return 30;
    return 30;
  }

  const getInterval = () => {
    if (repeat == "Everyday")
      return 1;
    return (Number)(repeat[6]);
  }

  const setupChallenge = async () => {

    let coinsBuy = challengeSelected.CoinsBuy;
    console.log("coinsok");
    let coins = 0;
    const gameStatus =  await gameFirebase.getMyGameStatus(user.uid);
    if (gameStatus !== undefined)
        coins = gameStatus.coins;
    
    console.log("\nbuy " + coinsBuy + "  coins" + coins);

    if (coinsBuy > coins)
    {
      setError("Not enough cash to pay");
      setIsModalError(true);
      return;
    }

    if (reminders < (new Date() + 60*1000))
    {
      setError("The date cannot be before");
      setIsModalError(true);
      return;
    }

    setIsModalSuccess(true);    

    let listDay = [];

    let secondsReminders = (new Date(Date.parse(reminders) - Date.parse(new Date()))/1000);
    
    let date = {date : reminders.toLocaleString(), isFinished : false};

    listDay.push(date);

    let tempDay = reminders;
    let start = 1;
    let interval = getInterval();
    let end = getNumbersOfDay();

    while (start <= end)
    {
      start += interval;
      tempDay.setDate(tempDay.getDate() + interval);
      let date = {date : tempDay.toLocaleString(), isFinished : false};
      listDay.push(date);
      await schedulePushNotification(secondsReminders);
      secondsReminders = (new Date(Date.parse(tempDay) - Date.parse(new Date()))/1000);
    }

    let challengeSetup = {...challengeSelected, listDay, percent : 0};

    await challenge.createMyChallenge(user.uid, challengeSetup);
    await gameFirebase.updateGameLevelCoins(user.uid, 0, -coinsBuy);
    setChallengeContext({...ChallengeContext, currentlyAddChallenge : true});
  } 

  //NOTIFICATION ADD A NOTIFICATION
  async function schedulePushNotification(secondsReminders) {   
  if (secondsReminders < 0)
    secondsReminders = 2;
  console.log("\nSeconds " + secondsReminders);
  await Notifications.scheduleNotificationAsync({
  content: {
    title: "📬" + challengeSelected.NameChallenge,
    body:"Do the task and mark it" + "Your goal: " + goal,
    data: { data:  challengeSelected.NameChallenge},
  },
  trigger : { seconds : secondsReminders},
});
}

  const MyAvatar = user.profilePhotoUrl;
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "ios" ? colors.iosSettingsBackground : colors.white,
      }}
    >
      {/* Alert Setup error */}
      <SCLAlert
        // headerIconComponent={renderImageGoal()}
        theme="danger"
        onRequestClose={() => {
          setIsModalError(false);
        }}
        show={isModalError}
        title="Error Setup"
        subtitle = {error}
      >
        <View style={{ height: 20 }}></View>
        <SCLAlertButton
          theme="danger"
          onRequestClose={() => {
            setIsModalError(false);
          }}
          onPress={() => {
            setIsModalError(false);
          }}
        >
          Done
        </SCLAlertButton>
      </SCLAlert>

        {/* Alert Setup success */}
        <SCLAlert
        headerIconComponent={renderImageGoal()}
        theme="success"
        onRequestClose={() => {
          setIsModalSuccess(false);
        }}
        show={isModalSuccess}
        title="Setup Success"
        subtitle = "Finish setting up, do your best fighting"
      >
        <View style={{ height: 20 }}></View>
        <SCLAlertButton
          theme="success"
          onRequestClose={() => {
            setIsModalSuccess(false);
          }}
          onPress={() => {
            setIsModalSuccess(false);
            navigation.goBack();
            navigation.goBack();
            navigation.navigate("Home",{screen : "My Challenge"});
          }}
        >
          Done
        </SCLAlertButton>
      </SCLAlert>

      {/* Alert Goal */}
      <SCLAlert
        headerIconComponent={renderImageGoal()}
        theme="success"
        onRequestClose={() => {
          setIsModalGoal(false);
        }}
        show={isModalGoal}
        title="Your goal"
      >
        <TextInput
          style={{ ...styles.TextPassword, marginTop: -50 }}
          placeholder="Goal...."
          onChangeText={text => setGoal(text)}
          value = {goal}
        ></TextInput>
        <View style={{ height: 20 }}></View>
        <SCLAlertButton
          theme="success"
          onPress={() => {
            setIsModalGoal(false);
          }}
        >
          Done
        </SCLAlertButton>
      </SCLAlert>

      <View
        style={{
          width: width,
          justifyContent: "center",
          flexDirection: "row",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Avatar
          size="xlarge"
          rounded
          title="?"
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          source={{ uri: challengeSelected.BackgroundURL}}
        />
      </View>
      <SettingsCategoryHeader
        title={challengeSelected.NameChallenge}
        titleStyle={
          Platform.OS === "android" ? { color: Colors.primaryDark } : null
        }
      />
      <SettingsDividerLong android={false} />
      
      <SettingsPicker
        title="Mode"
        dialogDescription={"Choose your mode."}
        options={[
          { label: "3 days", value: "3 days" },
          { label: "7 days", value: "7 days" },
          { label: "30 days", value: "30 days" },
        ]}
        onValueChange={(value) => {
          setMode(value);
        }}
        value={mode}
      />

      <SettingsPicker
        title="Repeat"
        dialogDescription={"Choose your repeat."}
        options={[
          { label: "Everyday", value: "Everyday" },
          { label: "Every 2 days", value: "Every 2 days" },
          { label: "Every 3 days", value: "Every 3 days" },
          { label: "Every 4 days", value: "Every 4 days" },
          { label: "Every 5 days", value: "Every 5 days" },
          { label: "Every 6 days", value: "Every 6 days" },
          { label: "Every 7 days", value: "Every 7 days" },
        ]}
        onValueChange={(value) => {
          setRepeat(value);
        }}
        value={repeat}
      />

      <TouchableOpacity
        onPress={() => {
          setIsModalStartDate(true);
        }}
      >
        <SettingsEditText title="Start Date" value={moment(reminders).format("MMM Do YYYY")} />
      </TouchableOpacity>

      {/* DateTime StartDate */}
      {isModalStartDate && (
        <DateTimePicker
          value={reminders}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChangeStartDate}
        />
      )}

      {/* DateTime Reminders */}
      {isModalReminders && (
        <DateTimePicker
          value={reminders}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={onChangeReminders}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          setIsModalReminders(true);
        }}
      >
        <SettingsEditText title="Reminders" value={moment(reminders).format("LT")} />
      </TouchableOpacity>

      <SettingsPicker
        title="Time of Day"
        dialogDescription={"Choose your Time of Day."}
        options={[
          { label: "Morning", value: "Morning" },
          { label: "Afternoon", value: "Afternoon" },
          { label: "Night", value: "Night" },
        ]}
        onValueChange={(value) => {
          setTimeofday(value);
        }}
        value={timeofday}
      />

      <TouchableOpacity onPress={() => {
            setIsModalGoal(true);
          }}>
        <SettingsEditText
          title="Goal"
          value={goal}
        />
      </TouchableOpacity>
      <SettingsDividerShort />
      <View style={{height : 20}}></View>
          <View style = {{justifyContent:"center", alignSelf:"center", width:width*0.6}}>
              <SCLAlertButton theme="success" onPress={() => {setupChallenge()}}>
                  I promise I'll do it</SCLAlertButton>
          </View>                
        <View style={{height : 30}}></View>
    </ScrollView>
  );
}

const colors = {
  white: "#FFFFFF",
  monza: "#efeff3",
  switchEnabled: "#C014872",
  switchDisabled: "#efeff3",
  blueGem: "#27139A",
  border: "#134032",
};

const styles = StyleSheet.create({
  TextPassword: {
    alignSelf: "center",
    fontSize: 18,
    width: "80%",
    borderRadius: 20,
    paddingLeft: 20,
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
  },
});
