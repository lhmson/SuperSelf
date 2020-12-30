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

const WorldMap = (props) => {
    const Name = "Sanh Phạm";
    const Title = "Danh hiệu Cố gắng không ngừng nghỉ";
    const MyAvatarGif = "https://i.pinimg.com/originals/11/df/2b/11df2bc889722dab6946142dc9c70151.gif";
    const MyAvatar = "https://i.pinimg.com/564x/71/fa/27/71fa27da1edd7c9c27bf024fbd1c1d4d.jpg";
    return(
  <Block>
    <ImageBackground
      source={ require("../../utils/WorldMap/MapClassic.jpg")}
      resizeMode="cover"
      style={{
        width: width,
        height: height * 0.9,
        marginTop : -10,
        zIndex :1,
      }}>
        <StatusBarPlayer></StatusBarPlayer>
        </ImageBackground>
    
  </Block>
  
    )
};

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
