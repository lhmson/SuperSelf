import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
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
import { PostFirebaseContext } from "../context/PostFirebaseContext";
// import {StatusBar} from 'expo-status-bar';

const PostItem = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false); // get data from db there
  const toggleLike = () => {
    setIsLiked(!isLiked);
    // set favorite and push to db there
  };

  const readmore = () => {};

  const sharePost = () => {};

  const images = [
    {
      uri: item.photoUrl,
    },
  ];
  const [imgVisible, setImgVisible] = useState(false);

  // console.log(item.photoUrl);
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
          <Text tiny>Read more</Text>
          <MaterialIcons
            name="more"
            size={24}
            color={`${Colors.primaryDark}`}
          />
        </MoreOption>
      </PostHeaderContainer>
      <Post>
        <Text large>{item.postTitle}</Text>
        <Text></Text>
        <Text style={{ textAlign: "left", lineHeight: 20 }}>
          {item.post.substring(0, 200).replace("  ", "\n\n")}...
        </Text>
        <Text
          color={`${Colors.blue}`}
          style={{ marginTop: 10, lineHeight: 20 }}
        >
          Click Read more to continue
        </Text>
        {item.photoUrl && (
          <>
            <TouchableOpacity
              onPress={() => {
                setImgVisible(true);
              }}
            >
              <PostPhoto source={{ uri: item.photoUrl }} />
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
              {item.likes}
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
    return <PostItem item={item} />;
  };
  const [user, setUser] = useContext(UserContext);
  const userFirebase = useContext(UserFirebaseContext);
  const postFirebase = useContext(PostFirebaseContext);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const getDataPosts = async () => {
    if (list.length === 0 || refresh === true) {
      const listToShow = await postFirebase.getAllPosts();
      setList(listToShow);
      setRefresh(false);
      console.log("go");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    getDataPosts();
    console.log("refresh", refresh);
  }, [refresh]);

  // tempData.sort(function (a, b) {
  //   return Date.parse(b.postedAt) - Date.parse(a.postedAt);
  // });

  return (
    <Container>
      <SelfArea>
        <PostProfilePhoto
          source={
            user.profilePhotoUrl === "default"
              ? require("../utils/superself-icon.png")
              : { uri: user.profilePhotoUrl }
          }
        />
        {/* <Button title="Favorites" color={`${Colors.secondaryLight}`} onPress={() => {}} />
        <Button title="Post" color={`${Colors.secondaryLight}`} onPress={() => {}} />
        <Button title="What to do?" color={`${Colors.secondaryLight}`} onPress={() => {}} /> */}
        <SelfButton
          onPress={() => {
            navigation.navigate("Favorite");
          }}
        >
          <FontAwesome name="bookmark" size={24} color={`${Colors.primary}`} />
          <Text>Favorites</Text>
        </SelfButton>
        <SelfButton
          onPress={() => {
            navigation.navigate("To do");
          }}
        >
          <Octicons name="checklist" size={24} color={`${Colors.primary}`} />
          <Text>What to do?</Text>
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
          <Text>Story</Text>
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
            ListFooterComponent={Loading}
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
                categoryId: "2",
                categoryName: "abc",
                categoryPhotoUrl: "abc",
              },
              post: "abc",
              postTitle: "abc",
              photoUrl: "abc",
              likes: 0,
            };
            await postFirebase.createPost(postToAdd);
          }}
        >
          <MaterialIcons name="add" size={36} color={`${Colors.black}`} />
        </TouchableOpacity>
      </View>
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
});

export default Home;
