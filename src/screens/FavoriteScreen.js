import React, { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  Share,
  ScrollView,
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
import { useRoute } from "@react-navigation/native";
import FooterList from "../components/FooterList";

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

const PostItem = ({ item, navigation, listFavs }) => {
  // console.log("favorite", listFavs);
  const [isLiked, setIsLiked] = useState(false); // get data from db there
  const [post, setPost] = useContext(PostContext);
  const postFirebase = useContext(PostFirebaseContext);
  const [user, setUser] = useContext(UserContext);
  const favoriteFirebase = useContext(FavoriteFirebaseContext);

  const id = item.id;

  console.log("item ", item.id);

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

  const imagesOfPost = [
    {
      uri: item.photoUrl,
    },
  ];
  const [imgVisible, setImgVisible] = useState(false);
  return (
    <PostContainer>
      <PostHeaderContainer>
        <PostProfilePhoto source={{ uri: item.category.categoryPhotoUrl }} />
        <PostInfoContainer>
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
        <Text large>{item.postTitle}</Text>
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
              images={imagesOfPost}
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

// let imagesOfAllPosts = [];

const Favorites = ({ navigation }) => {
  const renderPost = ({ item }) => {
    return <PostItem item={item} navigation={navigation} listFavs={listFavs} />;
  };
  const [user, setUser] = useContext(UserContext);
  const userFirebase = useContext(UserFirebaseContext);
  const [post, setPost] = useContext(PostContext);
  const postFirebase = useContext(PostFirebaseContext);
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
  const [listFavs, setListFavs] = useState([]);
  const favoriteFirebase = useContext(FavoriteFirebaseContext);
  const getDataFavs = async () => {
    // if (listFavs.length === 0 || post.currentlyLikeOrUnlikePost === true) {
    const favToShow = await favoriteFirebase.getFavoritePostsOfUser(user.uid);
    if (listFavs.length === 0 || refresh === true) {
      favToShow.sort(function (a, b) {
        return Math.random() - 0.5;
      });
    }

    setListFavs(favToShow);
    setImagesOfAllPosts(
      favToShow
        .map((x) => {
          console.log(x.photoUrl);
          return {
            uri: x.photoUrl,
          };
        })
        .filter((img) => img.uri !== null)
    );

    console.log("image of posts: ", imagesOfAllPosts);

    // set an item for display
    // setRandItem(favToShow[0]);

    setPost({ ...post, currentlyLikeOrUnlikePost: false });
    // }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    getDataFavs();
  }, [refresh, post.currentlyLikeOrUnlikePost]);

  // const imagesOfAllPosts = [
  //   {
  //     uri: listFavs[0].photoUrl,
  //   },
  // ];

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
          Posts ({listFavs.length})
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
        ) : listFavs.length === 0 ? (
          <NoPostRender />
        ) : (
          <Feed
            data={listFavs ? listFavs : []}
            renderItem={renderPost}
            keyExtractor={(item, index) => index.toString()}
            removeClippedSubviews={true} // Unmount components when outside of window
            initialNumToRender={2} // Reduce initial render amount
            maxToRenderPerBatch={1} // Reduce number in each render batch
            updateCellsBatchingPeriod={1200} // Increase time between renders
            windowSize={7} // Reduce the window size
            ListFooterComponent={() => <FooterList title={"Explore more"} />}
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
  margin: 5px;
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
});

export default Favorites;
