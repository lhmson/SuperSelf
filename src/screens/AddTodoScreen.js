import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";
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
import iconUrl from "../utils/iconUrl";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "../components/Loading";

import DateTimePicker from "@react-native-community/datetimepicker";

import { UserContext } from "../context/UserContext";
import { StoryContext } from "../context/StoryContext";
import { TodoFirebaseContext } from "../context/TodoFirebaseContext";
import { TodoContext } from "../context/TodoContext";
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";

import { storage, firestore, db } from "../context/firebaseDB";
import moment from "moment";

const AddTodo = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState(null);
  const [infoAlert, setInfoAlert] = useState(false);
  const [postSuccessAlert, setPostSuccessAlert] = useState(false);
  const [story, setStory] = useContext(StoryContext);
  const [iconModal, setIconModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState(
    "https://firebasestorage.googleapis.com/v0/b/superselftest-d1ccf.appspot.com/o/defaultimg%2Fsuperself-icon.png?alt=media&token=3fceeba3-cdb8-4547-9cd9-d038fde6fdf1"
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#fff");
  const [dueTime, setDueTime] = useState(new Date());
  const [priority, setPriority] = useState("Normal");
  const [isModalDuetime, setIsModalDuetime] = useState(false);
  const [isModalDuedate, setIsModalDuedate] = useState(false);

  const [todo, setTodo] = useContext(TodoContext);
  const todoFirebase = useContext(TodoFirebaseContext);

  const pickIcon = () => {
    setIconModal(true);
  };

  const onChangeDuedate = (event, selectedDate) => {
    const currentDate = selectedDate || dueTime;
    const today = new Date();
    setIsModalDuedate(false);
    // setDueDate(currentDate);
    setDueTime(currentDate);
  };
  const onChangeDuetime = (event, selectedTime) => {
    const currentDate = selectedTime || dueTime;
    setIsModalDuetime(false);
    // setDueDate(currentDate);
    setDueTime(currentDate);
  };

  const submit = () => {
    if (title === "") {
      setInfoAlert(true);
      return;
    }
    // if (dueTime < new Date() + 60 * 1000) {
    //   alert("Set time from today");
    //   return;
    // }
    setLoading(true);

    const newTodo = {
      title: title,
      color: color,
      completed: false,
      description: description,
      dueTime: dueTime.toLocaleString(),
      icon: icon,
      //   dueDate: dueDate.toLocaleString(),
      priority: "Normal",
    };

    todoFirebase
      .createTodo(user.uid, newTodo)
      .then(() => {
        setTitle("");
        setDescription("");
        // setDueDate(new Date());
        setDueTime(new Date());
        setColor("#fff");
        setLoading(false);
        setPostSuccessAlert(true);
        setTodo({ ...todo, currentlyAddTodo: true });
        navigation.navigate("To do");
      })
      .catch((error) => {
        alert("Something gets wrong when add a todo ", error.message);
      });
  };

  const backgroundColors = [
    Colors.primaryLight,
    Colors.secondary,
    Colors.greenPastel,
    Colors.white,
    Colors.skin,
    Colors.blue,
    Colors.yellow,
  ];

  const colorPicker = () => {
    return backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => {
            setColor(color);
          }}
        />
      );
    });
  };

  return (
    <View style={styles.center}>
      <ImageBackground
        source={require("../utils/postbg4.jpg")}
        style={{
          width: "100%",
          height: "100%",
          opacity: 10,
          resizeMode: "cover",
        }}
        imageStyle={{ opacity: 0.3 }}
      ></ImageBackground>

      <InputWrapper>
        <Auth
          behavior="position"
          keyboardVerticalOffset={-Dimensions.get("screen").height / 6}
        >
          {loading ? <Loading /> : null}
          <IconContainer onPress={pickIcon}>
            {icon ? (
              <Icon source={{ uri: icon }} />
            ) : (
              <DefaultIcon>
                <AntDesign
                  name="plus"
                  size={24}
                  color={`${Colors.primaryDark}`}
                />
              </DefaultIcon>
            )}
          </IconContainer>

          <AuthContainer>
            {/* <AuthTitle medium>Username</AuthTitle> */}
            <AuthField
              placeholder="TITLE"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={false}
              onChangeText={(title) => setTitle(title)}
              value={title}
            />
          </AuthContainer>

          <AuthContainer>
            {/* <AuthTitle medium>Username</AuthTitle> */}
            <AuthField
              placeholder="DESCRIPTION"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={false}
              onChangeText={(des) => setDescription(des)}
              value={description}
            />
          </AuthContainer>

          <AuthContainer>
            {/* <AuthTitle medium>Username</AuthTitle> */}
            <AuthField
              placeholder=""
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={false}
              editable={false}
              value={
                moment(dueTime).isSame(moment(), "day")
                  ? "Today"
                  : dueTime.toDateString()
              }
            />
            <IconInText
              onPress={() => {
                setIsModalDuedate(true);
              }}
            >
              <AntDesign
                name="calendar"
                size={24}
                color={`${Colors.primaryDark}`}
              />
            </IconInText>
            {isModalDuedate && (
              <DateTimePicker
                value={dueTime}
                mode={"date"}
                is24Hour={true}
                display="default"
                onChange={onChangeDuedate}
              />
            )}
          </AuthContainer>

          <AuthContainer>
            {/* <AuthTitle medium>Username</AuthTitle> */}
            <AuthField
              placeholder="NO TIME SET"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={false}
              editable={false}
              value={moment(dueTime).format("hh:mm a")}
            />
            <IconInText
              onPress={() => {
                setIsModalDuetime(true);
              }}
            >
              <AntDesign
                name="clockcircle"
                size={24}
                color={`${Colors.primaryDark}`}
              />
            </IconInText>
            {isModalDuetime && (
              <DateTimePicker
                value={dueTime}
                mode={"time"}
                is24Hour={true}
                display="default"
                onChange={onChangeDuetime}
              />
            )}
          </AuthContainer>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: color,
              justifyContent: "space-between",
              borderRadius: 10,
              marginTop: 18,
              padding: 10,
            }}
          >
            {colorPicker()}
          </View>

          <View style={{ flexDirection: "row" }}>
            <SCLAlert
              headerIconComponent={
                <Image
                  source={require("../utils/Icon/input.png")}
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                />
              }
              theme="warning"
              show={infoAlert}
              onRequestClose={() => setInfoAlert(false)}
              title="Input something..."
              subtitle="You haven't put in a title to add todo in the list"
            >
              <SCLAlertButton
                theme="success"
                onPress={() => {
                  setInfoAlert(false);
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
              subtitle="Your todo has been added "
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
            <SCLAlert
              headerIconComponent={
                <Image
                  source={require("../utils/superself-icon.png")}
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                />
              }
              theme="warning"
              show={iconModal}
              title="Pick icon for todo"
              subtitle=""
              onRequestClose={() => setIconModal(false)}
            >
              <ScrollView horizontal={true}>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {iconUrl.map((item, index) => {
                    console.log("first", index.toString());

                    return (
                      <TouchableOpacity
                        key={index.toString()}
                        onPress={() => {
                          console.log("second", item.url);
                          setIcon(item.url);
                        }}
                      >
                        {item.img}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
              <SCLAlertButton
                theme="success"
                onPress={() => {
                  setIconModal(false);
                }}
              >
                OK
              </SCLAlertButton>
            </SCLAlert>
          </View>
          {/* )} */}
        </Auth>
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
      </InputWrapper>
    </View>
  );
};

const InputWrapper = styled.View`
  flex: 1;
  justify-content: center;
  padding: 30px;
  width: 100%;
  height: 100%;
  ${"" /* background-color: ${Colors.paleWhite}; */}
  position: absolute;
`;

const IconContainer = styled.TouchableOpacity`
  background-color: ${Colors.paleWhite};
  width: 90px;
  height: 90px;
  border-radius: 100px;
  align-self: center;
  margin-top: 16px;
  overflow: hidden;
`;

const DefaultIcon = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Icon = styled.Image`
  flex: 1;
`;

const Auth = styled.KeyboardAvoidingView`
  margin: 0px 30px;
`;

const AuthContainer = styled.View`
  margin-top: 34px;
`;

const AuthTitle = styled(Text)`
  color: ${Colors.lightBlack};
  text-transform: uppercase;
`;

const AuthField = styled.TextInput`
  border-bottom-color: ${Colors.primaryDark};
  border-bottom-width: 1px;
  height: 42px;
`;

const InputField = styled.TextInput`
  justify-content: center;
  align-items: center;
  font-size: 24px;
  text-align: center;
  width: 90%;
  margin-bottom: 15px;
`;

const IconInText = styled.TouchableOpacity`
  position: absolute;
  top: 25%;
  right: 10px;
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
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
});

export default AddTodo;
