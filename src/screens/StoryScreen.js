import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  Share,
  Alert,
  Platform,
} from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import tempData from "../utils/tempData";
import {
  Foundation,
  FontAwesome,
  Ionicons,
  Octicons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";
import Loading from "../components/Loading";
import ImageModal from "react-native-image-modal";
import ImageView from "react-native-image-viewing";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../context/UserContext";
import { UserFirebaseContext } from "../context/UserFirebaseContext";
import { StoryContext } from "../context/StoryContext";
import { StoryFirebaseContext } from "../context/StoryFirebaseContext";

import { db, storage } from "../context/firebaseDB";
import FooterList from "../components/FooterList";
import SkeletonSample from "../components/SkeletonSample";
import ProgressiveImage from "../components/ProgressiveImage";

// import {StatusBar} from 'expo-status-bar';

const FooterImage = (props) => {
  return (
    <View style={styles.footer}>
      <Text medium color={`${Colors.white}`}>
        {props.item.post}
      </Text>
    </View>
  );
};

const StoryItem = ({ item, onDelete, navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const userFirebase = useContext(UserFirebaseContext);
  const [isLiked, setIsLiked] = useState(false); // get data from db there
  const toggleLike = () => {
    setIsLiked(!isLiked);
    // set favorite and push to db there
    // display counter, set and remove favorite
  };

  const reportStory = () => {
    navigation.navigate("Report");
  };

  const shareStory = async () => {
    try {
      Share.share(
        {
          ...Platform.select({
            ios: {
              message: `Read this from ${item.user.username} \n ${item.post}`,
              url: item.photoUrl,
            },
            android: {
              message: item.photoUrl
                ? `Read this from ${item.user.username} of SuperSelf \n${item.post} ` +
                  item.photoUrl
                : `Read this from ${item.user.username} of SuperSelf \n${item.post} `,
            },
          }),
          title: "This is a great story from Super Self",
        },
        {
          ...Platform.select({
            ios: {
              // iOS only:
              excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"],
            },
            android: {
              // Android only:
              dialogTitle: "Share : " + item.post,
            },
          }),
        }
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteStory = () => {
    onDelete(item.id);
  };

  const images = [
    {
      uri: item.photoUrl,
    },
  ];
  const [imgVisible, setImgVisible] = useState(false);
  console.log(item.id);

  // console.log(item.photoUrl);
  return (
    <PostContainer>
      <PostHeaderContainer>
        <PostProfilePhoto
          source={
            item.user.profilePhotoUrl === "default"
              ? require("../utils/superself-icon.png")
              : { uri: item.user.profilePhotoUrl }
          }
        />
        <PostInfoContainer>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("User Profile", { item: item });
            }}
          >
            <Text condense medium>
              {item.user.username}
            </Text>
          </TouchableOpacity>
          <Text tiny color={`${Colors.lightBlack}`} margin="5px 0 0 0">
            {moment(item.postAt).format("MMM Do YYYY h:mm:ss")},{" "}
            {moment(item.postAt).fromNow()}
          </Text>
        </PostInfoContainer>
        <MoreOption onPress={() => reportStory()}>
          <MaterialIcons
            name="report"
            size={24}
            color={`${Colors.primaryDark}`}
          />
        </MoreOption>
      </PostHeaderContainer>
      <Post>
        <Text style={{ lineHeight: 20 }}>{item.post}</Text>
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
              {/* <PostPhoto source={{ uri: item.photoUrl }} /> */}
            </TouchableOpacity>
            <ImageView
              images={images}
              imageIndex={0}
              animationType="fade"
              visible={imgVisible}
              onRequestClose={() => setImgVisible(false)}
              FooterComponent={(currentImg) => <FooterImage item={item} />}
            />
          </>
        )}
        <PostDetails style={{ alignItems: "center" }}>
          {/* <PostLikes onPress={toggleLike}>
            <Ionicons
              name={isLiked ? "ios-heart" : "ios-heart-empty"}
              size={24}
              color={`${Colors.secondary}`}
            />
            <Text small margin="0 0 0 6px">
              {item.likes}
            </Text>
          </PostLikes> */}
          <PostMessage onPress={() => navigation.navigate("Message")}>
            <AntDesign name="message1" size={24} color={`${Colors.primary}`} />
            <Text small margin="0 0 0 6px">
              Message
            </Text>
          </PostMessage>
          <PostShare onPress={() => shareStory()}>
            <FontAwesome name="share" size={24} color={`${Colors.primary}`} />
            <Text small margin="0 0 0 6px">
              Share
            </Text>
          </PostShare>
          {user.uid === item.user.userId ? (
            <PostDelete onPress={() => deleteStory()}>
              <FontAwesome
                name="trash"
                size={24}
                color={`${Colors.secondary}`}
              />
              <Text small margin="0 0 0 6px">
                Delete
              </Text>
            </PostDelete>
          ) : null}
        </PostDetails>
      </Post>
    </PostContainer>
  );
};

const Stories = ({ navigation }) => {
  const renderStory = ({ item }) => {
    return (
      <StoryItem item={item} onDelete={handleDelete} navigation={navigation} />
    );
  };
  const storyFirebase = useContext(StoryFirebaseContext);
  const [story, setStory] = useContext(StoryContext);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDataStories = async () => {
    if (
      story.currentlyDeleteStory === true ||
      story.currentlyPostStory === true ||
      list.length === 0
    ) {
      console.log(story.currentlyDeleteStory);
      const listToShow = await storyFirebase.getAllStories();
      listToShow.sort(function (a, b) {
        return Date.parse(b.postAt) - Date.parse(a.postAt);
      });
      setList(listToShow);
      setStory({
        ...story,
        currentlyPostStory: false,
        currentlyDeleteStory: false,
      });
      // setStory({ ...story, currentlyDeleteStory: false });
    }
  };

  useEffect(() => {
    getDataStories();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [story.currentlyPostStory, story.currentlyDeleteStory]);

  // list.sort(function (a, b) {
  //   return Date.parse(b.postAt) - Date.parse(a.postAt);
  // });

  const handleDelete = (storyId) => {
    Alert.alert(
      "Delete story",
      "Are you sure to do this?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed!"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: async () => {
            await storyFirebase.deleteOneStory(storyId);
            setStory({ ...story, currentlyDeleteStory: true });
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <Container>
      <SelfArea>
        <SelfButton
          onPress={() => {
            navigation.navigate("Post Story");
          }}
        >
          <Foundation name="folder-add" size={24} color={`${Colors.primary}`} />
          <Text bold>Add your own story</Text>
        </SelfButton>
      </SelfArea>

      <FeedContainer>
        {loading ? (
          <SkeletonSample />
        ) : (
          <Feed
            data={list ? list : []}
            renderItem={renderStory}
            keyExtractor={(item, index) => index.toString()}
            removeClippedSubviews={true} // Unmount components when outside of window
            initialNumToRender={2} // Reduce initial render amount
            maxToRenderPerBatch={1} // Reduce number in each render batch
            updateCellsBatchingPeriod={1200} // Increase time between renders
            windowSize={7} // Reduce the window size
            ListFooterComponent={() => (
              <FooterList title={"Discover the world now"} />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}

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
  ${"" /* padding-top: 25px; */}
  padding-bottom: 50px;
`;

const FeedContainer = styled.View`
  ${"" /* padding-bottom: 15%;
  background-color: ${Colors.skin}; */}
`;

const PostContainer = styled.View`
  margin: 16px 16px 0px 16px;
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
  margin: 10px 10px 0 10px;
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
  padding-top: 10px;
  margin-top: 10px;
  border-top-color: ${Colors.lightBlack};
  border-top-width: 0.5px;
  ${"" /* border-bottom-color: ${Colors.black};
  border-bottom-width: 1px; */}
`;

const PostLikes = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
`;

const PostShare = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
`;

const PostMessage = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
`;

const PostDelete = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
`;

const StatusBar = styled.StatusBar``;

const MoreOption = styled.TouchableOpacity`
  margin-right: 10px;
`;

const Feed = styled.FlatList`
  margin: 5px 0;
`;

const SelfArea = styled.View`
  margin: 16px 16px 0 16px;
  background-color: ${Colors.white};
  border-radius: 5px;
  padding: 10px;
  ${"" /* flex-direction: row;
  justify-content: space-between; */}
  align-items: center;
`;

const SelfButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  footer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: Colors.paleWhite,
    // paddingHorizontal: 10,
    paddingVertical: 50,
  },
});

export default Stories;
