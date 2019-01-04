/* @flow */
import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'Root/src/elements/Icon';
import { withThemes, colors } from 'Root/src/themes';

type Props = {
  hasRef?: Function,
  onSelected?: Function,
  isSelected: boolean,
  dataArray: Array<any>
};

@withThemes
export default class extends Component {
  props: Props;
  state = {
    selected: this.props.isSelected || 0
  };
  componentDidMount() {
    this.props.hasRef && this.props.hasRef(this);
  }
  onNext() {
    const { isSelected, onSelected } = this.props;
    this.setState(
      {
        selected: isSelected + 1
      },
      () => {
        onSelected && onSelected(this.state.selected);
      }
    );
  }

  onPrevious() {
    const { isSelected, onSelected } = this.props;
    this.setState(
      {
        selected: isSelected - 1
      },
      () => {
        onSelected && onSelected(this.state.selected);
      }
    );
  }

  onPress(index) {
    // Check not next to, only go back
    if (this.state.selected >= index) {
      this.setState({ selected: index });
      this.props.onSelected && this.props.onSelected(index);
    }
  }

  renderItem(val, index) {
    const { selected } = this.state;
    const { isSelected } = this.props;
    return (
      <View cls="flx-i aic height-50" key={index}>
        <View cls="flx-row">
          {index === 0 ? (
            <View cls="flx-i height-2 mt-10 aic jcc" />
          ) : (
            <View
              cls="flx-i height-2 mt-10 aic jcc"
              style={{
                backgroundColor: index <= isSelected ? 'orange' : colors.border
              }}
            />
          )}

          <TouchableOpacity
            onPress={() => this.onPress(index)}
            style={{
              borderColor: index <= isSelected ? 'orange' : colors.border,
              borderWidth: 3,
              width: 26,
              height: 26,
              borderRadius: 13,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                color: index <= isSelected ? 'orange' : colors.darkGray,
                textAlign: 'center'
              }}
            >
              {val}
            </Text>
          </TouchableOpacity>
          {index === 3 ? (
            <View cls="flx-i height-2 bg-transparent mt-10 aic jcc" />
          ) : (
            <View
              cls="flx-i height-2 mt-10 aic jcc"
              style={{
                backgroundColor: index < isSelected ? 'orange' : colors.border
              }}
            />
          )}
        </View>
      </View>
    );
  }
  render() {
    const { dataArray } = this.props;

    return (
      <View cls="flx-row">
        {dataArray.map((val, index) => this.renderItem(val, index))}
      </View>
    );
  }
}
