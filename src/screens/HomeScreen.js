import React from "react";
import { View, Button, StyleSheet } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import tempData from "../utils/tempData";
import { Entypo, Ionicons } from "@expo/vector-icons";
// import {StatusBar} from 'expo-status-bar';

const Home = ({ navigation }) => {
  const renderPost = ({ item }) => {
    console.log(item.photoUrl);
    return (
      <PostContainer>
        <PostHeaderContainer>
          <PostProfilePhoto source={{ uri: item.user.profilePhotoUrl }} />
          <PostInfoContainer>
            <Text medium>{item.user.username}</Text>
            <Text tiny color={`${Colors.smokeWhite}`} margin="5px 0 0 0">
              {item.postedAt}
            </Text>
          </PostInfoContainer>
          <Options>
            <Entypo
              name="dots-three-horizontal"
              size={24}
              color={`${Colors.lightBlue}`}
            />
          </Options>
        </PostHeaderContainer>
        <Post>
          <Text>{item.post}</Text>
          <PostPhoto source={{ uri: item.photoUrl }} />
          <PostDetails>
            <PostLikes>
              <Ionicons
                name="ios-heart-empty"
                size={24}
                color={`${Colors.lightRed}`}
              />
              <Text small margin="0 0 0 6px">
                {item.likes}
              </Text>
            </PostLikes>
            <PostComments>
              <Ionicons
                name="ios-chatboxes"
                size={24}
                color={`${Colors.lightPurple}`}
              />
              <Text small margin="0 0 0 6px">
                {item.comments}
              </Text>
            </PostComments>
          </PostDetails>
        </Post>
      </PostContainer>
    );
  };
  return (
    <Container>
      <View style={styles.center}>
        <Text>This is the home screen</Text>
        <Button
          title="Go to Todo Screen"
          onPress={() => navigation.navigate("Todo")}
        />
      </View>
      <FeedContainer>
        <Text title center>
          Mind's Feed
        </Text>
        <Feed
          data={tempData}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
        />
        {/* <StatusBar barStyle="dark-content" /> */}
      </FeedContainer>
    </Container>
  );
  //   <View style={styles.center}>
  //     {/* <StatusBar translucent backgroundColor="transparent" /> */}
  //     <Text>This is the home screen</Text>
  //     <Button
  //       title="Go to Todo Screen"
  //       onPress={() => navigation.navigate("Todo")}
  //     />
  //   </View>
  // );
};

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.paleWhite};
  padding-top: 25px;
  padding-bottom: 50px;
`;

const FeedContainer = styled.View`
  padding-bottom: 15%;
  ${"" /* background-color: ${Colors.lightOrange}; */}
`;

const PostContainer = styled.View`
  margin: 16px 16px 0 16px;
  background-color: ${Colors.white};
  border-radius: 5px;
  padding: 10px;
`;

const PostHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PostProfilePhoto = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const PostInfoContainer = styled.View`
  flex: 1;
  margin: 0 15px;
`;

const Post = styled.View`
  margin-top: 20px;
`;

const PostPhoto = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 6px;
  margin: 15px 0;
`;

const PostDetails = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const PostLikes = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const PostComments = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const StatusBar = styled.StatusBar``;

const Options = styled.View``;

const Feed = styled.FlatList`
  margin: 10px 0;
`;

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Home;
