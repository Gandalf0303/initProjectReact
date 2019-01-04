import _ from 'lodash';
import * as Field from './schemas/MappingData';

export default (rawData: Object) => {
  const needConvert = _.get(rawData, 'fieldMap', []);
  const returnData = {
    error: rawData.error,
    responseCode: rawData.responseCode,
    data: {}
  };

  for (const it of needConvert) {
    const keyFound = _.findKey(Field, o => o === it.fieldID);
    // convertToCamecase
    const keyInCameCase = _.camelCase(keyFound);
    returnData.data[keyInCameCase] = it.value;
  }

  return returnData;
};
