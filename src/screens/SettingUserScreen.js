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
    ScrollView, Dimensions, View,StyleSheet,Image
  } from 'react-native';
  import { Avatar } from 'react-native-elements';

  const { width, height } = Dimensions.get('screen');
  import {
    SCLAlert,
    SCLAlertButton
  } from 'react-native-scl-alert'
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";
import DateTimePicker from '@react-native-community/datetimepicker';

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
        password :"********",
        isModalPassword : false,
        isModalUserName : false,
        isModalBirthday : false,
      };
    }

    renderImagePassword = () => (
      <Image source={require("./../utils/Icon/Password.png")} style={{width:80, height:80, resizeMode:"cover"}}/>
    );
    
    renderImageUsername = () => (
      <Image source={require("./../utils/Icon/Username.png")} style={{width:80, height:80, resizeMode:"cover"}}/>
    );

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
        {/* Alert Password */}
          <SCLAlert
          headerIconComponent={this.renderImagePassword()}
          theme="success"
          show={this.state.isModalPassword}
          title="Change Password">
          <TextInput style={{...styles.TextPassword, marginTop:-50}} 
                      autoCapitalize="none"
                      autoCompleteType="password"
                      autoCorrect={false}
                      placeholder="Old password"
                      secureTextEntry={true}
              
                      
          ></TextInput>
          <View style={{height:20}}></View>
          <TextInput style={styles.TextPassword} 
                      autoCapitalize="none"
                      autoCompleteType="password"
                      autoCorrect={false}
                      placeholder="New password"
                      secureTextEntry={true}
              
                      
          ></TextInput>
          <SCLAlertButton theme="success"  onPress={()=>{this.setState({isModalPassword:false})}}>Confirm</SCLAlertButton>
        </SCLAlert>
        {/* Alert UserName */}
        <SCLAlert
          headerIconComponent={this.renderImageUsername()}
          theme="success"
          show={this.state.isModalUserName}
          title="Change Username">
          <TextInput style={{...styles.TextPassword, marginTop:-50}} 
                      placeholder="Username"
          ></TextInput>
          <View style={{height:20}}></View>
          <SCLAlertButton theme="success"  onPress={()=>{this.setState({isModalUserName:false})}}>Done</SCLAlertButton>
        </SCLAlert>


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
          valuePlaceholder="admin123@gm.com"
          value={this.state.mail}        
        />

        <TouchableOpacity onPress={()=>{this.setState({isModalPassword:true})}}>
        <SettingsEditText
          title="Password"
          value={this.state.password}        
        />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{this.setState({isModalUserName:true})}}>
        <SettingsEditText
          title="Username"
          value={this.state.username}        
        />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{this.setState({isModalBirthday:true})}}>
        <SettingsEditText
          title="Birthday"
          value={this.state.birthday}        
        />
        </TouchableOpacity>

      {/* DateTime Birthday */}
      {
        this.state.isModalBirthday &&
        <DateTimePicker
          value={new Date(2000,9,18)}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={()=>{this.setState({isModalBirthday : false})}}         
        />
      }

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
          styleModalButtonsText={{ color: colors.monza}}
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
    border :"#134032",
  };
  

const styles = StyleSheet.create({
    TextPassword: {
        alignSelf:"center",
        fontSize : 18,
        width : "80%",
        borderRadius : 20,
        paddingLeft: 20,
        height : 50,
        borderColor : colors.border,
        borderWidth: 1,

    },
  });