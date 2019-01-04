import { StyleSheet } from 'react-native';
import { build, withTheme as T } from 'theme'; // eslint-disable-line

export const colors = {
  orange: '#F36F21',
  transparent: 'transparent',
  white: '#FFFFFF',
  darkGray: '#999999',
  colorIcon: '#758CA5',
  blue: '#489FDD',
  gray: '#353b48',
  red: '#FE4365',
  error: '#EA0029',
  black: '#37474F',
  blueLight: '#00b0ff',
  lightGray: '#d8d8d8',
  holder: 'grey',
  green: '#00B200',
  grey: '#484848',
  border: '#eeeeee',
  blur: '#D6F4FF',
  greenLight: '#64FFDA',
  greenLightBorder: '#1DE9B6',
  gradientBack: 'rgba(0,0,0,0.5)',
  gradientWhite: 'rgba(255,255,255,0.2)',
  newStartGradientNav: 'rgb(255,124,3)',
  newEndGradientNav: 'rgb(234,47,133)'
};

export const appStyleNoNavBar = {
  navBarHidden: true
};

export const fontFamilys = {
  regular: 'ViettelPay-Regular',
  medium: 'ViettelPay-Medium',
  bold: 'ViettelPay-Bold'
};

export const buildThemes = () => build({ colors, fontFamilys }, StyleSheet);
export const withThemes = T;
