import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import { createStackNavigator } from "@react-navigation/stack";
import { UserContext } from "../context/UserContext";
import AuthStackScreens from "./AuthStackNavigator";
import DrawerNavigator from "./DrawerNavigator";
import LoadingScreen from "../screens/LoadingScreen";

const AppStackNavigator = () => {
  const AppStack = createStackNavigator();
  const [user] = useContext(UserContext);
  return (
    <AppStack.Navigator headerMode="none">
      {user.isLoggedIn === null ? (
        <AppStack.Screen name="Loading" component={LoadingScreen} />
      ) : user.isLoggedIn ? (
        <AppStack.Screen name="Main" component={DrawerNavigator} />
      ) : (
        <AppStack.Screen name="Auth" component={AuthStackScreens} />
      )}
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
