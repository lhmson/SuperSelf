import Carousel, { Pagination } from "react-native-snap-carousel";
import React, { Component, useState, useRef } from "react";
import { View, Dimensions } from "react-native";
import CardChallenge from "../CustomComponent/CardChallenge";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

const MyCarousel = (props) => {
  const dataChallenge = props.data;
  var _carousel;

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Information Challenge", item);
        }}
      >
        <View style={{ height: 300, borderRadius: 20 }}>
          <CardChallenge challenge={item}></CardChallenge>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ margin: 20, height: 300 }}>
      <Carousel
        ref={(c) => {
          _carousel = c;
        }}
        data={dataChallenge}
        renderItem={_renderItem}
        sliderWidth={500}
        itemWidth={500}
        loop={true}
        layout={"tinder"}
        layoutCardOffset={9}
      />
    </View>
  );
};

export default MyCarousel;
