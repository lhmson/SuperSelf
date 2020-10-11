import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
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
        color={focused ? Colors.black : Colors.lightBlue}
      />
    );
  },
});

const BottomTabNavigator = () => {
  return (
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
  );
};

export default BottomTabNavigator;
