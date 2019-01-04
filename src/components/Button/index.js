/* @flow */
import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import I18n from 'react-native-i18n';

import { colors, withThemes } from 'Root/src/themes';

type Props = {
  text?: string,
  onPress?: Function,
  textCls?: string,
  border?: boolean,
  styleCls?: Object,
  textStyle?: Object,
  isActive: boolean
};

@withThemes
export default class extends PureComponent<Props> {
  props: Props;

  static defaultProps = {
    border: false,
    isActive: false
  };

  render() {
    const {
      text,
      onPress,
      textCls,
      border,
      styleCls,
      isActive,
      ...props
    } = this.props;

    const containerCls = [
      { 'ph-10 aic jcc pv-5 bdRadius-5': border },
      { 'p-10 bdRadius-5 aic jcc': !border },
      styleCls && styleCls
    ];
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        cls={containerCls}
        disabled={isActive}
        {...props}
      >
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 0.0 }}
          colors={[colors.newStartGradientNav, colors.newEndGradientNav]}
          cls={containerCls}
          // style={[border ? styles.border : styles.button, style]}
        >
          <Text
            cls={['ff-medium', { 'fs-12 white': !textCls }, textCls && textCls]}
          >
            {I18n.t(text)}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    // backgroundColor: platform.btnMarket,
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  border: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderRadius: 5
  }
});
