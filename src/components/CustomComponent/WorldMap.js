import React from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import Constants from 'expo-constants';

import BackGroundImage from "../../utils/DataBackGroundImage";
import ElementImages from "../../utils/ElementsData";

const { statusBarHeight } = Constants;
import { Avatar } from 'react-native-elements';
// galio components
import {
  Block, Card, Text, Icon, NavBar,
} from 'galio-framework';
import theme from '../../theme';

const { width, height } = Dimensions.get('screen');
import {
    SCLAlert,
    SCLAlertButton
  } from 'react-native-scl-alert'
import { View } from 'react-native';
const urlMapClassic = "../../utils/WorldMap/MapClassic.jpg";
import StatusBarPlayer from "../CustomComponent/StatusBarPlayer";
import Snow from 'react-native-snow';

const WorldMap = (props) => {
    const Name = "Sanh Phạm";
    const Title = "Danh hiệu Cố gắng không ngừng nghỉ";
    const MyAvatarGif = "https://i.pinimg.com/originals/11/df/2b/11df2bc889722dab6946142dc9c70151.gif";
    const MyAvatar = "https://i.pinimg.com/564x/71/fa/27/71fa27da1edd7c9c27bf024fbd1c1d4d.jpg";
    var showAlert = true;
    const sub = "Bạn đang có 23 nguyên tố " + "\n" + "Cần 20 nguyên tố để đổi lấy vùng đất này"; 
    return(
  <Block>
               <Snow/>
        <SCLAlert
          theme="success"
          show={false}
          title="Plan Element"
          subtitle = {sub}

        >
          <SCLAlertButton theme="success">Done</SCLAlertButton>
        </SCLAlert>

    <ImageBackground
      source={ require("../../utils/WorldMap/MapClassic.jpg")}
      resizeMode="cover"
      style={{
        width: width,
        height: width * 1.65,
        marginTop : -10,
        zIndex :1,
      }}>
        <StatusBarPlayer></StatusBarPlayer>
        <View style={{marginTop:50}}></View>
        <View style={{marginLeft:250}}>
            <ElementWaterLand></ElementWaterLand>
        </View>

        <View style={{marginTop:50}}></View>
        <View style={{marginLeft:50}}>
            <ElementFireLand></ElementFireLand>
        </View>

        <View style={{marginTop:50}}></View>
        <View style={{marginLeft:200}}>
            <ElementEarthLand></ElementEarthLand>
        </View>

        <View style={{marginTop:10}}></View>
        <View style={{marginLeft:70}}>
            <ElementMetalLand></ElementMetalLand>
        </View>

        <View style={{marginTop:40}}></View>
        <View style={{marginLeft:180}}>
            <ElementPlanLand></ElementPlanLand>
        </View>
        </ImageBackground>
  </Block>
  
    )
};

const ElementAirLand = (props) => {
  return (
    <Avatar
    size="medium"
    rounded
    title="AVATAR"
    activeOpacity={0.7}
    source = {require("../../utils/Elements/Air.png")}
  />
  );
  }

const ElementEarthLand = (props) => {
    return (
      <Avatar
      size="medium"
      rounded
      title="AVATAR"
      activeOpacity={0.7}
      source = {require("../../utils/Elements/Earth.png")}
    />
    );
}

const ElementFireLand = (props) => {
  return (
    <Avatar
    size="medium"
    rounded
    title="AVATAR"
    activeOpacity={0.7}
    source = {require("../../utils/Elements/Fire.png")}
  />
  );
}

const ElementMetalLand = (props) => {
  return (
    <Avatar
    size="medium"
    rounded
    title="AVATAR"
    activeOpacity={0.7}
    source = {require("../../utils/Elements/Metal.png")}
  />
  );
}

const ElementPlanLand = (props) => {
  return (
    <Avatar
    size="medium"
    rounded
    title="AVATAR"
    activeOpacity={0.7}
    source = {require("../../utils/Elements/Plan.png")}
  />
  );
}

const ElementSuperPowerLand = (props) => {
  return (
    <Avatar
    size="medium"
    rounded
    title="AVATAR"
    activeOpacity={0.7}
    source = {require("../../utils/Elements/Metal.png")}
  />
  );
}

const ElementWaterLand = (props) => {
  return (
    <Avatar
    size="medium"
    rounded
    title="AVATAR"
    activeOpacity={0.7}
    source = {require("../../utils/Elements/Water.png")}
  />
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: theme.SIZES.BASE * 2,
    borderTopRightRadius: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE * 1.5,
    width : width,
    marginBottom : 10
  },
  navbar: {
    top: statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 9999,
    position: 'absolute',
  },
  stats: {
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 5,
    height: theme.SIZES.BASE * 4,
    marginVertical: theme.SIZES.BASE * 0.875,
  },
  title: {
    justifyContent: 'center',
    paddingLeft: theme.SIZES.BASE / 2,
  },
  avatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  middle: {
    justifyContent: 'center',
  },
  text: {
    fontSize: theme.SIZES.FONT * 0.875,
    lineHeight: theme.SIZES.FONT * 1.25,
  },
});

export default WorldMap;
