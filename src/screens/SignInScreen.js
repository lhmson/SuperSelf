import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

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
      <Main>
        <Text title center bold>
          {`Welcome\nHave a nice day`}
        </Text>
      </Main>
      <Auth>
        <AuthContainer>
          <AuthTitle medium>Email</AuthTitle>
          <AuthField
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorect={false}
            autoFocus={true}
            keyboardType="email-address"
            onChangeText={(email) => setEmail(email.trim())}
            value={email}
          />
        </AuthContainer>

        <AuthContainer>
          <AuthTitle medium>Password</AuthTitle>
          <AuthField
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorect={false}
            autoFocus={false}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password.trim())}
            value={password}
          />
        </AuthContainer>
      </Auth>

      <SignInContainer onPress={logIn} disabled={loading}>
        {loading ? (
          <Loading />
        ) : (
          <Text bold medium center color={`${Colors.white}`}>
            Sign In
          </Text>
        )}
      </SignInContainer>

      <SignUp onPress={() => navigation.navigate("SignUp")}>
        <Text small center>
          New to SocialApp?
          <Text bold color={`${Colors.darkBlue}`}>
            {" "}
            Sign Up
          </Text>
        </Text>
      </SignUp>

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

const Auth = styled.View`
  margin: 50px 30px 30px;
`;

const AuthContainer = styled.View`
  margin-bottom: 34px;
`;

const AuthTitle = styled(Text)`
  color: ${Colors.lightGray};
  text-transform: uppercase;
`;

const AuthField = styled.TextInput`
  border-bottom-color: ${Colors.lightBlue};
  border-bottom-width: 0.5px;
  height: 42px;
`;

const SignInContainer = styled.TouchableOpacity`
  margin: 0 32px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.lightPink}
  border-radius: 6px;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: Colors.paleWhite,
  size: "small",
}))``;

const SignUp = styled.TouchableOpacity`
  margin-top: 15px;
`;

const HeaderGraphic = styled.View`
  position: absolute;
  width: 100%;
  top: -50px;
  z-index: -100;
`;

const LeftCircle = styled.View`
  background-color: ${Colors.lightBlue};
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  left: -50px;
  top: -50px;
`;

const RightCircle = styled.View`
  background-color: ${Colors.darkPurple};
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 200px;
  right: -100px;
  top: -200px;
`;

const StatusBar = styled.StatusBar``;

export default SignInScreen;
