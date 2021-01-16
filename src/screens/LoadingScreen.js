import React, { useContext, useEffect } from "react";
import { Image } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import LottieView from "lottie-react-native";
import Loading from "../components/Loading";
import { UserContext } from "../context/UserContext";
import { UserFirebaseContext } from "../context/UserFirebaseContext";

const LoadingScreen = () => {
  const [_, setUser] = useContext(UserContext);
  const firebase = useContext(UserFirebaseContext);
  useEffect(() => {
    setTimeout(async () => {
      const user = firebase.getCurrentUser();
      if (user) {
        const userInfo = await firebase.getUserInfo(user.uid);
        // console.log("USERINFO:"+userInfo);
        setUser({
          isLoggedIn: true,
          email: userInfo.email,
          uid: user.uid,
          username: userInfo.username,
          profilePhotoUrl: userInfo.profilePhotoUrl,
        });
      } else {
        setUser((state) => ({ ...state, isLoggedIn: false })); //hihi
      }
    }, 1500);
  }, []);
  return (
    <Container>
      <Image source={require("../utils/superself-logo.png")} />
      <Loading />
      <Text title medium color={`${Colors.paleWhite}`}>
        Enter the world of yours
      </Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.primaryLight};
`;

export default LoadingScreen;
