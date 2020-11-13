import React from "react";
import { View, StyleSheet, Button, FlatList, Image, Icon, Scroll, Modal } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import Challenge_TempData from "../utils/Challenge_TempData"
import { render } from "react-dom";
import { colors } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

const ModalInfoChallenge = (props) => {
    console.log(props.visible)
    return(
        <Modal animationType="slide" visible={props.visible}>
            <Text>{props.info}</Text>
            <Button onPress = {()=>{props.hideModal(); console.log("aa")}} title="Thoát">
                
          </Button>
        </Modal>
    );
}

export default ModalInfoChallenge;