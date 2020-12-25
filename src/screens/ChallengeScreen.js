import React from "react";
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  Image,
  Icon,
  Scroll,
  Touchable,
} from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import Challenge_TempData from "../utils/Challenge_TempData";
import { render } from "react-dom";
import { ScrollView } from "react-native-gesture-handler";
import ModalInfoChallenge from "../components/ModalInfoChallenge";
import { connect } from "react-redux";
import {
  displayModal,
  hideModal,
  beginChallenge,
  completeChallenge,
  resetPageModal,
} from "../redux/actions/ActionCreators";
import ModalCreateChallenge from "../components/ModalCreateChallenge";

//Import Galio Articale
import Article from "../components/GalioArticale";
import ArticleCover from "../components/GalioArticleCover";
import ArticleFeedv1 from "../components/GalioArticleFeedv1";
import ArticleFeedv2 from "../components/GalioArticleFeedv2";
import Cards from "../components/GalioCards";
import Components from "../components/GalioComponents";
import Dashboard from "../components/GalioDashboard";
import Grid from "../components/GalioGrid";

import Login from "../components/GalioLogin";
import News from "../components/GalioNews";
import Confirmed from "../components/GalioOrderConfirmed";
import Presentation from "../components/GalioPresentation";
import Register from "../components/GalioRegister";
import Registerv2 from "../components/GalioRegisterv2";

import {
  Block
 } from 'galio-framework';
 //chart
 import { AreaChart } from 'react-native-svg-charts';
 import Carousel from 'react-native-snap-carousel';
import MyCarousel from "../components/CustomComponent/ChallengeCard";
import { colors } from "react-native-elements";

//
import CardChallenge1 from "../components/CustomComponent/CardChallenge";


import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'

const Challenge = (props) => {
  return (
    <View style={styles.center}>
      <ModalInfoChallenge
        beginChallenge={() => props.beginChallenge()}
        hideModal={() => props.hideModal()}
        displayModal={() => props.displayModal()}
        visible={props.visible}
      ></ModalInfoChallenge>

      <ModalCreateChallenge
        completeChallenge={() => props.completeChallenge()}
        displayModal={() =>  props.displayModal()}
        visible={props.visibleBeginChallenge}
      ></ModalCreateChallenge>


        {/* <SCLAlert
          theme="success"
          show={true}
          title="Lorem"
          subtitle="Lorem ipsum dolor"
        >
          <SCLAlertButton theme="success">Done</SCLAlertButton>
        </SCLAlert> */}

      <ScrollView>
      <Button
          title="Info Challenge"
          onPress={() => {
            props.navigation.navigate("InfoChallenge");
          }}
        />
        <MyCarousel></MyCarousel>
        <MyCarousel></MyCarousel>
        <MyCarousel></MyCarousel>
        <MyCarousel></MyCarousel>
        {/* <CardChallenge1></CardChallenge1> */}
        {/* <Article></Article>  */}
        {/* <Cards></Cards> */}
        {/* <Grid></Grid> */}
        {/* <Login></Login> */}
        {/* <News></News> */}
        {/* <Confirmed></Confirmed> */}
        {/* <Register></Register> */}
        {/* <Regisfterv2></Regisfterv2> */}

        {/* <HeaderList info={{ title: "Challenge Sự Kiện" }}></HeaderList>
        <ListChallenge></ListChallenge>

        <HeaderList info={{ title: "Challenge Thử Thách" }}></HeaderList>
        <ListChallenge></ListChallenge>

        <HeaderList info={{ title: "Challenge Nâng Cao" }}></HeaderList>
        <ListChallenge></ListChallenge> */}
      </ScrollView>
    </View>
  );
};

const ListChallenge = () => {
  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      style={styles.Flat}
      horizontal={true}
      data={Challenge_TempData}
      renderItem={({ item }) => <CardChallenge info={item}></CardChallenge>}
    ></FlatList>
  );
};

const CardChallenge = ({ info }) => {
  return (
    <View style={styles.Card}>
      <Image
        source={{ uri: info.Avatar }}
        style={styles.ImageChallenge}
      ></Image>
      <Text style={styles.Title}>{info.title}</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 15,
        }}
      >
        <Image
          style={{ height: 30, width: 30 }}
          source={{
            uri:
              "https://www.vhv.rs/dpng/d/416-4162657_people-icon-green-hd-png-download.png",
          }}
        />
        <Text style={styles.InfoText}>{info.numberJoiner}</Text>

        <Image
          style={{ height: 30, width: 30, marginLeft: 5 }}
          source={{
            uri:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRGmbEBux0XlScrphrbMG6Xu8KFGvXDpmyV-w&usqp=CAU",
          }}
        />
        <Text style={styles.InfoText}>{info.Healths}</Text>

        <Image
          style={{ height: 30, width: 30 }}
          source={{
            uri:
              "https://www.pinclipart.com/picdir/middle/112-1122855_clash-royale-coins-png-image-royalty-free-clash.png",
          }}
        />
        <Text style={styles.InfoText}>{info.Coins}</Text>
      </View>
      <Text style={styles.InfoText}>{info.numberJoiner}</Text>
      <Text style={styles.InfoText}>{info.StartDate}</Text>
    </View>
  );
};

const HeaderList = ({ info }) => {
  return (
    <View style={styles.Header}>
      <Image
        style={{ height: 70, width: 70, marginLeft: 10, marginBottom: 10 }}
        source={require("../utils/images/Crown.png")}
      />
      <Text style={styles.TitleChallenge}>{info.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  Flat: {
    margin: 10,
  },

  Card: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    marginTop: 2,
    width: 200,
    height: 200,
  },
  ImageChallenge: {
    height: 150,
    width: 180,
    margin: 2,
  },

  Title: {
    fontSize: 15,
    fontWeight: "bold",
    height: 20,
  },

  InfoText: {
    flex: 60,
    fontSize: 15,
    fontWeight: "normal",
    height: 20,
    alignContent: "center",
    alignSelf: "stretch",
  },
  Header: {
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 400,
    height: 30,
    marginTop: 5,
    marginBottom: 0,
  },
  TitleChallenge: {
    fontSize: 22,
    fontWeight: "bold",
    height: 40,
    color: Colors.skin,
    alignItems: "center",
    alignContent: "space-around",
  },
});

const url_IconJoiner =
  "https://ercc.compact.org/wp-content/uploads/sites/43/2018/08/People-Icon-CC-Red-Ombre.png";

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    visible: state.modalChallengeReducer.visible,
    visibleBeginChallenge: state.modalChallengeReducer.visibleModalCreate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayModal: () => {dispatch(displayModal()); dispatch(resetPageModal());},
    hideModal: () => dispatch(hideModal()),
    beginChallenge: () => dispatch(beginChallenge()),
    completeChallenge: () => dispatch(completeChallenge()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
