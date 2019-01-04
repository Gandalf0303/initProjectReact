import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import I18n from 'react-native-i18n';

import { withThemes, buildThemes } from 'Root/src/themes';
import SafeArea from 'Root/src/components/SafeAreaView';
import Button from 'Root/src/components/Button';
import InputField from 'Root/src/components/InputField';
import DropDownField from 'Root/src/components/DropDownField';
import images from 'Root/src/assets/images';

@reduxForm({
  form: 'Step3',
  validate: values => {
    const { phone } = values;
    const errors = {};
    // if (!phone) {
    //   errors.phone = 'enterYourMobilePhoneNumber';
    // }
    // if (phone && phone.length < 10) {
    //   errors.phone = 'error1013DigitsOnly';
    // }
    // if (
    //   phone &&
    //   phone.length >= 10 &&
    //   !ValidateRegex.MYANMAR_PHONE.test(phone)
    // ) {
    //   errors.phone = 'incorrectPhoneNumber';
    // }
    return errors;
  },
  destroyOnUnmount: false
})
@withThemes
export default class Step3 extends React.Component {
  state = {
    typeProvince: [
      { id: 1, name: '#Province1' },
      { id: 2, name: '#Province2' }
    ],
    typeDistric: [{ id: 1, name: '#Distric1' }, { id: 2, name: '#Distric2' }],
    typeArea: [{ id: 1, name: '#Area1' }, { id: 2, name: '#Area2' }]
  };

  render() {
    const { onSubmit, onPrevious } = this.props;
    return (
      <ScrollView>
        <View cls="flx-i bg-white aic">
          <View cls="flx-i width-80%">
            {/* <View cls="flx-i aic">
              <Text cls="fs-40 b">Step 3</Text>
            </View> */}
            <View cls="flx-i">
              <Field
                fieldToShow="name"
                fieldToCompare="id"
                name="province"
                data={this.state.typeProvince}
                defaultValue="chooseTheProvince"
                modalTitle="chooseTheProvince"
                styleCustom={{}}
                showError
                onSelected={() => {
                  // this.props.change('province', null);
                }}
                component={DropDownField}
              />
              <View cls="height-25" />

              <Field
                fieldToShow="name"
                fieldToCompare="id"
                name="distric"
                data={this.state.typeDistric}
                defaultValue="district"
                modalTitle="district"
                styleCustom={{}}
                showError
                onSelected={() => {
                  // this.props.change('province', null);
                }}
                component={DropDownField}
              />

              <View cls="height-25" />

              <Field
                fieldToShow="name"
                fieldToCompare="id"
                name="area"
                data={this.state.typeArea}
                defaultValue="area"
                modalTitle="area"
                styleCustom={{}}
                showError
                onSelected={() => {
                  // this.props.change('province', null);
                }}
                component={DropDownField}
              />

              <View cls="height-25" />

              <Field
                keyboardType="default"
                returnKeyType="next"
                onIconPress={input => input.onChange('')}
                label="address"
                name="address"
                placeholder="address"
                component={InputField}
                maxLength={30}
              />

              <View cls="height-25" />
              <Text cls="darkGray fs-14">{I18n.t('location')}</Text>
              <TouchableOpacity
                cls="bg-gray height-80 mt-5"
                onPress={() => {
                  this.props.navigator.push({
                    screen: 'maps',
                    navigatorStyle: {
                      // tabBarHidden: true
                    },
                    passProps: { isRegister: true }
                  });
                }}
              >
                <Image cls="fullView" source={images.maps} resizeMode="cover" />
              </TouchableOpacity>

              <View cls="height-25" />
            </View>
            <View cls="flx-row jcsb ">
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
