import { Platform, Dimensions, StatusBar } from 'react-native';

const platform = Platform.OS;
const { height, width } = Dimensions.get('window');

export const isIOS = platform === 'ios';

// Suport resolution new iphone X and iphone XS
export const isIphoneX = platform === 'ios' && height === 812 && width === 375;

// Suport resolution new iphone XR and iphone XSMax
export const isIphoneXSMax =
  platform === 'ios' && height === 896 && width === 414;

// space of bottom SafeAreaView
export const BOTTOM_SPACE = isIphoneX || isIphoneXSMax ? 34 : 0;

// if is IphoneX , XS, XR, XSMax statusbar= 20 + 24(top space SafeView)
export const STATUS_BAR_HEIGHT =
  platform === 'android'
    ? StatusBar.currentHeight // if statusbar set translucent use status barHeight else 0
    : isIphoneX || isIphoneXSMax
      ? 44
      : 20;
