import React, { useState, useContext } from "react";
import { View, StyleSheet, ImageBackground, Image, Alert } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Asset from "expo-asset";
import * as SecureStore from "expo-secure-store";
import * as ImageManipulator from "expo-image-manipulator";
import ActionButton from "react-native-circular-action-menu";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "../components/Loading";

import { UserContext } from "../context/UserContext";
import { StoryContext } from "../context/StoryContext";
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";

import { storage, firestore, db } from "../context/firebaseDB";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { useEffect, useRef } from "react";

//PUSH-NOTIFICATION
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken, post) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "SUPER SELF",
    body: post,
    data: { data: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

//Bckend Client: Gửi yêu cầu cấp quyền và lấy token
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      // alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("hahaha");
    console.log(token);
    //send token to supplier
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

  console.log(token);
  return token;
}

const PushNoti = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState(null);
  const [noPostAlert, setNoPostAlert] = useState(false);
  const [postSuccessAlert, setPostSuccessAlert] = useState(false);
  const [story, setStory] = useContext(StoryContext);
  const [loading, setLoading] = useState(false);

  //PUSH-NOTIFICATION
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    //Đăng ký và nhận token client
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    //Đăng ký nhận notification ngay cả khi người dùng không dùng máy
    //Diem manh push notification so vơi pull
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    //Đăng ký sự sự kiện phản hồi khi người dùng tap vào notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

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
  };

  const addPhotoFromCamera = async () => {
    const status = await getPermissions();

    if (status !== "granted") {
      alert("We need permissions to get access to your camera library");
      return;
    }

    pickImageFromCamera();
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

    const storageRef = storage.ref(`teststoriesphotos/${filename}`);

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

  const submit = async () => {
    // if (post === null || post === "") {
    //   setNoPostAlert(true);
    //   return;
    // }

    setLoading(true);
    // Sanh do push notification there
    console.log("push");
    await sendPushNotification(
      "ExponentPushToken[mS7Cu1KVCyZjCdpk_9gAOq]",
      post
    );
    await sendPushNotification(
      "ExponentPushToken[3BHeqjJUFLYQBRTccdWo8K]",
      post
    );
    console.log("send");
    setLoading(false);

    // const imageUrl = await uploadImage();
    // console.log("Image Url: ", imageUrl);
    // console.log("Post: ", post);

    // db.collection("stories")
    //   .add({
    //     user: {
    //       userId: user.uid,
    //       username: user.username,
    //       profilePhotoUrl: user.profilePhotoUrl,
    //     },
    //     post: post,
    //     photoUrl: imageUrl,
    //     postAt: new Date().toISOString(),
    //     likes: 0,
    //     comments: 0,
    //   })
    //   .then(() => {
    //     setLoading(false);
    //     setPostSuccessAlert(true);
    //     setPost(null);
    //     setStory({ ...story, currentlyPostStory: true });
    //     navigation.navigate("Stories");
    //   })
    //   .catch((error) => {
    //     alert("Something gets wrong when posting ", error.message);
    //   });
  };

  return (
    <View style={styles.center}>
      <ImageBackground
        source={require("../utils/postbg.jpg")}
        style={{
          width: "100%",
          height: "100%",
          opacity: 10,
          resizeMode: "cover",
        }}
        imageStyle={{ opacity: 0.5 }}
      ></ImageBackground>

      <InputWrapper>
        <InputField
          placeholder={`Put some notes to users\nType yours`}
          multiline
          numberOfLines={4}
          maxLength={150}
          maxHeight={120}
          value={post}
          onChangeText={(content) => setPost(content)}
        />
        {image != null ? <AddImage source={{ uri: image }} /> : null}
        <ActionButton
          buttonColor={Colors.secondary}
          size={50}
          style={styles.actionButton}
          degrees={180}
          position="right"
          icon={
            <Ionicons
              name="ios-share"
              style={{ color: "white", fontSize: 20 }}
            ></Ionicons>
          }
        >
          <ActionButton.Item
            buttonColor={Colors.blueGreen}
            title="Post"
            onPress={submit}
            endDegree={360}
          >
            <Ionicons name="ios-fastforward" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        {/* <ActionButton
          buttonColor={Colors.secondary}
          size={50}
          style={styles.actionButton}
          degrees={160}
          position="left"
          icon={
            <Ionicons
              name="ios-images"
              style={{ color: "white", fontSize: 20 }}
            ></Ionicons>
          }
        >
          <ActionButton.Item
            buttonColor={Colors.blueGreen}
            title="Take Photo"
            onPress={addPhotoFromCamera}
            endDegree={360}
          >
            <Ionicons name="ios-camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={Colors.blueGreen}
            title="Choose Photo"
            onPress={addPhotoFromGallery}
            endDegree={360}
          >
            <Ionicons name="md-images" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton> */}
        {/* {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color={`${Colors.primary}`} />
          </StatusWrapper>
        ) : ( */}
        <View style={{ flexDirection: "row" }}>
          {loading ? <Loading /> : null}
          <SCLAlert
            headerIconComponent={
              <Image
                source={require("../utils/Icon/input.png")}
                style={{ width: 50, height: 50, resizeMode: "contain" }}
              />
            }
            theme="warning"
            show={noPostAlert}
            onRequestClose={() => setNoPostAlert(false)}
            title="Input something..."
            subtitle="You haven't put in a content for your story"
          >
            <SCLAlertButton
              theme="success"
              onPress={() => {
                setNoPostAlert(false);
              }}
            >
              Back to edit
            </SCLAlertButton>
          </SCLAlert>

          <SCLAlert
            headerIconComponent={
              <Image
                source={require("../utils/Icon/success.png")}
                style={{ width: 50, height: 50, resizeMode: "contain" }}
              />
            }
            theme="warning"
            show={postSuccessAlert}
            title="Upload successfully"
            subtitle="Your story has been posted"
            onRequestClose={() => setPostSuccessAlert(false)}
          >
            <SCLAlertButton
              theme="success"
              onPress={() => {
                setPostSuccessAlert(false);
              }}
            >
              OK
            </SCLAlertButton>
          </SCLAlert>
        </View>
        {/* )} */}
      </InputWrapper>
    </View>
  );
};

const InputWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  ${"" /* background-color: ${Colors.paleWhite}; */}
  position: absolute;
`;

const InputField = styled.TextInput`
  justify-content: center;
  align-items: center;
  font-size: 24px;
  text-align: center;
  width: 90%;
  margin-bottom: 15px;
`;

const AddImage = styled.Image`
  width: 100%;
  height: 240px;
  margin-bottom: 15px;
  resize-mode: contain;
`;

const StatusWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const SubmitBtn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  background-color: #2e64e515;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 10px;
  width: 116px;
`;

const SubmitBtnText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.primaryLight};
`;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});

export default PushNoti;
