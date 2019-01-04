import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { withThemes } from 'Root/src/themes';
import SafeArea from 'Root/src/components/SafeAreaView';
import { supportLanguage, startTabBase } from 'Root';

@connect(_ => ({ locale: _.locale }))
@withThemes
export default class ChangeLanguage extends React.Component {
  changeLanguage(code) {
    this.props.dispatch({
      type: 'setting/changeLanguage',
      payload: code
    });
    I18n.locale = code;
    startTabBase();
  }
  render() {
    return (
      <SafeArea gradient>
        <View cls="flx-i bg-white">
          {supportLanguage.map((it, id) => (
            <TouchableOpacity
              cls="pv-16 ph-16 flx-row aic bbhl bd-lightGray"
              key={id}
              onPress={() => this.changeLanguage(it.code)}
            >
              <Text cls="f-18 fw5 gray ml-16">{it.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeArea>
    );
  }
}
