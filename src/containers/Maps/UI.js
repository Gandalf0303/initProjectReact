/** @format **/

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { withThemes } from 'Root/src/themes';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { deviceWidth, deviceHeight } from 'Root/src/utils/UIHelper';
import Icons from 'Root/src/elements/Icon';
import { getCurrentLocations } from 'Root/src/utils/LocationHelper';
import SearchInput from './components/SearchIput';

@withThemes
export default class UI extends React.Component {
  constructor(props) {
    super(props);
    this.refMap = React.createRef();
    this.refMaker = React.createRef();
    this.state = {
      selectedPlace: null
    };
  }
  _selectPlaceFromSearch = location => {
    this.refMap &&
      this.refMap.current &&
      this.refMap.current.animateToRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      });

    this.setState({
      selectedPlace: {
        latitude: location.lat,
        longitude: location.lng
      }
    });
  };
  _getGetCurrentLocation = async () => {
    const result = await getCurrentLocations();
    if (result) {
      this.setState({ selectedPlace: result });
    }
  };
  render() {
    const { selectedPlace } = this.state;
    const { isRegister } = this.props;
    return (
      <View cls="flx-i">
        <MapView
          ref={this.refMap}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          cls="absoluteFill"
          region={{
            latitude: selectedPlace ? selectedPlace.latitude : 21.027763,
            longitude: selectedPlace ? selectedPlace.longitude : 105.83416,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922 * (deviceWidth / deviceHeight)
          }}
        >
          {selectedPlace && (
            <Marker
              coordinate={selectedPlace}
              title="Thanh Pham"
              pinColor="red"
            />
          )}
        </MapView>
        <SearchInput
          onSelectPlace={this._selectPlaceFromSearch}
          placeholder={
            (!isRegister && 'searchForListOfAgent') ||
            'gettingYourCurrentLocation'
          }
        />
        <TouchableOpacity
          cls="circle-60 bg-newStartGradientNav absolute right-32 bottom-30 jcc aic"
          activeOpacity={0.2}
          onPress={this._getGetCurrentLocation}
        >
          <Icons name="md-locate" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}
