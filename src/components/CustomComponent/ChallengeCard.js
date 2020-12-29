import Carousel from 'react-native-snap-carousel';
import React, { Component } from 'react';
import Challenge_TempData from "../../utils/Challenge_TempData";
import {View, Text, Image,Dimensions} from "react-native";
import CardChallenge from "../CustomComponent/CardChallenge"
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { colors } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Block } from 'galio-framework';

const { width, height } = Dimensions.get('screen');

const MyCarousel = (props) => {

    var _carousel;
    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress = {() => {props.navigation.navigate("InfoChallenge")}}>
            <View style = {{height : 300}}>
            <CardChallenge challenge = {item}></CardChallenge>
            </View>
            </TouchableOpacity>
        )
    }

        return (
            <View style = {{margin : 20, height : 300}}>
            <Carousel
              ref={(c) => { _carousel = c; }}
              data={Challenge_TempData}
              renderItem={_renderItem}
              sliderWidth={500}
              itemWidth={500}
              loop = {true}
              layout = "tinder"
            />
            </View>
        );
}

export default MyCarousel;