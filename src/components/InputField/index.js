import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  LayoutAnimation
} from 'react-native';
import I18n from 'react-native-i18n';

import Icon from 'Root/src/elements/Icon';
import { withThemes, colors } from 'Root/src/themes';
import images from 'Root/src/assets/images';
import ValidateRegex from 'Root/src/utils/ValidateRegex';

type Props = {
  input?: Object,
  label?: string,
  placeholder?: string,
  meta?: Object,
  onIconPress?: Function,
  onPress?: Function,
  multiline: boolean,
  secureTextEntry: boolean,
  keyboardType?: string,
  inputStyle?: Object,
  errorList?: Array,
  rightIconStyle?: Object,
  onChangeText?: Function,
  isPhoneContact: boolean,
  autoCorrect: boolean,
  maxLength?: number,
  returnKeyType?: string
  // valueFormat
};
@withThemes
export default class InputField extends React.PureComponent<Props> {
  props: Props;

  static defaultProps = {
    multiline: false,
    secureTextEntry: false,
    isPhoneContact: false,
    autoCorrect: false,
    maxLength: 10,
    returnKeyType: 'done',
    placeholder: 'enterYourInputHere'
  };

  constructor(props) {
    super(props);
    this.state = {
      secureEntry: props.secureTextEntry,
      isShowLabel: false
    };
  }

  onEyePress() {
    this.setState({
      secureEntry: !this.state.secureEntry
    });
  }

  _onChangeValue(text) {
    const { onChangeText, input } = this.props;

    if (input.name !== 'content' && input.name !== 'name') {
      text = text.replace(ValidateRegex.TRIM_SPACE, '').trim();
    }

    switch (input.name) {
      case 'phone':
        text = text.replace(ValidateRegex.ONLY_NUMBER, '');
        break;
      case 'money':
        text = text.replace(ValidateRegex.ONLY_NUMBER, '');
        text = text.replace(ValidateRegex.REMOVE_FIRST_ZERO, '');
        break;
      default:
        break;
    }
    if (onChangeText) {
      return onChangeText(text, input);
    }
    input.onChange(text);
  }

  componentWillReceiveProps(nextProps) {
    const {
      meta: { active }
    } = this.props;

    if (active !== nextProps.meta.active) {
      if (nextProps.meta.active) {
        this.setState({ isShowLabel: true });
        LayoutAnimation.easeInEaseOut();
      } else {
        this.setState({ isShowLabel: false });
        LayoutAnimation.easeInEaseOut();
      }
    }
  }

  render() {
    const {
      input,
      label,
      meta: { error, active, warning },
      onIconPress,
      // addon,
      onPress,
      styleInputWraper,
      multiline,
      secureTextEntry,
      // iconType,
      inputRef,
      keyboardType,
      inputStyle,
      // containerStyle,
      errorList,
      rightIconStyle,
      valueFormat,
      onChangeText,
      isPhoneContact,
      autoCorrect,
      maxLength,
      returnKeyType,
      placeholder,
      ...custom
    } = this.props;
    const { isShowLabel, secureEntry } = this.state;
    const icon = input && input.value ? 'md-close' : null;
    const iconName = typeof icon === 'function' ? icon(input, active) : icon;
    const iconEnabled = secureEntry ? '' : '-off';
    return (
      <View>
        {(isShowLabel && (
          <View>
            <Text cls="fs-14 blue">{I18n.t(label)}</Text>
          </View>
        )) ||
          null}
        <View
          pointerEvents={onPress && 'none'}
          cls="flx-row jcfs"
          style={[
            {
              borderColor: (active && 'orange') || colors.border,
              borderBottomWidth: 1,
              paddingRight: iconName ? 50 : 0
            },
            styleInputWraper && styleInputWraper
          ]}
          // style={iconName ? { width: '80%' } : { flexGrow: 1 }}
        >
          <TextInput
            ref={inputRef}
            {...input}
            {...custom}
            onChangeText={text => this._onChangeValue(text)}
            numberOfLines={1}
            value={valueFormat ? valueFormat(input.value) : input.value}
            placeholderTextColor={colors.darkGray}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={autoCorrect}
            maxLength={maxLength}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            multiline={multiline}
            placeholder={I18n.t(placeholder)}
            secureTextEntry={secureEntry}
            // onFocus={() => this.onDismiss(0)}
            // onBlur={() => this.onDismiss(1)}
            cls="fullWidth fs-14"
            style={[
              { textAlignVertical: 'top', paddingVertical: 5 },
              inputStyle
            ]}
          />
          <View cls="absolute right-0 bottom-5">
            <View cls="flx-row jcsb">
              {!!iconName && (
                <View cls={multiline ? 'aife pt-2' : 'aife jcc'}>
                  <Icon
                    onPress={() => onIconPress && onIconPress(input)}
                    name={iconName}
                    cls="fs-16 lightGray ph-5"
                    style={[rightIconStyle]}
                  />
                </View>
              )}
              {!!input.value && secureTextEntry && (
                <View cls="aife jcc ph-3">
                  <Icon
                    onPress={() => this.onEyePress()}
                    // android={`md-eye${iconEnabled}`}
                    name={`md-eye${iconEnabled}`}
                    cls="fs-16 lightGray"
                    style={[rightIconStyle]}
                  />
                </View>
              )}
              {(isPhoneContact && (
                <TouchableOpacity onPress={() => {}} cls="pl-5">
                  <Image cls="height-20 width-18" source={images.icContacts} />
                </TouchableOpacity>
              )) ||
                null}
              {!error && !errorList && !isPhoneContact && !!input.value ? (
                <Icon name="md-checkmark-circle" cls="fs-16 green pl-5" />
              ) : (!!error || !!errorList) &&
                !!input.value &&
                !isPhoneContact ? (
                <Icon name="md-alert" cls="fs-16 red" />
              ) : null}
            </View>
          </View>
        </View>

        {!!error && !errorList && !!input.value ? (
          <View cls="mt-2">
            {/* <Icon name="exclamation-circle" size={15} /> */}
            <Text cls="red fs-12">{I18n.t(error)}</Text>
          </View>
        ) : null}

        {!!errorList && !!input.value
          ? errorList.map((item, index) => {
              let bg = '';
              bg =
                error && error[index] && error[index].value === 1
                  ? 'red'
                  : 'green';
              return (
                <View key={index} cls={[`bg-${bg}`, 'mt-2', 'br-2', 'pa-1']}>
                  <Text cls="fs-12 red">{I18n.t(item.value)}</Text>
                </View>
              );
            })
          : null}
      </View>
    );
  }
}
