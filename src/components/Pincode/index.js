import React from 'react';
import { View, TextInput } from 'react-native';
import { withThemes } from 'Root/src/themes';

type Props = {
  length: number
};
@withThemes
export default class PinCode extends React.PureComponent<Props> {
  static defaultProps = {
    length: 6
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      isShowMark: false,
      currentIndex: 0,
      array: Array(props.length).fill('')
    };
  }

  _onChangePin = (value: string) => {
    console.log('value ==> ', value, value.length - 1);
    if (value && value.length > 0 && !this.state.isShowMark) {
      this.setState({ isShowMark: true, currentIndex: value.length - 1 });
    }
    if (!value || (value.length === 0 && this.state.isShowMark)) {
      this.setState({ isShowMark: false, currentIndex: 0 });
    }
  };
  _renderMark(index) {
    console.log('index ==> ', index);
    return (
      <View
        // cls={[
        //   'width-16 height-16 bdRadius-8 bg-darkGray',
        //   { 'bg-black': currentIndex === index }
        // ]}

        style={{
          height: 16,
          width: 16,
          borderRadius: 8,
          backgroundColor:
            this.state.currentIndex === index ? '#999999' : '#d8d8d8'
        }}
        key={index}
      />
    );
  }
  render() {
    const { length } = this.props;
    const { isShowMark, array, currentIndex } = this.state;
    return (
      <View cls="fullWidth bg-blue flx-row" style={[]}>
        <TextInput
          placeholder="okok"
          maxLength={length}
          onChangeText={this._onChangePin}
          keyboardType="number-pad"
          // cls={[{ 'width-0 ovh': isShowMark }]}
        />
        <View cls={['flx-row', { 'width-0 ovh': !isShowMark }]}>
          {array.map((it, index) => this._renderMark(index))}
        </View>
      </View>
    );
  }
}
