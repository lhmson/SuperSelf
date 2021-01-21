import React from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import Gallery from "react-native-image-gallery";

const Favorites = (props) => {
  return (
    <View style={styles.center}>
      {/* <Gallery
        style={{ flex: 1, backgroundColor: "black" }}
        images={[
          {
            source: require('../utils/superself-icon.png'),
            dimensions: { width: 150, height: 150 },
          },
          { source: { uri: "http://i.imgur.com/XP2BE7q.jpg" } },
          { source: { uri: "http://i.imgur.com/5nltiUd.jpg" } },
          { source: { uri: "http://i.imgur.com/6vOahbP.jpg" } },
          { source: { uri: "http://i.imgur.com/kj5VXtG.jpg" } },
        ]}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Favorites;
