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

const { statusBarHeight } = Constants;

// galio components
import {
  Block, Card, Text, Icon, NavBar,
} from 'galio-framework';
import theme from '../../theme';

const { width, height } = Dimensions.get('screen');

const PageInfoChallenge = (props) => {
    const NameChallenge = "7 NGÀY UỐNG NƯỚC";
    const bgImage = 'https://i.pinimg.com/564x/b5/e8/a0/b5e8a009eb4b32f8883fec19763c482a.jpg';
    const Description = "Thử thách uống nước đúng giờ, hợp lý trong 7 ngày";
    return(
  <Block>
    <Image
      source={require('../../utils/BackgroundInfoChallenge/Background5.jpg')}
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
            title="Christopher Moon"
            caption="139 minutes ago"
            avatar= {bgImage}
            location={(
              <Block row right>
                <Block row middle style={{ marginHorizontal: theme.SIZES.BASE }}>
                  <Icon name="eye" family="font-awesome" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 0.875} />
                  <Text
                    p
                    color={theme.COLORS.MUTED}
                    size={theme.SIZES.FONT * 0.875}
                    style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                  >
                    25.6k
                  </Text>
                </Block>
                <Block row middle>
                  <Icon name="heart" family="font-awesome" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 0.875} />
                  <Text
                    p
                    color={theme.COLORS.MUTED}
                    size={theme.SIZES.FONT * 0.875}
                    style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                  >
                    936
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
            developers.
          </Text>
          <Text style={styles.text}>
            {"A lot of Bacon. I'd really like to eat like a LOT of Bacon :(."}
          </Text>
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
