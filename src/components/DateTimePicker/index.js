import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
// import DateTimePicker from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-datepicker';

import moment from 'moment';
import I18n from 'react-native-i18n';
import Icon from 'Root/src/elements/Icon';
import { withThemes, colors } from 'Root/src/themes';
// import * as calendarSelectors from '~/store/selectors/calendar'
// import * as calendarActions from '~/store/actions/calendar'

@withThemes
export default class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateStart: new Date(),
      dateStartVisible: false,
      selectedDate: null
    };
  }

  onDateStartFocus() {
    this.setState({
      dateStartVisible: true
    });
  }

  onDateStartCancel() {
    this.setState({
      dateStartVisible: false
    });
  }

  setDateStart(value) {
    const { input, onSelected } = this.props;
    const date = moment(value).format('DD/MM/YYYY');
    onSelected && onSelected(value);
    input && input.onChange(value);

    this.setState({
      dateStartVisible: false,
      selectedDate: date
    });
  }

  render() {
    const { selectedDate } = this.state;
    const { title } = this.props;
    return (
      <View style={styles.container}>
        <DatePicker
          style={{
            width: '100%'
          }}
          customStyles={{
            dateInput: {
              borderColor: 'transparent',
              borderWidth: 0,
              alignItems: 'flex-start',
              justifyContent: 'flex-end'
            },
            placeholderText: {
              color: colors.darkGray,
              fontSize: 14
            },
            btnTextConfirm: {
              color: colors.blue,
              fontSize: 18,
              fontWeight: '600'
            },
            btnTextCancel: {
              color: colors.blue,
              fontSize: 18
            },
            dateText: {
              color: 'black',
              fontSize: 14
            },
            dateIcon: {
              width: 25,
              height: 25,
              marginRight: 0,
              marginLeft: 0,
              alignSelf: 'flex-end'
            }
          }}
          date={selectedDate}
          mode="date"
          format="DD-MM-YYYY"
          maxDate={new Date()}
          placeholder={I18n.t(title)}
          confirmBtnText={I18n.t('confirm')}
          cancelBtnText={I18n.t('cancel')}
          onDateChange={this.setDateStart.bind(this)}
        />
      </View>
    );
  }
}

const styles = {
  inputField: {
    // borderRadius: 5,
    backgroundColor: '#ffffff',
    // height: 40,
    paddingTop: 0,
    marginBottom: 0,
    paddingBottom: 0
  },
  dateIcon: {
    fontSize: 20,
    color: colors.blue,
    position: 'absolute',
    right: 15
  },
  container: {
    // overflow: 'hidden',
    borderBottomColor: colors.border,
    borderBottomWidth: 1
    // borderRadius: 5
  }
};
