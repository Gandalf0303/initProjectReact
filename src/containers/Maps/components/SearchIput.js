/** @flow **/
/** @format **/

import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native';
import RNGooglePlaces from 'react-native-google-place';
import I18n from 'react-native-i18n';

import Icons from 'Root/src/elements/Icon';
import { deviceHeight, makeHitSlop } from 'Root/src/utils/UIHelper';
import { withThemes } from 'Root/src/themes';

type Props = {
  onSelectPlace?: Object => void
};
export type PlaceLocation = {
  address: string,
  lat: number,
  lng: number
};

@withThemes
export default class SearchInput extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { value: '', listPredictions: [] };
  }

  getPlace = (value: string) => {
    this.setState({
      value
    });
    if (value !== '' && value.length > 0 && value !== ' ') {
      RNGooglePlaces.getAutocompletePredictions(value, {
        type: 'geocode',
        country: 'MM' // for Myanmar
      })
        .then(places => {
          this.setState({ listPredictions: places });
        })
        .catch(e => {
          alert(e.toString());
        });
      return;
    }
    this.setState({
      listPredictions: []
    });
  };

  clearInput = () => {
    this.setState({
      value: '',
      listPredictions: []
    });
  };

  selectPlace(location) {
    this.setState({ value: location.fullText, listPredictions: [] });
    RNGooglePlaces.lookUpPlaceByID(location.placeID).then(result => {
      const { onSelectPlace } = this.props;
      const param = {
        address: result.address,
        lat: result.latitude,
        lng: result.longitude
      };
      return onSelectPlace && onSelectPlace(param);
    });
  }
  render() {
    const { value, listPredictions } = this.state;
    const { placeholder } = this.props;
    return (
      <View cls="width-90% absolute top-30 asc ">
        <View cls="flx-row ph-10 pv-10 bg-white bdRadius-5 aic">
          <Icons name="ios-search" size={20} color="#999999" />
          <TextInput
            placeholder={I18n.t(placeholder)}
            cls="ml-8 fs-16 mr-32 pv-4"
            value={value}
            onChangeText={this.getPlace}
            spellCheck={false}
            underlineColorAndroid="transparent"
          />
          {value.length > 0 && (
            <TouchableOpacity
              hitSlop={makeHitSlop(10)}
              onPress={this.clearInput}
              cls="absolute right-16"
            >
              <Icons name="ios-close" size={24} color="#999999" />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView
          cls="mt-2 bg-white"
          contentContainerStyleCls={`mt-2 maxHeight-${deviceHeight * 0.5}`}
        >
          {listPredictions.map((it, id) => (
            <TouchableOpacity
              cls="flx-row  bg-white pv-8 ph-8 aic bbhl bd-lightGray"
              key={id}
              onPress={() => this.selectPlace(it)}
            >
              <Icons name="ios-flag" size={18} color="#999" />
              <View cls="ml-16">
                <Text cls="fs-14 fw5" numberOfLines={1}>
                  {it.fullText}
                </Text>
                <Text cls="fs-12 mt-3 gray">{it.secondaryText}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}
