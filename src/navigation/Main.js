import React, { Component } from "react";
import {
  View,
  Platform,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import Constants from "expo-constants";
import { Icon } from "react-native-elements";
import * as NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
//import { fetchExamples } from "../redux/actions/ActionCreators";

import AppStackNavigator from "./AppStackNavigator";

const mapStateToProps = (state) => {
  return {
    // examples: state.examples,
  };
};

const mapDispatchToProps = (dispatch) => ({
  //fetchExamples: () => dispatch(fetchExamples()),
});

class Main extends Component {
  componentDidMount() {
    //this.props.fetchExamples();

    // NetInfo.fetch().then((connectionInfo) => {
    //   ToastAndroid.show(
    //     "Initial Network Connectivity Type: " +
    //       connectionInfo.type,
    //     ToastAndroid.LONG
    //   );
    // });

    //NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    this.unsubscribe = NetInfo.addEventListener((state) =>
      this.handleConnectivityChange(state)
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleConnectivityChange = (state) => {
    switch (state.type) {
      case "none":
        ToastAndroid.show("You are now offline!", ToastAndroid.LONG);
        break;
      case "wifi":
        ToastAndroid.show("You are now connected to WiFi!", ToastAndroid.LONG);
        break;
      case "cellular":
        ToastAndroid.show(
          "You are now connected to Cellular!",
          ToastAndroid.LONG
        );
        break;
      case "unknown":
        ToastAndroid.show(
          "You now have unknown connection!",
          ToastAndroid.LONG
        );
        break;
      default:
        break;
    }
  };

  render() {
    return <AppStackNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
// export default Main;
