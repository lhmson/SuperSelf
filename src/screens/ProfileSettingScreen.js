import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Text,
} from 'react-native';

import Constants from 'expo-constants';

const { statusBarHeight } = Constants;
import { LinearGradient } from 'expo-linear-gradient'
// galio components
import {
  Block, Card,
} from 'galio-framework';
import theme from '../theme';

const { width, height } = Dimensions.get('screen');
import {
    SCLAlert,
    SCLAlertButton
  } from 'react-native-scl-alert'

import { View } from 'react-native';
import {Air , Earth, Metal, Plan,Water,SuperPower,Fire} from "../utils/ElementURL_Data";
import { Avatar } from 'react-native-elements';
import Colors from '../utils/Colors';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CardsFeature = (props) => {

    return (
      <LinearGradient>

      </LinearGradient>
    );
}

const Profile = (props) => {
    const MyAvatar = "https://i.pinimg.com/564x/19/b8/f7/19b8f7a1ebb4b56004276498c1153637.jpg";
    return(
  <ScrollView>
  <Block>
    <ImageBackground
      source={ {uri :"https://png.pngtree.com/thumb_back/fw800/background/20191031/pngtree-abstract-blue-polygonal-vector-background-image_317411.jpg"}}
      resizeMode="cover"
      style={{
        width: width,
        height: height * 0.9,
        marginTop : -10,
        zIndex :1,
      }}>
        </ImageBackground>
    
    <Block center style={{ marginTop:-500, zIndex : 1}}>
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
          <Text  style = {{color : "#ffffff", fontSize:24, fontStyle:"normal"}}>SANH PHẠM</Text>
          <View>
          <Text h6 style = {{color : "#000000", marginTop : 5,fontSize:16, fontStyle:"italic"}}>sanhlike1809@gmail.com</Text>
          </View>
        </View>
        </Block>
        <Block  style = {{width : width*0.8, height: 150,  marginLeft: 0, marginTop:40}}>
        <LinearGradient colors={['#FFFFFF', '#4E204D']} style={{flexDirection:"row", borderRadius: 20, height:0, alignItems:"center"}} >
          <Avatar size={70} source={{uri :"https://i.pinimg.com/564x/38/2b/82/382b824c477ec8092b871fac83494f50.jpg"}} ></Avatar>
          <Text style = {{color : "#000000", marginTop : 5,fontSize:20, fontStyle:"normal"}}>SETTING</Text>
        </LinearGradient>
        <View style={{height : 30}}></View>
          <Block style={{flexDirection:"row"}}>
              <LinearGradient colors={['#291D89', '#4E204D']} style={{width:width/4.2, height:70, marginLeft:20,marginTop:10, borderRadius:20, alignItems:"center"}}>
                 <Icon
                  name = "account"
                  color = "#ffffff"
                  size = {40}>                  
                 </Icon>
                 <Text h7 style={{color:Colors.white}}>Account</Text>
              </LinearGradient>

              <LinearGradient colors={['#291D89', '#4E204D']} style={{width:width/4.2, height:70, marginLeft:20,marginTop:10, borderRadius:20, alignItems:"center"}}>
                 <Icon
                  name = "image"
                  color = "#ffffff"
                  size = {40}>                  
                 </Icon>
                 <Text h7 style={{color:Colors.white}}>Avatar</Text>
              </LinearGradient>

              <LinearGradient colors={['#291D89', '#4E204D']} style={{width:width/4.2, height:70, marginLeft:20,marginTop:10, borderRadius:20, alignItems:"center"}}>
                 <Icon
                  name = "theme-light-dark"
                  color = "#ffffff"
                  size = {40}>                  
                 </Icon>
                 <Text h7 style={{color:Colors.white}}>Theme</Text>
              </LinearGradient>
          </Block>

          <Block style={{flexDirection:"row", marginTop:10}}>
            
              <LinearGradient colors={['#291D89', '#4E204D']} style={{width:width/4.2, height:70, marginLeft:20,marginTop:10, borderRadius:20, alignItems:"center"}}>
                 <Icon
                  name = "gift"
                  color = "#ffffff"
                  size = {40}>                  
                 </Icon>
                 <Text h7 style={{color:Colors.white}}>My Challenge</Text>
              </LinearGradient>

              <LinearGradient colors={['#291D89', '#4E204D']} style={{width:width/4.2, height:70, marginLeft:20,marginTop:10, borderRadius:20, alignItems:"center"}}>
                 <Icon
                  name = "google-controller"
                  color = "#ffffff"
                  size = {40}>                  
                 </Icon>
                 <Text h7 style={{color:Colors.white}}>My World</Text>
              </LinearGradient>

              <LinearGradient colors={['#291D89', '#4E204D']} style={{width:width/4.2, height:70, marginLeft:20,marginTop:10, borderRadius:20, alignItems:"center"}}>
                 <Icon
                  name = "exit-to-app"
                  color = "#ffffff"
                  size = {40}>                  
                 </Icon>
                 <Text h7 style={{color:Colors.white}}>Log out</Text>
              </LinearGradient>
          </Block>
        </Block>

        <View style={{height: 80}}></View>

        <LinearGradient colors={['#FFFFFF', '#4E204D']} style={{flexDirection:"row", borderRadius: 20, height:0, alignItems:"center"}} >
          <Avatar size={60} source={{uri :"https://i.pinimg.com/564x/c8/c4/fe/c8c4fea990490abbb14e42cc6f464713.jpg"}} ></Avatar>
          <Text style = {{color : "#000000", marginTop : 5,fontSize:20, fontStyle:"normal"}}>MY IMFORMATIONS</Text>
        </LinearGradient>
        <View style={{height: 40}}></View>

        <LinearGradient colors={['#DFEAE2', '#B4D6C1']} style={{flexDirection:"row", borderRadius: 20, height:40, alignItems:"center"}} >
          <View style = {{width:width/4, alignItems:"flex-start", marginLeft:50}}>
              <Text style = {{color : "#000000", marginTop : 5,fontSize:18, fontStyle:"normal"}}>Name</Text>
          </View>
          <View>
              <Text style = {{color : "#000000", marginTop : 5,fontSize:18, fontStyle:"normal"}}>Phạm Liên Sanh</Text>
          </View>
        </LinearGradient>

        <LinearGradient colors={['#DFEAE2', '#B4D6C1']} style={{flexDirection:"row", borderRadius: 20, height:40, alignItems:"center", marginTop:10}} >
          <View style = {{width:width/4, alignItems:"flex-start", marginLeft:50}}>
              <Text style = {{color : "#000000", marginTop : 5,fontSize:18, fontStyle:"normal"}}>Account</Text>
          </View>
          <View>
              <Text style = {{color : "#000000", marginTop : 5,fontSize:18, fontStyle:"normal"}}>admin123@gm.com</Text>
          </View>
        </LinearGradient>

        <LinearGradient colors={['#DFEAE2', '#B4D6C1']} style={{flexDirection:"row", borderRadius: 20, height:40, alignItems:"center", marginTop:10}} >
          <View style = {{width:width/4, alignItems:"flex-start", marginLeft:50}}>
              <Text style = {{color : "#000000", marginTop : 5,fontSize:18, fontStyle:"normal"}}>Password</Text>
          </View>
          <View>
              <Text style = {{color : "#000000", marginTop : 5,fontSize:18, fontStyle:"normal"}}>********</Text>
          </View>
        </LinearGradient>

        <LinearGradient colors={['#DFEAE2', '#B4D6C1']} style={{flexDirection:"row", borderRadius: 20, height:40, alignItems:"center", marginTop:10}} >
          <View style = {{width:width/4, alignItems:"flex-start", marginLeft:50}}>
              <Text style = {{color : "#000000", marginTop : 5,fontSize:18, fontStyle:"normal"}}>Birthday</Text>
          </View>
          <View>
              <Text style = {{color : "#000000", marginTop : 5,fontSize:18, fontStyle:"normal"}}>18/09/2000</Text>
          </View>
        </LinearGradient>
      </Block>
    </Block>
  </Block>
  </ScrollView>
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

export default Profile
