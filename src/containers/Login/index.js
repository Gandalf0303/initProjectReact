import React from 'react';
import { withThemes } from 'Root/src/themes';
import SafeArea from 'Root/src/components/SafeAreaView';
import Request from 'Root/src/components/Request';
import { getAccountInfoSchema } from 'Root/src/configs/schemas/Login';
import UI from './UI';

@withThemes
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.refGetInfoAccountStep1 = React.createRef();
  }

  onGetInfoSuccessStep1 = data => {
    console.log('=============bien===============');
    console.log('onGetInfoSuccess ==> ', data);
    console.log('=================================');
  };

  _onSubmitPress = (phone, pin) => {
    console.log('phone ==> ', phone);
    console.log('pin ==> ', pin);
    const params = getAccountInfoSchema({ phoneNumber: phone });
    console.log('params ==> ', params);
    this.refGetInfoAccountStep1 &&
      this.refGetInfoAccountStep1.current &&
      this.refGetInfoAccountStep1.current._fetchData({
        body: `${params}`
      });
  };
  render() {
    return (
      <SafeArea gradient={false}>
        <UI onSubmitPress={this._onSubmitPress} />
        <Request
          ref={this.refGetInfoAccountStep1}
          timeWait={0}
          onSuccess={this.onGetInfoSuccess}
          // onError={this.onGetInfoError}
          autoLoading={false}
          params={{}}
          containerCls="zIndex-1 fullParent absolute aic jcc"
        />
      </SafeArea>
    );
  }
}
