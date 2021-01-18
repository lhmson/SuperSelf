import React from "react";
import { View, Button, StyleSheet } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import tempData from "../utils/tempData";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import moment from "moment";
import Loading from "../components/Loading";
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
            <Text tiny color={`${Colors.lightBlack}`} margin="5px 0 0 0">
              {moment(item.postedAt).format("MMM Do YYYY")},{" "}
              {moment(item.postedAt).fromNow()}
            </Text>
          </PostInfoContainer>
          <Options>
            <Entypo
              name="dots-three-horizontal"
              size={24}
              color={`${Colors.primaryDark}`}
            />
          </Options>
        </PostHeaderContainer>
        <Post>
          <Text>{item.post}</Text>
          <PostPhoto source={{ uri: item.photoUrl }} />
          <PostDetails style={{ alignItems: "center" }}>
            <PostLikes>
              <Ionicons
                name="ios-heart-empty"
                size={24}
                color={`${Colors.secondary}`}
              />
              <Text small margin="0 0 0 6px">
                {item.likes}
              </Text>
            </PostLikes>
            <PostShare>
              <FontAwesome name="share" size={24} color={`${Colors.primary}`} />
              <Text small margin="0 0 0 6px">
                Share
              </Text>
            </PostShare>
          </PostDetails>
        </Post>
      </PostContainer>
    );
  };
  return (
    <Container>
      {/* <View style={styles.center}>
        <Text>This is the home screen</Text>
        <Button
          title="Go to Todo Screen"
          onPress={() => navigation.navigate("To do")}
        />
      </View> */}
      <FeedContainer>
        <Text large center>
          Mind's Feed
        </Text>
        <Feed
          data={tempData}
          renderItem={renderPost}
          keyExtractor={(item,index) => index.toString()}
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={2} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={3000} // Increase time between renders
          windowSize={7} // Reduce the window size
          ListFooterComponent={Loading}
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
  ${"" /* padding-bottom: 15%;
  background-color: ${Colors.skin}; */}
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
  ${"" /* margin-top: 20px; */}
`;

const PostPhoto = styled.Image`
  width: 100%;
  height: 240px;
  border-radius: 6px;
  margin: 15px 0;
  resize-mode: contain;
`;

const PostDetails = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const PostLikes = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
`;

const PostShare = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
`;

const StatusBar = styled.StatusBar``;

const Options = styled.TouchableOpacity`
  margin-right: 10px;
`;

const Feed = styled.FlatList`
  margin: 5px 0;
`;

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Home;
