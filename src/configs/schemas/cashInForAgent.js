import store from 'Root/src/store';

import { defaultField, makeSchema } from './utils';
import {
  TRANSACTION_CODE,
  SHOP_CODE,
  PROCESS_CODE,
  PHONE_NUMBER,
  STAFF_CODE,
  CURRENCY_CODE,
  TRANSACTION_DESCRIPTION,
  AMOUNT,
  TO_NAME,
  TO_ACCOUNT_ID,
  FROM_ACCOUNT_ID,
  TO_PHONE,
  PIN,
  PAN,
  CARRIED_CODE
} from './MappingData';

const { profile } = store.getState().auth;

export const getAgenInfo = ({ phoneNumber, shopCode_agentID }) => {
  const defaultValues = [
    ...defaultField,
    {
      name: TRANSACTION_CODE,
      value: '010002'
    },
    {
      name: PROCESS_CODE,
      value: '311100'
    }
  ];
  const requireFields = [
    {
      name: PHONE_NUMBER,
      value: phoneNumber
    },

    {
      name: SHOP_CODE,
      value: shopCode_agentID
    }
  ];
  return makeSchema([...defaultValues, ...requireFields]);
};

export const cashInforAgent = ({
  transactionCode,
  staffCode_agentID,
  transactionDescription,
  toName,
  amount,
  toAccountID,
  toPhone,
  pin
}) => {
  const defaultValues = [
    ...defaultField,
    {
      fieldID: PROCESS_CODE,
      value: '010002'
    }
  ];
  const arr = [
    {
      fieldID: TRANSACTION_CODE,
      value: transactionCode
    },
    {
      fieldID: STAFF_CODE,
      value: staffCode_agentID
    },
    {
      fieldID: CURRENCY_CODE,
      value: profile.currentCode
    },
    {
      fieldID: TRANSACTION_DESCRIPTION,
      value: transactionDescription || 'Cash-In for Agent',
      optional: true
    },
    {
      fieldID: AMOUNT,
      value: amount
    },
    {
      fieldID: TO_NAME,
      value: toName
    },
    {
      fieldID: TO_ACCOUNT_ID,
      value: toAccountID
    },
    {
      fieldID: FROM_ACCOUNT_ID,
      value: profile.accountId
    },
    {
      fieldID: TO_PHONE,
      value: toPhone
    },
    {
      fieldID: PIN,
      value: pin
    },
    {
      fieldID: PAN,
      value: profile.PAN
    },

    {
      fieldID: CARRIED_CODE,
      value: 1043
    },
    {
      fieldID: 108,
      value: 'CSE_PhuongTest'
    },
    {
      fieldID: 105,
      value: '09691024205'
    },
    {
      fieldID: 125,
      value: 'CSE_PhuongTest'
    },
    {
      fieldID: 78,
      value: 19447
    },
    {
      fieldID: 69,
      value: 19447
    },
    {
      fieldID: 68,
      value: '09691024205'
    },
    {
      fieldID: 34,
      value: '09691024205'
    },
    {
      fieldID: 0,
      value: '0200'
    },
    {
      fieldID: 22,
      value: '1'
    },
    {
      fieldID: 20,
      value: '22'
    }
  ];
};
