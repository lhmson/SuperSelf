import React from 'react';
import {
  Image,
  StatusBar,
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
import { colors } from 'react-native-elements';
import {Air , Earth, Metal, Plan,Water,SuperPower,Fire} from "../../utils/ElementURL_Data";
import { Avatar } from 'react-native-elements';
import Colors from '../../utils/Colors';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph'

const urlMapClassic = "../../utils/WorldMap/MapClassic.jpg";

const CardsMangement = (props) => {
    const Name = props.NameChallenge;
    const Title = props.Progress;

    var MyAvatar = Earth;

    switch(props.Element) {
      case "Air":
        MyAvatar = Air;
        break;
      case "Earth":
        MyAvatar = Earth;
        break;
      case "Metal":
          MyAvatar = Metal;
        break;
      case "Plan":
        MyAvatar = Plan;
        break;
      case "Water":
        MyAvatar = Water;
        break;
      case "SuperPower":
        MyAvatar = SuperPower;
        break;
      case "Fire":
        MyAvatar = Fire;
        break;
      default:
    }

    return (
      <Block center style = {{marginTop : -20}}>
      <Card
      
        backgroundColor = {Colors.white}
        style={styles.stats}
        title={Name}
        caption={Title}
        avatar=  {MyAvatar}
        location={(
          <Block row right>              
          </Block>
        )}
      />
    </Block>
    );
}

const ChartCoin = (props) => {
  return(
    <VerticalBarGraph
  data={[20, 45, 28, 80, 99, 43]}
  labels={['Air', 'Earth', 'Metal', 'Plan', 'Water', 'Fire']}
  width={Dimensions.get('window').width - 90}
  height={200}
  barRadius={5}
  barWidthPercentage={0.65}
  barColor='#53ae31'
  baseConfig={{
    hasXAxisBackgroundLines: true,
    xAxisLabelStyle: {
      position: 'right',
      prefix: ''
    }
  }}
  style={{
    marginBottom: 0,
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    backgroundColor: `#dff4d7`,
    width: Dimensions.get('window').width - 70
  }}
/>

  );
}
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
        </ImageBackground>
    
    <Block center style={{ marginTop:-10, zIndex : 1}}>
      <Block flex style={styles.header}>

      <Block style = {{marginTop: -100, marginLeft: -30, flexDirection :"row"}}>
        <Avatar
        size="xlarge"
        rounded
        title="AVATAR"
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
        source={{uri : MyAvatar}}
      />

        <View style = {{marginTop : 30, marginLeft : 10}}>
          <Text h5 style = {{color : "#ffffff", }}>SANH PHẠM</Text>
          <View>
          <Text h7 style = {{color : "#000000", marginTop : 5 }}>Danh hiệu Vua phát triển tuần</Text>
          </View>
          <Block row  style={{ marginHorizontal: theme.SIZES.BASE, marginTop: 2 }}>
                  <Text
                    p
                    color={theme.COLORS.MUTED}
                    size={theme.SIZES.FONT * 0.875}
                    style={{ marginLeft: -10,marginTop: -3 }}
                  >
                    Level 12
                  </Text>

                  <View style = {{width : 30}}></View>

                  <Icon name="dollar" family="font-awesome" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 0.875} />
                  <Text
                    p
                    color={theme.COLORS.MUTED}
                    size={theme.SIZES.FONT * 0.875}
                    style={{ marginLeft: theme.SIZES.BASE * 0.25, marginTop: -3}}
                  >
                    980
                  </Text>
                  
                </Block>
        </View>

        </Block>

        <View style={{height: 20}}></View>
        
        <Block center style={{marginBottom : 30}}>
            <ChartCoin></ChartCoin>

        </Block>
        
        <CardsMangement NameChallenge = {"Thể dục mỗi ngày"} Progress={"75%"} Element = {"Earth"}></CardsMangement>
        <CardsMangement NameChallenge = {"7 Ngày uống nước"} Progress={"0%"} Element = {"Water"}></CardsMangement>
        <CardsMangement NameChallenge = {"Đọc sách là niềm vui"} Progress={"25%"} Element = {"Fire"}></CardsMangement>
        <CardsMangement NameChallenge = {"Đọc tin tức buổi sáng"} Progress={"50%"} Element = {"Metal"}></CardsMangement>
        <CardsMangement NameChallenge = {"Giảm cân cho Tết"} Progress={"90%"} Element = {"Plan"}></CardsMangement>

        <ScrollView>
          <View style={{height : 20}}></View>
          <SCLAlertButton theme="success">I accept this Challenge!</SCLAlertButton>
          <View style={{height : 30}}></View>
        </ScrollView>
      </Block>
    </Block>
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
