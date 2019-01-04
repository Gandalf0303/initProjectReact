import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  LayoutAnimation
} from 'react-native';
import { reduxForm, Field } from 'redux-form';
import I18n from 'react-native-i18n';

import { withThemes, buildThemes } from 'Root/src/themes';
import SafeArea from 'Root/src/components/SafeAreaView';
import Button from 'Root/src/components/Button';
import InputField from 'Root/src/components/InputField';
import HeaderCustom from 'Root/src/components/HeaderCustom';
import StepIndicator from 'Root/src/components/StepIndicator';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';

@withThemes
export default class Register extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = { currentPosition: 0 };
  }

  onSubmit() {
    const { currentPosition } = this.state;

    if (currentPosition === 1) {
    }
    if (currentPosition === 2) {
    }
    if (currentPosition === 3) {
      alert('OK');
      return;
    }
    this.stepIndicatorRef.onNext();
  }

  onPrevious() {
    this.stepIndicatorRef.onPrevious();
  }

  renderContent() {
    const { data, navigator } = this.props;
    const { currentPosition } = this.state;

    switch (currentPosition) {
      case 0:
        return <Step1 navigator={navigator} onSubmit={() => this.onSubmit()} />;
      case 1:
        return (
          <Step2
            navigator={navigator}
            onSubmit={() => this.onSubmit()}
            onPrevious={() => this.onPrevious()}
          />
        );
      case 2:
        return (
          <Step3
            navigator={navigator}
            onSubmit={() => this.onSubmit()}
            onPrevious={() => this.onPrevious()}
          />
        );
      case 3:
        return (
          <Step4
            navigator={navigator}
            onSubmit={() => this.onSubmit()}
            onPrevious={() => this.onPrevious()}
          />
        );
      default:
        break;
    }
  }

  render() {
    const { currentPosition } = this.state;

    return (
      <SafeArea gradient>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View cls="flx-i bg-white">
            <HeaderCustom navigator={this.props.navigator} title="register" />
            <View cls="height-30" />
            <StepIndicator
              hasRef={ref => (this.stepIndicatorRef = ref)}
              isSelected={currentPosition}
              onSelected={val => {
                this.setState({
                  currentPosition: val
                });
                LayoutAnimation.linear();
              }}
              dataArray={['1', '2', '3', '4']}
            />
            {this.renderContent()}
          </View>
        </TouchableWithoutFeedback>
      </SafeArea>
    );
  }
}
