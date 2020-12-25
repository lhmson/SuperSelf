import React from "react";
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  Image,
  Icon,
  Scroll,
  Modal,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Colors from "../utils/Colors";
import Text from "./Text";

const ModalInfoChallenge = (props) => {
  return (
    <Modal style={{ flex: 1 }} animationType="slide" visible={props.visible}>
      <View style={{ flex: 70 }}>
        <ImageBackground
          source={{
            uri:
              "https://i.pinimg.com/564x/19/3c/b9/193cb9c8b42d0b845494b842fa19bb5a.jpg",
          }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            resizeMode: "cover",
          }}
        ></ImageBackground>
        <TitleSuperSelf hideModal={() => props.hideModal()}></TitleSuperSelf>
        <Text style={styles.h1}>WATER CHALLENGE</Text>
        <View style={{ width: 350, alignSelf: "center", marginTop: 10 }}>
          <Text style={styles.h3}>
            Nước là thành phần không thể tách rời với con người, nước giúp điều
            hòa cơ thể, tham gia vào các quá trình trao đổi chất, giúp hấp thu
            các chất dinh dưỡng tốt hơn
          </Text>
        </View>
      </View>

      <View style={{ flex: 30, marginTop: 20, alignSelf: "center" }}>
        <GoalInfo></GoalInfo>
        <TouchableOpacity
          style={styles.TitleButton}
          onPress={() => {
            props.hideModal();
          }}
        >
          <Text style={styles.h3}>Quan tâm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.TitleButton}
          onPress={() => {
            props.beginChallenge();
          }}
        >
          <Text style={styles.h3}>Tham gia vào Challenge</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const TitleSuperSelf = (props) => {
  return (
    <TouchableOpacity
      style={styles.TitleButton}
      onPress={() => {
        props.hideModal();
      }}
    >
      <Text style={styles.h3}>SUPER SELF CHALLENGE</Text>
    </TouchableOpacity>
  );
};

const GoalInfo = (props) => {
  return (
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            height: 20,
            width: 20,
            resizeMode: "contain",
            marginLeft: -20,
          }}
          source={{
            uri:
              "https://www.shareicon.net/data/128x128/2016/05/31/773530_flag_512x512.png",
          }}
        ></Image>
        <Text
          style={{
            marginLeft: 5,
            color: Colors.black,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Goal
        </Text>
      </View>

      <Text style={{ width: 340, alignContent: "center", alignSelf: "center" }}>
        Thử thách bạn sẽ là uống nước với bạn bè mỗi buổi sáng, chiều tối mỗi
        ngày 250ml trong 7 ngày
      </Text>
    </View>
  );
};
export default ModalInfoChallenge;

const styles = StyleSheet.create({
  Image: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: Colors.orange,
  },
  TitleButton: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: Colors.paleWhite,
    borderRadius: 40,
    height: 50,
    width: 250,
    alignSelf: "center",
  },
  h3: {
    color: Colors.black,
    fontSize: 16,
  },
  h1: {
    color: Colors.darkRed,
    fontSize: 25,
    alignSelf: "center",
    textAlign: "center",
  },
  h2: {
    color: Colors.primaryDark,
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
    alignContent: "center",
    width: 300,
  },
});
