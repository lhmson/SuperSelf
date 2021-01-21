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
import getURLAvatarElement from "../../utils/ElementURL_Data";

import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import AppColors from "../../utils/Colors"

const PageDetailsChallenge = (props) => {
    const challenge = props.challenge;
    const NameChallenge = challenge.NameChallenge;
    var idRandom = Math.floor(Math.random() * BackGroundImage.length);
    const Description = challenge.Description;
    const NameElement = challenge.NameElement;
    const ExistingElements =  challenge.NumberElementWin + " nguyên tố";
    const BuyCoins = challenge.CoinsBuy + "$";
    const GetCoins = challenge.CoinsWin + "$";
    const Content = challenge.Content;
    const UrlBackGround = challenge.BackgroundURL;

    let LimitColor = "#5550f2";
    let FinishColor = "#0A8270";
    let FailColor = "#E90000";
    let AllFinishColor = "#ffea00";
    return(
  <Block>
    <Image
      // source={BackGroundImage[idRandom]}
      source={{uri : UrlBackGround}}
      resizeMode="cover"
      style={{
        width,
        height: height * 0.55,
      }}
    />

    <Block center style={{ marginTop: -theme.SIZES.BASE * 2 }}>
      <Block flex style={styles.header}>
        <Block>
          <Text size={theme.SIZES.BASE * 1.875}>{NameChallenge}</Text>
          <Text muted t size={theme.SIZES.BASE * 0.875} style={{ marginTop: theme.SIZES.BASE, fontWeight: '500' }}>
            {Description}
          </Text>
        </Block>

        <Block center>
          <Card
            borderless
            style={styles.stats}
            title={NameElement}
            caption={ExistingElements}
            avatar= {getURLAvatarElement(challenge.NameElement)}
            location={(
              <Block row right>
                <Block row middle style={{ marginHorizontal: theme.SIZES.BASE }}>
                  <Icon name="shopping-cart" family="font-awesome" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 0.875} />
                  <Text
                    p
                    color={theme.COLORS.MUTED}
                    size={theme.SIZES.FONT * 0.875}
                    style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                  >
                    {BuyCoins}
                  </Text>
                </Block>
                <Block row middle>
                  <Icon name="dollar" family="font-awesome" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 0.875} />
                  <Text
                    p
                    color={theme.COLORS.MUTED}
                    size={theme.SIZES.FONT * 0.875}
                    style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                  >
                    {GetCoins}
                  </Text>
                </Block>
              </Block>
            )}
          />
        </Block>
        <ScrollView>
         
        <Calendar
         onDayPress={(day) => {console.log('selected day', day)}}
        // Collection of dates that have to be colored in a special way. Default = {}
        markedDates={{
        '2021-01-18': {startingDay: true, color: LimitColor, textColor:'white'},
        '2021-01-19': {startingDay: true, color: FinishColor, endingDay: true,textColor: 'white'},
        '2021-01-20': {startingDay: true, color: FailColor, endingDay: true,textColor: 'white'},
        '2021-01-22': {selected: true, endingDay: true, color: LimitColor, textColor: 'white'},
        }}
  // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
  markingType={'period'}
  enableSwipeMonths={true}
/>

          
                
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
    width,
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
    width: width - theme.SIZES.BASE * 2,
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

export default PageDetailsChallenge;
