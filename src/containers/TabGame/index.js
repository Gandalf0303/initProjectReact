import React from 'react';
import { View, Text } from 'react-native';
import SafeArea from 'Root/src/components/SafeAreaView';
import { withThemes } from 'Root/src/themes';

@withThemes
export default class TabGame extends React.Component {
  render() {
    return (
      <SafeArea gradient>
        <View cls="flx-i aic jcc bg-white">
          <Text>Game tab</Text>
        </View>
      </SafeArea>
    );
  }
}
