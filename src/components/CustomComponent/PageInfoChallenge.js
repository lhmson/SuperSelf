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

const PageInfoChallenge = (props) => {
    const NameChallenge = "7 NGÀY UỐNG NƯỚC";
    var idRandom = Math.floor(Math.random() * BackGroundImage.length);
    const Description = "Thử thách uống nước đúng giờ, hợp lý trong 7 ngày";
    const NameElement = "Nguyên tố Nước";
    const ExistingElements = "Đã có 6 nguyên tố";
    const BuyCoins = "200$";
    const GetCoins = "900$";
    console.log("Fixed " + idRandom);
    return(
  <Block>
    <Image
      source={BackGroundImage[idRandom]}
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
            avatar=  "https://lh3.googleusercontent.com/fife/ABSRlIprBMqs_CbXLMbZljyYPI3oG0ekqYOXNM2QwdlWutmCG_PVlNxKmiSilRO42QHE7snCfLGbL_e0qhoszjiQp_ma1NZQkbZZeLepTg48GJD8K6hxiqqo0k85c7kO8FT5RIXrU2DTm9aqJQg3c-pwCCDIlj8yZy3Crl32Rl8F5xZuORjhxnNJCSHDnwutS7S8y-G1wqIiVsoPX5yprhaRQ3qlu2IVKmM1miJxOxI2XskB2s0WSH7AuuCWyYdH3TQKc0pub0rs0wQXC8B3wexQR3ueNcgej-cQyhCXsBcGj_0hTkBYZOCA0BC-CFDPftKQvnccz4QbsSbzzb84eDivAeGyGsotlSAHyM1T19fbLUz8-nhqLzhCTrBeJ8KqO-Ts1wrlog6WUB215XZh2t7-VUVZfQvfZaIbGpQ6Wv77aqiH5OxVSQDe3IF--Tj1jt7XGd2VLH-MRltdRLL9pPvB02fO6UMeorwW0ZCQg4BaIK8KIbV6tq2J8idh4kjQtxFzI43YbMv-nr0TnGey2repxzO-AQvzt2jAUWOdIFjU0VFWqHi_0KgC6EbwWif1hRt9EKDRNDJMRw4nYMDQveoHBAij2EvZjVhOOVhQnDKpj9gvLrTDO8ALDwBnIuJcnfPPb8u9SHEjUFokSxJv6j9Q6WDcyHqxgK8OX8foqeRHC31xMNTQb2K1cvrcuMNggO-ugYtXR55YuqyuHhZGI50ZLoD-y3MDwdILOA=w1263-h969-ft"
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
          <Text style={styles.text}>
            You should totally like check this out, ok? Why would you use another UI
            library when you have so many components written by Creative Tim and the
            whole React Native community. Galio was created by developers for
            developers. {"\n"} {"\n"}
            You should totally like check this out, ok? Why would you use another UI
            library when you have so many components written by Creative Tim and the
            whole React Native community. Galio was created by developers for
            developers. 
            {"\n"} {"\n"}
            You should totally like check this out, ok? Why would you use another UI
            library when you have so many components written by Creative Tim and the
            whole React Native community. Galio was created by developers for
            developers. 
          </Text>
          <Text style={styles.text}>
            {"A lot of Bacon. I'd really like to eat like a LOT of Bacon :(."}
          </Text>
        
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

export default PageInfoChallenge;
