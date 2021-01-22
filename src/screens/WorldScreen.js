import React from "react";
import { View, StyleSheet, Button } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import WorldMap from "../components/CustomComponent/WorldMap";
import { ScrollView } from "react-native-gesture-handler";

const World = ({ navigation }) => {
  return (
    <ScrollView>
        <WorldMap navigation={navigation}></WorldMap>
    </ScrollView>
  );
};

export default World;
