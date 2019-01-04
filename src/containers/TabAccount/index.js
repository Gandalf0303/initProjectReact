import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import I18n from 'react-native-i18n';
import AntIcon from 'react-native-vector-icons/AntDesign';
import SafeArea from 'Root/src/components/SafeAreaView';
import LinearGradient from 'react-native-linear-gradient';
import { withThemes, appStyleNoNavBar, colors } from 'Root/src/themes';
import images from 'Root/src/assets/images';
import options from './options';

@withThemes
export default class AccountTab extends React.Component {
  static navigatorStyle = appStyleNoNavBar;

  _renderHeader() {
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 0.0 }}
        colors={[colors.newStartGradientNav, colors.newEndGradientNav]}
        cls="fullWidth height-100 flx-row ph-16 jcsb"
      >
        <View cls="mt-24">
          <Text cls="b fs-20 white">THANH_PHAM</Text>
          <Text cls="fw6 fs-14 white mt-4">45,000,000 Kyats</Text>
          <TouchableOpacity cls="pv-6">
            <Text cls="fs-14 white">View profile</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity cls="circle-60 aic jcc asc bg-lightGray">
          <Image source={images.male} cls="height-30 width-30 rm-contain" />
        </TouchableOpacity>
      </LinearGradient>
    );
  }
  _goScreen(screen: string, passProps = {}) {
    this.props.navigator.push({
      screen,
      navigatorStyle: { ...appStyleNoNavBar, tabBarHidden: true },
      passProps
    });
  }
  render() {
    return (
      <SafeArea gradient>
        {this._renderHeader()}
        <View cls="flx-i bg-white">
          <ScrollView>
            {options.map((it, id) => (
              <TouchableOpacity
                key={id}
                cls="pv-16 ph-16 flx-row aic bbhl bd-lightGray"
                onPress={() => this._goScreen(it.toScreen)}
              >
                <View cls="height-30 width-30 aic jcc">
                  <AntIcon name={it.icon} size={25} color={colors.colorIcon} />
                </View>
                <Text cls="f-18 fw5 colorIcon ml-16">{I18n.t(it.title)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeArea>
    );
  }
}
