import React from "react";
import {
  View,
  StyleSheet
} from "react-native";
import Colors from "../utils/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import {
  displayModal,
  hideModal,
  beginChallenge,
  completeChallenge,
  resetPageModal,
} from "../redux/actions/ActionCreators";

import PageDetailsChallenge from "../components/CustomComponent/PageDetailsChallenge";

const DetailsChallenge = ({ route, navigation }) => {
  const challengeInfo = route.params.value;
  return (
    <View style={styles.center}>
      <ScrollView>
          <PageDetailsChallenge navigation={navigation} challenge = {challengeInfo}></PageDetailsChallenge>
      </ScrollView>
    </View>
  );
};


export default DetailsChallenge;

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
