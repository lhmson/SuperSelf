import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Share,
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
  MaterialIcons,
} from "@expo/vector-icons";
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
import { FavoriteFirebaseContext } from "../context/FavoriteFirebaseContext";
import ProgressiveImage from "../components/ProgressiveImage";
import { Linking } from "react-native";
import FooterList from "../components/FooterList";
import { useRoute } from "@react-navigation/native";
// import {StatusBar} from 'expo-status-bar';

const PostItem = ({ item, navigation, listFavs }) => {
  // console.log("favorite", listFavs);
  const [isLiked, setIsLiked] = useState(false); // get data from db there
  const [post, setPost] = useContext(PostContext);
  const postFirebase = useContext(PostFirebaseContext);
  const [user, setUser] = useContext(UserContext);
  const favoriteFirebase = useContext(FavoriteFirebaseContext);

  const id = item.id;

  useEffect(() => {
    // console.log("list favs", listFavs);
    // const isLike = listFavs.indexOf(item.id) >= 0;
    const isLike = listFavs.findIndex((x) => x.id === item.id) >= 0;
    // console.log("is like:", isLike);
    setIsLiked(isLike);
  }, [listFavs]);

  const toggleLike = async () => {
    const like = !isLiked;
    setIsLiked(like);
    // console.log("after like", like);

    // set favorite and push to db there
    // await postFirebase.likePost(id, isLiked);
    // console.log("fav before liek or unlike", listFavs);
    // const listFavsIfLike =
    //   listFavs.indexOf(item.id) == -1 ? listFavs.concat(item.id) : listFavs;
    // console.log("list if like", listFavsIfLike);
    // const listFavsIfUnlike = listFavs.filter((x) => x.id !== item.id);
    // console.log("list if unlike", listFavsIfUnlike);
    const listToUpdate = like
      ? listFavs.concat(item)
      : listFavs.filter((x) => x.id !== item.id);
    // console.log("fav after liek or unlike", listToUpdate);
    const favsObj = { posts: listToUpdate };
    console.log("fav obj", favsObj);
    await favoriteFirebase.updateFavorites(user.uid, favsObj);
    setPost({ ...post, currentlyLikeOrUnlikePost: true });
  };

  const readmore = () => {
    navigation.navigate("Detail Post", { item: item });
  };

  const sharePost = async () => {
    try {
      Share.share(
        {
          ...Platform.select({
            ios: {
              message: `Read this post of ${
                item.category.categoryName
              } \n ${item.post.substring(0, 200).replace(/  /g, "\n\n")} More ${
                item.author.authorLink
              }`,
              url: item.photoUrl,
            },
            android: {
              message: item.photoUrl
                ? `Read this post of ${
                    item.category.categoryName
                  } \n ${item.post
                    .substring(0, 200)
                    .replace(/  /g, "\n\n")} More ${item.author.authorLink} ` +
                  item.photoUrl
                : `Read this post of ${
                    item.category.categoryName
                  } \n ${item.post
                    .substring(0, 200)
                    .replace(/  /g, "\n\n")} More ${item.author.authorLink} `,
            },
          }),
          title: "Post: " + item.postTitle,
        },
        {
          ...Platform.select({
            ios: {
              // iOS only:
              excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"],
            },
            android: {
              // Android only:
              dialogTitle: "Share : " + item.postTitle,
            },
          }),
        }
      );
    } catch (error) {
      alert(error.message);
    }
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
        <PostProfilePhoto source={{ uri: item.category.categoryPhotoUrl }} />
        <PostInfoContainer
          onPress={() => {
            navigation.navigate("SuperSelf Topic", { item: item });
          }}
        >
          <Text condense medium>
            {item.category.categoryName}
          </Text>
          {/* <Text tiny color={`${Colors.lightBlack}`} margin="5px 0 0 0">
            {moment(item.postedAt).format("MMM Do YYYY")},{" "}
            {moment(item.postedAt).fromNow()}
          </Text> */}
        </PostInfoContainer>
        <MoreOption onPress={() => readmore()}>
          <Text tiny>{item.post.split(" ").length} words</Text>
          <MaterialIcons
            name="more"
            size={24}
            color={`${Colors.primaryDark}`}
          />
        </MoreOption>
      </PostHeaderContainer>
      <Post>
        <Text large>{item.postTitle ? item.postTitle : ""}</Text>
        <TouchableOpacity
          onPress={() =>
            item.author.authorLink
              ? Linking.openURL(item.author.authorLink)
              : {}
          }
        >
          <Text small thin right style={{ lineHeight: 24 }}>
            by {item.author.authorName ? item.author.authorName : "SuperSelf"}
          </Text>
        </TouchableOpacity>

        <Text style={{ textAlign: "left", lineHeight: 20 }}>
          {item.post ? item.post.substring(0, 200).replace(/  /g, "\n\n") : ""}
          ...
        </Text>
        <TouchableOpacity
          onPress={() => {
            readmore();
          }}
        >
          <Text
            color={`${Colors.blue}`}
            style={{ marginTop: 10, lineHeight: 20 }}
          >
            Click here to continue
          </Text>
        </TouchableOpacity>

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
        <PostDetails style={{ alignItems: "center" }}>
          <PostLikes onPress={toggleLike}>
            <Ionicons
              name={isLiked ? "ios-heart" : "ios-heart-empty"}
              size={24}
              color={`${Colors.secondary}`}
            />
            <Text small margin="0 0 0 6px">
              {/* {item.likes} */}
              Like
            </Text>
          </PostLikes>
          <PostShare onPress={() => sharePost()}>
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

const Home = ({ navigation }) => {
  const renderPost = ({ item }) => {
    return <PostItem item={item} navigation={navigation} listFavs={listFavs} />;
  };
  const [user, setUser] = useContext(UserContext);
  const userFirebase = useContext(UserFirebaseContext);
  const [post, setPost] = useContext(PostContext);
  const postFirebase = useContext(PostFirebaseContext);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const getDataPosts = async () => {
    if (
      list.length === 0 ||
      refresh === true ||
      post.currentlyUpdate === true
    ) {
      const listToShow = await postFirebase.getAllPosts();
      if (list.length === 0 || refresh === true) {
        listToShow.sort(function (a, b) {
          return Math.random() - 0.5;
        });
      }

      setList(listToShow);
      setRefresh(false);
      setPost({ ...post, currentlyUpdate: false });
      console.log("go");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    getDataPosts();
    console.log("refresh", refresh);
  }, [refresh, post.currentlyUpdate]);

  // setup favorite
  const [listFavs, setListFavs] = useState([]);
  const favoriteFirebase = useContext(FavoriteFirebaseContext);
  const getDataFavs = async () => {
    // if (listFavs.length === 0 || post.currentlyLikeOrUnlikePost === true) {
    const favToShow = await favoriteFirebase.getFavoritePostsOfUser(user.uid);
    setListFavs(favToShow);
    setPost({ ...post, currentlyLikeOrUnlikePost: false });
    // }
  };

  useEffect(() => {
    getDataFavs();
  }, [refresh, post.currentlyLikeOrUnlikePost]);

  // tempData.sort(function (a, b) {
  //   return Date.parse(b.postedAt) - Date.parse(a.postedAt);
  // });

  return (
    <Container>
      <SelfArea>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("User Profile", {
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

        {/* <Button title="Favorites" color={`${Colors.secondaryLight}`} onPress={() => {}} />
        <Button title="Post" color={`${Colors.secondaryLight}`} onPress={() => {}} />
        <Button title="What to do?" color={`${Colors.secondaryLight}`} onPress={() => {}} /> */}
        <SelfButton
          onPress={() => {
            navigation.navigate("Favorite");
          }}
        >
          <FontAwesome name="bookmark" size={24} color={`${Colors.primary}`} />
          <Text bold>Favorites</Text>
        </SelfButton>
        <SelfButton
          onPress={() => {
            navigation.navigate("To do");
          }}
        >
          <Octicons name="checklist" size={24} color={`${Colors.primary}`} />
          <Text bold>What to do?</Text>
        </SelfButton>
        <SelfButton
          onPress={() => {
            navigation.navigate("Stories");
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

      {/* <View style={styles.center}>
        <Text>This is the home screen</Text>
        <Button
          title="Go to Todo Screen"
          onPress={() => navigation.navigate("To do")}
        />
      </View> */}

      <FeedContainer>
        {loading ? (
          <SkeletonSample />
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
              <FooterList title={"That is all for today"} />
            )}
            showsVerticalScrollIndicator={false}
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

      {user.username === "admin" ? (
        <>
          <View style={styles.fixedView2}>
            <TouchableOpacity
              style={{
                backgroundColor: `${Colors.blue}`,
                borderRadius: 50,
              }}
              onPress={() => {
                navigation.navigate("Push Notifications");
              }}
            >
              <MaterialIcons
                name="note-add"
                size={36}
                color={`${Colors.black}`}
              />
            </TouchableOpacity>
          </View>

          {/* remove later */}
          <View style={styles.fixedView1}>
            <TouchableOpacity
              style={{
                backgroundColor: `${Colors.blue}`,
                borderRadius: 50,
              }}
              onPress={async () => {
                const postToAdd = {
                  category: {
                    categoryId: "1",
                    categoryName: "Self Spirit",
                    categoryPhotoUrl: "https://firebasestorage.googleapis.com/v0/b/superselftest-d1ccf.appspot.com/o/categoriesPhotoUrl%2Fintrapersonal.png?alt=media&token=4f43ecd5-58bd-4aa9-bef1-0b715a7ca4c4",
                  },
                  post: "",
                  postTitle: "Food for thought",
                  photoUrl: "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.0-9/135569780_10158077037352371_7750953461896643801_n.png?_nc_cat=1&ccb=2&_nc_sid=730e14&_nc_ohc=jb5Wls-DnjEAX-X6vrj&_nc_ht=scontent.fsgn3-1.fna&oh=681f2390b7b306bb62421af39f860b63&oe=6032CA5A",
                  author: {
                    authorName: "",
                    authorLink: "",
                  },
                  likes: 0,
                };
                await postFirebase.createPost(postToAdd);
              }}
            >
              <MaterialIcons name="add" size={36} color={`${Colors.black}`} />
            </TouchableOpacity>
          </View>
        </>
      ) : null}
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

const PostInfoContainer = styled.TouchableOpacity`
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

const StatusBar = styled.StatusBar``;

const MoreOption = styled.TouchableOpacity`
  margin-right: 10px;
  align-items: flex-end;
`;

const Feed = styled.FlatList`
  margin: 5px 0;
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
  fixedView2: {
    position: "absolute",
    left: 90,
    bottom: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default Home;
