import React from 'react';
import {
  ScrollView, StyleSheet, Dimensions, Platform, TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../../utils/Colors"
// Galio components
import {
  Card, Block, NavBar, Icon
} from 'galio-framework';
import theme from '../../theme';
import getURLAvatarElement from "../../utils/ElementURL_Data"
const { width, height } = Dimensions.get('screen');

const CardChallenge = (props) => {
  const nameElement = props.challenge.NameElement;
    const card = 
        {
          image: props.challenge.BackgroundURL,
          avatar: getURLAvatarElement(nameElement),
          title: props.challenge.NameChallenge,
          caption: props.challenge.NumberJoiner + " supers joined",
          full: true,
        };
  return (
    <Card
    key={`card-${card.image}`}
    flex
    borderless
    shadowColor={theme.COLORS.BLACK}
    titleColor={card.full ? theme.COLORS.BLACK : null}
    style={styles.card}
    title={card.title}
    caption={card.caption}
    location={card.location}
    avatar={`${card.avatar}`}
    image={card.image}
    imageStyle={[card.padded ? styles.rounded : null]}
    imageBlockStyle={[
      card.padded ? { padding: theme.SIZES.BASE / 2 } : null,
      card.full ? null : styles.noRadius,
    ]}
    footerStyle={card.full ? styles.full : null}
  >
    {card.full ? <LinearGradient colors={['transparent', 'rgba(0,0,0, 0)']} style={styles.gradient} /> : null}
  </Card>
  );
}

const styles = StyleSheet.create({
  cards: {
    width,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2,
    color: Colors.black,
  },
  full: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  noRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  rounded: {
    borderRadius: theme.SIZES.BASE * 0.1875,
  },
  gradient: {
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    overflow: 'hidden',
    height : height/10,
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
  },
});

export default CardChallenge;