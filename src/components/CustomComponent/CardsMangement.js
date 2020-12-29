import Carousel from 'react-native-snap-carousel';
import React, { Component } from 'react';
import Challenge_TempData from "../../utils/Challenge_TempData";
import {View, Text, Image,Dimensions} from "react-native";
import CardChallenge from "../CustomComponent/CardChallenge"
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { colors } from 'react-native-elements';
import {
    Block
  } from 'galio-framework';
const { width, height } = Dimensions.get('screen');
import ItemCardMangement from "../CustomComponent/ItemCardMangement";

export default class CardsMangement extends Component {


    _renderItem = ({item, index}) => {
        return (
            <ItemCardMangement challenge = {item}></ItemCardMangement>
        )
    }

    render () {
        return (
            <Block style = {{margin : 20, height : 300, width : 200}}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={Challenge_TempData}
              renderItem={this._renderItem}
              sliderWidth={200}
              itemWidth={300}
              loop = {true}
              layout = "tinder"
            />
            </Block>
        );
    }
}
