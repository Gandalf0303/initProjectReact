import React from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import I18n from 'react-native-i18n';

import { withThemes, buildThemes } from 'Root/src/themes';
import SafeArea from 'Root/src/components/SafeAreaView';
import Button from 'Root/src/components/Button';
import InputField from 'Root/src/components/InputField';
import ValidateRegex from 'Root/src/utils/ValidateRegex';

@reduxForm({
  form: 'Step1',
  validate: values => {
    const { phone } = values;
    const errors = {};
    if (!phone) {
      errors.phone = 'enterYourMobilePhoneNumber';
    }
    if (phone && phone.length < 10) {
      errors.phone = 'error1013DigitsOnly';
    }
    if (
      phone &&
      phone.length >= 10 &&
      !ValidateRegex.MYANMAR_PHONE.test(phone)
    ) {
      errors.phone = 'incorrectPhoneNumber';
    }
    return errors;
  },
  destroyOnUnmount: true
})
@withThemes
export default class Step1 extends React.Component {
  render() {
    const { onSubmit } = this.props;
    return (
      <View cls="flx-i bg-white aic">
        <View cls="flx-i width-80%">
          <Text cls="fs-30 b mb-5">{I18n.t('phoneNumber')}</Text>
          <View cls="height-20" />
          <View cls="flx-i">
            <Field
              keyboardType="phone-pad"
              returnKeyType="next"
              onIconPress={input => input.onChange('')}
              label="phoneNumber"
              name="phone"
              placeholder="enterYourMobilePhoneNumber"
              component={InputField}
              maxLength={13}
            />
            <View cls="height-20" />

            <Button
              text="next"
              style={{ width: 300 }}
              onPress={() => onSubmit()}
            />
          </View>
        </View>
      </View>
    );
  }
}
