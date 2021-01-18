import {
  SettingsDividerShort,
  SettingsDividerLong,
  SettingsEditText,
  SettingsCategoryHeader,
  SettingsSwitch,
  SettingsPicker,
  SettingsButton,
} from "react-native-settings-components";
import React, { Component, useState, useContext } from "react";
import {
  ScrollView,
  Dimensions,
  View,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Avatar } from "react-native-elements";

import { UserContext } from "../context/UserContext";
import { UserFirebaseContext } from "../context/UserFirebaseContext";

const { width, height } = Dimensions.get("window");
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Colors from "../utils/Colors";

export default function SettingUserScreen() {
  const [user, setUser] = useContext(UserContext);
  const userFirebase = useContext(UserFirebaseContext);
  const [username, setUsername] = useState(user.username);
  const [allowPushNotifications, setAllowPushNotifications] = useState(false);
  const [theme, setTheme] = useState(false);
  const [sound, setSound] = useState(false);
  const [snow, setSnow] = useState(false);
  const [gender, setGender] = useState("Male");
  const [language, setLanguage] = useState("English");
  const [birthday, setBirthday] = useState(
    user.birthday ? user.birthday : new Date()
  );
  const [mail, setMail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [isModalPassword, setIsModalPassword] = useState(false);
  const [isModalUserName, setIsModalUserName] = useState(false);
  const [isModalBirthday, setIsModalBirthday] = useState(false);

  const logOut = async () => {
    Alert.alert(
      "Confirm your action",
      "You wanna logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const loggedOut = await userFirebase.logOut();
            if (loggedOut) {
              setUser((state) => ({ ...state, isLoggedIn: false }));
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderImagePassword = () => (
    <Image
      source={require("../utils/Icon/Password.png")}
      style={{ width: 80, height: 80, resizeMode: "cover" }}
    />
  );

  const renderImageUsername = () => (
    <Image
      source={require("../utils/Icon/Username.png")}
      style={{ width: 80, height: 80, resizeMode: "cover" }}
    />
  );

  const onChangeBirthday = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setIsModalBirthday(false);
    setBirthday(currentDate);
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
      {/* Alert Password */}
      <SCLAlert
        headerIconComponent={renderImagePassword()}
        theme="success"
        onRequestClose={() => {
          setIsModalPassword(false);
        }}
        show={isModalPassword}
        title="Change Password"
      >
        <TextInput
          style={{ ...styles.TextPassword, marginTop: -50 }}
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          placeholder="Old password"
          secureTextEntry={true}
        ></TextInput>
        <View style={{ height: 20 }}></View>
        <TextInput
          style={styles.TextPassword}
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          placeholder="New password"
          secureTextEntry={true}
        ></TextInput>
        <SCLAlertButton
          theme="success"
          onPress={() => {
            setIsModalPassword(false);
          }}
        >
          Confirm
        </SCLAlertButton>
      </SCLAlert>
      {/* Alert UserName */}
      <SCLAlert
        headerIconComponent={renderImageUsername()}
        theme="success"
        onRequestClose={() => {
          setIsModalUserName(false);
        }}
        show={isModalUserName}
        title="Change Username"
      >
        <TextInput
          style={{ ...styles.TextPassword, marginTop: -50 }}
          placeholder="Username"
        ></TextInput>
        <View style={{ height: 20 }}></View>
        <SCLAlertButton
          theme="success"
          onPress={() => {
            setIsModalUserName(false);
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
          title="AVATAR"
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          source={{ uri: MyAvatar }}
        />
      </View>
      <SettingsCategoryHeader
        title={"Personal Info"}
        titleStyle={
          Platform.OS === "android" ? { color: Colors.primaryDark } : null
        }
      />
      <SettingsDividerLong android={false} />

      <TouchableOpacity
        onPress={() => {
          setIsModalUserName(true);
        }}
      >
        <SettingsEditText title="Username" value={username} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setIsModalBirthday(true);
        }}
      >
        <SettingsEditText
          title="Birthday"
          value={moment(birthday).format("MMM Do YYYY")}
        />
      </TouchableOpacity>

      {/* DateTime Birthday */}
      {isModalBirthday && (
        <DateTimePicker
          value={birthday}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChangeBirthday}
        />
      )}

      <SettingsPicker
        title="Gender"
        dialogDescription={"Choose your gender."}
        options={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Other", value: "Other" },
        ]}
        onValueChange={(value) => {
          setGender(value);
        }}
        value={gender}
      />
      <SettingsDividerShort />
      <SettingsCategoryHeader
        title={"setting"}
        titleStyle={
          Platform.OS === "android" ? { color: Colors.primaryDark } : null
        }
      />
      <SettingsSwitch
        title={"Allow Push Notifications"}
        onValueChange={(value) => {
          console.log("allow push notifications:", value);
          setAllowPushNotifications(value);
        }}
        value={allowPushNotifications}
        trackColor={{
          true: colors.switchEnabled,
          false: colors.switchDisabled,
        }}
      />

      <SettingsSwitch
        title={"Theme Light/Night"}
        onValueChange={(value) => {
          console.log("allow theme", value);
          setTheme(value);
        }}
        value={theme}
        trackColor={{
          true: colors.switchEnabled,
          false: colors.switchDisabled,
        }}
      />

      <SettingsSwitch
        title={"Sound"}
        onValueChange={(value) => {
          console.log("allow sound:", value);
          setSound(value);
        }}
        value={sound}
        trackColor={{
          true: colors.switchEnabled,
          false: colors.switchDisabled,
        }}
      />

      <SettingsSwitch
        title={"Snow"}
        onValueChange={(value) => {
          console.log("allow snow:", value);
          setSnow(value);
        }}
        value={snow}
        trackColor={{
          true: colors.switchEnabled,
          false: colors.switchDisabled,
        }}
      />
      <SettingsPicker
        title="Language"
        dialogDescription={"Choose your language."}
        options={[
          { label: "Chinese", value: "Chinese" },
          { label: "VietNamese", value: "VietNamese" },
          { label: "English", value: "English" },
        ]}
        onValueChange={(value) => {
          setLanguage(value);
        }}
        value={language}
        // styleModalButtonsText={{ backgroundColor: colors.white}}
      />
      <SettingsDividerShort />
      <SettingsCategoryHeader
        title={"account"}
        titleStyle={
          Platform.OS === "android" ? { color: Colors.primaryDark } : null
        }
      />
      <SettingsEditText
        title="Mail"
        valuePlaceholder="admin123@gm.com"
        value={mail}
      />

      <TouchableOpacity>
        <SettingsButton
          title="Password Change"
          onPress={() => {
            setIsModalPassword(true);
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <SettingsButton title="Logout" onPress={() => logOut()} />
      </TouchableOpacity>
      <TouchableOpacity>
        <SettingsButton
          title="Delete Account"
          titleStyle={{ color: `${Colors.red}` }}
          onPress={() => {}}
        />
      </TouchableOpacity>
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
