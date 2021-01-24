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
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { ChallengeFirebaseContext } from "../../context/ChallengeFirbaseContext";
import { UserContext } from "../../context/UserContext";
import {ChallengeContext} from "../../context/ChallengeContext";
import {GameFirebaseContext} from "../../context/GameFirebaseContext";

const transDatetoString = (date: Date) => {
    return date.getFullYear() + "-0" + (date.getMonth()+1) + "-" + date.getDate();
}

let DataMarkDates = {};

const PageDetailsChallenge = (props) => {
    const navigation = props.navigation;
    const challenge = props.challenge;
    if (challenge === undefined)
      return (<View></View>)

    const NameChallenge = challenge.NameChallenge;
    var idRandom = Math.floor(Math.random() * BackGroundImage.length);
    const Description = challenge.Description;
    const NameElement = challenge.NameElement;
    const ExistingElements =  challenge.NumberElementWin + " elements";
    const BuyCoins = challenge.CoinsBuy + "$";
    const GetCoins = challenge.CoinsWin + "$";
    const Content = challenge.Content;
    const UrlBackGround = challenge.BackgroundURL;
    let LimitColor = "#78E495";
    let NormalColor = "#78E495";
    let FinishColor = "#0A8270"
    
    const [percent, setPercent] = useState(challenge.percent);
    const [ListDayChallenge,setListDayChallenge] = useState(challenge.listDay);
    const [isReset, setIsReset] = useState(false);
    const challengeFirebase = useContext(ChallengeFirebaseContext);
    const [user, setUser] = useContext(UserContext);
    const [error, setError] = useState("");
    const [isModalError, setIsModalError] = useState(false);
    const [challengeContext, setChallengeContext] = useContext(ChallengeContext);
    const [isFinishChallenge, setIsFinishChallenge] = useState(false);

    const gameFirebase = useContext(GameFirebaseContext);

    let kindButton = "danger";
    let contentButton = "I'm loser!";

    if (challenge.percent == 1)
    {
      kindButton = "success";
      contentButton = "Take gift";
    }

    const [isModalConfirm, setIsModalConfirm] = useState(false);
    const [isModalGift, setIsModalGift] = useState(false);

    if (isFinishChallenge)
    {
        kindButton = "success";
        contentButton = "Take Gift";
    }

    const updateCalender = () => {
      let startDate = new Date(ListDayChallenge[0].date);
      let stringStartDate = transDatetoString(startDate);
      let endDate = new Date(ListDayChallenge[ListDayChallenge.length-2].date);
      let stringEndDate = transDatetoString(endDate);
      
      let initmarkedDates={
      [stringStartDate]: {startingDay: true, color: LimitColor, textColor:'white'},
      [stringEndDate]: {endingDay: true, color: LimitColor, endingDay: true,textColor: 'white'},
      }; 

      for (var i = 0; i<ListDayChallenge.length-1; i++)
      {
          let date = new Date(ListDayChallenge[i].date);
          let stringdate = transDatetoString(date);
          if (i == 0)
          {
            let color = LimitColor;
            if (ListDayChallenge[i].isFinished)
              color = FinishColor;
            initmarkedDates = {...initmarkedDates,[stringdate]: {startingDay: true, color: color, textColor:'white'}};
          }
          else 
          if (i == ListDayChallenge.length-2)
          {
            let color = LimitColor;
            if (ListDayChallenge[i].isFinished)
              color = FinishColor;
            initmarkedDates = {...initmarkedDates,[stringdate]: {endingDay: true, color: color, textColor:'white'}};
          }
          else
          {
            let color = NormalColor;
            if (ListDayChallenge[i].isFinished)
              color = FinishColor;
            initmarkedDates = {...initmarkedDates,[stringdate]: {selected: true, color: color, textColor:'white'}};
          }
      }
      DataMarkDates = JSON.parse(JSON.stringify(initmarkedDates))
    }

    useEffect(() => {
        updateCalender();
    });
    
    const calPercentFinish = (listDay) => {
        let numberDay = listDay.length-1;
        let numberFinishDay = 0;

        for (var i = 0; i<listDay.length-1; i++)
          if (listDay[i].isFinished)
              numberFinishDay ++;
        if (numberDay == numberFinishDay)
        {
          setIsFinishChallenge(true);
        }
        else 
        if (isFinishChallenge)
          setIsFinishChallenge(false);

        return numberFinishDay/ numberDay;
    }

    const checkDay = async (date) => {

        let isValid = false;
        for (var i = 0; i<ListDayChallenge.length-1; i++)
        {
            let datePicker =  new Date(ListDayChallenge[i].date);
            let newDatePicker = new Date(datePicker.getFullYear(),datePicker.getMonth(),datePicker.getDate());
            if (newDatePicker > (new Date()))
                continue;
            if (date == transDatetoString(datePicker))
            {
                isValid = true;
                let temp = ListDayChallenge;
                temp[i].isFinished = !temp[i].isFinished;

                let tempChallenge = challenge;
                tempChallenge.listDay = temp;

                challenge.percent = calPercentFinish(temp);

                await challengeFirebase.updateMyChallenge(user.uid, tempChallenge);

                setListDayChallenge(temp);
                updateCalender();
                setChallengeContext({...challengeContext, currentlyUpdateChallenge : true});
                setIsReset(!setIsReset);
                break;
            }  
        }  
        if (!isValid)
        {
            setError("Điểm danh không hợp lệ");
            setIsModalError(true);
        }
    }

    const onPressButton = () => {
        if (kindButton == "danger")
        {
            setIsModalConfirm(true);
        }
        if (kindButton == "success")
        {
            setIsModalGift(true);
        }
    } 

    const deleteChallenge = async () => {
        await challengeFirebase.deleteMyChallenge(user.uid, challenge);
        navigation.goBack(); 
        setChallengeContext({...challengeContext, currentlyDeleteChallenge : true});
    }
    
    const takegift = async () => {
        let coinsWin = challenge.CoinsWin;
        let ex = (challenge.listDay.length - 1) * 5;
        await gameFirebase.updateGameLevelCoins(user.uid, ex, coinsWin);
        await gameFirebase.updateGameElement(user.uid, challenge.NameElement, challenge.NumberElementWin);
    }

    updateCalender();
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
    
      {/* Alert take gift */}
      <SCLAlert
        theme="success"
        onRequestClose={() => {
          setIsModalGift(false);
        }}
        show={isModalGift}
        title="Quà tặng"
        subtitle = "Hãy nhận lấy phần thưởng của mình ngay nào!"
      >
        <View style={{ height: 20 }}></View>
        <SCLAlertButton
          theme="success"
          onRequestClose={() => {
            setIsModalGift(false);
          }}
          onPress={() => {
            deleteChallenge();
            takegift();
            setIsModalGift(false);
          }}
        >
            Nhận quà
        </SCLAlertButton>
      </SCLAlert>
      {/* Alert confirm */}
      <SCLAlert
        theme="warning"
        onRequestClose={() => {
          setIsModalConfirm(false);
        }}
        show={isModalConfirm}
        title="CONFIRM"
        subtitle = "Are you sure delete this challenge?"
      >
        <View style={{ height: 20 }}></View>
        <SCLAlertButton
          theme="success"
          onRequestClose={() => {
            setIsModalConfirm(false);
          }}
          onPress={() => {
            deleteChallenge();
            setIsModalConfirm(false);
          }}
        >
            Yes
        </SCLAlertButton>
        <SCLAlertButton
          theme="danger"
          onRequestClose={() => {
            setIsModalConfirm(false);
          }}
          onPress={() => {
            setIsModalConfirm(false);
          }}
        >
          Cancel
        </SCLAlertButton>
      </SCLAlert>
    {/* Alert Setup error */}
     <SCLAlert
        theme="danger"
        onRequestClose={() => {
          setIsModalError(false);
        }}
        show={isModalError}
        title="ERROR"
        subtitle = {error}
      >
        <View style={{ height: 20 }}></View>
        <SCLAlertButton
          theme="danger"
          onRequestClose={() => {
            setIsModalError(false);
          }}
          onPress={() => {
            setIsModalError(false);
          }}
        >
          Done
        </SCLAlertButton>
      </SCLAlert>

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
         onDayPress={(day) => {checkDay(day.dateString);
          challenge.listDay = ListDayChallenge;
          navigation.navigate("Details Challenge",challenge);}}  
        markedDates={DataMarkDates}
        markingType={'period'}
        enableSwipeMonths={true}
        />     

          <View style={{height : 30}}></View>
              <SCLAlertButton theme={kindButton} onPress={() => {onPressButton()}}>{contentButton}</SCLAlertButton>            
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

export default PageDetailsChallenge;
