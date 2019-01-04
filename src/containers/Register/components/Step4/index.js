import React from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { reduxForm, Field } from 'redux-form';

import { withThemes, buildThemes } from 'Root/src/themes';
import SafeArea from 'Root/src/components/SafeAreaView';
import Button from 'Root/src/components/Button';
import InputField from 'Root/src/components/InputField';

@withThemes
export default class Step4 extends React.Component {
  render() {
    const { onSubmit, onPrevious } = this.props;
    return (
      <View cls="flx-i bg-white aic">
        <View cls="flx-i width-80%">
          <View cls="flx-i aic">
            <Text cls="fs-40 b">Step 4</Text>
          </View>

          <View cls="flx-row jcsb ">
            <Button
              text="previous"
              style={{ width: 120 }}
              onPress={() => onPrevious()}
            />
            <Button
              text="confirm"
              style={{ width: 120 }}
              onPress={() => onSubmit()}
            />
          </View>
        </View>
      </View>
    );
  }
}
