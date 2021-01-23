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
  Foundation,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";
import Loading from "../components/Loading";
import CheckBox from "@react-native-community/checkbox";
import ImageModal from "react-native-image-modal";
import ImageView from "react-native-image-viewing";
import SkeletonSample from "../components/SkeletonSample";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../context/UserContext";
import { UserFirebaseContext } from "../context/UserFirebaseContext";
import { TodoContext } from "../context/TodoContext";
import { TodoFirebaseContext } from "../context/TodoFirebaseContext";
import { FavoriteFirebaseContext } from "../context/FavoriteFirebaseContext";
import ProgressiveImage from "../components/ProgressiveImage";
import Swipeout from "react-native-swipeout";
import { Linking } from "react-native";
import { useRoute } from "@react-navigation/native";
import SearchBar from "react-native-dynamic-search-bar";
import Icon from "react-native-vector-icons/Feather";
import FooterList from "../components/FooterList";
// import {StatusBar} from 'expo-status-bar';

var swipeoutBtns = [
  {
    text: "Button",
  },
];

const TodoItem = ({ item, navigation, todoFirebase }) => {
  const [user, setUser] = useContext(UserContext);
  // const [toggleCheckBox, setToggleCheckBox] = useState(item.completed);
  const [todo, setTodo] = useContext(TodoContext);
  const checkItem = async (newValue) => {
    // setToggleCheckBox(newValue);
    const todoUpdate = { ...item, completed: !item.completed };
    await todoFirebase.updateTodo(user.uid, item.id, todoUpdate);
    setTodo({ ...todo, currentlyAddTodo: true });
    console.log("after tick", item.completed);
  };
  return (
    <PostContainer style={{ backgroundColor: item.color }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TodoIconPhoto source={{ uri: item.icon }} />
        <TodoInfoContainer
          onPress={() => {
            navigation.navigate("Detail Todo", { item: item });
          }}
        >
          <Text condense large>
            {item.title}
          </Text>
          {item.description ? (
            <Text small color={`${Colors.lightBlack}`} margin="5px 0 0 0">
              {item.description}
            </Text>
          ) : null}

          <Text small color={`${Colors.lightBlack}`} margin="5px 0 0 0">
            Due:{" "}
            {item.dueTime
              ? moment(item.dueTime).format("MMM Do YYYY hh:mm a")
              : "today"}
          </Text>
        </TodoInfoContainer>
        {/* <CheckBox
          value={toggleCheckBox}
          onValueChange={(newValue) => {
            checkItem(newValue);
          }}
        /> */}
        <TouchableOpacity
          onPress={() => {
            console.log("before tick", item.completed);
            checkItem();
          }}
        >
          <View>
            <AntDesign
              name={item.completed ? "checkcircle" : "checkcircleo"}
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>
      </View>
    </PostContainer>
  );
};

const Todo = ({ navigation }) => {
  const renderTodo = ({ item }) => {
    return (
      <TodoItem
        item={item}
        navigation={navigation}
        todoFirebase={todoFirebase}
      />
    );
  };
  const [user, setUser] = useContext(UserContext);
  const userFirebase = useContext(UserFirebaseContext);
  const [todo, setTodo] = useContext(TodoContext);
  const todoFirebase = useContext(TodoFirebaseContext);
  const [list, setList] = useState([]);
  const [listInProgress, setListInProgress] = useState([]);
  const [listComplete, setListComplete] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [arrayAll, setArrayAll] = useState([]);
  const [turnComplete, setTurnComplete] = useState(1);

  const getDataTodos = async () => {
    if (
      list.length === 0 ||
      refresh === true ||
      todo.currentlyAddTodo === true ||
      todo.currentlyDeleteTodo === true
    ) {
      console.log("delete todo", todo.currentlyDeleteTodo);
      const listToShow = await todoFirebase.getUserTodos(user.uid);
      // if (list.length === 0 || refresh === true) {
      listToShow.sort(function (a, b) {
        if (+a.completed - +b.completed === 0) {
          if (Date.parse(a.dueTime) - Date.parse(b.dueTime) === 0)
            return Date.parse(a.dueTime) - Date.parse(b.dueTime);
        }
        return +a.completed - +b.completed;
      });
      // }
      console.log(
        "list ",
        listToShow.map((x) => x.title)
      );

      setList(listToShow);
      setListInProgress(listToShow.filter((item) => !item.completed));
      setListComplete(listToShow.filter((item) => item.completed));
      setArrayAll(listToShow);
      setRefresh(false);
      setTodo({ ...todo, currentlyAddTodo: false, currentlyDeleteTodo: false });
      console.log("go todo");
    }
  };

  const filterItem = (text) => {
    setTurnComplete(1);
    const newData = arrayAll.filter((item) => {
      const itemData = `${item.title.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setList(newData);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    getDataTodos();
    console.log("refresh", refresh);
  }, [refresh, todo.currentlyAddTodo, todo.currentlyDeleteTodo]);

  return (
    <Container>
      <SelfArea>
        <SearchBar
          placeholder="Search here"
          // onPress={() => alert("onPress")}
          onChangeText={(text) => filterItem(text)}
          onClearPress={() => filterItem("")}
        />
        <SelfButton
          onPress={() => {
            navigation.navigate("Add Todo");
          }}
        >
          <Entypo
            name="circle-with-plus"
            size={24}
            color={`${Colors.primary}`}
          />
          {/* <Text>Add new todo</Text> */}
        </SelfButton>
      </SelfArea>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginLeft: 16,
          marginTop: 10,
          marginRight: 16,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor:
              turnComplete === 1 ? Colors.primary : Colors.paleWhite,
            padding: 10,
            borderRadius: 10,
            // opacity: 0.1,
          }}
          onPress={() => {
            setTurnComplete(1);
          }}
        >
          <Text
            bold
            medium
            color={
              turnComplete === 1 ? `${Colors.white}` : `${Colors.lightBlack}`
            }
          >
            All Items
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor:
              turnComplete === 2 ? Colors.primary : Colors.paleWhite,
            padding: 10,
            borderRadius: 10,
            // opacity: 0.1,
          }}
          onPress={() => {
            setTurnComplete(2);
          }}
        >
          <Text
            bold
            medium
            color={
              turnComplete === 2 ? `${Colors.white}` : `${Colors.lightBlack}`
            }
          >
            In Progress
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor:
              turnComplete === 3 ? Colors.primary : Colors.paleWhite,
            padding: 10,
            borderRadius: 10,
            // opacity: 0.1,
          }}
          onPress={() => {
            setTurnComplete(3);
          }}
        >
          <Text
            bold
            medium
            color={
              turnComplete === 3 ? `${Colors.white}` : `${Colors.lightBlack}`
            }
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <FeedContainer>
        {loading ? (
          <SkeletonSample />
        ) : (
          <>
            <Feed
              data={
                turnComplete === 1
                  ? list
                    ? list
                    : []
                  : turnComplete === 2
                  ? listInProgress
                    ? listInProgress
                    : []
                  : listComplete
                  ? listComplete
                  : []
              }
              renderItem={renderTodo}
              keyExtractor={(item, index) => index.toString()}
              removeClippedSubviews={true} // Unmount components when outside of window
              initialNumToRender={2} // Reduce initial render amount
              maxToRenderPerBatch={1} // Reduce number in each render batch
              updateCellsBatchingPeriod={1200} // Increase time between renders
              windowSize={7} // Reduce the window size
              ListFooterComponent={() => (
                <FooterList title={"Get your dream come true"} />
              )}
              showsVerticalScrollIndicator={false}
            />
          </>
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

const TodoIconPhoto = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const TodoInfoContainer = styled.TouchableOpacity`
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

export default Todo;
