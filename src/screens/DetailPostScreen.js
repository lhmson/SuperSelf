import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  Linking,
  TouchableOpacity,
} from "react-native";
import ImageView from "react-native-image-viewing";
import ProgressiveImage from "../components/ProgressiveImage";
import Colors from "../utils/Colors";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  Octicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { UserContext } from "../context/UserContext";
import { UserFirebaseContext } from "../context/UserFirebaseContext";

import Constants from "expo-constants";

import Text from "../components/Text";

// Galio components
import { Button, Block, Card, Icon, NavBar } from "galio-framework";
import theme from "../theme";

const DetailPost = (props) => {
  const { item } = props.route.params;
  const [user, setUser] = useContext(UserContext);
  const userFirebase = useContext(UserFirebaseContext);

  const images = [
    {
      uri: item.photoUrl,
    },
  ];
  const [imgVisible, setImgVisible] = useState(false);

  return (
    <Block safe flex>
      <SelfArea>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("User Profile", {
              item: {
                user: {
                  profilePhotoUrl: user.profilePhotoUrl,
                  userId: user.uid,
                  username: user.username,
                },
              },
            });
          }}
        >
          <PostProfilePhoto
            source={
              user.profilePhotoUrl === "default"
                ? require("../utils/superself-icon.png")
                : { uri: user.profilePhotoUrl }
            }
          />
        </TouchableOpacity>

        <SelfButton
          onPress={() => {
            props.navigation.navigate("Favorite");
          }}
        >
          <FontAwesome name="bookmark" size={24} color={`${Colors.primary}`} />
          <Text bold>Favorites</Text>
        </SelfButton>
        <SelfButton
          onPress={() => {
            props.navigation.navigate("To do");
          }}
        >
          <Octicons name="checklist" size={24} color={`${Colors.primary}`} />
          <Text bold>What to do?</Text>
        </SelfButton>
        <SelfButton
          onPress={() => {
            props.navigation.navigate("Stories");
          }}
        >
          <MaterialIcons
            name="add-to-photos"
            size={24}
            color={`${Colors.primary}`}
          />
          <Text bold>Story</Text>
        </SelfButton>
        {/* <InputField /> */}
      </SelfArea>

      <ScrollView style={{ flex: 1 }}>
        <Block flex style={styles.news}>
          {item.photoUrl && (
            <>
              <TouchableOpacity
                onPress={() => {
                  setImgVisible(true);
                }}
              >
                <ProgressiveImage
                  defaultImgSrc={require("../utils/defaultimage.png")}
                  source={{ uri: item.photoUrl }}
                  style={{
                    width: "100%",
                    height: 240,
                    borderRadius: 6,
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <ImageView
                images={images}
                imageIndex={0}
                animationType="fade"
                visible={imgVisible}
                onRequestClose={() => setImgVisible(false)}
              />
            </>
          )}
          <Block style={styles.article}>
            <Text title>{item.postTitle}</Text>
            <TouchableOpacity
              onPress={() =>
                item.author.authorLink
                  ? Linking.openURL(item.author.authorLink)
                  : {}
              }
            >
              <Text medium thin right style={{ marginTop: 18, lineHeight: 24 }}>
                by{" "}
                {item.author.authorName ? item.author.authorName : "SuperSelf"}
              </Text>
            </TouchableOpacity>
            <Text></Text>
            <Text style={{ textAlign: "left", lineHeight: 24 }}>
              {item.post.replace(/  /g, "\n\n")}
            </Text>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

const PostProfilePhoto = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const SelfArea = styled.View`
  margin: 16px 16px 0 16px;
  background-color: ${Colors.white};
  border-radius: 5px;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SelfButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const styles = StyleSheet.create({
  article: {
    marginTop: theme.SIZES.BASE * 1.5,
    marginBottom: theme.SIZES.BASE * 2.25,
  },
  news: {
    marginTop: theme.SIZES.BASE / 2,
    paddingBottom: theme.SIZES.BASE / 2,
    justifyContent: "flex-start",
    paddingHorizontal: theme.SIZES.BASE,
  },
  text: {
    fontWeight: "400",
    fontSize: theme.SIZES.FONT * 0.875,
    lineHeight: theme.SIZES.BASE * 1.25,
    letterSpacing: 0.3,
    marginBottom: theme.SIZES.BASE,
  },
});

export default DetailPost;
