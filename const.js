import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
export const Sizes = {
  base: 16,
  font: 14,
  radius: 6,
  padding: 25,

  // font sizes
  h1: 26,
  h2: 20,
  h3: 18,
  title: 18,
  header: 16,
  body: 14,
  caption: 12,
  fontFamily: 'AvenirLTStd-Book',
  ITEM_WIDTH: width * 0.3,
  ITEM_HEIGHT: height * 0.2,
  SPACING: 5,

  height,
  width,
};
