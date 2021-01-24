import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components";
import Colors from "../utils/Colors";
import ActionButton from "react-native-circular-action-menu";

import {
  HomeStackNavigator,
  ChallengeStackNavigator,
  WorldStackNavigator,
  ProfileStackNavigator,
} from "./StackNavigator";
import { KeyboardAvoidingView, ScrollView } from "react-native";

const Tab = createBottomTabNavigator();

const screenOptionStyle = (route) => ({
  tabBarIcon: ({ focused }) => {
    let iconName = "home";
    switch (route.name) {
      case "Home":
        iconName = "home";
        break;
      case "Challenge":
        iconName = "chess";
        break;
      case "World":
        iconName = "map";
        break;
      case "Profile":
        iconName = "chalkboard-teacher";
        break;
      default:
        iconName = "ios-home";
    }

    return (
      <FontAwesome5
        name={iconName}
        size={24}
        color={focused ? Colors.secondaryLight : Colors.primaryDark}
      />
    );
  },
});

const BottomTabNavigator = ({ navigation }) => {
  const [midBtnSize, setMidBtnSize] = useState(100);
  const toggleMidBtnSize = () => {
    midBtnSize === 100 ? setMidBtnSize(200) : setMidBtnSize(100);
  };
  return (
    <React.Fragment>
      <Tab.Navigator
        screenOptions={({ route }) => screenOptionStyle(route)}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          labelStyle: {
            fontSize: 14,
          },
          style: {
            height: 80,
          },
          tabStyle: {
            margin: 10,
          },
          keyboardHidesTabBar: true,
          // showLabel: false
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          // options={{ tabBarBadge: 1 }}
        />
        <Tab.Screen name="Challenge" component={ChallengeStackNavigator} />
        <Tab.Screen name="World" component={WorldStackNavigator} />
        <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      </Tab.Navigator>
      <MidButtonView
        style={{
          width: midBtnSize,
          height: midBtnSize - 20,
          marginLeft: -midBtnSize / 2,
        }}
      >
        <MidActionButton
          style={styles.midButton}
          navigation={navigation}
          pressButton={() => {
            toggleMidBtnSize();
          }}
        />
      </MidButtonView>
    </React.Fragment>
  );
};

const MidActionButton = (props) => {
  const { navigation, pressButton } = props;
  return (
    <ActionButton
      buttonColor={Colors.primary}
      size={50}
      style={styles.actionButton}
      degrees={320}
      onPress={pressButton}
      onOverlayPress={pressButton}
      icon={
        <FontAwesome5
          name="rocket"
          style={{ color: "white", fontSize: 20 }}
        ></FontAwesome5>
      }
    >
      <ActionButton.Item buttonColor="#transparent">
        <View></View>
      </ActionButton.Item>

      <ActionButton.Item
        buttonColor="#1abc9c"
        size={60}
        title="To do"
        onPress={() => {
          pressButton();
          navigation.navigate("Add Todo");
        }}
        endDegree={0}
      >
        <FontAwesome5
          name="clipboard-list"
          size={30}
          color={`${Colors.paleWhite}`}
        />
      </ActionButton.Item>

      <ActionButton.Item
        buttonColor="#F55555"
        size={60}
        title="My Challenge"
        onPress={() => {
          pressButton();
          // navigation.replace("Challenge");
          navigation.navigate("My Challenge");
        }}
        endDegree={0}
      >
        <FontAwesome5
          name="address-card"
          size={30}
          color={`${Colors.paleWhite}`}
        />
      </ActionButton.Item>

      <ActionButton.Item
        buttonColor="#3498db"
        size={60}
        title="Challenge"
        onPress={() => {
          pressButton();
          // navigation.replace("Challenge");
          navigation.navigate("Message");
        }}
        endDegree={0}
      >
        <MaterialIcons name="message" size={30} color={`${Colors.paleWhite}`} />
      </ActionButton.Item>

      <ActionButton.Item buttonColor="#transparent">
        <View></View>
      </ActionButton.Item>
    </ActionButton>
  );
};

const MidButtonView = styled.View`
  ${"" /* border-width: 1px; */}
  border-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
  ${"" /* width: 200px; */}
  height: 200px;
  position: absolute;
  bottom: 45px;
  left: 50%;
  margin-left: -100px;
  ${"" /* background-color: ${Colors.primary}; */}
  border-radius: 50px;
`;

const styles = StyleSheet.create({
  actionButtonIcon: {},
  actionButton: {},
  midButton: {},
});

export default BottomTabNavigator;
