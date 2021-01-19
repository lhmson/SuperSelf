import React, { useContext, useState } from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { UserFirebaseContext } from "../context/UserFirebaseContext";
import { UserContext } from "../context/UserContext";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordShown, setPasswordShown] = useState(true);
  const [eyeIcon, setEyeIcon] = useState("eye");
  const [loading, setLoading] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const userFirebase = useContext(UserFirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const eye = <Entypo name={eyeIcon} size={24} color="black" />;

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
    setEyeIcon(eyeIcon == "eye" ? "eye-with-line" : "eye");
  };

  const getPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      return status;
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!result.cancelled) {
        setProfilePhoto(result.uri);
      }
    } catch (error) {
      console.log("Error when picking image: " + error);
    }
  };

  const addProfilePhoto = async () => {
    const status = await getPermissions();

    if (status !== "granted") {
      alert("We need permissions to get access to your camera library");
      return;
    }

    pickImage();
  };

  const logInWithGoogle = async () => {
    await userFirebase.logInWithGoogle();
  };

  const signUp = async () => {
    setLoading(true);
    const user = { username, email, password, profilePhoto };

    try {
      const createdUser = await userFirebase.createUser(user);
      setUser({ ...createdUser, isLoggedIn: true });
    } catch (error) {
      console.log("Error when sign up", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Auth behavior="position" keyboardVerticalOffset={10}>
        <Main>
          <Text title center bold>
            Join us to get started
          </Text>
        </Main>

        <ProfilePhotoContainer onPress={addProfilePhoto}>
          {profilePhoto ? (
            <ProfilePhoto source={{ uri: profilePhoto }} />
          ) : (
            <DefaultProfilePhoto>
              <AntDesign name="plus" size={24} color={`${Colors.primaryDark}`} />
            </DefaultProfilePhoto>
          )}
        </ProfilePhotoContainer>

        <AuthContainer>
          {/* <AuthTitle medium>Username</AuthTitle> */}
          <AuthField
            placeholder="USERNAME"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={false}
            onChangeText={(username) => setUsername(username.trim())}
            value={username}
          />
        </AuthContainer>

        <AuthContainer>
          {/* <AuthTitle medium>Email</AuthTitle> */}
          <AuthField
            placeholder="EMAIL"
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(email) => setEmail(email.trim())}
            value={email}
          />
        </AuthContainer>

        <AuthContainer>
          {/* <AuthTitle medium>Password</AuthTitle> */}
          <AuthField
            placeholder="PASSWORD"
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry={passwordShown}
            onChangeText={(password) => setPassword(password.trim())}
            value={password}
          />
          <EyeIcon onPress={togglePasswordVisibility}>{eye}</EyeIcon>
        </AuthContainer>

        <SignUpContainer onPress={signUp} disabled={loading}>
          {loading ? (
            <Loading />
          ) : (
            <Text bold center color={`${Colors.white}`}>
              Sign Up
            </Text>
          )}
        </SignUpContainer>
      </Auth>

      <SignIn onPress={() => navigation.navigate("SignIn")}>
        <Text small center>
          Already have an account?
          <Text bold color={`${Colors.primaryDark}`}>
            {" "}
            Sign In
          </Text>
        </Text>
      </SignIn>

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
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Main = styled.View`
  margin-top: 100px;
`;

const ProfilePhotoContainer = styled.TouchableOpacity`
  background-color: ${Colors.paleWhite};
  width: 100px;
  height: 100px;
  border-radius: 100px;
  align-self: center;
  margin-top: 16px;
  overflow: hidden;
`;

const DefaultProfilePhoto = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ProfilePhoto = styled.Image`
  flex: 1;
`;

const Auth = styled.KeyboardAvoidingView`
  margin: 0px 30px;
`;

const AuthContainer = styled.View`
  margin-top: 34px;
`;

const AuthTitle = styled(Text)`
  color: ${Colors.lightBlack};
  text-transform: uppercase;
`;

const AuthField = styled.TextInput`
  border-bottom-color: ${Colors.primaryDark};
  border-bottom-width: 0.5px;
  height: 42px;
`;

const SignUpContainer = styled.TouchableOpacity`
  margin: 34px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.pink}
  border-radius: 6px;
`;

const TextView = styled.TouchableOpacity`
  marginBottom: 20px;
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

const SignIn = styled.TouchableOpacity`
  margin-top: 15px;
`;

const EyeIcon = styled.TouchableOpacity`
  position: absolute;
  top: 25%;
  right: 10px;
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

export default SignUpScreen;
