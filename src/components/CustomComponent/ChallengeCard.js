import Carousel from 'react-native-snap-carousel';
import React, { Component } from 'react';
import Challenge_TempData from "../../utils/Challenge_TempData";
import {View, Text, Image,Dimensions} from "react-native";
import CardChallenge from "../CustomComponent/CardChallenge"
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { colors } from 'react-native-elements';

const { width, height } = Dimensions.get('screen');

export default class MyCarousel extends Component {


    _renderItem = ({item, index}) => {
        return (
            <CardChallenge challenge = {item}></CardChallenge>
        )
    }

    render () {
        return (
            <View style = {{margin : 20, height : 300}}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={Challenge_TempData}
              renderItem={this._renderItem}
              sliderWidth={500}
              itemWidth={500}
              loop = {true}
              layout = "tinder"
            />
            </View>
        );
    }
}
