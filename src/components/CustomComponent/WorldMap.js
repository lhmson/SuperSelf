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
import { useEffect, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import { GameFirebaseContext } from "../../context/GameFirebaseContext";

import { useState, useContext } from "react";
import { Audio } from "expo-av";
import { useIsFocused } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import { set } from "react-native-reanimated";

const WorldMap = (props) => {
  const navigation = props.navigation;
  const [isModalLand, setIsModalLand] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Water");
  const sub = "You have elements ";
  const [subTitle, setSubTitle] = useState(sub);
  let gameStatusUser;
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(0);

  const [soundBackground, setSoundBackground] = React.useState();
  const [soundEffect, setSoundEffect] = React.useState();
  const isFocused = useIsFocused();
  const [isSnow, setIsSnow] = useState(false);
  const [isModalShop, setIsModalShop] = useState(false);
  const [isModalMap, setIsModalMap] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [isLoadMap, setIsLoadMap] = useState(false);
  const [map1, setMap1] = useState({});
  const [status, setStatus] = useState();
  const gameFirebase = useContext(GameFirebaseContext);
  const [title, setTitle] = useState("Water Element");

  async function playSoundBackground() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../utils/Audio/LetItGo.mp3")
    );
    setSoundBackground(sound);
    await sound.replayAsync();
  }

  async function playSoundOpenShop() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../utils/Audio/OpenShop.mp3")
    );
    setSoundEffect(sound);
    await sound.playAsync();
  }

  async function initStatus() {
    gameStatusUser = await gameFirebase.getMyGameStatus(user.uid);
    if (gameStatusUser !== undefined) {
      setLevel(gameStatusUser.level);
      setCoins(gameStatusUser.coins);
      setStatus(gameStatusUser);
    }
    initElementLands();
  }

  const initElementLands = () => {
    let Map1 = { Water: false, Metal: false, Plan: false };
    if (gameStatusUser === undefined) return;

    let LandUser = gameStatusUser.LandsMap;
    for (var i = 0; i < LandUser.length; i++)
      Map1 = { ...Map1, [LandUser[i]]: true };

    setMap1(Map1);
    setIsLoadMap(true);
  };

  useEffect(() => {
    return soundBackground
      ? () => {
          console.log("Unloading Sound");
          soundBackground.unloadAsync();
        }
      : undefined;
  }, [soundBackground, isFocused]);

  useEffect(() => {
    return soundEffect
      ? () => {
          console.log("Unloading Sound");
          soundEffect.unloadAsync();
        }
      : undefined;
  }, [soundEffect, isFocused]);

  useEffect(() => {
    setIsLoadMap(false);
    if (isFocused) playSoundBackground();
    initStatus();
  }, [isFocused]);

  const renderImageAlertElement = () => (
    <Image
      source={require("../../utils/StatusBar/Shop.png")}
      style={{ width: 90, height: 90, resizeMode: "cover" }}
    />
  );

  const renderImageAlertShop = () => (
    <Image
      source={require("../../utils/StatusBar/Shop.png")}
      style={{ width: 90, height: 90, resizeMode: "cover" }}
    />
  );

  const renderImageAlertMap = () => (
    <Image
      source={require("../../utils/StatusBar/MapIcon.png")}
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

  const [dumua, setDumua] = useState(false);

  const customBackButton = () => {
    return (
      <Image
        source={require("../../utils/StatusBar/BackMap.png")}
        resizeMode="stretch"
        style={{
          width: 60,
          height: 50,
          zIndex: 1,
          backgroundColor: "transparent",
        }}
      ></Image>
    );
  };

  const customNextButton = () => {
    return (
      <Image
        source={require("../../utils/StatusBar/NextMap.png")}
        resizeMode="stretch"
        style={{
          width: 60,
          height: 50,
          zIndex: 1,
          backgroundColor: "transparent",
        }}
      ></Image>
    );
  };

  const initSubtitleAleartWater = () => {
    if (map1.Water) {
      setSubTitle("Bạn đã sở hữu land này rồi!");
      setDumua(false);
      return;
    }
    let hienco, yeucau;
    if (status !== undefined) hienco = status.water;

    if (status !== undefined) yeucau = status.Require.Water;
    if (hienco >= yeucau) setDumua(true);
    else setDumua(false);
    let sub =
      "You have " + hienco + " elements \n" + "Need " + yeucau + " elements";
    setSubTitle(sub);
  };

  const initSubtitleAleartMetal = () => {
    if (map1.Metal) {
      setSubTitle("Bạn đã sở hữu land này rồi!");
      setDumua(false);
      return;
    }
    let hienco, yeucau;
    if (status !== undefined) hienco = status.metal;

    if (status !== undefined) yeucau = status.Require.Metal;

    if (hienco >= yeucau) setDumua(true);
    else setDumua(false);
    let sub =
      "You have " + hienco + " elements \n" + "Need " + yeucau + " elements";
    setSubTitle(sub);
  };

  const initSubtitleAleartPlan = () => {
    if (map1.Plan) {
      setSubTitle("Bạn đã sở hữu land này rồi!");
      setDumua(false);
      return;
    }
    let hienco, yeucau;
    if (status !== undefined) hienco = status.plan;

    if (status !== undefined) yeucau = status.Require.Plan;

    if (hienco >= yeucau) setDumua(true);
    else setDumua(false);
    let sub =
      "You have " + hienco + " elements \n" + "Need " + yeucau + " elements";
    setSubTitle(sub);
  };
  const buyLandWater = async () => {
    let hienco, yeucau;
    if (status !== undefined) hienco = status.water;

    if (status !== undefined) yeucau = status.Require.Water;

    if (yeucau <= hienco) {
      hienco = hienco - yeucau;
      let tempstatus = status;
      tempstatus.LandsMap.push("Water");
      tempstatus.water = hienco;
      await gameFirebase.updateGameStatus(user.uid, tempstatus);
      setStatus(tempstatus);
      initElementLands();
      setMap1({ ...map1, Water: true });
    }
  };

  const buyLandMetal = async () => {
    let hienco, yeucau;
    if (status !== undefined) hienco = status.metal;

    if (status !== undefined) yeucau = status.Require.Metal;

    if (yeucau <= hienco) {
      hienco = hienco - yeucau;
      let tempstatus = status;
      tempstatus.LandsMap.push("Metal");
      tempstatus.metal = hienco;
      await gameFirebase.updateGameStatus(user.uid, tempstatus);
      setStatus(tempstatus);
      initElementLands();
      setMap1({ ...map1, Metal: true });
    }
  };

  const buyLandPan = async () => {
    let hienco, yeucau;
    if (status !== undefined) hienco = status.plan;

    if (status !== undefined) yeucau = status.Require.Plan;

    if (yeucau <= hienco) {
      hienco = hienco - yeucau;
      let tempstatus = status;
      tempstatus.LandsMap.push("Plan");
      tempstatus.plan = hienco;
      await gameFirebase.updateGameStatus(user.uid, tempstatus);
      setStatus(tempstatus);
      initElementLands();
      setMap1({ ...map1, Plan: true });
    }
  };

  const buyLand = async () => {
    if (title == "Water Element") {
      buyLandWater();
    } else if (title == "Plant Element") {
      buyLandPan();
    } else {
      buyLandMetal();
    }
  };
  return (
    <View>
      <SCLAlert
        headerIconComponent={renderImageAlertElement()}
        theme=""
        show={isModalLand}
        title={title}
        subtitle={subTitle}
        onRequestClose={() => {
          setIsModalLand(false);
        }}
      >
        <SCLAlertButton
          theme="info"
          onPress={() => {
            setIsModalLand(false);
          }}
        >
          Cancel
        </SCLAlertButton>
        {!dumua ? null : (
          <SCLAlertButton
            theme="success"
            onPress={() => {
              buyLand();
              setIsModalLand(false);
            }}
          >
            Get land
          </SCLAlertButton>
        )}
      </SCLAlert>

      <SCLAlert
        headerIconComponent={renderImageAlertShop()}
        theme=""
        show={isModalShop}
        title="SHOPPING"
        subtitle={"Buy some snow"}
        onRequestClose={() => {
          setIsModalShop(false);
        }}
      >
        <Image
          source={require("../../utils/StatusBar/SnowView.jpg")}
          resizeMode="cover"
          style={{
            width: width / 4,
            height: width / 8,
            marginTop: -10,
            zIndex: 1,
            backgroundColor: "transparent",
            borderRadius: 10,
            alignSelf: "center",
          }}
        ></Image>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            alignSelf: "center",
            marginTop: 10,
          }}
        >
          <Text h5>100</Text>
          <Avatar
            size="small"
            rounded
            title="?"
            activeOpacity={0.7}
            source={require("../../utils/StatusBar/Coins.png")}
          />
        </View>
        <SCLAlertButton
          theme="success"
          onPress={() => {
            if (coins - 100 >= 0 && !isSnow) {
              setCoins(coins - 100);
              gameFirebase.updateGameLevelCoins(user.uid, 0, -100);
            }

            setIsModalShop(false);
            setIsSnow(true);
          }}
        >
          {isSnow
            ? "You have this already"
            : coins >= 100
            ? "Buy"
            : "No money enough"}
        </SCLAlertButton>
        <SCLAlertButton
          theme="info"
          onPress={() => {
            setIsModalShop(false);
          }}
        >
          Cancel
        </SCLAlertButton>
      </SCLAlert>

      <SCLAlert
        headerIconComponent={renderImageAlertMap()}
        theme=""
        show={isModalMap}
        title="LOCK MAP"
        subtitle={"Not enough level"}
        onRequestClose={() => {
          setIsModalMap(false);
        }}
      >
        <SCLAlertButton
          theme="success"
          onPress={() => {
            setIsModalMap(false);
          }}
        >
          Done
        </SCLAlertButton>
      </SCLAlert>

      <Swiper
        index={0}
        style={{}}
        showsButtons={true}
        prevButton={customBackButton()}
        nextButton={customNextButton()}
      >
        <View>
          <ImageBackground
            source={require("../../utils/WorldMap/Map2.jpg")}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              // marginTop: -10,
              zIndex: -1,
              backgroundColor: "transparent",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedItem("Water");
                initSubtitleAleartWater();
                setIsModalLand(true);
                setTitle("Water Element");
              }}
              style={{
                width: width / 3.75,
                height: height / 7,
                marginLeft: width / 2 - 50,
                borderRadius: 100,
                marginTop: 180,
              }}
            >
              <Animatable.View
                style={{ marginLeft: 30, marginTop: 50 }}
                animation={mySlideInDown}
                iterationCount={"infinite"}
                duration={2000}
                direction="alternate"
              >
                {console.log("lala" + map1.Water)}
                <ElementWaterLand visible={map1.Water}></ElementWaterLand>
              </Animatable.View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectedItem("Metal");
                initSubtitleAleartMetal();
                setIsModalLand(true);
                setTitle("Metal Element");
              }}
              style={{
                width: width / 3.75,
                height: height / 7,
                marginLeft: width - 150,
                borderRadius: 100,
                marginTop: -5,
              }}
            >
              <Animatable.View
                style={{ marginLeft: 30, marginTop: 50 }}
                animation={mySlideInDown}
                iterationCount={"infinite"}
                duration={2000}
                direction="alternate"
              >
                <ElementMetalLand visible={map1.Metal}></ElementMetalLand>
              </Animatable.View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                initSubtitleAleartPlan();
                setSelectedItem("Plan");
                setIsModalLand(true);
                setTitle("Plant Element");
              }}
              style={{
                width: width / 3.75,
                height: height / 7,
                marginLeft: width / 2 - 100,
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
                <ElementPlanLand visible={map1.Plan}></ElementPlanLand>
              </Animatable.View>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View>
          <ImageBackground
            source={require("../../utils/WorldMap/MapClassic.jpg")}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              // marginTop: -10,
              zIndex: -1,
              backgroundColor: "transparent",
              opacity: 0.5,
            }}
          >
            <View style={{ height: 120 }}></View>
            <TouchableOpacity
              onPress={() => {}}
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
              onPress={() => {}}
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
              onPress={() => {}}
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
              onPress={() => {}}
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
              onPress={() => {}}
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
          <TouchableOpacity
            style={{
              position: "absolute",
              // top: height / 2 - 80,
              // left: width / 2 - 50,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
            onPress={() => {
              setIsModalMap(true);
            }}
          >
            <Image
              source={require("../../utils/StatusBar/lock.png")}
              resizeMode="stretch"
              style={{
                width: 100,
                height: 100,
                backgroundColor: "transparent",
              }}
            ></Image>
          </TouchableOpacity>
        </View>

        <View>
          <ImageBackground
            source={require("../../utils/WorldMap/Map3.jpg")}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              // marginTop: -10,
              zIndex: -1,
              backgroundColor: "transparent",
              opacity: 0.5,
            }}
          >
            <TouchableOpacity
              onPress={() => {}}
              style={{
                width: width / 3.75,
                height: height / 7,
                marginLeft: width - 190,
                borderRadius: 100,
                marginTop: 100,
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
              onPress={() => {}}
              style={{
                width: width / 3.75,
                height: height / 7,
                marginLeft: 90,
                borderRadius: 100,
                marginTop: 20,
              }}
            >
              <Animatable.View
                style={{ marginLeft: 30, marginTop: 50 }}
                animation={mySlideInDown}
                iterationCount={"infinite"}
                duration={2000}
                direction="alternate"
              >
                <ElementWaterLand visible={map1.Water}></ElementWaterLand>
              </Animatable.View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={{
                width: width / 3.75,
                height: height / 7,
                marginLeft: width - 190,
                borderRadius: 100,
                marginTop: 70,
              }}
            >
              <Animatable.View
                style={{ marginLeft: 30, marginTop: 50 }}
                animation={mySlideInDown}
                iterationCount={"infinite"}
                duration={2000}
                direction="alternate"
              >
                <ElementFireLand visible={map1.Fire}></ElementFireLand>
              </Animatable.View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={{
                width: width / 3.75,
                height: height / 7,
                marginLeft: 70,
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
                <ElementEarthLand visible={map1.Earth}></ElementEarthLand>
              </Animatable.View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={{
                width: width / 3.75,
                height: height / 7,
                marginLeft: width - 190,
                borderRadius: 100,
                marginTop: -70,
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

          <TouchableOpacity
            onPress={() => {
              setIsModalMap(true);
            }}
            style={{
              position: "absolute",
              // top: height / 2 - 80,
              // left: width / 2 - 50,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              source={require("../../utils/StatusBar/lock.png")}
              resizeMode="stretch"
              style={{
                width: 100,
                height: 100,
                backgroundColor: "transparent",
              }}
            ></Image>
          </TouchableOpacity>
        </View>
      </Swiper>

      <View style={{ position: "absolute", top: 0 }}>
        <StatusBarPlayer level={level} coins={coins}></StatusBarPlayer>
        <View style={{ marginTop: -50, marginLeft: 200 }}>
          <SnowEffect Visibility={isSnow}></SnowEffect>
        </View>
      </View>

      <View
        style={{
          height: 70,
          width: "100%",
          position: "absolute",
          top: Dimensions.get("screen").height / 9,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          // style={{ marginLeft: 10, width: 120, height: 100 }}
          onPress={() => {
            playSoundOpenShop();
            setIsModalShop(true);
          }}
        >
          <Image
            source={require("../../utils/StatusBar/Shop.png")}
            resizeMode="stretch"
            style={{
              width: 120,
              height: 100,
              zIndex: 1,
              backgroundColor: "transparent",
            }}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          // style={{
          //   //  marginLeft: width - 2 * 120,
          //   width: 120,
          //   height: 100,
          // }}
          onPress={() => {
            navigation.navigate("Ranking");
          }}
        >
          <Image
            source={require("../../utils/StatusBar/Ranking.png")}
            resizeMode="stretch"
            style={{
              width: 100,
              height: 80,
              zIndex: 1,
              // marginTop: 10,
              backgroundColor: "transparent",
            }}
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={{ position: "absolute", top: 0, left: 10 }}>
        <SnowEffect Visibility={isSnow}></SnowEffect>
      </View>

      <View style={{ position: "absolute", top: 10, left: 40 }}>
        <SnowEffect Visibility={isSnow}></SnowEffect>
      </View>

      <View style={{ position: "absolute", top: 30, left: width / 3 }}>
        <SnowEffect Visibility={isSnow}></SnowEffect>
      </View>

      <View style={{ position: "absolute", top: 5, left: width / 2 }}>
        <SnowEffect Visibility={isSnow}></SnowEffect>
      </View>

      <View style={{ position: "absolute", top: 15, left: width - 30 }}>
        <SnowEffect Visibility={isSnow}></SnowEffect>
      </View>
    </View>
  );
};

const SnowEffect = (props) => {
  const flagSnow = props.Visibility;
  if (!flagSnow) return <View></View>;

  return <Snow snowfall="light" />;
};

const ElementAirLand = (props) => {
  const visible = props.visible;
  let opa = 1;
  if (visible === undefined || !visible) opa = 0.5;
  return (
    <Avatar
      size="medium"
      rounded
      title="?"
      activeOpacity={0.7}
      source={require("../../utils/Elements/Air.png")}
      opacity={opa}
    />
  );
};

const ElementEarthLand = (props) => {
  const visible = props.visible;
  let opa = 1;
  if (visible === undefined || !visible) opa = 0.5;
  return (
    <Avatar
      size="medium"
      rounded
      title="?"
      activeOpacity={0.7}
      source={require("../../utils/Elements/Earth.png")}
      opacity={opa}
    />
  );
};

const ElementFireLand = (props) => {
  const visible = props.visible;
  let opa = 1;
  if (visible === undefined || !visible) opa = 0.5;
  return (
    <Avatar
      size="medium"
      rounded
      title="?"
      activeOpacity={0.7}
      source={require("../../utils/Elements/Fire.png")}
      opacity={opa}
    />
  );
};

const ElementMetalLand = (props) => {
  const visible = props.visible;
  let opa = 1;
  if (visible === undefined || !visible) opa = 0.5;
  return (
    <Avatar
      size="medium"
      rounded
      title="?"
      activeOpacity={0.7}
      source={require("../../utils/Elements/Metal.png")}
      opacity={opa}
    />
  );
};

const ElementPlanLand = (props) => {
  const visible = props.visible;
  let opa = 1;
  if (visible === undefined || !visible) opa = 0.5;
  return (
    <Avatar
      size="medium"
      rounded
      title="?"
      activeOpacity={0.7}
      source={require("../../utils/Elements/Plan.png")}
      opacity={opa}
    />
  );
};

const ElementSuperPowerLand = (props) => {
  const visible = props.visible;
  let opa = 1;
  if (visible === undefined || !visible) opa = 0.5;
  return (
    <Avatar
      size="medium"
      rounded
      title="?"
      activeOpacity={0.7}
      source={require("../../utils/Elements/SuperPower.png")}
      opacity={opa}
    />
  );
};

const ElementWaterLand = (props) => {
  const visible = props.visible;
  let opa = 1;
  if (visible === undefined || !visible) opa = 0.5;
  return (
    <Avatar
      size="medium"
      rounded
      title="?"
      activeOpacity={0.7}
      source={require("../../utils/Elements/Water.png")}
      opacity={opa}
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
