import React from "react";
import { View, StyleSheet, Button,Dimensions} from "react-native";
import Colors from "../../utils/Colors";
import { Avatar } from 'react-native-elements';
import {Text} from 'galio-framework';
const { width, height } = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient'

const StatusBarPlayer = (props) => {
    return (
        <View style = {{width, marginTop: 30, marginLeft: 20, flexDirection:"row"}}>           
            <StatusLevelCard></StatusLevelCard>
            <View style={{width:50}}></View>
            <StatusCoinsCard></StatusCoinsCard>
            
        </View>
    );
}

const StatusLevelCard = (props) => {
    return (
    <LinearGradient  colors={[Colors.red, Colors.primary]} style = {{borderRadius : 20, height : 35, width: 160, flexDirection:"row", zIndex:0}}>
        <View style = {{marginTop : -10, marginLeft:-10,zIndex:100}}>
        <Avatar
        size="medium"
        rounded
        title="?"
        activeOpacity={0.7}
        source = {require("../../utils/StatusBar/Level.png")}
      />
      </View>
      <View style = {{marginTop:0, marginLeft:10, borderColor : Colors.white, borderStyle:"solid", justifyContent:"center"}}>
         <Text h6 bold color="white">Level 21</Text>
      </View>
    </LinearGradient>
    );
}

const StatusCoinsCard = (props) => {
    return (
    <LinearGradient colors={[Colors.red, Colors.primary]} style = {{borderRadius : 20, backgroundColor : Colors.lightGreen, height : 35, width: 160, flexDirection:"row"}}>
        <View style = {{marginTop : -10, marginLeft:-10}}>
        <Avatar
        size="medium"
        rounded
        title="?"
        activeOpacity={0.7}
        source = {require("../../utils/StatusBar/Coins.png")}
      />
      </View>
      <View style = {{marginTop:0, marginLeft:0, borderColor : Colors.white, borderStyle:"solid", justifyContent:"center"}}>
         <Text h6 bold color="white"> 25000 $</Text>
      </View>
    </LinearGradient>
    );
}

export default StatusBarPlayer;