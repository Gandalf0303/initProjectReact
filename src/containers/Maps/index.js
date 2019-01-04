import React from 'react';
import SafeArea from 'Root/src/components/SafeAreaView';
import HeaderCustom from 'Root/src/components/HeaderCustom';
import UI from './UI';

export default class Maps extends React.Component {
  render() {
    const { isRegister } = this.props;
    return (
      <SafeArea gradient>
        {(isRegister && (
          <HeaderCustom navigator={this.props.navigator} title="maps" />
        )) ||
          null}
        <UI isRegister={isRegister} />
      </SafeArea>
    );
  }
}
