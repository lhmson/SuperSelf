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
  } from "react-native";
  import { Avatar } from "react-native-elements";
  
  import { UserContext } from "../context/UserContext";
  import { UserFirebaseContext } from "../context/UserFirebaseContext";
  import { ChallengeFirebaseContext } from "../context/ChallengeFirbaseContext";
  
  const { width, height } = Dimensions.get("window");
  import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";
  import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
  import DateTimePicker from "@react-native-community/datetimepicker";
  import Colors from "../utils/Colors";
  
  export default function SetupChallengeScreen({route, navigation}) {
    const challengeSelected = route.params;
    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(UserFirebaseContext);

    const [mode, setMode] = useState("7 days");
    const [repeat, setRepeat] = useState("Everyday");
    const [startdate, setStartDate] = useState("Today");
    const [reminders, setReminders] = useState("7:00 AM");
    const [timeofday, setTimeofday] = useState("Morning");
    const [goal, setGoal] = useState("Fighting!");

    const [birthday, setBirthday] = useState(
      user.birthday ? user.birthday : new Date()
    );

    const [isModalGoal, setIsModalGoal] = useState(false);
    const [isModalReminders, setIsModalReminders] = useState(false);
    const [isModalStartDate, setIsModalStartDate] = useState(false);
  
    const challenge = useContext(ChallengeFirebaseContext);
  
    const renderImageGoal = () => (
      <Image
        source={require("../utils/superself-icon.png")}
        style={{ width: 80, height: 80, resizeMode: "cover" }}
      />
    );
  
    const onChangeStartDate = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setIsModalStartDate(false);
      setStartDate(currentDate);
    };
  
    const MyAvatar = user.profilePhotoUrl;
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor:
            Platform.OS === "ios" ? colors.iosSettingsBackground : colors.white,
        }}
      >

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
            setMo(value);
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
          <SettingsEditText title="Start Date" value={startdate} />
        </TouchableOpacity>
  
        {/* DateTime Birthday */}
        {isModalStartDate && (
          <DateTimePicker
            value={birthday}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onChangeStartDate}
          />
        )}

        {/* DateTime Birthday */}
        {isModalReminders && (
          <DateTimePicker
            value={birthday}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onChangeBirthday}
          />
        )}
        <TouchableOpacity
          onPress={() => {
            setIsModalReminders(true);
          }}
        >
          <SettingsEditText title="Reminders" value={reminders} />
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
                <SCLAlertButton theme="success" onPress={() => {}}>
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
  