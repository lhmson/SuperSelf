import {
    SettingsDividerShort,
    SettingsDividerLong,
    SettingsEditText,
    SettingsCategoryHeader,
    SettingsSwitch,
    SettingsPicker
  } from "react-native-settings-components";
  
  import React, { Component } from 'react';
  import {
    ScrollView,
  } from 'react-native';
  
  export default class App extends Component {
    constructor() {
      super();
      this.state = {
        username: "",
        allowPushNotifications: false,
        gender: "Male",
        language : "English",
        birthday : "18/09/2000",
      };
    }
  
    render() {
        return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor:
            Platform.OS === "ios" ? colors.iosSettingsBackground : colors.white
        }}
      >
        <SettingsCategoryHeader
          title={"My Account"}
          textStyle={Platform.OS === "android" ? { color: colors.monza } : null}
        />
        <SettingsDividerLong android={false} />
        <SettingsEditText
          title="Username"
          dialogDescription={"Enter your username."}
          valuePlaceholder="admin123@gm.com"
          negativeButtonTitle={"Cancel"}
          buttonRightTitle={"Save"}
          onValueChange={value => {
            console.log("username:", value);
            this.setState({
              username: value
            });
          }}
          value={this.state.username}        
        />

        <SettingsEditText
          title="Password"
          dialogDescription={"Enter your username."}
          valuePlaceholder="********"
          negativeButtonTitle={"Cancel"}
          buttonRightTitle={"Save"}
          onValueChange={value => {
            console.log("password:", value);
            this.setState({
              username: value
            });
          }}
          value={this.state.username}        
        />

        <SettingsEditText
          title="Birthday"
          dialogDescription={"Enter your username."}
          negativeButtonTitle={"Cancel"}
          buttonRightTitle={"Save"}
          onValueChange={value => {
            this.setState({
              username: value
            });
          }}
          value={this.state.birthday}        
        />

        <SettingsPicker
          title="Gender"
          dialogDescription={"Choose your gender."}
          options={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
            { label: "Other", value: "Other" }
          ]}
          onValueChange={value => {
            this.setState({
              gender: value
            });
          }}
          value={this.state.gender}
          styleModalButtonsText={{ color: colors.monza }}
        />
        <SettingsDividerShort />
        <SettingsCategoryHeader
          title={"setting"}
          textStyle={Platform.OS === "android" ? { color: colors.monza } : null}
        />
        <SettingsSwitch
          title={"Allow Push Notifications"}
          onValueChange={value => {
            console.log("allow push notifications:", value);
            this.setState({
              allowPushNotifications: value
            });
          }}
          value={this.state.allowPushNotifications}
          trackColor={{
            true: colors.switchEnabled,
            false: colors.switchDisabled,
          }}
        />

            <SettingsSwitch
          title={"Theme Light/Night"}
          onValueChange={value => {
            console.log("allow push notifications:", value);
            this.setState({
              allowPushNotifications: value
            });
          }}
          value={this.state.allowPushNotifications}
          trackColor={{
            true: colors.switchEnabled,
            false: colors.switchDisabled,
          }}
        />

            <SettingsSwitch
          title={"Sound"}
          onValueChange={value => {
            console.log("allow push notifications:", value);
            this.setState({
              allowPushNotifications: value
            });
          }}
          value={this.state.allowPushNotifications}
          trackColor={{
            true: colors.switchEnabled,
            false: colors.switchDisabled,
          }}
        />
            <SettingsPicker
          title="Language"
          dialogDescription={"Choose your gender."}
          options={[
            { label: "Chinese", value: "Chinese" },
            { label: "VietNamese", value: "VietNamese" },
            { label: "English", value: "English" }
          ]}
          onValueChange={value => {
            this.setState({
              language: value
            });
          }}
          value={this.state.language}
          styleModalButtonsText={{ color: colors.monza }}
        />
      </ScrollView>
        );}
  }
  
  const colors = {
    white: "#FFFFFF",
    monza: "#C70039",
    switchEnabled: "#C014872",
    switchDisabled: "#efeff3",
    blueGem: "#27139A",
  };
  