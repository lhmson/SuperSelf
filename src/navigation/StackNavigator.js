import React from "react";
import { View, Image, Button, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components";
import Text from "../components/Text";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerActions } from "@react-navigation/native";
import { Entypo, Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../utils/Colors";
import quotes from "../utils/quotes/quotes";

import Home from "../screens/HomeScreen";
import Todo from "../screens/TodoScreen";
import Challenge from "../screens/ChallengeScreen";
import History from "../screens/HistoryScreen";
import World from "../screens/WorldScreen";
import Ranking from "../screens/RankingScreen";
import SettingProfile from "../screens/SettingUserScreen";
import Setting from "../screens/SettingScreen";
import About from "../screens/AboutScreen";
import InfoChallenge from "../screens/InfoChallenge";
import MyChallenge from "../screens/MyChallenge";
import Message from "../screens/MessageScreen";
import SetupChallenge from "../screens/SetupChallenge";
import Favorites from "../screens/FavoriteScreen";
import Stories from "../screens/StoryScreen";
import PostStory from "../screens/PoststoryScreen";
import DetailPost from "../screens/DetailPostScreen";
import DetailsChallenge from "../screens/DetailsChallengeScreen"
import AddTodo from "../screens/AddTodoScreen";
import DetailTodo from "../screens/DetailTodoScreen";
import Report from "../screens/ReportScreen";
import PushNoti from "../screens/PushNotiScreen";
import Topic from "../screens/TopicScreen";
import Profile from "../screens/ProfileScreen";

const Stack = createStackNavigator();

const LogoTitle = ({ toggleDrawer }) => {
  return (
    <TouchableOpacity style={{ paddingRight: 12 }} onPress={toggleDrawer}>
      <Image
        style={{ width: 50, height: 50 }}
        source={require("../utils/superself-icon.png")}
      />
    </TouchableOpacity>
  );
};

const screenOptionStyle = (props) => {
  const { toggleDrawer } = props.navigation; // <-- drawer's navigation (not from stack)
  const generateDayQuote = () => {
    const item = quotes[Math.floor(Math.random() * quotes.length)];
    const quote = item.quoteText;
    const author = item.quoteAuthor;
    Alert.alert(
      "Everyday's Quotes:",
      `${quote}\n- ${author}`,
      [
        {
          text: "Share it",
          onPress: () => console.log("Share pressed"),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Next",
          onPress: () => {
            generateDayQuote();
            console.log("Next quote Pressed");
          },
        },
      ],
      { cancelable: false }
    );
  };
  return {
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ paddingRight: 12, justifyContent: "center" }}
          onPress={() => {
            generateDayQuote();
          }}
        >
          <Foundation name="comment-quotes" size={32} color={`${Colors.red}`} />
        </TouchableOpacity>
        <LogoTitle toggleDrawer={toggleDrawer} />
      </View>
    ),
    //headerStatusBarHeight: 30,
  };
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="To do" component={Todo} />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="My Challenge" component={MyChallenge} />
      <Stack.Screen name="Favorite" component={Favorites} />
      <Stack.Screen name="Stories" component={Stories} />
      <Stack.Screen name="Post Story" component={PostStory} />
      <Stack.Screen name="Detail Post" component={DetailPost} />
      <Stack.Screen name="Details Challenge" component={DetailsChallenge}/>
      <Stack.Screen name="Add Todo" component={AddTodo} />
      <Stack.Screen name="Detail Todo" component={DetailTodo} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="Push Notifications" component={PushNoti} />
      <Stack.Screen name="SuperSelf Topic" component={Topic} />
      <Stack.Screen name="User Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const ChallengeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="Challenge" component={Challenge} />
      <Stack.Screen name="Information Challenge" component={InfoChallenge} />
      <Stack.Screen name="Setup Challenge" component={SetupChallenge} />
    </Stack.Navigator>
  );
};

const WorldStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="World" component={World} />
      <Stack.Screen name="Ranking" component={Ranking} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="Profile" component={SettingProfile} />
      <Stack.Screen name="Setting" component={Setting} />
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
