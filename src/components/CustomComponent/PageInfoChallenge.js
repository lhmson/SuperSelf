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
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import {
    SCLAlert,
    SCLAlertButton
  } from 'react-native-scl-alert'
import { View } from 'react-native';
import getURLAvatarElement from "../../utils/ElementURL_Data";
import {ChallengeFirebaseContext} from "../../context/ChallengeFirbaseContext";
import { UserContext } from "../../context/UserContext";
import { useIsFocused } from '@react-navigation/native';

const PageInfoChallenge = (props) => {
    const challenge = props.challenge;
    const NameChallenge = challenge.NameChallenge;
    var idRandom = Math.floor(Math.random() * BackGroundImage.length);
    const Description = challenge.Description;
    const NameElement = challenge.NameElement;
    const ExistingElements =  challenge.NumberElementWin + " elements";
    const BuyCoins = challenge.CoinsBuy + "$";
    const GetCoins = challenge.CoinsWin + "$";
    const Content = challenge.Content;
    const UrlBackGround = challenge.BackgroundURL;
    const challengeFirebase = useContext(ChallengeFirebaseContext);
    const [user, setUser] = useContext(UserContext);
    const [isJoined, setIsJoined] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
      if (!isFocused) return;
      const checkJoin = async () => {
          const temp = await challengeFirebase.checkJoinedChallenge(user.uid, challenge.id);
          console.log("\n kakaka " + temp);
          setIsJoined(temp); 
      }
      checkJoin();
    }, [isFocused]);
  
    return(
  <Block>
    <Image
      // source={BackGroundImage[idRandom]}
      source = {{uri : UrlBackGround}}
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
          <Text style={styles.text}>
            {Content}
          </Text>
          <Text style={styles.text}>
            Fighting!
          </Text>
        
          <View style={{height : 20}}></View>
          <SCLAlertButton theme="success" onPress={() => {if (!isJoined) props.navigation.navigate("Setup Challenge", challenge)}}>
            {!isJoined ? "I accept this Challenge!" : "Joined"}</SCLAlertButton>               
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
