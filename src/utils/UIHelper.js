import { Dimensions } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

export const makeHitSlop = size => ({
  top: size,
  left: size,
  bottom: size,
  right: size
});
