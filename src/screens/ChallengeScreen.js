import React from "react";
import { View, StyleSheet, Button, FlatList, Image, Icon, Scroll, Touchable } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import Challenge_TempData from "../utils/Challenge_TempData"
import { render } from "react-dom";
import { ScrollView } from "react-native-gesture-handler";
import ModalInfoChallenge from "../components/ModalInfoChallenge";
import { connect } from "react-redux";
import { displayModal, hideModal } from "../redux/actions/ActionCreators";
import ModalCreateChallenge from "../components/ModalCreateChallenge"

const Challenge = (props) => {
  return (
    <View style={styles.center}>
      {/* <ModalInfoChallenge hideModal = {() => props.hideModal()} visible = {props.visible}>
      </ModalInfoChallenge> */}

      <ModalCreateChallenge hideModal = {() => props.hideModal()} visible = {props.visible}>
      </ModalCreateChallenge>

      <ScrollView>
      <Button 
        title="My Challenge"
        onPress={() => {
          // props.navigation.navigate("History"); 
        props.displayModal()}}
      />
      <HeaderList info = {{title:"Challenge Sự Kiện"}}></HeaderList>
      <ListChallenge></ListChallenge>

      <HeaderList info = {{title:"Challenge Thử Thách"}}></HeaderList>
      <ListChallenge></ListChallenge>

      <HeaderList info = {{title:"Challenge Nâng Cao"}}></HeaderList>
      <ListChallenge></ListChallenge>
      </ScrollView>
    </View>
  ); 
};

const ListChallenge = () => {
  return (
    <FlatList style={styles.Flat} horizontal = {true} 
    data={Challenge_TempData} renderItem={({item}) => <CardChallenge info={item}></CardChallenge>}>
    </FlatList>
  )
}

const CardChallenge = ({info}) => {
  return (
    <View style={styles.Card}>
      <Image source = {{uri : info.Avatar}} style={styles.ImageChallenge}> 
        
      </Image>
      <Text style={styles.Titile}>{info.title}</Text>

      <View style = {{flexDirection: "row", justifyContent: "center", alignItems:"center", marginLeft:15}}>
        <Image
        style={{height:30, width:30}}
        source={{uri: "https://www.vhv.rs/dpng/d/416-4162657_people-icon-green-hd-png-download.png"}}
       />
        <Text style={styles.InfoText}>{info.numberJoiner}</Text>

        <Image
        style={{height:30, width:30, marginLeft:5}}
        source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRGmbEBux0XlScrphrbMG6Xu8KFGvXDpmyV-w&usqp=CAU"}}
       />
        <Text style={styles.InfoText}>{info.Healths}</Text>

        <Image
        style={{height:30, width:30}}
        source={{uri: "https://www.pinclipart.com/picdir/middle/112-1122855_clash-royale-coins-png-image-royalty-free-clash.png"}}
       />
        <Text style={styles.InfoText}>{info.Coins}</Text>

      </View>
      <Text style={styles.InfoText}>{info.numberJoiner}</Text>
      <Text style={styles.InfoText}>{info.StartDate}</Text>
    </View>
  )
}

const HeaderList = ({info}) => {
  return (
    <View style={styles.Header}>
        <Image
        style={{height:70, width:70, marginLeft:10, marginBottom:10}}
        source={require("../utils/images/Crown.png")}
       />
      <Text style = {styles.TitileChallenge}>{info.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  Flat: {
    margin: 10,
  },

  Card: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    marginTop: 2,
    width: 200,
    height: 200,
  },
  ImageChallenge: {
    height: 150,
    width: 180,
    margin: 2,
  },

  Titile:{
    fontSize: 15,
    fontWeight: 'bold',
    height:20,
  },

  InfoText:{
    flex: 60,
    fontSize: 15,
    fontWeight: 'normal',
    height:20,
    alignContent:"center",
    alignSelf: "stretch"
  },
  Header: {
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems : "center",
    width: 400,
    height: 30,
    marginTop: 5,
    marginBottom: 0,
  },
  TitileChallenge:{
    fontSize:22,
    fontWeight: "bold",
    height:40,
    color :Colors.lightOrange,
    alignItems : "center",
    alignContent : "space-around",
  },
});

const url_IconJoiner = "https://ercc.compact.org/wp-content/uploads/sites/43/2018/08/People-Icon-CC-Red-Ombre.png"

const mapStateToProps = (state) => {
  console.log(state);
  return {
    visible : state.modalChallengeReducer.visible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayModal: () => dispatch(displayModal()),
    hideModal: () => dispatch(hideModal()),
  }
};


export default connect(mapStateToProps,
  mapDispatchToProps)
  (Challenge);