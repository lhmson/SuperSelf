import React, { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  Share,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import tempData from "../utils/tempData";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  Octicons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import moment from "moment";
import Loading from "../components/Loading";
import ImageModal from "react-native-image-modal";
import ImageView from "react-native-image-viewing";
import SkeletonSample from "../components/SkeletonSample";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../context/UserContext";
import { UserFirebaseContext } from "../context/UserFirebaseContext";
import { PostContext } from "../context/PostContext";
import { PostFirebaseContext } from "../context/PostFirebaseContext";
import { StoryContext } from "../context/StoryContext";
import { StoryFirebaseContext } from "../context/StoryFirebaseContext";
import { FavoriteFirebaseContext } from "../context/FavoriteFirebaseContext";
import ProgressiveImage from "../components/ProgressiveImage";
import { Linking } from "react-native";
import { useRoute } from "@react-navigation/native";
import FooterList from "../components/FooterList";

const FooterImage = (props) => {
  return (
    <View style={styles.footer}>
      <Text medium color={`${Colors.white}`}>
        {props.item.post}
      </Text>
    </View>
  );
};

const NoPostRender = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text large style={{ lineHeight: Dimensions.get("screen").height / 2 }}>
        You have no saved items
      </Text>
    </View>
  );
};

const PostItem = ({ item, onDelete, navigation }) => {
  // console.log("favorite", listFavs);
  const [isLiked, setIsLiked] = useState(false); // get data from db there
  //   const [post, setPost] = useContext(PostContext);
  const postFirebase = useContext(PostFirebaseContext);
  const [user, setUser] = useContext(UserContext);
  const favoriteFirebase = useContext(FavoriteFirebaseContext);

  console.log("item ", item.id);

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

  const reportStory = () => {
    navigation.navigate("Report");
  };

  const images = [
    {
      uri: item.photoUrl,
    },
  ];
  const [imgVisible, setImgVisible] = useState(false);
  return (
    <PostContainer>
      <PostHeaderContainer>
        {/* <PostProfilePhoto source={{ uri: item.user.profilePhotoUrl }} /> */}
        <PostInfoContainer>
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

// let imagesOfAllPosts = [];

const Profile = ({ navigation, route }) => {
  const { item } = route.params;
  const renderPost = ({ item }) => {
    return (
      <PostItem item={item} navigation={navigation} onDelete={handleDelete} />
    );
  };
  const [user, setUser] = useContext(UserContext);
  const userFirebase = useContext(UserFirebaseContext);
  const [post, setPost] = useContext(PostContext);
  const postFirebase = useContext(PostFirebaseContext);
  const [story, setStory] = useContext(StoryContext);
  const storyFirebase = useContext(StoryFirebaseContext);
  // const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  // const [randItem, setRandItem] = useState();
  // const flatListRef = useRef();

  // const getDataPosts = async () => {
  //   if (
  //     list.length === 0 ||
  //     refresh === true ||
  //     post.currentlyUpdate === true
  //   ) {
  //     const listToShow = await postFirebase.getAllPosts();
  //     if (list.length === 0 || refresh === true) {
  //       listToShow.sort(function (a, b) {
  //         return Math.random() - 0.5;
  //       });
  //     }

  //     setList(listToShow);
  //     setRefresh(false);
  //     setPost({ ...post, currentlyUpdate: false });
  //     console.log("go");
  //   }
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  //   getDataPosts();
  //   console.log("refresh", refresh);
  // }, [refresh, post.currentlyUpdate]);
  const [postGalleryVisible, setPostGalleryVisible] = useState(false);
  const [imagesOfAllPosts, setImagesOfAllPosts] = useState([]);

  // setup favorite
  const [list, setList] = useState([]);
  const favoriteFirebase = useContext(FavoriteFirebaseContext);
  const getDataPosts = async () => {
    // if (listFavs.length === 0 || post.currentlyLikeOrUnlikePost === true) {
    if (
      story.currentlyDeleteStory === true ||
      story.currentlyPostStory === true ||
      list.length === 0
    ) {
      const favToShow = await storyFirebase.getStoryOfUser(item.user.userId);
      //   if (list.length === 0 || refresh === true) {
      favToShow.sort(function (a, b) {
        return Date.parse(b.postAt) - Date.parse(a.postAt);
      });
      //   }

      setList(favToShow);
      setImagesOfAllPosts(
        favToShow
          .map((x) => {
            return {
              uri: x.photoUrl,
            };
          })
          .filter((img) => img.uri !== null)
      );

      console.log("image of posts: ", imagesOfAllPosts);

      // set an item for display
      // setRandItem(favToShow[0]);

      setStory({
        ...story,
        currentlyPostStory: false,
        currentlyDeleteStory: false,
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    getDataPosts();
  }, [story.currentlyPostStory, story.currentlyDeleteStory]);

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
      <ScrollView>
        <View
          style={{
            //   width: Dimensions.get('screen').width,
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Avatar
            size="xlarge"
            rounded
            title="?"
            // onPress={() => chooseAvatar()}
            activeOpacity={0.7}
            source={
              item.user.profilePhotoUrl === "default"
                ? require("../utils/superself-icon.png")
                : { uri: item.user.profilePhotoUrl }
            }
          />
        </View>
        {/* <View style={styles.center}>
        <Text>This is the home screen</Text>
        <Button
          title="Go to Todo Screen"
          onPress={() => navigation.navigate("To do")}
        />
      </View> */}

        <TopicName>
          <Text condense title>
            {item.user.username}
          </Text>
        </TopicName>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: 16,
            marginTop: 10,
            marginRight: 16,
            marginBottom: 10,
          }}
        >
          <Text large bold>
            Posts ({list.length})
          </Text>
          <TouchableOpacity
            onPress={() => {
              setPostGalleryVisible(true);
            }}
          >
            <Text medium>See all photos</Text>
          </TouchableOpacity>
        </View>

        <FeedContainer>
          {loading ? (
            <SkeletonSample />
          ) : list.length === 0 ? (
            <NoPostRender />
          ) : (
            <Feed
              data={list ? list : []}
              renderItem={renderPost}
              keyExtractor={(item, index) => index.toString()}
              removeClippedSubviews={true} // Unmount components when outside of window
              initialNumToRender={2} // Reduce initial render amount
              maxToRenderPerBatch={1} // Reduce number in each render batch
              updateCellsBatchingPeriod={1200} // Increase time between renders
              windowSize={7} // Reduce the window size
              ListFooterComponent={() => (
                <FooterList title={"This is me, thank you for caring"} />
              )}
              showsVerticalScrollIndicator={false}
              // ref={flatListRef}
            />
          )}

          {/* <StatusBar barStyle="dark-content" /> */}
        </FeedContainer>
        <View style={styles.fixedView}>
          <TouchableOpacity
            style={{
              backgroundColor: `${Colors.blue}`,
              borderRadius: 50,
            }}
            onPress={() => {
              setRefresh(true);
            }}
          >
            <MaterialIcons name="refresh" size={36} color={`${Colors.black}`} />
          </TouchableOpacity>
        </View>
        <ImageView
          images={imagesOfAllPosts}
          imageIndex={0}
          animationType="fade"
          visible={postGalleryVisible}
          onRequestClose={() => setPostGalleryVisible(false)}
        />
      </ScrollView>
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

const FeedContainer = styled.ScrollView`
  flex: 1;
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
  margin: 0 10px;
`;

const Post = styled.View`
  margin: 5px 10px 0 10px;
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
  align-items: flex-end;
`;

const Feed = styled.FlatList`
  margin: 5px;
`;

const TopicName = styled.View`
  margin: 10px;
  ${"" /* background-color: ${Colors.white}; */}
  border-radius: 5px;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
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
  fixedView: {
    position: "absolute",
    right: 10,
    bottom: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  fixedView1: {
    position: "absolute",
    left: 10,
    bottom: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
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

export default Profile;
