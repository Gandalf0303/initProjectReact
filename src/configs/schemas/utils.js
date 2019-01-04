import { isEmpty } from 'lodash';
import { ROLE_ID, ACTION_NODE, MTI } from './MappingData';

/*
 *schema: ['PHONE_NUMBER']
 *raw:
 */
export const makeSchema = (
  arrayNeedConvert: Array<Object>,
  fieldForCompare = 'fieldMap'
) => {
  if (!Array.isArray(arrayNeedConvert)) {
    console.error('CREATE REQUEST FAILD: PLEASE MAKE SURE PARAMS IS ARRAY');
    return;
  }
  const parrams = {};
  const temp = [];
  for (const it of arrayNeedConvert) {
    if (!it.optional && isEmpty(it.value)) {
      return console.error(`Fields ${it.name} must require`);
    }
    temp.push({
      fieldID: it.name,
      value: it.value
    });
  }
  parrams[fieldForCompare] = temp;
  return JSON.stringify(parrams);
};

export const defaultField = [
  {
    name: MTI,
    value: '0200'
  },
  {
    name: ROLE_ID,
    value: '22'
  },
  {
    name: ACTION_NODE,
    value: '1'
  }
];
