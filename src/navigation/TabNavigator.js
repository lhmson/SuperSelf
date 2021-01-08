import React from "react";
import { TouchableOpacity , StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components";
import Colors from "../utils/Colors";
import ActionButton from 'react-native-circular-action-menu';

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
        <ActionButton buttonColor={Colors.primary} size = {50} style={styles.actionButton} 
          icon = {<FontAwesome5 name = "rocket" style={{color : "white", fontSize:20}}></FontAwesome5>}>
          <ActionButton.Item buttonColor='#transparent'></ActionButton.Item>
  
          <ActionButton.Item buttonColor='#3498db' size={60} title="To do" onPress = {() => {navigation.navigate("Todo")}}>
            <FontAwesome5 name="clipboard-list" size={30} color={`${Colors.paleWhite}`} />
          </ActionButton.Item>

          <ActionButton.Item buttonColor='#F55555' size={60} title="My Challenge" onPress={() => {navigation.replace("Challenge"); navigation.navigate("Challenge");}}>
            <FontAwesome5 name="address-card" size={30} color={`${Colors.paleWhite}`} />
          </ActionButton.Item>

          <ActionButton.Item buttonColor='#1abc9c' size={60}  title="Challenge" onPress={() => {navigation.replace("Challenge"); navigation.navigate("MyChallenge");}}>
            <FontAwesome5 name="bible" size={30} color={`${Colors.paleWhite}`} />
          </ActionButton.Item>

          <ActionButton.Item buttonColor='#transparent'></ActionButton.Item>
        </ActionButton>

    </React.Fragment>
  );
};

const AddToDoButton = styled.View`
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  position: absolute;
  bottom: 30px;
  left: 50%;
  margin-left: -25px;
  border-radius: 50px;
`;

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  actionButton :{
    borderWidth : 1,
    borderColor: "#000000",
    shadowOpacity : 0.2,
    
    marginTop: -300,
  }
});

export default BottomTabNavigator;
