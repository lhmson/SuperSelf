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

import PageInfoChallenge from "../components/CustomComponent/PageInfoChallenge";
import ModalCreateChallenge from "../components/ModalCreateChallenge";
import ChallengeManager from "../components/CustomComponent/ChallengeManager"

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
 import { ProgressCircle } from 'react-native-svg-charts';
 import Carousel from 'react-native-snap-carousel';
import MyCarousel from "../components/CustomComponent/ChallengeCard";
import { colors } from "react-native-elements";

//
import CardChallenge1 from "../components/CustomComponent/CardChallenge";


import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'

const MyChallenge = (props) => {
  return (
    <View style={styles.center}>
      <ScrollView>
        <ChallengeManager></ChallengeManager>
      </ScrollView>
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
    color: Colors.lightOrange,
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

export default connect(mapStateToProps, mapDispatchToProps)(MyChallenge);
