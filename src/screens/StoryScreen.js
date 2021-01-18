import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, Image, Alert } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Asset from "expo-asset";
import * as SecureStore from "expo-secure-store";
import * as ImageManipulator from "expo-image-manipulator";
import ActionButton from "react-native-circular-action-menu";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";

import { storage } from "../context/firebaseDB";

const Stories = () => {
  const [image, setImage] = useState(null);
  const [post, setPost] = useState(null);
  const [noPostAlert, setNoPostAlert] = useState(false);
  const [postSuccessAlert, setPostSuccessAlert] = useState(false);

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
    if (post === null || post === "") {
      setNoPostAlert(true);
      return;
    }
    const imageUrl = await uploadImage();
    console.log("Image Url: ", imageUrl);
    console.log("Post: ", post);
    setPostSuccessAlert(true);
    setPost(null);
  };

  return (
    <View style={styles.center}>
      {/* <ImageBackground
        source={require("../utils/comesoon1.jpg")}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          resizeMode: "cover",
        }}
      ></ImageBackground> */}

      <InputWrapper>
        <InputField
          placeholder="What's on your mind?"
          multiline
          numberOfLines={4}
          maxLength={100}
          maxHeight={120}
          value={post}
          onChangeText={(content) => setPost(content)}
        />
        {image != null ? <AddImage source={{ uri: image }} /> : null}
        <ActionButton
          buttonColor={Colors.secondary}
          size={50}
          style={styles.actionButton}
          degrees={720}
          position="right"
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
          >
            <Ionicons name="ios-camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={Colors.red}
            title="Choose Photo"
            onPress={addPhotoFromGallery}
          >
            <Ionicons name="md-images" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        {/* {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color={`${Colors.primary}`} />
          </StatusWrapper>
        ) : ( */}
        <View style={{ flexDirection: "row" }}>
          <SubmitBtn
            onPress={() => {
              submit();
            }}
          >
            <SubmitBtnText>Post</SubmitBtnText>
          </SubmitBtn>
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
  background-color: ${Colors.paleWhite};
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

export default Stories;
