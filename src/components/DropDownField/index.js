/* @flow */
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  PixelRatio,
  FlatList,
  Keyboard,
  Text
} from 'react-native';
import Modal from 'react-native-modal';
import _ from 'lodash';
import I18n from 'react-native-i18n';

import Icon from 'Root/src/elements/Icon';
import { withThemes, colors } from 'Root/src/themes';

type Props = {
  // input?: Object,
  fieldToShow?: string,
  fieldToCompare?: string,
  defaultValue?: string,
  modalTitle?: string,
  defauleIsPlaceHoder: boolean
};
@withThemes
export default class extends React.Component {
  props: Props;

  static defaultProps = {
    defauleIsPlaceHoder: false,
    modalTitle: 'type'
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      show: false,
      selectedItem: null
    };
  }
  componentWillUnmount() {
    this.unmount = true;
  }
  _renderItem = ({ item }) => {
    const { fieldToCompare, fieldToShow } = this.props;
    const { selectedItem } = this.state;
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.selectItem(item)}
      >
        <View>
          <Text
            style={{
              ...styles.itemText,
              color:
                selectedItem &&
                selectedItem[fieldToCompare] === item[fieldToCompare]
                  ? colors.red
                  : '#000'
            }}
          >
            {item[fieldToShow]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  selectItem = item => {
    const { input } = this.props;
    this.props.onSelected && this.props.onSelected(item);
    input && input.onChange(item);
    !this.unmount &&
      this.setState({
        selectedItem: item,
        show: false
      });
  };
  render() {
    const {
      data,
      defaultValue,
      modalTitle,
      fieldToShow,
      defauleIsPlaceHoder,
      touchStyle,
      showError,
      meta
    } = this.props;
    const { selectedItem } = this.state;
    const toShow = _.get(selectedItem, fieldToShow, null);
    const isDefaultVal = !!(defauleIsPlaceHoder === true && defaultValue);

    return (
      <View>
        <TouchableOpacity
          style={[
            styles.field,
            touchStyle,
            {
              borderBottomColor:
                meta.touched && meta.error ? colors.red : '#dddd'
            }
          ]}
          onPress={() => {
            Keyboard.dismiss();
            !this.unmount && this.setState({ show: true });
          }}
        >
          <Text
            cls={
              selectedItem || isDefaultVal ? 'fs-14 black' : 'fs-14 darkGray'
            }
          >
            {(toShow && toShow) ||
              (isDefaultVal ? defaultValue : I18n.t(defaultValue))}
          </Text>

          <Icon name="ios-arrow-down" cls="fs-16 darkGray" />
        </TouchableOpacity>
        <Modal
          useNativeDriver
          hideModalContentWhileAnimating
          isVisible={this.state.show}
          onBackdropPress={() => this.setState({ show: false })}
          supportedOrientations={['portrait', 'landscape']}
        >
          <View cls="width-90% height-50% bg-white bdRadius-10 bhl asc pb-8">
            <View style={styles.headerModal}>
              <View cls="flx-i aife pl-20">
                <Text cls="fs-18 asc black b">{I18n.t(modalTitle)}</Text>
              </View>
              <TouchableOpacity
                onPress={() => !this.unmount && this.setState({ show: false })}
                activeOpacity={0.5}
                cls="width-20"
              >
                <Text cls="orange f-18">X</Text>
              </TouchableOpacity>
            </View>
            <View cls="flx-i pv-5">
              <FlatList
                contentContainerStyle={{ width: '100%' }}
                removeClippedSubviews
                shouldRasterizeIOS
                renderToHardwareTextureAndroid
                data={data}
                renderItem={this._renderItem.bind(this)}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            {/* <View style={{ width: '100%' }}>
              <TouchableOpacity
                style={styles.btnOK}

              >
                <Text style={styles.btnText}>{I18n.t('close')}</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </Modal>
        {showError && meta.error && meta.touched && (
          <View cls="flx-row mt-5">
            <Icon name="md-alert" cls="fs-16 red" />
            <Text cls="red fs-14 ml-5">{meta.error}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = {
  field: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 5,
    marginTop: 5
  },
  container: {
    minHeight: '60%',
    width: '90%',
    // flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 5,
    alignSelf: 'center',
    paddingBottom: 8
  },
  headerModal: {
    paddingVertical: 10,
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  item: {
    width: '100%',
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: StyleSheet.hairlineWidth
    // backgroundColor: 'orange'
  },
  itemText: {
    color: colors.red || '#000',
    fontSize: 16
  }
  // btnOK: {
  //   backgroundColor: colors.blue,
  //   width: deviceWidth * 0.4,
  //   borderRadius: 3,
  //   paddingVertical: 4,
  //   alignItems: 'center',
  //   alignSelf: 'center'
  // },
  // btnText: {
  //   fontSize: 16,
  //   color: '#FFF'
  // }
};
