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
    ScrollView, Dimensions, View
  } from 'react-native';
  import { Avatar } from 'react-native-elements';

  const { width, height } = Dimensions.get('screen');
  
  export default class App extends Component {
    constructor() {
      super();
      this.state = {
        username: "Sanh Phạm",
        allowPushNotifications: false,
        gender: "Male",
        language : "English",
        birthday : "18/09/2000",
        mail :"admin123@gm.com",
        password :"********"
      };
    }
  
    render() {
      const MyAvatar = "https://i.pinimg.com/564x/19/b8/f7/19b8f7a1ebb4b56004276498c1153637.jpg";
        return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor:
            Platform.OS === "ios" ? colors.iosSettingsBackground : colors.white
        }}
      >
        <View style={{width:width, justifyContent:"center",flexDirection:"row", marginTop:20, marginBottom:20}}>
            <Avatar
            size="xlarge"
            rounded
            title="AVATAR"
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            source={{uri : MyAvatar}}
           />
        </View>
        <SettingsCategoryHeader
          title={"My Account"}
          textStyle={Platform.OS === "android" ? { color: colors.monza } : null}
        />
        <SettingsDividerLong android={false} />
        <SettingsEditText
          title="Mail"
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
          value={this.state.mail}        
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
          value={this.state.password}        
        />
        <SettingsEditText
          title="Username"
          dialogDescription={"Enter your username."}
          negativeButtonTitle={"Cancel"}
          buttonRightTitle={"Save"}
          onValueChange={value => {
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

          <SettingsSwitch
          title={"Snow"}
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
          dialogDescription={"Choose your language."}
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
          // styleModalButtonsText={{ backgroundColor: colors.white}}
        />
      </ScrollView>
        );}
  }
  
  const colors = {
    white: "#FFFFFF",
    monza: "#efeff3",
    switchEnabled: "#C014872",
    switchDisabled: "#efeff3",
    blueGem: "#27139A",
  };
  