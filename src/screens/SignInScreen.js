import React, { useContext, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import styled from "styled-components";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import { UserContext } from "../context/UserContext";
import { UserFirebaseContext } from "../context/UserFirebaseContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { SettingContext } from "../context/SettingContext";
import { SettingFirebaseContext } from "../context/SettingFirebaseContext";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [eyeIcon, setEyeIcon] = useState("eye");
  const [loading, setLoading] = useState(false);
  const userFirebase = useContext(UserFirebaseContext);
  const [_, setUser] = useContext(UserContext);
  const [_setting, setSetting] = useContext(SettingContext);
  const settingFirebase = useContext(SettingFirebaseContext);

  const eye = <Entypo name={eyeIcon} size={24} color="black" />;

  const togglePasswordVisibility = () => {
    setIsPasswordShown(isPasswordShown ? false : true);
    setEyeIcon(eyeIcon == "eye" ? "eye-with-line" : "eye");
  };

  const logInWithGoogle = async () => {
    await userFirebase.logInWithGoogle();
  };

  const logIn = async () => {
    setLoading(true);

    try {
      await userFirebase.logIn(email, password);
      const uid = userFirebase.getCurrentUser().uid;
      const userInfo = await userFirebase.getUserInfo(uid);
      const settingInfo = await settingFirebase.getSettingInfo(uid);
      setUser({
        username: userInfo.username,
        email: userInfo.email,
        uid,
        profilePhotoUrl: userInfo.profilePhotoUrl,
        isLoggedIn: true,
        // birthday: userInfo.birthday,
        gender: userInfo.gender,
      });

      // init setting
      setSetting({
        theme: settingInfo.theme, // dark mode enable
        allowPush: settingInfo.allowPush,
        sound: settingInfo.sound,
        snow: settingInfo.snow,
        language: settingInfo.language,
      });
    } catch (error) {
      alert("Error when logging in, try again");
      console.log("Error when logging in", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ImageBackground
        source={require("../utils/postbg.jpg")}
        style={{
          width: "100%",
          height: "100%",
          opacity: 10,
          resizeMode: "cover",
        }}
        imageStyle={{ opacity: 0.5 }}
      ></ImageBackground>
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
        }}
      >
        <Auth behavior="position" keyboardVerticalOffset={10}>
          <Main>
            <Text title center bold>
              {`Let's be SuperSelf\nHave a nice day`}
            </Text>
          </Main>

          <AuthContainer>
            {/* <AuthTitle medium>Email</AuthTitle> */}
            <AuthField
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              autoFocus={true}
              placeholder="EMAIL"
              keyboardType="email-address"
              onChangeText={(email) => setEmail(email.trim())}
              value={email}
            />
          </AuthContainer>

          <AuthContainer>
            {/* <AuthTitle medium>Password</AuthTitle> */}
            <AuthField
              autoCapitalize="none"
              autoCompleteType="password"
              autoCorrect={false}
              placeholder="PASSWORD"
              secureTextEntry={isPasswordShown}
              onChangeText={(password) => setPassword(password.trim())}
              value={password}
            />
            <EyeIcon onPress={togglePasswordVisibility}>{eye}</EyeIcon>
          </AuthContainer>

          <SignInContainer onPress={logIn} disabled={loading}>
            {loading ? (
              <Loading />
            ) : (
              <Text bold center color={`${Colors.white}`}>
                Sign In
              </Text>
            )}
          </SignInContainer>
        </Auth>

        <TextView onPress={() => {}}>
          <Text small center bold color={`${Colors.primaryLight}`}>
            Forgot Password?
          </Text>
        </TextView>

        <SignUp onPress={() => navigation.navigate("SignUp")}>
          <Text small center>
            New to SuperSelf?
            <Text bold color={`${Colors.primaryDark}`}>
              {" "}
              Sign Up
            </Text>
          </Text>
        </SignUp>

        <SocialContainer>
          <TouchableOpacity
            onPress={logInWithGoogle}
            style={{ alignItems: "center", padding: 15 }}
          >
            <AntDesign name="google" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logInWithGoogle}
            style={{ alignItems: "center", padding: 15 }}
          >
            <AntDesign name="facebook-square" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logInWithGoogle}
            style={{ alignItems: "center", padding: 15 }}
          >
            <AntDesign name="twitter" size={30} color="black" />
          </TouchableOpacity>
        </SocialContainer>

        <TextView onPress={() => {}}>
          <Text small center bold color={`${Colors.primaryLight}`}>
            Term of Services
          </Text>
        </TextView>
        <TextView onPress={() => {}}>
          <Text small center bold color={`${Colors.primaryLight}`}>
            Privacy and Policies
          </Text>
        </TextView>

        {/* <HeaderGraphic>
        <RightCircle />
        <LeftCircle />
      </HeaderGraphic> */}
        <StatusBar barStyle="light-content" />
      </View>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Main = styled.View`
  margin-top: ${Dimensions.get("screen").height / 6}px;
`;

const Auth = styled.KeyboardAvoidingView`
  margin: 0px 30px;
`;

const AuthContainer = styled.View`
  margin-top: 34px;
`;

const AuthTitle = styled(Text)`
  color: ${Colors.black};
  text-transform: uppercase;
`;

const AuthField = styled.TextInput`
  border-bottom-color: ${Colors.primaryDark};
  border-bottom-width: 0.5px;
  height: 42px;
`;

const TextView = styled.TouchableOpacity`
  margin-bottom: 20px;
`;

const SignInContainer = styled.TouchableOpacity`
  margin: 36px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.pink}
  border-radius: 6px;
`;

const SocialContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: Colors.paleWhite,
  size: "small",
}))``;

const EyeIcon = styled.TouchableOpacity`
  position: absolute;
  top: 25%;
  right: 10px;
`;

const SignUp = styled.TouchableOpacity`
  ${"" /* margin-top: 15px; */}
`;

const HeaderGraphic = styled.View`
  position: absolute;
  width: 100%;
  top: -50px;
  z-index: -100;
`;

const LeftCircle = styled.View`
  background-color: ${Colors.primary};
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  left: -50px;
  top: -50px;
`;

const RightCircle = styled.View`
  background-color: ${Colors.primaryDark};
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 200px;
  right: -100px;
  top: -200px;
`;

const StatusBar = styled.StatusBar``;

export default SignInScreen;
