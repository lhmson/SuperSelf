import React, { useContext } from "react";
import { Alert, StyleSheet, View } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const logOut = async () => {
    Alert.alert(
      "Confirm your action",
      "You wanna logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const loggedOut = await firebase.logOut();
            if (loggedOut) {
              setUser((state) => ({ ...state, isLoggedIn: false }));
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Container>
      <ProfilePhotoContainer>
        <ProfilePhoto
          source={
            user.profilePhotoUrl === "default"
              ? require("../utils/superself-icon.png")
              : { uri: user.profilePhotoUrl }
          }
        />
      </ProfilePhotoContainer>

      <Text medium bold margin="16px 0 32px 0">
        {user.username}
      </Text>

      <StatsContainer>
        <StatContainer>
          <Text large>21</Text>
          <Text small bold color={`${Colors.darkBlue}`}>
            Posts
          </Text>
        </StatContainer>

        <StatContainer>
          <Text large>850</Text>
          <Text small bold color={`${Colors.darkBlue}`}>
            Followers
          </Text>
        </StatContainer>

        <StatContainer>
          <Text large>24</Text>
          <Text small bold color={`${Colors.darkBlue}`}>
            Following
          </Text>
        </StatContainer>
      </StatsContainer>

      <Logout onPress={logOut}>
        <Text bold color={`${Colors.darkPurple}`}>
          Log out
        </Text>
      </Logout>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
  margin-top: 50px;
  flex: 1;
  padding-bottom: 50px;
`;

const ProfilePhotoContainer = styled.View`
  shadow-opacity: 0.5;
  shadow-radius: 30px;
  shadow-color: ${Colors.lightYellow};
`;

const ProfilePhoto = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 50px;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 32px;
  flex: 1;
`;

const StatContainer = styled.View`
  align-items: center;
  flex: 1;
`;

const Logout = styled.TouchableOpacity`
  background-color: ${Colors.paleWhite};
  padding: 10px;
  border-radius: 20px;
`;

export default Profile;
