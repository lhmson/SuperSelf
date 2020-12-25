import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components";
import Colors from "../utils/Colors";

import {
  HomeStackNavigator,
  ChallengeStackNavigator,
  WorldStackNavigator,
  ProfileStackNavigator,
} from "./StackNavigator";

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
        color={focused ? Colors.black : Colors.primaryDark}
      />
    );
  },
});

const BottomTabNavigator = ({ navigation }) => {
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
          // showLabel: false
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{ tabBarBadge: 1 }}
        />
        <Tab.Screen name="Challenge" component={ChallengeStackNavigator} />
        <Tab.Screen name="World" component={WorldStackNavigator} />
        <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      </Tab.Navigator>

      <AddToDoButton onPress={() => navigation.navigate("Todo")}>
        <FontAwesome5 name="plus" size={24} color={`${Colors.lightGreen}`} />
      </AddToDoButton>
    </React.Fragment>
  );
};

const AddToDoButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  position: absolute;
  bottom: 45px;
  left: 50%;
  margin-left: -35px;
  background-color: ${Colors.primaryDark};
  border-radius: 100px;
`;

export default BottomTabNavigator;
