import React from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { reduxForm, Field } from 'redux-form';

import { withThemes } from 'Root/src/themes';
import SafeArea from 'Root/src/components/SafeAreaView';
import Button from 'Root/src/components/Button';
import InputField from 'Root/src/components/InputField';
import HeaderCustom from 'Root/src/components/HeaderCustom';

@withThemes
export default class Home extends React.Component {
  render() {
    return (
      <SafeArea gradient>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View cls="flx-i bg-white">
            <HeaderCustom
              navigator={this.props.navigator}
              title="home"
              isHome
            />
            <View cls="flx-i aic jcc">
              <Text cls="fs-40 b tc">Welcome to React Native!</Text>
              <View cls="height-50" />

              <Button
                text="next"
                style={{ width: 300 }}
                onPress={() =>
                  this.props.navigator.push({
                    screen: 'register',
                    navigatorStyle: {
                      tabBarHidden: true
                    },
                    passProps: {}
                  })
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeArea>
    );
  }
}
