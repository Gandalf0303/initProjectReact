import React from 'react';
import { View, ActivityIndicator, Alert, Text } from 'react-native';
import _ from 'lodash';
import { withThemes, colors } from 'Root/src/themes';
import configs from 'Root/src/configs/api';
import store from 'Root/src/store';
import errorMapping from 'Root/src/configs/errorMapping';
import successMapping from 'Root/src/configs/successMapping';

const delay = (timeout, error) =>
  new Promise((resolve, reject) => setTimeout(() => reject(error), timeout));

type Props = {
  timeOut: number,
  timeWait: number,
  onSuccess: Function,
  onError: Function, // trả về khi lỗi
  url?: string,
  autoLoading: boolean, // tự động request
  params: Object | Array,
  size: 'small' | 'large',
  containerCls?: Object | Array,
  emptyMessage?: string,
  children?: Object | Function,
  indicatorColor?: string,
  visible: boolean,
  method?: 'POST' | 'GET',
  keepRawResponse?: boolean // nếu true thì trả về dữ liệu gốc từ request không ánh xạ
};

@withThemes
export default class Request extends React.PureComponent<Props> {
  static defaultProps = {
    autoLoading: true,
    requireAuth: true,
    timeWait: 1000,
    timeOut: 15000,
    onSuccess: () => {},
    size: 'small',
    visible: true,
    method: 'POST',
    url: configs.API_URI,
    keepRawResponse: false
  };

  constructor(props) {
    super(props);
    this.state = {
      isIndicatorVisible: false
    };
    this.timeWaitFn = null;
    this.mounted = false;
    this.recursiveOnce = false;
    this.params = {};
  }

  componentDidMount() {
    const { autoLoading } = this.props;
    this.mounted = true;
    if (autoLoading) {
      this._handleFetchData();
    }
  }

  componentWillUnmount = () => {
    this._clearTimeouts();
    this.mounted = false;
  };

  _handleFetchData = () => {
    const { params } = this.props;
    this._fetchData(params);
  };

  _fetchData(params) {
    const { onError, timeOut, url } = this.props;
    const requestContent = this._prepareRequestContent(params);

    const result = Promise.race([
      fetch(url, requestContent),
      delay(timeOut, {
        error: 500,
        message: 'Request timeout!'
      })
    ]);
    result
      .then(response => {
        const { status } = response;
        if (status >= 200 && status < 300) {
          return response.json();
        }
        return Promise.reject({
          message: response.statusText,
          response: response.json()
        });
      })
      .then(responseJson => {
        if (
          responseJson.error !== '00000' ||
          responseJson.responseCode !== '00000'
        ) {
          return this._handleError(onError, {
            message: 'Loi tra ve tu core',
            response: responseJson
          });
        }

        return this._handleSuccess(responseJson);
      })
      .catch(error => {
        console.log('err trong catch ==> ', error);
        this._handleError(onError, error);
      });
  }

  _prepareRequestContent(params) {
    const { method } = this.props;
    this.params = params;
    this._setTimeWait();
    const mainRequestContent = {
      ...params,
      headers: {
        'Content-Type': 'application/json'
      },
      method
    };
    return mainRequestContent;
  }

  _handleSuccess(responseJson) {
    const { onSuccess, keepRawResponse } = this.props;
    return this._handleResponse(onSuccess, responseJson, keepRawResponse);
  }

  _handleError(onError, error) {
    const { keepRawResponse } = this.props;
    if (error.response) {
      const message = errorMapping(error.response);
      if (onError && keepRawResponse) return { message: '', ...error };
      if (onError) return onError({ message });
      if (__DEV__) return console.error(message);
      Alert.alert('Opp! Have some problem!', message);
      return;
    }
    return Promise.reject({ message: 'Internal Server Error' });
  }

  _handleResponse = (onResponse, response, keepRawResponse) => {
    this.recursiveOnce = false;
    if (!this.mounted) {
      return this.setState({
        isIndicatorVisible: false
      });
    }
    this._clearTimeouts();
    this.setState(
      {
        isIndicatorVisible: false
      },
      () => {
        if (keepRawResponse) return onResponse(response);
        const mappingData = successMapping(response);
        return onResponse(mappingData);
      }
    );
  };

  _setTimeWait = () => {
    const { timeWait } = this.props;
    if (timeWait === 0) {
      return this.setState({
        isIndicatorVisible: true
      });
    }
    if (timeWait) {
      this.timeWaitFn = setTimeout(() => {
        this.setState({
          isIndicatorVisible: true
        });
      }, timeWait);
    }
  };

  _clearTimeouts = () => {
    clearTimeout(this.timeWaitFn);
  };

  render() {
    const { isIndicatorVisible, size } = this.state;
    const {
      containerCls,
      emptyMessage,
      children,
      indicatorColor,
      visible
    } = this.props;

    if (!visible) {
      return <View />;
    }
    if (!isIndicatorVisible) {
      if (emptyMessage || children) {
        return (
          <View cls={[containerCls]}>
            {emptyMessage ? <Text>{emptyMessage}</Text> : null}
            {children || null}
          </View>
        );
      }
      return null;
    }
    return (
      <View cls={[containerCls]}>
        <ActivityIndicator
          color={indicatorColor || colors.orange}
          size={size}
        />
      </View>
    );
  }
}
