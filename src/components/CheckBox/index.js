import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import I18n from 'react-native-i18n';
import Icon from 'Root/src/elements/Icon';
import { withThemes, colors } from 'Root/src/themes';
// import * as calendarSelectors from '~/store/selectors/calendar'
// import * as calendarActions from '~/store/actions/calendar'

@withThemes
export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  onSelectedOption(value) {
    const { input, onSelected } = this.props;
    onSelected && onSelected(value);
    input && input.onChange(value);

    this.setState({
      selected: value
    });
  }

  render() {
    const { selected } = this.state;
    const { title, placeholder, listOptions } = this.props;
    return (
      <View cls="flx-i">
        {title && <Text cls="fs-14 darkGray mb-5">{I18n.t(title)}</Text>}
        <View cls="flx-row jcsb">
          {listOptions &&
            listOptions.length > 0 &&
            listOptions.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.6}
                cls="flx-row aic jcc"
                onPress={() => this.onSelectedOption(item)}
              >
                {(selected && selected.id === item.id && (
                  <Icon name="md-radio-button-on" cls="fs-20 green" />
                )) || <Icon name="md-radio-button-off" cls="fs-20 darkGray" />}
                <Text
                  cls={
                    (selected &&
                      selected.id === item.id &&
                      'pl-5 fs-14 black') ||
                    'pl-5 fs-14 darkGray'
                  }
                >
                  {I18n.t(item.name)}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    );
  }
}
