import React, { useContext, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState();
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

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
      alert("We neef permissions to get access to your camera library");
      return;
    }

    pickImage();
  };

  const signUp = async () => {
    setLoading(true);
    const user = { username, email, password, profilePhoto };

    try {
      const createdUser = await firebase.createUser(user);
      setUser({ ...createdUser, isLoggedIn: true });
    } catch (error) {
      console.log("Error when sign up", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
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
            <AntDesign name="plus" size={24} color={`${Colors.darkBlue}`} />
          </DefaultProfilePhoto>
        )}
      </ProfilePhotoContainer>

      <Auth>
        <AuthContainer>
          <AuthTitle medium>Username</AuthTitle>
          <AuthField
            autoCapitalize="none"
            autoCorect={false}
            autoFocus={true}
            onChangeText={(username) => setUsername(username.trim())}
            value={username}
          />
        </AuthContainer>
        <AuthContainer>
          <AuthTitle medium>Email</AuthTitle>
          <AuthField
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorect={false}
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
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password.trim())}
            value={password}
          />
        </AuthContainer>
      </Auth>

      <SignUpContainer onPress={signUp} disabled={loading}>
        {loading ? (
          <Loading />
        ) : (
          <Text medium bold center color={`${Colors.white}`}>
            Sign Up
          </Text>
        )}
      </SignUpContainer>

      <SignIn onPress={() => navigation.navigate("SignIn")}>
        <Text small center>
          Already have an account?
          <Text bold color={`${Colors.darkBlue}`}>
            {" "}
            Sign In
          </Text>
        </Text>
      </SignIn>

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

const ProfilePhotoContainer = styled.TouchableOpacity`
  background-color: ${Colors.paleWhite};
  width: 85px;
  height: 85px;
  border-radius: 40px;
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

const Auth = styled.View`
  margin: 14px 30px 30px;
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

const SignUpContainer = styled.TouchableOpacity`
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

const SignIn = styled.TouchableOpacity`
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

export default SignUpScreen;
