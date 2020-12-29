import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Colors from "../utils/Colors";
import Text from "./Text";
import AlarmTime from "../utils/AlarmTime_TempData";
import { ScrollView } from "react-native-gesture-handler";
import Location from "../utils/Location_TempData";
import ThuocTinh from "../utils/ThuocTinh_TempData.js";
import {
  nextPageModal,
  backPageModal,
  resetPageModal,
} from "../redux/actions/ActionCreators";
import { connect } from "react-redux";

const uri_background =
  "https://i.pinimg.com/564x/e5/0f/aa/e50faa9333ca7505d268b9051203da74.jpg";
const uri_clock =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Alarm_Clock_Vector.svg/1200px-Alarm_Clock_Vector.svg.png";
const ModalCreateChallenge = (props) => {
  return (
    <Modal style={{ flex: 1 }} animationType="slide" visible={props.visible}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: uri_background }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            resizeMode: "stretch",
          }}
        ></ImageBackground>
        <View style={{ flexDirection: "row" }}>
          <BackButton
            completeChallenge={() => props.completeChallenge()}
            backPage={() => props.backPage()}
            numberPage={props.numberPage}
          ></BackButton>
          <TitleChallenge hideModal={() => props.displayModal()}></TitleChallenge>
          <NumberPages number={props.numberPage}></NumberPages>
        </View>
        <PageCreate
          resetPage={() => props.resetPage()}
          completeChallenge={() => props.completeChallenge()}
          NumberPages={props.numberPage}
          nextPage={() => {
            props.nextPage();
          }}
        ></PageCreate>
      </View>
    </Modal>
  );
};

const PageCreate = (props) => {
  if (props.NumberPages <= 1)
    return (
      <Page1
        nextPage={() => {
          props.nextPage();
        }}
      ></Page1>
    );
  if (props.NumberPages === 2)
    return (
      <Page2
        nextPage={() => {
          props.nextPage();
        }}
      ></Page2>
    );
  if (props.NumberPages === 3)
    return (
      <Page3
        nextPage={() => {
          props.nextPage();
        }}
      ></Page3>
    );
  if (props.NumberPages >= 4)
    return (
      <Page4
        completeChallenge={() => props.completeChallenge()}
        resetPage={() => props.resetPage()}
      ></Page4>
    );
};

const Page1 = (props) => {
  return (
    <ScrollView>
      <Text style={styles.h1}>THỜI GIAN</Text>

      <View
        style={{
          width: 350,
          alignSelf: "center",
          marginTop: 10,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* <Text style={{...styles.h2,marginLeft:-40}}>Hãy chọn các mốc thời gian trong ngày</Text> */}
        <Text style={{ ...styles.h3, marginTop: 20 }}>
          Theo nghiên cứu khoa học nước nên được uống thường xuyên cách nhau 2
          giờ đồng hồ, 2 cột mốc thời gian phải uống đó là 7:00 AM và 17:00 PM
          là tốt nhất
        </Text>
      </View>
      {/* Line header */}
      {/* <Image style={{resizeMode:"stretch", height:80, width:150, alignSelf:"center"}} 
     source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Alarm_Clock_Vector.svg/1280px-Alarm_Clock_Vector.svg.png"}}></Image> */}
      <HeaderClock></HeaderClock>
      <ListAlarm></ListAlarm>

      <TouchableOpacity
        onPress={() => {
          props.nextPage();
        }}
        style={{
          ...styles.TitleButton,
          width: 200,
          marginTop: 30,
          backgroundColor: Colors.orange,
        }}
      >
        <Text style={{ ...styles.h3, color: Colors.white }}>Xong</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Page2 = (props) => {
  return (
    <ScrollView>
      <Text style={styles.h1}>ĐỊA ĐIỂM</Text>

      <View
        style={{
          width: 350,
          alignSelf: "center",
          marginTop: 10,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Text style={{ ...styles.h3, marginTop: 20 }}>
          Uống nước thường được tập luyện và có nhiều nguồn nước sạch như: Nhà
          riêng, Chỗ làm của bạn, Quán nước , ... Bạn nên theo dõi giờ giấc đó
          bạn thường ở đâu để chọn địa điểm phù hợp.
        </Text>
      </View>
      <HeaderPos></HeaderPos>
      <ListLocation></ListLocation>

      <TouchableOpacity
        onPress={() => {
          props.nextPage();
        }}
        style={{
          ...styles.TitleButton,
          width: 200,
          marginTop: 30,
          backgroundColor: Colors.orange,
        }}
      >
        <Text style={{ ...styles.h3, color: Colors.white }}>Xong</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Page3 = (props) => {
  return (
    <ScrollView>
      <Text style={styles.h1}>THUỘC TÍNH</Text>

      <View
        style={{
          width: 350,
          alignSelf: "center",
          marginTop: 10,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Text style={{ ...styles.h3, marginTop: 20 }}>
          Challenge này sau khi hoàn thành bạn có thể nhận được một trong các
          thuộc tính cho World của bạn như sau {"\n"}
          Hãy chọn một trong số chúng
        </Text>
      </View>
      <HeaderHe></HeaderHe>

      <ListThuocTinh nextPage={() => props.nextPage()}></ListThuocTinh>
    </ScrollView>
  );
};

const Page4 = (props) => {
  return (
    <ScrollView>
      <Text style={styles.h1}>ĐIỀU KHOẢN</Text>

      <View
        style={{
          width: 350,
          alignSelf: "center",
          marginTop: 10,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Text style={{ ...styles.h3, marginTop: 20 }}>
          Bạn đã chọn thời gian, địa điểm cho Challenge thành công rồi! {"\n"}
          Tuy nhiên, để đảm bảo cho chất lượng phát triển bản thân của bạn,
          chúng tôi muốn bạn TUYÊN THỀ sẽ thành thật khi check việc đã hoàn
          thành trong challenge sắp tới.{"\n"}
          Vì mục tiêu bản thân! Bạn sẽ làm được thôi ^.^
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          props.completeChallenge();
          props.resetPage();
        }}
        style={{
          ...styles.TitleButton,
          width: 200,
          marginTop: 100,
          backgroundColor: Colors.orange,
        }}
      >
        <Text style={{ ...styles.h3, color: Colors.white }}>
          Tôi đồng ý, tiếp tục
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const TitleChallenge = (props) => {
  return (
    <TouchableOpacity
      style={styles.TitleButton}
      onPress={() => {
        props.hideModal();
      }}
    >
      <Text style={styles.h3}>WATER CHALLENGE</Text>
    </TouchableOpacity>
  );
};

const BackButton = (props) => {
  const checkBackPage = () => {
    if (props.numberPage === 1) props.completeChallenge();
    else props.backPage();
  };
  return (
    <TouchableOpacity
      onPress={() => checkBackPage()}
      style={{
        ...styles.TitleButton,
        marginLeft: 5,
        alignSelf: "flex-start",
        width: 50,
        color: props.color,
      }}
    >
      <Image
        style={{ width: 50, height: 50, alignSelf: "flex-start" }}
        source={{
          uri:
            "https://www.searchpng.com/wp-content/uploads/2019/02/Back-Arrow-Icon-PNG-715x715.png",
        }}
      ></Image>
    </TouchableOpacity>
  );
};

const NumberPages = (props) => {
  const numberpage = props.number + "/4";
  return (
    <TouchableOpacity
      style={{
        ...styles.TitleButton,
        width: 50,
        alignSelf: "flex-end",
        marginLeft: 30,
      }}
    >
      <Text style={styles.h3}>{numberpage}</Text>
    </TouchableOpacity>
  );
};

const HeaderClock = (props) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: 40,
        marginTop: 15,
      }}
    >
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
          Hẹn giờ
        </Text>
      </View>
    </View>
  );
};

const HeaderPos = (props) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: 40,
        marginTop: 15,
      }}
    >
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
          Hẹn địa điểm
        </Text>
      </View>
    </View>
  );
};

const HeaderHe = (props) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: 40,
        marginTop: 15,
      }}
    >
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
          Lựa chọn thuộc tính
        </Text>
      </View>
    </View>
  );
};
const ListAlarm = (props) => {
  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      style={{ alignContent: "flex-start" }}
      data={AlarmTime}
      renderItem={({ item }) => <CardTime Time={item.Time}></CardTime>}
    ></FlatList>
  );
};

const CardTime = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.TitleButton, width: 350, flexDirection: "row" }}
      onPress={() => {}}
    >
      <Image
        style={{ width: 80, height: 50, resizeMode: "stretch" }}
        source={{ uri: uri_clock }}
      ></Image>
      <Text style={styles.h3}>{props.Time}</Text>
    </TouchableOpacity>
  );
};

const ListLocation = (props) => {
  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      style={{ alignContent: "flex-start" }}
      data={Location}
      renderItem={({ item }) => <CardLocation pos={item.pos}></CardLocation>}
    ></FlatList>
  );
};

const CardLocation = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.TitleButton, width: 350, flexDirection: "row" }}
      onPress={() => {}}
    >
      <Text style={styles.h3}>{props.pos}</Text>
    </TouchableOpacity>
  );
};

const ListThuocTinh = (props) => {
  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      style={{ alignContent: "center", alignSelf: "center" }}
      data={ThuocTinh}
      numColumns={2}
      renderItem={({ item }) => (
        <CardThuocTinh
          nextPage={() => props.nextPage()}
          uri={item.uri}
        ></CardThuocTinh>
      )}
    ></FlatList>
  );
};

const CardThuocTinh = (props) => {
  return (
    <TouchableOpacity onPress={() => props.nextPage()}>
      <Image
        style={{ width: 180, height: 200, resizeMode: "cover", margin: 10 }}
        source={{ uri: props.uri }}
      ></Image>
    </TouchableOpacity>
  );
};

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
    width: 220,
    alignSelf: "center",
    marginLeft: 30,
    marginRight: 10,
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
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    alignContent: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    numberPage: state.modalCreateChallengeReducer.numberPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    nextPage: () => dispatch(nextPageModal()),
    backPage: () => dispatch(backPageModal()),
    resetPage: () => dispatch(resetPageModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalCreateChallenge);
