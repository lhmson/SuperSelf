import React, { useContext, useEffect } from "react";
import { Image } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import LottieView from "lottie-react-native";
import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

const LoadingScreen = () => {
  const [_, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  useEffect(() => {
    setTimeout(async () => {
      const user = firebase.getCurrentUser();
      if (user) {
        const userInfo = await firebase.getUserInfo(user.uid);
        console.log(userInfo);
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
      <LottieView
        source={require("../utils/lottie/loading/142-loading-animation.json")}
        autoPlay={true}
        loop={true}
        //imageAssetsFolder={"../../assets/lottie/loading"}
        style={{
          width: "100%",
        }}
      />
      <Text title medium color={`${Colors.lightBlack}`}>
        Enter the world of yours
      </Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.lightBlue};
`;

export default LoadingScreen;
