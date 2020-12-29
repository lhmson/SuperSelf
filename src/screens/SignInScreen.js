import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [eyeIcon, setEyeIcon] = useState("eye");
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const eye = <Entypo name={eyeIcon} size={24} color="black" />;

  const togglePasswordVisibility = () => {
    setIsPasswordShown(isPasswordShown ? false : true);
    setEyeIcon(eyeIcon == "eye" ? "eye-with-line" : "eye");
  };

  const logInWithGoogle = async () => {
    await firebase.logInWithGoogle();
  };

  const logIn = async () => {
    setLoading(true);

    try {
      await firebase.logIn(email, password);
      const uid = firebase.getCurrentUser().uid;
      const userInfo = await firebase.getUserInfo(uid);
      setUser({
        username: userInfo.username,
        email: userInfo.email,
        uid,
        profilePhotoUrl: userInfo.profilePhotoUrl,
        isLoggedIn: true,
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Auth behavior="position" keyboardVerticalOffset={10}>
        <Main>
          <Text title center bold>
            {`Welcome\nHave a nice day`}
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
            <Text bold medium center color={`${Colors.white}`}>
              Sign In
            </Text>
          )}
        </SignInContainer>
      </Auth>

      <SignUp onPress={() => navigation.navigate("SignUp")}>
        <Text small center>
          New to SuperSelf?
          <Text bold color={`${Colors.primaryDark}`}>
            {" "}
            Sign Up
          </Text>
        </Text>
      </SignUp>

      <TouchableOpacity
        onPress={logInWithGoogle}
        style={{ alignItems: "center", padding: 15 }}
      >
        <AntDesign name="google" size={30} color="black" />
      </TouchableOpacity>

      <HeaderGraphic>
        <RightCircle />
        <LeftCircle />
      </HeaderGraphic>
      <StatusBar barStyle="light-content" />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Main = styled.View`
  margin-top: 160px;
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

const SignInContainer = styled.TouchableOpacity`
  margin: 34px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.pink}
  border-radius: 6px;
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
  background-color: ${Colors.primaryDark};
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  left: -50px;
  top: -50px;
`;

const RightCircle = styled.View`
  background-color: ${Colors.purpleBlue};
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 200px;
  right: -100px;
  top: -200px;
`;

const StatusBar = styled.StatusBar``;

export default SignInScreen;
