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

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { storage, firestore, db } from "../context/firebaseDB";

import { UserContext } from "../context/UserContext";
import { UserFirebaseContext } from "../context/UserFirebaseContext";
import { ChallengeFirebaseContext } from "../context/ChallengeFirbaseContext";
import { SettingContext } from "../context/SettingContext";

const { width, height } = Dimensions.get("window");
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Colors from "../utils/Colors";
import { SettingFirebaseContext } from "../context/SettingFirebaseContext";

export default function SettingUserScreen() {
  const [user, setUser] = useContext(UserContext);
  const userFirebase = useContext(UserFirebaseContext);
  const [username, setUsername] = useState(user.username);
  const [setting, setSetting] = useContext(SettingContext);
  const settingFirebase = useContext(SettingFirebaseContext);
  const [allowPushNotifications, setAllowPushNotifications] = useState(
    setting.allowPush
  );
  const [theme, setTheme] = useState(setting.theme);
  const [sound, setSound] = useState(setting.sound);
  const [snow, setSnow] = useState(setting.snow);
  const [gender, setGender] = useState(user.gender ? user.gender : "Other");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(
    user.profilePhotoUrl === "default"
      ? "https://firebasestorage.googleapis.com/v0/b/superselfapp.appspot.com/o/icon%2Fsuperself-icon.png?alt=media&token=d3403ab1-4863-4cce-a7b2-11defcd149f6"
      : user.profilePhotoUrl
  );
  const [image, setImage] = useState(null);
  const [language, setLanguage] = useState(
    setting.language ? setting.language : "English"
  );
  // const [birthday, setBirthday] = useState(user.birthday);

  const [mail, setMail] = useState(user.email);
  // const [password, setPassword] = useState(user.password);
  // const [isModalPassword, setIsModalPassword] = useState(false);
  const [isModalUserName, setIsModalUserName] = useState(false);

  // const [isModalBirthday, setIsModalBirthday] = useState(false);

  const challenge = useContext(ChallengeFirebaseContext);

  const chooseAvatar = () => {
    Alert.alert(
      "Avatar pick",
      "Choose one type of pick",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Gallery",
          onPress: () => {
            addPhotoFromGallery();
          },
        },
        {
          text: "Camera",
          onPress: () => {
            addPhotoFromCamera();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const getPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      return status;
    }
  };

  const pickImageFromGallery = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [1, 1],
        quality: 0.5,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (error) {
      console.log("Error when picking image: " + error);
    }
  };

  const pickImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    try {
      if (cameraPermission.status === "granted") {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          //   aspect: [4, 3],
        });
        if (!result.cancelled) {
          setImage(result.uri);
        }
      }
    } catch (error) {
      console.log("Error when taking photo: " + error);
    }
  };

  const addPhotoFromGallery = async () => {
    const status = await getPermissions();

    if (status !== "granted") {
      alert("We need permissions to get access to your camera library");
      return;
    }

    pickImageFromGallery();
    // get image from db firebase
    const imageUrl = await uploadImage();

    const info = {
      username,
      email: user.email,
      // birthday,
      gender,
      profilePhotoUrl: imageUrl,
    };
    console.log("info ", info);
    try {
      await userFirebase.updateUser(user.uid, info);
      if (imageUrl) {
        setProfilePhotoUrl(imageUrl);
        setUser({ ...user, profilePhotoUrl: imageUrl });
      }
    } catch (error) {
      alert("Error when edit username");
    }
  };

  const addPhotoFromCamera = async () => {
    const status = await getPermissions();

    if (status !== "granted") {
      alert("We need permissions to get access to your camera library");
      return;
    }

    pickImageFromCamera();
    // get image from db firebase
    console.log("Image Url: ", imageUrl);
    const info = {
      username,
      email: user.email,
      // birthday,
      gender,
      profilePhotoUrl: imageUrl,
    };
    console.log("info ", info);
    try {
      await userFirebase.updateUser(user.uid, info);
      if (imageUrl) {
        setProfilePhotoUrl(imageUrl);
        setUser({ ...user, profilePhotoUrl: imageUrl });
      }
    } catch (error) {
      alert("Error when edit username");
    }
  };

  const getBlob = async (uri) => {
    //console.log("Uri get blob: " + uri);
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network request fails"));
      };

      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = await getBlob(image);
    // const uploadUri = image;
    let filename = image.substring(image.lastIndexOf("/") + 1);

    // Add timestamp to File Name
    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;

    const storageRef = storage.ref(`profilePhotos/${filename}`);

    const task = await storageRef.put(uploadUri);

    try {
      await task;

      const url = await storageRef.getDownloadURL();
      setImage(null);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const logOut = async () => {
    console.log("OK");
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

  // const onChangeBirthday = async (event, selectedDate) => {
  //   const currentDate = selectedDate || birthday;
  //   setBirthday(currentDate);
  //   console.log(currentDate);
  //   console.log(birthday);
  //   const info = {
  //     username,
  //     email: user.email,
  //     birthday,
  //     gender,
  //     profilePhotoUrl,
  //   };
  //   console.log("info birthday: ", info);
  //   try {
  //     await userFirebase.updateUser(user.uid, info);
  //     setIsModalBirthday(false);
  //   } catch (error) {
  //     setIsModalBirthday(false);
  //     alert("Error when edit birthday");
  //   }
  // };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "ios" ? colors.iosSettingsBackground : colors.white,
      }}
    >
      {/* Alert Password */}

      {/* <SCLAlert
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
      </SCLAlert> */}

      {/* Alert UserName */}
      <SCLAlert
        headerIconComponent={renderImageUsername()}
        theme="success"
        onRequestClose={() => {
          return;
        }}
        show={isModalUserName}
        title="Change Username"
      >
        <TextInput
          style={{ ...styles.TextPassword, marginTop: -50 }}
          placeholder="Username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
          }}
        ></TextInput>
        <View style={{ height: 20 }}></View>
        <SCLAlertButton
          theme="success"
          onPress={async () => {
            const info = {
              username,
              email: user.email,
              // birthday,
              gender,
              profilePhotoUrl,
            };
            try {
              await userFirebase.updateUser(user.uid, info);
              setUser({ ...user, username });
              setIsModalUserName(false);
            } catch (error) {
              setIsModalUserName(false);
              alert("Error when edit username");
            }
          }}
        >
          Done
        </SCLAlertButton>
      </SCLAlert>

      <View
        style={{
          // width: width,
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
          onPress={() => chooseAvatar()}
          activeOpacity={0.7}
          source={{ uri: profilePhotoUrl }}
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
        <SettingsEditText
          title="Username"
          value={username}
          onValueChange={() => {}}
        />
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={() => {
          setIsModalBirthday(true);
        }}
      >
        <SettingsEditText
          title="Birthday"
          value={moment(birthday).format("MMM Do YYYY")}
        />
      </TouchableOpacity> */}

      {/* DateTime Birthday */}

      {/* {isModalBirthday && (
        <DateTimePicker
          value={birthday}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChangeBirthday}
        />
      )} */}

      <SettingsPicker
        title="Gender"
        dialogDescription={"Choose your gender."}
        options={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Other", value: "Other" },
        ]}
        onValueChange={async (value) => {
          console.log("val", value);
          setGender(value);
          const info = {
            username,
            email: user.email,
            // birthday,
            gender: value,
            profilePhotoUrl,
          };
          try {
            await userFirebase.updateUser(user.uid, info);
            setUser({ ...user, gender });
          } catch (error) {
            alert("Error when edit gender");
          }
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
        onValueChange={async (value) => {
          console.log("allow push notifications:", value);
          setAllowPushNotifications(value);
          const obj = {
            ...setting,
            allowPush: value,
          };
          setSetting(obj);
          console.log("setting ", setting);
          await settingFirebase.updateSetting(user.uid, obj);
        }}
        value={allowPushNotifications}
        trackColor={{
          true: colors.switchEnabled,
          false: colors.switchDisabled,
        }}
      />

      <SettingsSwitch
        title={"Theme Light/Night"}
        onValueChange={async (value) => {
          console.log("allow theme", value);
          setTheme(value);
          const obj = {
            ...setting,
            theme: value,
          };
          setSetting(obj);
          console.log("setting ", setting);
          await settingFirebase.updateSetting(user.uid, obj);
        }}
        value={theme}
        trackColor={{
          true: colors.switchEnabled,
          false: colors.switchDisabled,
        }}
      />

      <SettingsSwitch
        title={"Sound"}
        onValueChange={async (value) => {
          console.log("allow sound:", value);
          setSound(value);
          const obj = {
            ...setting,
            sound: value,
          };
          setSetting(obj);
          console.log("setting ", setting);
          await settingFirebase.updateSetting(user.uid, obj);
        }}
        value={sound}
        trackColor={{
          true: colors.switchEnabled,
          false: colors.switchDisabled,
        }}
      />

      <SettingsSwitch
        title={"Snow"}
        onValueChange={async (value) => {
          console.log("allow snow:", value);
          setSnow(value);
          const obj = {
            ...setting,
            snow: value,
          };
          setSetting(obj);
          console.log("setting ", setting);
          await settingFirebase.updateSetting(user.uid, obj);
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
        onValueChange={async (value) => {
          setLanguage(value);
          const obj = {
            ...setting,
            language: value,
          };
          setSetting(obj);
          console.log("setting ", setting);
          await settingFirebase.updateSetting(user.uid, obj);
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
        onValueChange={() => {}}
      />

      {/* <TouchableOpacity>
        <SettingsButton
          title="Password Change"
          onPress={() => {
            setIsModalPassword(true);
          }}
        />
      </TouchableOpacity> */}

      <TouchableOpacity
        style={{ marginBottom: Dimensions.get("screen").height / 8 }}
      >
        <SettingsButton title="Logout" onPress={() => logOut()} />
      </TouchableOpacity>
      {/* <TouchableOpacity>
        <SettingsButton
          title="Delete Account"
          titleStyle={{ color: `${Colors.red}` }}
          onPress={() => {}}
        />
      </TouchableOpacity> */}
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
