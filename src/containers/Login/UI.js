import React from 'react';
import { View, Image } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { withThemes } from 'Root/src/themes';
import ValidateRegex from 'Root/src/utils/ValidateRegex';
import { KeyboardAwareScrollView } from 'Root/src/components/KeyboardAware';
import InputField from 'Root/src/components/InputField';
import Button from 'Root/src/components/Button';

type Props = {
  onSubmitPress: Function
};

@reduxForm({
  form: 'Login',
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
export default class UI extends React.PureComponent<Props> {
  _handleSubmit = values => {
    // sử lý submit ở đây
    const { phone, pin } = values;
    this.props.onSubmitPress(phone, pin);
  };
  render() {
    return (
      <View cls="flx-i">
        <KeyboardAwareScrollView>
          <View cls="aic jcc mt-6">
            <Image
              source={{
                uri:
                  'https://upload.wikimedia.org/wikipedia/vi/thumb/e/e8/Logo_Viettel.svg/1280px-Logo_Viettel.svg.png'
              }}
              cls="width-250 height-200 rm-contain"
            />
          </View>
          <View cls="flx-i aic mt-5 fullWidth ph-16">
            <View cls="bdRadius-6 bdWidth-1 pv-6 ph-4 bd-border">
              <Field
                keyboardType="phone-pad"
                returnKeyType="next"
                onIconPress={input => input.onChange('')}
                label="phoneNumber"
                name="phone"
                placeholder="enterYourMobilePhoneNumber"
                component={InputField}
                maxLength={13}
                styleInputWraper={{ borderBottomWidth: 0 }}
              />
            </View>
            <View cls="bdRadius-6 bdWidth-1 pv-6 ph-4 bd-border mt-16">
              <Field
                keyboardType="phone-pad"
                returnKeyType="next"
                onIconPress={input => input.onChange('')}
                label="Pin"
                name="pin"
                placeholder="enterYourPIN"
                component={InputField}
                maxLength={6}
                styleInputWraper={{ borderBottomWidth: 0 }}
              />
            </View>
          </View>

          <Button
            text="next"
            styleCls="width-300 asc mt-10"
            onPress={this.props.handleSubmit(this._handleSubmit)}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
