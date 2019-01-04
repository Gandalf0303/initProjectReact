import {
  PROCESS_CODE,
  PHONE_NUMBER,
  PAN,
  PIN,
  CARRIED_PHONE,
  CARRIED_ACCOUNT_ID,
  ACCOUNT_ID,
  CARRIED_NAME
} from './MappingData';
import { makeSchema, defaultField } from './utils';

export const getAccountInfoSchema = ({ phoneNumber }, map = 'fieldMap') => {
  const defaultValue = [
    ...defaultField,
    {
      name: PROCESS_CODE,
      value: '311100'
    }
  ];
  const requireValue = [
    {
      name: PHONE_NUMBER,
      value: phoneNumber
    }
  ];
  return makeSchema([...defaultValue, ...requireValue], map);
};

export const loginSchema = (
  { phoneNumber, pin, accountId, name },
  map = 'fieldMap'
) => {
  const defaultValue = [
    ...defaultField,
    {
      name: PAN,
      value: 8190010000000195000
    },
    {
      name: PROCESS_CODE,
      value: '000004'
    }
  ];

  const requireValue = [
    {
      name: PHONE_NUMBER,
      value: phoneNumber
    },
    {
      name: PIN,
      value: pin
    },
    {
      name: CARRIED_PHONE,
      value: phoneNumber
    },
    {
      name: CARRIED_ACCOUNT_ID,
      value: accountId
    },
    {
      name: ACCOUNT_ID,
      value: accountId
    },
    {
      name: CARRIED_NAME,
      value: name
    }
  ];
  return makeSchema([...defaultValue, ...requireValue], map);
};
