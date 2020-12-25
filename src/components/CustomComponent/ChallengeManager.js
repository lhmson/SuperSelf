import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import Constants from 'expo-constants';

import BackGroundImage from "../../utils/DataBackGroundImage";
import ElementImages from "../../utils/ElementsData";

const { statusBarHeight } = Constants;

// galio components
import {
  Block, Card, Text, Icon, NavBar,
} from 'galio-framework';
import theme from '../../theme';

const { width, height } = Dimensions.get('screen');
import {
    SCLAlert,
    SCLAlertButton
  } from 'react-native-scl-alert'
import { View } from 'react-native';
import { colors } from 'react-native-elements';

const CardsMangement = (props) => {
    const Name = "Aaa";
    const Title = "aaa";
    const MyAvatar = "aaa";
    return (
        <View></View>
    );
}

const ChallengeManager = (props) => {
    const Name = "Sanh Phạm";
    const Title = "Danh hiệu Cố gắng không ngừng nghỉ";
    const MyAvatar = "https://i.pinimg.com/originals/11/df/2b/11df2bc889722dab6946142dc9c70151.gif";
    return(
  <Block>
    <Image
      source={ {uri :"https://i.pinimg.com/564x/2f/94/b7/2f94b7d5635cb0b0cee79dfbc3c5e639.jpg"}}
      resizeMode="cover"
      style={{
        width,
        height: height * 0.9,
      }}
    />

    <Block center style={{ marginTop: -600 }}>
      <Block flex style={styles.header}>

        <Block center>
          <Card
            borderless
            style={styles.stats}
            title={Name}
            caption={Title}
            avatar=  {MyAvatar}
            location={(
              <Block row right>              
              </Block>
            )}
          />
        </Block>

        <CardsMangement></CardsMangement>

        <ScrollView>
          <View style={{height : 20}}></View>
          <SCLAlertButton theme="success">I accept this Challenge!</SCLAlertButton>
          <View style={{height : 30}}></View>
        </ScrollView>
      </Block>
    </Block>
  </Block>
    )
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: theme.SIZES.BASE * 2,
    borderTopRightRadius: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE * 1.5,
    width : width -10,
  },
  navbar: {
    top: statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 9999,
    position: 'absolute',
  },
  stats: {
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 5,
    height: theme.SIZES.BASE * 4,
    marginVertical: theme.SIZES.BASE * 0.875,
  },
  title: {
    justifyContent: 'center',
    paddingLeft: theme.SIZES.BASE / 2,
  },
  avatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  middle: {
    justifyContent: 'center',
  },
  text: {
    fontSize: theme.SIZES.FONT * 0.875,
    lineHeight: theme.SIZES.FONT * 1.25,
  },
});

export default ChallengeManager;
