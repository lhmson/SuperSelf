import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Text as TextOK,
} from 'react-native';

import Constants from 'expo-constants';

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
import { LinearGradient } from 'expo-linear-gradient'
import {Card as CardShadow} from 'react-native-shadow-cards';

const CardsMangement = (props) => {
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
      <View elevation={5} style = {{marginTop : 10, alignItems:"center"}}>   
          <CardShadow style={{padding: 10, margin: 10, height: 250}}>
            <ImageBackground
                source={ {uri :"https://i.pinimg.com/564x/bc/92/07/bc9207474323cd43c374286e1541481b.jpg"}}
                resizeMode="cover"
                style={{
                    width: width*0.85,
                    height: 230,
                    zIndex :1,
                    }}>
              <LinearGradient colors={['transparent', 'transparent','rgba(0,0,0, 1)']} style={{width:"100%", height:"100%"}}>

                    <View style={{height:50}}></View>
                    <Text h4 color="white" style={{marginLeft: 10}}>Đi học đúng giờ cả tuần</Text>
              </LinearGradient>
             </ImageBackground>
          </CardShadow>   
    </View>
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
const ChallengeManager = (props) => {
    const MyAvatar = "https://i.pinimg.com/564x/71/fa/27/71fa27da1edd7c9c27bf024fbd1c1d4d.jpg";
    return(
  <Block>
    <ImageBackground
      source={ {uri :"https://i.pinimg.com/564x/ec/c0/d9/ecc0d90f8682c219b95c6bbb7b0771ff.jpg"}}
      resizeMode="cover"
      style={{
        width: width,
        height: height * 0.9,
        marginTop : -10,
        zIndex :1,
      }}>
        </ImageBackground>
    
    <Block center style={{ marginTop:-300, zIndex : 1}}>
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
      </Block>
    </Block>
  </Block>
  
    )
};

const styles = StyleSheet.create({
  circleArc: {
    width: 120,
    height: 120,
    borderColor: Colors.darkPink,
    borderRadius: 120 / 2,
    borderWidth: width,
 },
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

export default ChallengeManager;
