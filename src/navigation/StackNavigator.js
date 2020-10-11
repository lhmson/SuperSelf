import React from "react";
import { View, Image, Button, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerActions } from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons'; 
import Colors from "../utils/Colors";

import Home from "../screens/HomeScreen";
import Todo from "../screens/TodoScreen";
import Challenge from "../screens/ChallengeScreen";
import World from "../screens/WorldScreen";
import Profile from "../screens/ProfileScreen";
import About from "../screens/AboutScreen";

const Stack = createStackNavigator();

const LogoTitle = ({ toggleDrawer }) => {
  return (
    <TouchableOpacity style={{ paddingLeft: 12 }} onPress={toggleDrawer}>
      <Image
        style={{ width: 50, height: 50 }}
        source={require("../utils/superself-icon.png")}
      />
    </TouchableOpacity>
  );
};

const screenOptionStyle = (props) => {
  const { toggleDrawer } = props.navigation; // <-- drawer's navigation (not from stack)
  return {
    headerStyle: {
      backgroundColor: Colors.lightBlue,
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
    headerLeft: () => <LogoTitle toggleDrawer={toggleDrawer} />,
    headerRight: () => (
      <TouchableOpacity style={{ paddingRight: 12 }}>
        <Entypo name="help-with-circle" size={24} color="black" />
      </TouchableOpacity>
    ),
    // headerStatusBarHeight: 30,
  };
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Todo" component={Todo} />
    </Stack.Navigator>
  );
};

const ChallengeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="Challenge" component={Challenge} />
    </Stack.Navigator>
  );
};

const WorldStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="World" component={World} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const AboutStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

export {
  HomeStackNavigator,
  ChallengeStackNavigator,
  WorldStackNavigator,
  ProfileStackNavigator,
  AboutStackNavigator,
};
