import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Linking,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import { Entypo, FontAwesome } from "@expo/vector-icons";

import { AboutStackNavigator } from "./StackNavigator";
import TabNavigator from "../navigation/TabNavigator";

const Drawer = createDrawerNavigator();

const screenOptionStyle = {};

const CustomDrawer = (props) => {
  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <View style={styles.drawerHeader}>
          <View>
            <Image
              source={require("../utils/superself-logo.png")}
              style={styles.drawerImage}
            />
          </View>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Contact"
          onPress={() => Linking.openURL("https://facebook.com/")}
          icon={({ focused, size }) => (
            <FontAwesome
              name="phone-square"
              size={24}
              color="black"
              style={{ color: focused ? Colors.secondary : Colors.black }}
            />
          )}
        />
      </SafeAreaView>
    </ScrollView>
  );
};
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={screenOptionStyle}
      initialRouteName="Home"
      drawerType="back"
      drawerStyle={{ width: "50%", backgroundColor: Colors.paleWhite }}
      drawerContent={(props) => CustomDrawer(props)}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="home"
              size={24}
              style={{ color: focused ? Colors.secondary : Colors.black }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutStackNavigator}
        options={{
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="info-circle"
              size={24}
              style={{ color: focused ? Colors.secondary : Colors.black }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: Colors.primary,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 160,
    height: 120,
  },
});

export default DrawerNavigator;
