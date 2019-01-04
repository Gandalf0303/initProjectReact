import React from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import I18n from 'react-native-i18n';

import { withThemes, buildThemes } from 'Root/src/themes';
import SafeArea from 'Root/src/components/SafeAreaView';
import Button from 'Root/src/components/Button';
import InputField from 'Root/src/components/InputField';
import DropDownField from 'Root/src/components/DropDownField';
import DateTimePicker from 'Root/src/components/DateTimePicker';
import ValidateRegex from 'Root/src/utils/ValidateRegex';
import CheckBox from 'Root/src/components/CheckBox';

@reduxForm({
  form: 'Step2',
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
  destroyOnUnmount: false
})
@withThemes
export default class Step2 extends React.Component {
  state = {
    typeRoom: [{ id: 1, name: '#Type1' }, { id: 2, name: '#Type2' }]
  };

  render() {
    const { onSubmit, onPrevious } = this.props;
    return (
      <ScrollView>
        <View cls="flx-i bg-white aic">
          <View cls="flx-i width-80%">
            {/* <Text cls="fs-30 b mb-5">{I18n.t('phoneNumber')}</Text>
          <View cls="height-20" /> */}
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

              <View cls="height-25" />

              <Field
                keyboardType="default"
                returnKeyType="next"
                onIconPress={input => input.onChange('')}
                label="fullName"
                name="name"
                placeholder="fullName"
                component={InputField}
                maxLength={30}
              />

              <View cls="height-25" />

              <View cls="width-100% flx-row">
                <View cls="width-65% jcfe">
                  <Field
                    keyboardType="default"
                    returnKeyType="next"
                    onIconPress={input => input.onChange('')}
                    label="passportID"
                    name="passPort"
                    placeholder="passportID"
                    component={InputField}
                    maxLength={12}
                  />
                </View>
                <View cls="width-5%" />
                <View cls="width-30% jcfe">
                  <Field
                    fieldToShow="name"
                    fieldToCompare="id"
                    name="type"
                    data={this.state.typeRoom}
                    defaultValue="type"
                    modalTitle="type"
                    styleCustom={{}}
                    showError
                    onSelected={() => {
                      // this.props.change('province', null);
                    }}
                    component={DropDownField}
                  />
                </View>
              </View>

              <View cls="height-25" />

              <View cls="width-100% flx-row">
                <View cls="width-50% jcfe">
                  <Field
                    onSelected={value => {}}
                    name="date_time"
                    title="issueDate"
                    component={DateTimePicker}
                  />
                </View>
                <View cls="width-5%" />
                <View cls="width-50% jcfe">
                  <Field
                    keyboardType="default"
                    returnKeyType="next"
                    onIconPress={input => input.onChange('')}
                    label="issuePlace"
                    name="issuePlace"
                    placeholder="issuePlace"
                    component={InputField}
                    maxLength={30}
                  />
                </View>
              </View>
              <View cls="height-25" />

              <View cls="width-100% flx-row">
                <View cls="width-50%">
                  <Field
                    onSelected={value => {}}
                    name="date_time"
                    title="dob"
                    component={DateTimePicker}
                  />
                </View>
                <View cls="width-5%" />
                <View cls="width-50%">
                  <Field
                    onSelected={value => {}}
                    name="gender"
                    title="gender"
                    listOptions={[
                      { id: 1, name: 'male' },
                      { id: 2, name: 'female' }
                    ]}
                    component={CheckBox}
                  />
                  <View cls="height-5" />
                </View>
              </View>
              {/* <Field
                onSelected={value => {}}
                name="birthDay"
                title="dob"
                placeholder="dob"
                component={DateTimePicker}
              />
              <View cls="height-25" />

              <Field
                onSelected={value => {}}
                name="gender"
                title="gender"
                listOptions={[
                  { id: 1, name: 'male' },
                  { id: 2, name: 'female' }
                ]}
                component={CheckBox}
              /> */}
              <View cls="height-25" />
            </View>

            <View cls="flx-row jcsb">
              <Button
                text="previous"
                style={{ width: 120 }}
                onPress={() => onPrevious()}
              />
              <Button
                text="next"
                style={{ width: 120 }}
                onPress={() => onSubmit()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
