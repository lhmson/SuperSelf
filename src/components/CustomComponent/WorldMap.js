import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import Constants from "expo-constants";
const { statusBarHeight } = Constants;
import { Avatar } from "react-native-elements";
// galio components
import { Block, Card, Text, Icon, NavBar } from "galio-framework";
import theme from "../../theme";
const { width, height } = Dimensions.get("screen");
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";
import { View } from "react-native";
const urlMapClassic = "../../utils/WorldMap/MapClassic.jpg";
import StatusBarPlayer from "../CustomComponent/StatusBarPlayer";
import Snow from "react-native-snow";
import * as Animatable from "react-native-animatable";
import {useEffect, useRef } from 'react';
import { UserContext } from "../../context/UserContext";
import { UserFirebaseContext } from "../../context/UserFirebaseContext";
import { ChallengeFirebaseContext } from "../../context/ChallengeFirbaseContext";
import { useState, useContext } from "react";
import { Audio } from 'expo-av';
import { useIsFocused } from '@react-navigation/native';
import Swiper from 'react-native-swiper'

const WorldMap = (props) => {

  const navigation = props.navigation;
  const [isModalLand, setIsModalLand] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Water");
  const sub = "Bạn đang có 23 nguyên tố " + "\n" + "Cần 20 nguyên tố để đổi lấy vùng đất này";
  const [subTitle, setSubTitle] = useState(sub);
  const [level, setLevel] = useState(21);
  const [coins, setCoins] = useState(25000);

  const [soundBackground, setSoundBackground] = React.useState();
  const [soundEffect, setSoundEffect] = React.useState();
  const isFocused = useIsFocused();
  const [isSnow, setIsSnow] = useState(false);
  const [isModalShop, setIsModalShop] = useState(false);

  async function playSoundBackground() {
    const {sound} = await Audio.Sound.createAsync(
       require('../../utils/Audio/LetItGo.mp3')
    );
    setSoundBackground(sound);
    await sound.replayAsync(); }

  async function playSoundOpenShop() {
      const {sound} = await Audio.Sound.createAsync(
         require('../../utils/Audio/OpenShop.mp3')
      );
      setSoundEffect(sound);
      await sound.playAsync(); }

  useEffect(() => {
    return soundBackground
      ? () => {
          console.log('Unloading Sound');
          soundBackground.unloadAsync(); }
      : undefined;
  }, [soundBackground,isFocused]);

  useEffect(() => {
    return soundEffect
      ? () => {
          console.log('Unloading Sound');
          soundEffect.unloadAsync(); }
      : undefined;
  }, [soundEffect,isFocused]);

  useEffect(()=>{
    if (isFocused)
      playSoundBackground();
  },[isFocused])

  const renderImageAlertElement = () => (
    <Image
      source={require("../../utils/Elements/Water.png")}
      style={{ width: 90, height: 90, resizeMode: "cover" }}
    />
  );

  const renderImageAlertShop = () => (
    <Image
      source={require("../../utils/StatusBar/Shop.png")}
      style={{ width: 90, height: 90, resizeMode: "cover" }}
    />
  );
    const mySlideInDown = {
      from: {
        translateY: -20,
      },
      to: {
        translateY: -60,
      },
    };
    Animatable.initializeRegistryWithDefinitions({
      mySlideInDown,
    });

    const customBackButton = () => {
      return (
        <Image 
        source={require("../../utils/StatusBar/BackMap.png")}
        resizeMode="stretch"
        style={{
          width: 60,
          height : 50,
          zIndex: 1,
          backgroundColor: 'transparent',
        }}> 
        </Image>
      );
    }
    const customNextButton = () => {
        return (
          <Image 
          source={require("../../utils/StatusBar/NextMap.png")}
          resizeMode="stretch"
          style={{
            width: 60,
            height : 50,
            zIndex: 1,
            backgroundColor: 'transparent',
          }}>
          </Image>
        );
    }

    return (
      <View>
        <SCLAlert
          headerIconComponent={renderImageAlertElement()}
          theme="success"
          show={isModalLand}
          title="Plan Element"
          subtitle={subTitle}
          onRequestClose={() => {
            setIsModalLand(false);
          }}
        >
          <SCLAlertButton
            theme="success"
            onPress={() => {
              setIsModalLand(false);
            }}
          >
            Đổi vùng đất
          </SCLAlertButton>
          <SCLAlertButton
            theme="info"
            onPress={() => {
              setIsModalLand(false);
            }}
          >
            Hủy giao dịch
          </SCLAlertButton>
        </SCLAlert>
        
        <SCLAlert
          headerIconComponent={renderImageAlertShop()}
          theme="success"
          show={isModalShop}
          title="SHOPPING"
          subtitle={"Hãy sắm cho mình hiệu ứng tuyết!"}
          onRequestClose={() => {
            setIsModalShop(false);
          }}
        >
          <Image source={require("../../utils/StatusBar/SnowView.jpg")}
          resizeMode="cover"
          style={{
            width: width/2,
            height: width/4,
            marginTop: -10,
            zIndex: 1,
            backgroundColor:"transparent",
            alignSelf:"center",
          }}>

          </Image>
          <SCLAlertButton
            theme="success"
            onPress={() => {
              setIsModalShop(false);
              setIsSnow(true);
            }}
          >
            Mua
          </SCLAlertButton>
          <SCLAlertButton
            theme="info"
            onPress={() => {
              setIsModalShop(false);
            }}
          >
            Hủy giao dịch
          </SCLAlertButton>
        </SCLAlert>
        
        <Swiper index={0} style={{}} showsButtons={true} prevButton={customBackButton()} nextButton={customNextButton()}>
          <View>
          <ImageBackground
          source={require("../../utils/WorldMap/Map2.jpg")}
          resizeMode="stretch"
          style={{
            width: width,
            height: width * 1.5,
            marginTop: -10,
            zIndex: -1,
            backgroundColor:"transparent",
          }}
        >
        
        <TouchableOpacity
            onPress={() => {
              setSelectedItem("Water");
              setIsModalLand(true);
            }}
            style={{
              width: width / 3.75,
              height: height / 7,
              marginLeft: width / 2 - 50,
              borderRadius: 100,
              marginTop : 180,
            }}
          >
            <Animatable.View
              style={{ marginLeft: 30, marginTop: 50 }}
              animation={mySlideInDown}
              iterationCount={"infinite"}
              duration={2000}
              direction="alternate"
            >
              <ElementWaterLand></ElementWaterLand>
            </Animatable.View>
          </TouchableOpacity>
        
        <TouchableOpacity
            onPress={() => {
              setSelectedItem("Metal");
              setIsModalLand(true);
            }}
            style={{
              width: width / 3.75,
              height: height / 7,
              marginLeft: width - 150,
              borderRadius: 100,
              marginTop : -5,
            }}
          >
            <Animatable.View
              style={{ marginLeft: 30, marginTop: 50 }}
              animation={mySlideInDown}
              iterationCount={"infinite"}
              duration={2000}
              direction="alternate"
            >
              <ElementMetalLand></ElementMetalLand>
            </Animatable.View>
          </TouchableOpacity>

        <TouchableOpacity
            onPress={() => {
              setSelectedItem("Plan");
              setIsModalLand(true);
            }}
            style={{
              width: width / 3.75,
              height: height / 7,
              marginLeft: width / 2 - 100,
              borderRadius: 100,
              marginTop : -50,
            }}
          >
            <Animatable.View
              style={{ marginLeft: 30, marginTop: 50 }}
              animation={mySlideInDown}
              iterationCount={"infinite"}
              duration={2000}
              direction="alternate"
            >
              <ElementPlanLand></ElementPlanLand>
            </Animatable.View>
          </TouchableOpacity>
        </ImageBackground>
          </View>
    
          <View>
            <ImageBackground
          source={require("../../utils/WorldMap/MapClassic.jpg")}
          resizeMode="stretch"
          style={{
            width: width,
            height: width * 1.65,
            marginTop: -10,
            zIndex: -1,
            backgroundColor:"transparent",
          }}
        >

          <View style={{height:120}}></View>
          <TouchableOpacity
            onPress={() => {
              setSelectedItem("Water");
              setIsModalLand(true);
            }}
            style={{
              width: width / 3.75,
              height: height / 7,
              marginLeft: 220,
              borderRadius: 100,
              marginTop: -20,
            }}
          >
            <Animatable.View
              style={{ marginLeft: 30, marginTop: 50 }}
              animation={mySlideInDown}
              iterationCount={"infinite"}
              duration={2000}
              direction="alternate"
            >
              <ElementWaterLand></ElementWaterLand>
            </Animatable.View>
          </TouchableOpacity>

          <View style={{ marginTop: 50 }}></View>

          <TouchableOpacity
            onPress={() => {
              setSelectedItem("Fire");
              setIsModalLand(true);
            }}
            style={{
              width: width / 3.75,
              height: height / 7,
              marginLeft: 20,
              borderRadius: 100,
              marginTop: -50,
            }}
          >
            <Animatable.View
              style={{ marginLeft: 30, marginTop: 50 }}
              animation={mySlideInDown}
              iterationCount={"infinite"}
              duration={2000}
              direction="alternate"
            >
              <ElementFireLand></ElementFireLand>
            </Animatable.View>
          </TouchableOpacity>

          <View style={{ marginTop: 50 }}></View>

          <TouchableOpacity
            onPress={() => {
              setSelectedItem("Earth");
              setIsModalLand(true);
            }}
            style={{
              width: width / 3.75,
              height: height / 7,
              marginLeft: 180,
              borderRadius: 100,
              marginTop: -50,
            }}
          >
            <Animatable.View
              style={{ marginLeft: 30, marginTop: 50 }}
              animation={mySlideInDown}
              iterationCount={"infinite"}
              duration={2000}
              direction="alternate"
            >
              <ElementEarthLand></ElementEarthLand>
            </Animatable.View>
          </TouchableOpacity>

          <View style={{ marginTop: 10 }}></View>

          <TouchableOpacity
            onPress={() => {
              setSelectedItem("Metal");
              setIsModalLand(true);
            }}
            style={{
              width: width / 3.75,
              height: height / 7,
              marginLeft: 40,
              borderRadius: 100,
              marginTop: -80,
            }}
          >
            <Animatable.View
              style={{ marginLeft: 30, marginTop: 50 }}
              animation={mySlideInDown}
              iterationCount={"infinite"}
              duration={2000}
              direction="alternate"
            >
              <ElementMetalLand></ElementMetalLand>
            </Animatable.View>
          </TouchableOpacity>

          <View style={{ marginTop: 40 }}></View>

          <TouchableOpacity
            onPress={() => {
              setSelectedItem("Plan");
              setIsModalLand(true);
            }}
            style={{
              width: width / 3.75,
              height: height / 7,
              marginLeft: 150,
              borderRadius: 100,
              marginTop: -50,
            }}
          >
            <Animatable.View
              style={{ marginLeft: 30, marginTop: 50 }}
              animation={mySlideInDown}
              iterationCount={"infinite"}
              duration={2000}
              direction="alternate"
            >
              <ElementPlanLand></ElementPlanLand>
            </Animatable.View>
          </TouchableOpacity>
        </ImageBackground>
          </View>
          
          <View>
            <ImageBackground
          source={require("../../utils/WorldMap/Map3.jpg")}
          resizeMode="stretch"
          style={{
            width: width,
            height: width * 1.65,
            marginTop: -10,
            zIndex: -1,
            backgroundColor:"transparent",
          }}
        >

        <TouchableOpacity
            onPress={() => {
              setSelectedItem("Plan");
              setIsModalLand(true);
            }}
            style={{
              width: width / 3.75,
              height: height / 7,
              marginLeft: width - 190,
              borderRadius: 100,  
              marginTop : 100,
            }}
          >
            <Animatable.View
              style={{ marginLeft: 30, marginTop: 50 }}
              animation={mySlideInDown}
              iterationCount={"infinite"}
              duration={2000}
              direction="alternate"
            >
              <ElementPlanLand></ElementPlanLand>
            </Animatable.View>
          </TouchableOpacity>
        
        <TouchableOpacity
            onPress={() => {
              setSelectedItem("Water");
              setIsModalLand(true);
            }}
            style={{
              width: width / 3.75,
              height: height / 7,
              marginLeft: 90,
              borderRadius: 100,  
              marginTop : 20,
            }}
          >
            <Animatable.View
              style={{ marginLeft: 30, marginTop: 50 }}
              animation={mySlideInDown}
              iterationCount={"infinite"}
              duration={2000}
              direction="alternate"
            >
              <ElementWaterLand></ElementWaterLand>
            </Animatable.View>
          </TouchableOpacity>
        
        <TouchableOpacity
            onPress={() => {
              setSelectedItem("Fire");
              setIsModalLand(true);
            }}
            style={{
              width: width / 3.75,
              height: height / 7,
              marginLeft: width - 190,
              borderRadius: 100,  
              marginTop : 70,
            }}
          >
            <Animatable.View
              style={{ marginLeft: 30, marginTop: 50 }}
              animation={mySlideInDown}
              iterationCount={"infinite"}
              duration={2000}
              direction="alternate"
            >
              <ElementFireLand></ElementFireLand>
            </Animatable.View>
          </TouchableOpacity>
        
        <TouchableOpacity
            onPress={() => {
              setSelectedItem("Earth");
              setIsModalLand(true);
            }}
            style={{
              width: width / 3.75,
              height: height / 7,
              marginLeft: 70,
              borderRadius: 100,  
              marginTop : -20,
            }}
          >
            <Animatable.View
              style={{ marginLeft: 30, marginTop: 50 }}
              animation={mySlideInDown}
              iterationCount={"infinite"}
              duration={2000}
              direction="alternate"
            >
              <ElementEarthLand></ElementEarthLand>
            </Animatable.View>
          </TouchableOpacity>
        
        <TouchableOpacity
            onPress={() => {
              setSelectedItem("Air");
              setIsModalLand(true);
            }}
            style={{
              width: width / 3.75,
              height: height / 7,
              marginLeft: width - 190,
              borderRadius: 100,  
              marginTop : -70,
            }}
          >
            <Animatable.View
              style={{ marginLeft: 30, marginTop: 50 }}
              animation={mySlideInDown}
              iterationCount={"infinite"}
              duration={2000}
              direction="alternate"
            >
              <ElementAirLand></ElementAirLand>
            </Animatable.View>
          </TouchableOpacity>
        
          
        </ImageBackground>
        </View>
      </Swiper>
        
        <View style ={{position:"absolute", top : 0}}>
            <StatusBarPlayer level = {level} coins = {coins}></StatusBarPlayer>
            <View style={{ marginTop: -50, marginLeft: 200 }}>
              <SnowEffect Visibility={isSnow}></SnowEffect>
            </View>
        </View>    

        <View style={{height: 70, width: width, position:"absolute", top: 70, flexDirection: "row"}}>
              <TouchableOpacity style={{marginLeft:10,width:120, height:100}} onPress={() => {playSoundOpenShop(); setIsModalShop(true);}}>
                    <Image 
                    source={require("../../utils/StatusBar/Shop.png")}
                    resizeMode="stretch"
                    style={{
                      width: 120,
                      height : 100,
                      zIndex: 1,
                      backgroundColor: 'transparent',
                    }}> 
                    </Image>
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft:(width-2*120),width:120, height:100}} onPress={() => {navigation.navigate("Ranking");}}>
                    <Image 
                    source={require("../../utils/StatusBar/Ranking.png")}
                    resizeMode="stretch"
                    style={{
                      width: 100,
                      height : 80,
                      zIndex: 1,
                      marginTop: 10,
                      backgroundColor: 'transparent',
                    }}> 
                    </Image>
              </TouchableOpacity>
          </View>
        
          <View style={{ position:"absolute", top: 0, left : 10 }}>
              <SnowEffect Visibility={isSnow}></SnowEffect>
          </View>

          <View style={{ position:"absolute", top: 10, left : 40}}>
              <SnowEffect Visibility={isSnow}></SnowEffect>
          </View>

          <View style={{ position:"absolute", top: 30, left : width/3}}>
              <SnowEffect Visibility={isSnow}></SnowEffect>
          </View>

          <View style={{ position:"absolute", top: 5, left : width /2}}>
              <SnowEffect Visibility={isSnow}></SnowEffect>
          </View>

          <View style={{ position:"absolute", top: 15, left : width-30}}>
              <SnowEffect Visibility={isSnow}></SnowEffect>
          </View>
      </View>
    );
}

const SnowEffect = (props) => {
    const flagSnow = props.Visibility;
    if (!flagSnow) return (<View></View>);
    
    return (<Snow snowfall="light" />);
} 

const ElementAirLand = (props) => {
  return (
    <Avatar
      size="medium"
      rounded
      title="?"
      activeOpacity={0.7}
      source={require("../../utils/Elements/Air.png")}
    />
  );
};

const ElementEarthLand = (props) => {
  return (
    <Avatar
      size="medium"
      rounded
      title="?"
      activeOpacity={0.7}
      source={require("../../utils/Elements/Earth.png")}
    />
  );
};

const ElementFireLand = (props) => {
  return (
    <Avatar
      size="medium"
      rounded
      title="?"
      activeOpacity={0.7}
      source={require("../../utils/Elements/Fire.png")}
    />
  );
};

const ElementMetalLand = (props) => {
  return (
    <Avatar
      size="medium"
      rounded
      title="?"
      activeOpacity={0.7}
      source={require("../../utils/Elements/Metal.png")}
    />
  );
};

const ElementPlanLand = (props) => {
  return (
    <Avatar
      size="medium"
      rounded
      title="?"
      activeOpacity={0.7}
      source={require("../../utils/Elements/Plan.png")}
    />
  );
};

const ElementSuperPowerLand = (props) => {
  return (
    <Avatar
      size="medium"
      rounded
      title="?"
      activeOpacity={0.7}
      source={require("../../utils/Elements/Metal.png")}
    />
  );
};

const ElementWaterLand = (props) => {
  return (
    <Avatar
      size="medium"
      rounded
      title="?"
      activeOpacity={0.7}
      source={require("../../utils/Elements/Water.png")}
    />
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: theme.SIZES.BASE * 2,
    borderTopRightRadius: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE * 1.5,
    width: width,
    marginBottom: 10,
  },
  navbar: {
    top: statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 9999,
    position: "absolute",
  },
  stats: {
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 5,
    height: theme.SIZES.BASE * 4,
    marginVertical: theme.SIZES.BASE * 0.875,
  },
  title: {
    justifyContent: "center",
    paddingLeft: theme.SIZES.BASE / 2,
  },
  avatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  middle: {
    justifyContent: "center",
  },
  text: {
    fontSize: theme.SIZES.FONT * 0.875,
    lineHeight: theme.SIZES.FONT * 1.25,
  },
});

export default WorldMap;