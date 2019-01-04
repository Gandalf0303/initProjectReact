export default {
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
  VIETTEL_PHONE_PATTERN:
    '^[+]?(84|0)(98|97|96|163|164|165|166|167|168|169)[\\d]{7}$',
  EMAIL_PATTERN:
    '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$',
  NUMBER_PATTERN: /^(-|\\+)?[0-9]+(\\.[0-9]+)?$/,
  WEBSITE_ADDRESS_PATTERN:
    '(http(s)?://)?([\\w-]+\\.)+[\\w-]+(/[\\w- ;,./?%&=]*)?',

  // PHONE_PATTERN : /^[+]?(84|0)[\d]{9,10}$/
  PHONE_PATTERN_MOBILE: /^[+]?(856|)(9|209|0209|309)[\d]{7}$/,
  MYANMAR_PHONE: /^((0|)(96)\d{8}|[+]?95\d{10})$/,
  NON_MYTEL_PHONE: /^[+]?((95|0|)\d{10})$/,
  // MYANMAR_LONG_PHONE : /^[+]?(95|0|)(96)[\d]{10}$/
  PHONE_PATTERN_UNIPHONE: /^[+]?(856|)(0309|0304|309|304|021|21)[\d]{6}$/,
  // PHONE_PATTERN_0 : /^[+]?(0)[\d]{9,10}$/
  // NAME_PATTERN : /([a-zA-Z ]?){2,}/
  NAME_PATTERN: /^[a-zA-Z0-9. ]{1,}$/,
  STRING_PATTERN: '[a-zA-Z ]+',
  SIMPLE_CHARACTER_PATTERN2: /^[a-zA-Z0-9 ]*$/,
  CHARACTER_PATTERN: /^[_a-zA-Z0-9]*$/,
  SIMPLE_CHARACTER_PATTERN: /^[a-zA-Z0-9]*$/,
  REGEX_CHARACTER_PHONE: /^([+]?(95|0|)(96)[\d]{8})|[_a-zA-Z0-9]$/,
  MONEY_PATTERN: /^[,\d]{1,13}$/,
  BANK_CODE: /^[a-zA-Z0-9]{1,6}$/,
  PASS_CODE: /^[0-9]{6}$/,
  TRANSACTION_ID: /^[a-zA-Z0-9]{1,12}$/,
  ONLY_NUMBER_PATTERN: /^\d+$/,
  IDNO_NUMBER_PATTERN: /^[_a-zA-Z0-9]{1,12}$/,
  IDENTIFICATION_PATTERN: /^[a-zA-Z0-9]{1,12}$/,
  AGENT_CODE_PATTERN: /^[0-9]{1,6}$/,
  ADDRESS_REGISTER: /^[a-zA-Z0-9, ]*$/,
  URL_VALIDATE: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  OTP_PIN_VALIDATE: /^[\d]{6}$/g,
  POSTPAID_CODE_PATTERN: /^([_a-zA-Z0-9 ]{1,30})$/,
  NUMBER_BCCS: /^[\d]{10,13}$/,
  ONLY_NUMBER: /([^0-9]+)/gi,
  REMOVE_FIRST_ZERO: /^0+(?=\d)/,
  TRIM_SPACE: /\s/g
};
