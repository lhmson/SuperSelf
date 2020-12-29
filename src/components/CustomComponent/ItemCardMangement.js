import React from 'react';
import {
  ScrollView, StyleSheet, Dimensions, Platform, TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Galio components
import {
  Card, Block, NavBar, Icon
} from 'galio-framework';
import theme from '../../theme';

const { width, height } = Dimensions.get('screen');

const ItemCardMangement = (props) => {
    const card = 
        {
          id: 6,
          image: props.challenge.Avatar,
          avatar: 'http://i.pravatar.cc/100',
          title: props.challenge.title,
          caption: props.challenge.numberJoiner + " người đã tham gia",
          full: true,
        };
  // console.log("\n Hello " + challenge.Avatar);
  // console.log(card);
  return (
    <Card
    key={`card-${card.image}`}
    flex
    borderless
    shadowColor={theme.COLORS.BLACK}
    titleColor={card.full ? theme.COLORS.WHITE : null}
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
    {card.full ? <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.8)']} style={styles.gradient} /> : null}
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
    backgroundColor: theme.COLORS.ICON,
    width: width/1.5,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 3,
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

export default ItemCardMangement;