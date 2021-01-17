import React from "react";
import { View, StyleSheet, Button, Dimensions } from "react-native";

import Colors from "../utils/Colors";
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

import MyCarousel from "../components/CustomComponent/ChallengeCard";
import ChallengeEvent_TempData from "../utils/ChallengeEvent_TempData";
import ChallengeNormal_Data from "../utils/ChallengeNormal_Data";

const { width, height } = Dimensions.get("screen");

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
        displayModal={() => props.displayModal()}
        visible={props.visibleBeginChallenge}
      ></ModalCreateChallenge>

      <ScrollView style={{ width }}>
        <MyCarousel
          navigation={props.navigation}
          data={ChallengeNormal_Data}
        ></MyCarousel>
        <MyCarousel
          navigation={props.navigation}
          data={ChallengeEvent_TempData}
        ></MyCarousel>
        <MyCarousel
          navigation={props.navigation}
          data={ChallengeEvent_TempData}
        ></MyCarousel>
        <MyCarousel
          navigation={props.navigation}
          data={ChallengeEvent_TempData}
        ></MyCarousel>

        <View style={{ height: 40 }}></View>
        <Button
          title="My Challenge"
          onPress={() => {
            props.navigation.navigate("MyChallenge");
          }}
        />
        {/* <CardChallenge1></CardChallenge1> */}
        {/* <Article></Article>  */}
        {/* <Cards></Cards> */}
        {/* <Grid></Grid> */}
        {/* <Login></Login> */}
        {/* <News></News> */}
        {/* <Confirmed></Confirmed> */}
        {/* <Register></Register> */}
        {/* <Regisfterv2></Regisfterv2> */}
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
    displayModal: () => {
      dispatch(displayModal());
      dispatch(resetPageModal());
    },
    hideModal: () => dispatch(hideModal()),
    beginChallenge: () => dispatch(beginChallenge()),
    completeChallenge: () => dispatch(completeChallenge()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
