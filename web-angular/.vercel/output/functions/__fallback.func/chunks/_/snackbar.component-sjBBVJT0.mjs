import { aa as input, i as inject, c as computed, ɵ as __defineComponent, ad as __domElement, j as __conditionalCreate, t as __styleProp, aj as __domProperty, u as __attribute, o as __advance, s as __conditional, ak as DomSanitizer, F as signal, ai as __defineInjectable, ag as DestroyRef, al as Injector, m as __repeaterCreate, v as __repeater, r as __pureFunction1, af as output, am as __directiveInject, a3 as ElementRef, an as __defineDirective, H as __listener, Z as __domElementStart, g as __text, $ as __domElementEnd, w as __nextContext, p as __textInterpolate, L as __getCurrentView, f as __elementStart, b as __element, h as __elementEnd, n as __property, ao as ViewContainerRef, ap as __NgOnChangesFeature, aq as __defineNgModule, ar as __defineInjector, as as Renderer2, at as TemplateRef, au as IterableDiffers, av as KeyValueDiffers, aw as __injectAttribute, ax as ChangeDetectorRef, ay as __definePipe, az as LOCALE_ID, aA as DEFAULT_CURRENCY_CODE, aB as InjectionToken, aC as createNgModule, aD as RendererStyleFlags2, aE as __defineService, aF as INTERNAL_APPLICATION_ERROR_HANDLER, aG as isPromise, aH as isSubscribable, aI as NgModuleRef$1, ah as RuntimeError, aJ as __inject, a8 as untracked, aK as findLocaleData, aL as LocaleDataIndex, aM as getLocalePluralCase$1, aN as __sanitizeHtml, S as __resolveDocument, O as __restoreView, P as __resetView } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { s as CloudOff, t as CircleAlert, u as Clock, I as Info, C as CircleCheck, X, e as LucideAngularModule, f as LucideAngularComponent } from './lucide-angular-RJABeBQ2.mjs';
import { L as LocaleService } from './locale.service-c0QhtcVY.mjs';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b, _c, _d, _e;
/**
* @license Angular v22.2.4
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
var CURRENCIES_EN = {
  "ADP": [
    void 0,
    void 0,
    0
  ],
  "AFN": [
    void 0,
    "\u060B",
    0
  ],
  "ALL": [
    void 0,
    void 0,
    0
  ],
  "AMD": [
    void 0,
    "\u058F",
    2
  ],
  "AOA": [void 0, "Kz"],
  "ARS": [void 0, "$"],
  "AUD": ["A$", "$"],
  "AZN": [void 0, "\u20BC"],
  "BAM": [void 0, "KM"],
  "BBD": [void 0, "$"],
  "BDT": [void 0, "\u09F3"],
  "BHD": [
    void 0,
    void 0,
    3
  ],
  "BIF": [
    void 0,
    void 0,
    0
  ],
  "BMD": [void 0, "$"],
  "BND": [void 0, "$"],
  "BOB": [void 0, "Bs"],
  "BRL": ["R$"],
  "BSD": [void 0, "$"],
  "BWP": [void 0, "P"],
  "BYN": [
    void 0,
    void 0,
    2
  ],
  "BYR": [
    void 0,
    void 0,
    0
  ],
  "BZD": [void 0, "$"],
  "CAD": [
    "CA$",
    "$",
    2
  ],
  "CHF": [
    void 0,
    void 0,
    2
  ],
  "CLF": [
    void 0,
    void 0,
    4
  ],
  "CLP": [
    void 0,
    "$",
    0
  ],
  "CNY": ["CN\xA5", "\xA5"],
  "COP": [
    void 0,
    "$",
    2
  ],
  "CRC": [
    void 0,
    "\u20A1",
    2
  ],
  "CUC": [void 0, "$"],
  "CUP": [void 0, "$"],
  "CZK": [
    void 0,
    "K\u010D",
    2
  ],
  "DJF": [
    void 0,
    void 0,
    0
  ],
  "DKK": [
    void 0,
    "kr",
    2
  ],
  "DOP": [void 0, "$"],
  "EGP": [void 0, "E\xA3"],
  "ESP": [
    void 0,
    "\u20A7",
    0
  ],
  "EUR": ["\u20AC"],
  "FJD": [void 0, "$"],
  "FKP": [void 0, "\xA3"],
  "GBP": ["\xA3"],
  "GEL": [void 0, "\u20BE"],
  "GHS": [void 0, "GH\u20B5"],
  "GIP": [void 0, "\xA3"],
  "GNF": [
    void 0,
    "FG",
    0
  ],
  "GTQ": [void 0, "Q"],
  "GYD": [
    void 0,
    "$",
    2
  ],
  "HKD": ["HK$", "$"],
  "HNL": [void 0, "L"],
  "HRK": [void 0, "kn"],
  "HUF": [
    void 0,
    "Ft",
    2
  ],
  "IDR": [
    void 0,
    "Rp",
    2
  ],
  "ILS": ["\u20AA"],
  "INR": ["\u20B9"],
  "IQD": [
    void 0,
    void 0,
    0
  ],
  "IRR": [
    void 0,
    void 0,
    0
  ],
  "ISK": [
    void 0,
    "kr",
    0
  ],
  "ITL": [
    void 0,
    void 0,
    0
  ],
  "JMD": [void 0, "$"],
  "JOD": [
    void 0,
    void 0,
    3
  ],
  "JPY": [
    "\xA5",
    void 0,
    0
  ],
  "KGS": [void 0, "\u20C0"],
  "KHR": [void 0, "\u17DB"],
  "KMF": [
    void 0,
    "CF",
    0
  ],
  "KPW": [
    void 0,
    "\u20A9",
    0
  ],
  "KRW": [
    "\u20A9",
    void 0,
    0
  ],
  "KWD": [
    void 0,
    void 0,
    3
  ],
  "KYD": [void 0, "$"],
  "KZT": [void 0, "\u20B8"],
  "LAK": [
    void 0,
    "\u20AD",
    0
  ],
  "LBP": [
    void 0,
    "L\xA3",
    0
  ],
  "LKR": [void 0, "Rs"],
  "LRD": [void 0, "$"],
  "LTL": [void 0, "Lt"],
  "LUF": [
    void 0,
    void 0,
    0
  ],
  "LVL": [void 0, "Ls"],
  "LYD": [
    void 0,
    void 0,
    3
  ],
  "MGA": [
    void 0,
    "Ar",
    0
  ],
  "MGF": [
    void 0,
    void 0,
    0
  ],
  "MMK": [
    void 0,
    "K",
    0
  ],
  "MNT": [
    void 0,
    "\u20AE",
    2
  ],
  "MRO": [
    void 0,
    void 0,
    0
  ],
  "MUR": [
    void 0,
    "Rs",
    2
  ],
  "MXN": ["MX$", "$"],
  "MYR": [void 0, "RM"],
  "NAD": [void 0, "$"],
  "NGN": [void 0, "\u20A6"],
  "NIO": [void 0, "C$"],
  "NOK": [
    void 0,
    "kr",
    2
  ],
  "NPR": [void 0, "Rs"],
  "NZD": ["NZ$", "$"],
  "OMR": [
    void 0,
    void 0,
    3
  ],
  "PHP": ["\u20B1"],
  "PKR": [
    void 0,
    "Rs",
    2
  ],
  "PLN": [void 0, "z\u0142"],
  "PYG": [
    void 0,
    "\u20B2",
    0
  ],
  "RON": [void 0, "lei"],
  "RSD": [
    void 0,
    void 0,
    0
  ],
  "RUB": [void 0, "\u20BD"],
  "RWF": [
    void 0,
    "RF",
    0
  ],
  "SBD": [void 0, "$"],
  "SEK": [
    void 0,
    "kr",
    2
  ],
  "SGD": [void 0, "$"],
  "SHP": [void 0, "\xA3"],
  "SLE": [
    void 0,
    void 0,
    2
  ],
  "SLL": [
    void 0,
    void 0,
    0
  ],
  "SOS": [
    void 0,
    void 0,
    0
  ],
  "SRD": [void 0, "$"],
  "SSP": [void 0, "\xA3"],
  "STD": [
    void 0,
    void 0,
    0
  ],
  "STN": [void 0, "Db"],
  "SYP": [
    void 0,
    "\xA3",
    0
  ],
  "THB": [void 0, "\u0E3F"],
  "TMM": [
    void 0,
    void 0,
    0
  ],
  "TND": [
    void 0,
    void 0,
    3
  ],
  "TOP": [void 0, "T$"],
  "TRL": [
    void 0,
    void 0,
    0
  ],
  "TRY": [void 0, "\u20BA"],
  "TTD": [void 0, "$"],
  "TWD": [
    "NT$",
    "$",
    2
  ],
  "TZS": [
    void 0,
    void 0,
    2
  ],
  "UAH": [void 0, "\u20B4"],
  "UGX": [
    void 0,
    void 0,
    0
  ],
  "USD": ["$"],
  "UYI": [
    void 0,
    void 0,
    0
  ],
  "UYU": [void 0, "$"],
  "UYW": [
    void 0,
    void 0,
    4
  ],
  "UZS": [
    void 0,
    void 0,
    2
  ],
  "VEF": [
    void 0,
    "Bs",
    2
  ],
  "VND": [
    "\u20AB",
    void 0,
    0
  ],
  "VUV": [
    void 0,
    void 0,
    0
  ],
  "XAF": [
    "FCFA",
    void 0,
    0
  ],
  "XCD": ["EC$", "$"],
  "XCG": ["Cg."],
  "XOF": [
    "F\u202FCFA",
    void 0,
    0
  ],
  "XPF": [
    "CFPF",
    void 0,
    0
  ],
  "XXX": ["\xA4"],
  "YER": [
    void 0,
    void 0,
    0
  ],
  "ZAR": [void 0, "R"],
  "ZMK": [
    void 0,
    void 0,
    0
  ],
  "ZMW": [void 0, "ZK"],
  "ZWD": [
    void 0,
    void 0,
    0
  ]
};
var NumberFormatStyle = /* @__PURE__ */ (function(NumberFormatStyle2) {
  NumberFormatStyle2[NumberFormatStyle2["Decimal"] = 0] = "Decimal";
  NumberFormatStyle2[NumberFormatStyle2["Percent"] = 1] = "Percent";
  NumberFormatStyle2[NumberFormatStyle2["Currency"] = 2] = "Currency";
  NumberFormatStyle2[NumberFormatStyle2["Scientific"] = 3] = "Scientific";
  return NumberFormatStyle2;
})(NumberFormatStyle || {});
var Plural = /* @__PURE__ */ (function(Plural2) {
  Plural2[Plural2["Zero"] = 0] = "Zero";
  Plural2[Plural2["One"] = 1] = "One";
  Plural2[Plural2["Two"] = 2] = "Two";
  Plural2[Plural2["Few"] = 3] = "Few";
  Plural2[Plural2["Many"] = 4] = "Many";
  Plural2[Plural2["Other"] = 5] = "Other";
  return Plural2;
})(Plural || {});
var FormStyle = /* @__PURE__ */ (function(FormStyle2) {
  FormStyle2[FormStyle2["Format"] = 0] = "Format";
  FormStyle2[FormStyle2["Standalone"] = 1] = "Standalone";
  return FormStyle2;
})(FormStyle || {});
var TranslationWidth = /* @__PURE__ */ (function(TranslationWidth2) {
  TranslationWidth2[TranslationWidth2["Narrow"] = 0] = "Narrow";
  TranslationWidth2[TranslationWidth2["Abbreviated"] = 1] = "Abbreviated";
  TranslationWidth2[TranslationWidth2["Wide"] = 2] = "Wide";
  TranslationWidth2[TranslationWidth2["Short"] = 3] = "Short";
  return TranslationWidth2;
})(TranslationWidth || {});
var FormatWidth = /* @__PURE__ */ (function(FormatWidth2) {
  FormatWidth2[FormatWidth2["Short"] = 0] = "Short";
  FormatWidth2[FormatWidth2["Medium"] = 1] = "Medium";
  FormatWidth2[FormatWidth2["Long"] = 2] = "Long";
  FormatWidth2[FormatWidth2["Full"] = 3] = "Full";
  return FormatWidth2;
})(FormatWidth || {});
var NumberSymbol = {
  Decimal: 0,
  Group: 1,
  PercentSign: 3,
  MinusSign: 5,
  Exponential: 6,
  Infinity: 9,
  NaN: 10,
  CurrencyDecimal: 12,
  CurrencyGroup: 13
};
function getLocaleId(locale) {
  return findLocaleData(locale)[LocaleDataIndex.LocaleId];
}
function getLocaleDayPeriods(locale, formStyle, width) {
  const data = findLocaleData(locale);
  return getLastDefinedValue(getLastDefinedValue([data[LocaleDataIndex.DayPeriodsFormat], data[LocaleDataIndex.DayPeriodsStandalone]], formStyle), width);
}
function getLocaleDayNames(locale, formStyle, width) {
  const data = findLocaleData(locale);
  return getLastDefinedValue(getLastDefinedValue([data[LocaleDataIndex.DaysFormat], data[LocaleDataIndex.DaysStandalone]], formStyle), width);
}
function getLocaleMonthNames(locale, formStyle, width) {
  const data = findLocaleData(locale);
  return getLastDefinedValue(getLastDefinedValue([data[LocaleDataIndex.MonthsFormat], data[LocaleDataIndex.MonthsStandalone]], formStyle), width);
}
function getLocaleEraNames(locale, width) {
  const erasData = findLocaleData(locale)[LocaleDataIndex.Eras];
  return getLastDefinedValue(erasData, width);
}
function getLocaleDateFormat(locale, width) {
  return getLastDefinedValue(findLocaleData(locale)[LocaleDataIndex.DateFormat], width);
}
function getLocaleTimeFormat(locale, width) {
  return getLastDefinedValue(findLocaleData(locale)[LocaleDataIndex.TimeFormat], width);
}
function getLocaleDateTimeFormat(locale, width) {
  const dateTimeFormatData = findLocaleData(locale)[LocaleDataIndex.DateTimeFormat];
  return getLastDefinedValue(dateTimeFormatData, width);
}
function getLocaleNumberSymbol(locale, symbol) {
  const data = findLocaleData(locale);
  const res = data[LocaleDataIndex.NumberSymbols][symbol];
  if (typeof res === "undefined") {
    if (symbol === NumberSymbol.CurrencyDecimal) return data[LocaleDataIndex.NumberSymbols][NumberSymbol.Decimal];
    else if (symbol === NumberSymbol.CurrencyGroup) return data[LocaleDataIndex.NumberSymbols][NumberSymbol.Group];
  }
  return res;
}
function getLocaleNumberFormat(locale, type) {
  return findLocaleData(locale)[LocaleDataIndex.NumberFormats][type];
}
function getLocaleCurrencies(locale) {
  return findLocaleData(locale)[LocaleDataIndex.Currencies];
}
var getLocalePluralCase = getLocalePluralCase$1;
function checkFullData(data) {
  if (!data[LocaleDataIndex.ExtraData]) throw new RuntimeError(2303, false);
}
function getLocaleExtraDayPeriodRules(locale) {
  const data = findLocaleData(locale);
  checkFullData(data);
  return (data[LocaleDataIndex.ExtraData][2] || []).map((rule) => {
    if (typeof rule === "string") return extractTime(rule);
    return [extractTime(rule[0]), extractTime(rule[1])];
  });
}
function getLocaleExtraDayPeriods(locale, formStyle, width) {
  const data = findLocaleData(locale);
  checkFullData(data);
  return getLastDefinedValue(getLastDefinedValue([data[LocaleDataIndex.ExtraData][0], data[LocaleDataIndex.ExtraData][1]], formStyle) || [], width) || [];
}
function getLastDefinedValue(data, index) {
  for (let i = index; i > -1; i--) if (typeof data[i] !== "undefined") return data[i];
  throw new RuntimeError(2304, false);
}
function extractTime(time) {
  const [h, m] = time.split(":");
  return {
    hours: +h,
    minutes: +m
  };
}
function getCurrencySymbol(code, format, locale = "en") {
  const currency = getLocaleCurrencies(locale)[code] || CURRENCIES_EN[code] || [];
  const symbolNarrow = currency[1];
  if (format === "narrow" && typeof symbolNarrow === "string") return symbolNarrow;
  return currency[0] || code;
}
var DEFAULT_NB_OF_CURRENCY_DIGITS = 2;
function getNumberOfCurrencyDigits(code) {
  let digits;
  const currency = CURRENCIES_EN[code];
  if (currency) digits = currency[2];
  return typeof digits === "number" ? digits : DEFAULT_NB_OF_CURRENCY_DIGITS;
}
var ISO8601_DATE_REGEX = /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
var NAMED_FORMATS = /* @__PURE__ */ Object.create(null);
var DATE_FORMATS_SPLIT = /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;
var MAX_DATE_FORMAT_LENGTH = 256;
function formatDate(value, format, locale, timezone) {
  let date = toDate(value);
  assertValidDateFormatLength(format);
  format = getNamedFormat(locale, format) || format;
  let parts = [];
  let match;
  while (format) {
    match = DATE_FORMATS_SPLIT.exec(format);
    if (match) {
      parts = parts.concat(match.slice(1));
      const part = parts.pop();
      if (!part) break;
      format = part;
    } else {
      parts.push(format);
      break;
    }
  }
  let dateTimezoneOffset = date.getTimezoneOffset();
  if (timezone) {
    dateTimezoneOffset = timezoneToOffset(timezone, dateTimezoneOffset);
    date = convertTimezoneToLocal(date, timezone);
  }
  let text = "";
  parts.forEach((value2) => {
    const dateFormatter = getDateFormatter(value2);
    text += dateFormatter ? dateFormatter(date, locale, dateTimezoneOffset) : value2 === "''" ? "'" : value2.replace(/(^'|'$)/g, "").replace(/''/g, "'");
  });
  return text;
}
function assertValidDateFormatLength(format) {
  if (format.length > MAX_DATE_FORMAT_LENGTH) throw new RuntimeError(2300, false);
}
function createDate(year, month, date) {
  const newDate = /* @__PURE__ */ new Date(0);
  newDate.setFullYear(year, month, date);
  newDate.setHours(0, 0, 0);
  return newDate;
}
function getNamedFormat(locale, format) {
  var _a2;
  const localeId = getLocaleId(locale);
  (_a2 = NAMED_FORMATS[localeId]) != null ? _a2 : NAMED_FORMATS[localeId] = /* @__PURE__ */ Object.create(null);
  if (NAMED_FORMATS[localeId][format]) return NAMED_FORMATS[localeId][format];
  let formatValue = "";
  switch (format) {
    case "shortDate":
      formatValue = getLocaleDateFormat(locale, FormatWidth.Short);
      break;
    case "mediumDate":
      formatValue = getLocaleDateFormat(locale, FormatWidth.Medium);
      break;
    case "longDate":
      formatValue = getLocaleDateFormat(locale, FormatWidth.Long);
      break;
    case "fullDate":
      formatValue = getLocaleDateFormat(locale, FormatWidth.Full);
      break;
    case "shortTime":
      formatValue = getLocaleTimeFormat(locale, FormatWidth.Short);
      break;
    case "mediumTime":
      formatValue = getLocaleTimeFormat(locale, FormatWidth.Medium);
      break;
    case "longTime":
      formatValue = getLocaleTimeFormat(locale, FormatWidth.Long);
      break;
    case "fullTime":
      formatValue = getLocaleTimeFormat(locale, FormatWidth.Full);
      break;
    case "short":
      const shortTime = getNamedFormat(locale, "shortTime");
      const shortDate = getNamedFormat(locale, "shortDate");
      formatValue = formatDateTime(getLocaleDateTimeFormat(locale, FormatWidth.Short), [shortTime, shortDate]);
      break;
    case "medium":
      const mediumTime = getNamedFormat(locale, "mediumTime");
      const mediumDate = getNamedFormat(locale, "mediumDate");
      formatValue = formatDateTime(getLocaleDateTimeFormat(locale, FormatWidth.Medium), [mediumTime, mediumDate]);
      break;
    case "long":
      const longTime = getNamedFormat(locale, "longTime");
      const longDate = getNamedFormat(locale, "longDate");
      formatValue = formatDateTime(getLocaleDateTimeFormat(locale, FormatWidth.Long), [longTime, longDate]);
      break;
    case "full":
      const fullTime = getNamedFormat(locale, "fullTime");
      const fullDate = getNamedFormat(locale, "fullDate");
      formatValue = formatDateTime(getLocaleDateTimeFormat(locale, FormatWidth.Full), [fullTime, fullDate]);
  }
  if (formatValue) NAMED_FORMATS[localeId][format] = formatValue;
  return formatValue;
}
function formatDateTime(str, opt_values) {
  if (opt_values) str = str.replace(/\{([^}]+)}/g, function(match, key) {
    return Object.hasOwn(opt_values, key) ? opt_values[key] : match;
  });
  return str;
}
function padNumber(num, digits, minusSign = "-", trim, negWrap) {
  let neg = "";
  if (num < 0 || negWrap && num <= 0) {
    if (negWrap) num = -num + 1;
    else {
      num = -num;
      neg = minusSign;
    }
  }
  let strNum = String(num);
  while (strNum.length < digits) strNum = "0" + strNum;
  if (trim) strNum = strNum.slice(strNum.length - digits);
  return neg + strNum;
}
function formatFractionalSeconds(milliseconds, digits) {
  return padNumber(milliseconds, 3).substring(0, digits);
}
function dateGetter(name, size, offset = 0, trim = false, negWrap = false) {
  return function(date, locale) {
    let part = getDatePart(name, date);
    if (offset > 0 || part > -offset) part += offset;
    if (name === 3) {
      if (part === 0 && offset === -12) part = 12;
    } else if (name === 6) return formatFractionalSeconds(part, size);
    const localeMinus = getLocaleNumberSymbol(locale, NumberSymbol.MinusSign);
    return padNumber(part, size, localeMinus, trim, negWrap);
  };
}
function getDatePart(part, date) {
  switch (part) {
    case 0:
      return date.getFullYear();
    case 1:
      return date.getMonth();
    case 2:
      return date.getDate();
    case 3:
      return date.getHours();
    case 4:
      return date.getMinutes();
    case 5:
      return date.getSeconds();
    case 6:
      return date.getMilliseconds();
    case 7:
      return date.getDay();
    default:
      throw new RuntimeError(2301, false);
  }
}
function dateStrGetter(name, width, form = FormStyle.Format, extended = false) {
  return function(date, locale) {
    return getDateTranslation(date, locale, name, width, form, extended);
  };
}
function getDateTranslation(date, locale, name, width, form, extended) {
  switch (name) {
    case 2:
      return getLocaleMonthNames(locale, form, width)[date.getMonth()];
    case 1:
      return getLocaleDayNames(locale, form, width)[date.getDay()];
    case 0:
      const currentHours = date.getHours();
      const currentMinutes = date.getMinutes();
      if (extended) {
        const rules = getLocaleExtraDayPeriodRules(locale);
        const dayPeriods = getLocaleExtraDayPeriods(locale, form, width);
        const index = rules.findIndex((rule) => {
          if (Array.isArray(rule)) {
            const [from, to] = rule;
            const afterFrom = currentHours >= from.hours && currentMinutes >= from.minutes;
            const beforeTo = currentHours < to.hours || currentHours === to.hours && currentMinutes < to.minutes;
            if (from.hours < to.hours) {
              if (afterFrom && beforeTo) return true;
            } else if (afterFrom || beforeTo) return true;
          } else if (rule.hours === currentHours && rule.minutes === currentMinutes) return true;
          return false;
        });
        if (index !== -1) return dayPeriods[index];
      }
      return getLocaleDayPeriods(locale, form, width)[currentHours < 12 ? 0 : 1];
    case 3:
      return getLocaleEraNames(locale, width)[date.getFullYear() <= 0 ? 0 : 1];
    default:
      throw new RuntimeError(2302, false);
  }
}
function timeZoneGetter(width) {
  return function(date, locale, offset) {
    const zone = -1 * offset;
    const minusSign = getLocaleNumberSymbol(locale, NumberSymbol.MinusSign);
    const hours = zone > 0 ? Math.floor(zone / 60) : Math.ceil(zone / 60);
    switch (width) {
      case 0:
        return (zone >= 0 ? "+" : "") + padNumber(hours, 2, minusSign) + padNumber(Math.abs(zone % 60), 2, minusSign);
      case 1:
        return "GMT" + (zone >= 0 ? "+" : "") + padNumber(hours, 1, minusSign);
      case 2:
        return "GMT" + (zone >= 0 ? "+" : "") + padNumber(hours, 2, minusSign) + ":" + padNumber(Math.abs(zone % 60), 2, minusSign);
      case 3:
        if (offset === 0) return "Z";
        else return (zone >= 0 ? "+" : "") + padNumber(hours, 2, minusSign) + ":" + padNumber(Math.abs(zone % 60), 2, minusSign);
      default:
        throw new RuntimeError(2310, false);
    }
  };
}
var JANUARY = 0;
var THURSDAY = 4;
function getFirstThursdayOfYear(year) {
  const firstDayOfYear = createDate(year, JANUARY, 1).getDay();
  return createDate(year, 0, 1 + (firstDayOfYear <= THURSDAY ? THURSDAY : 11) - firstDayOfYear);
}
function getThursdayThisIsoWeek(datetime) {
  const currentDay = datetime.getDay();
  const deltaToThursday = currentDay === 0 ? -3 : THURSDAY - currentDay;
  return createDate(datetime.getFullYear(), datetime.getMonth(), datetime.getDate() + deltaToThursday);
}
function weekGetter(size, monthBased = false) {
  return function(date, locale) {
    let result;
    if (monthBased) {
      const nbDaysBefore1stDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay() - 1;
      const today = date.getDate();
      result = 1 + Math.floor((today + nbDaysBefore1stDayOfMonth) / 7);
    } else {
      const thisThurs = getThursdayThisIsoWeek(date);
      const firstThurs = getFirstThursdayOfYear(thisThurs.getFullYear());
      const diff = thisThurs.getTime() - firstThurs.getTime();
      result = 1 + Math.round(diff / 6048e5);
    }
    return padNumber(result, size, getLocaleNumberSymbol(locale, NumberSymbol.MinusSign));
  };
}
function weekNumberingYearGetter(size, trim = false) {
  return function(date, locale) {
    return padNumber(getThursdayThisIsoWeek(date).getFullYear(), size, getLocaleNumberSymbol(locale, NumberSymbol.MinusSign), trim);
  };
}
var DATE_FORMATS = /* @__PURE__ */ Object.create(null);
function getDateFormatter(format) {
  if (DATE_FORMATS[format]) return DATE_FORMATS[format];
  let formatter;
  switch (format) {
    case "G":
    case "GG":
    case "GGG":
      formatter = dateStrGetter(3, TranslationWidth.Abbreviated);
      break;
    case "GGGG":
      formatter = dateStrGetter(3, TranslationWidth.Wide);
      break;
    case "GGGGG":
      formatter = dateStrGetter(3, TranslationWidth.Narrow);
      break;
    case "y":
      formatter = dateGetter(0, 1, 0, false, true);
      break;
    case "yy":
      formatter = dateGetter(0, 2, 0, true, true);
      break;
    case "yyy":
      formatter = dateGetter(0, 3, 0, false, true);
      break;
    case "yyyy":
      formatter = dateGetter(0, 4, 0, false, true);
      break;
    case "Y":
      formatter = weekNumberingYearGetter(1);
      break;
    case "YY":
      formatter = weekNumberingYearGetter(2, true);
      break;
    case "YYY":
      formatter = weekNumberingYearGetter(3);
      break;
    case "YYYY":
      formatter = weekNumberingYearGetter(4);
      break;
    case "M":
    case "L":
      formatter = dateGetter(1, 1, 1);
      break;
    case "MM":
    case "LL":
      formatter = dateGetter(1, 2, 1);
      break;
    case "MMM":
      formatter = dateStrGetter(2, TranslationWidth.Abbreviated);
      break;
    case "MMMM":
      formatter = dateStrGetter(2, TranslationWidth.Wide);
      break;
    case "MMMMM":
      formatter = dateStrGetter(2, TranslationWidth.Narrow);
      break;
    case "LLL":
      formatter = dateStrGetter(2, TranslationWidth.Abbreviated, FormStyle.Standalone);
      break;
    case "LLLL":
      formatter = dateStrGetter(2, TranslationWidth.Wide, FormStyle.Standalone);
      break;
    case "LLLLL":
      formatter = dateStrGetter(2, TranslationWidth.Narrow, FormStyle.Standalone);
      break;
    case "w":
      formatter = weekGetter(1);
      break;
    case "ww":
      formatter = weekGetter(2);
      break;
    case "W":
      formatter = weekGetter(1, true);
      break;
    case "d":
      formatter = dateGetter(2, 1);
      break;
    case "dd":
      formatter = dateGetter(2, 2);
      break;
    case "c":
    case "cc":
      formatter = dateGetter(7, 1);
      break;
    case "ccc":
      formatter = dateStrGetter(1, TranslationWidth.Abbreviated, FormStyle.Standalone);
      break;
    case "cccc":
      formatter = dateStrGetter(1, TranslationWidth.Wide, FormStyle.Standalone);
      break;
    case "ccccc":
      formatter = dateStrGetter(1, TranslationWidth.Narrow, FormStyle.Standalone);
      break;
    case "cccccc":
      formatter = dateStrGetter(1, TranslationWidth.Short, FormStyle.Standalone);
      break;
    case "E":
    case "EE":
    case "EEE":
      formatter = dateStrGetter(1, TranslationWidth.Abbreviated);
      break;
    case "EEEE":
      formatter = dateStrGetter(1, TranslationWidth.Wide);
      break;
    case "EEEEE":
      formatter = dateStrGetter(1, TranslationWidth.Narrow);
      break;
    case "EEEEEE":
      formatter = dateStrGetter(1, TranslationWidth.Short);
      break;
    case "a":
    case "aa":
    case "aaa":
      formatter = dateStrGetter(0, TranslationWidth.Abbreviated);
      break;
    case "aaaa":
      formatter = dateStrGetter(0, TranslationWidth.Wide);
      break;
    case "aaaaa":
      formatter = dateStrGetter(0, TranslationWidth.Narrow);
      break;
    case "b":
    case "bb":
    case "bbb":
      formatter = dateStrGetter(0, TranslationWidth.Abbreviated, FormStyle.Standalone, true);
      break;
    case "bbbb":
      formatter = dateStrGetter(0, TranslationWidth.Wide, FormStyle.Standalone, true);
      break;
    case "bbbbb":
      formatter = dateStrGetter(0, TranslationWidth.Narrow, FormStyle.Standalone, true);
      break;
    case "B":
    case "BB":
    case "BBB":
      formatter = dateStrGetter(0, TranslationWidth.Abbreviated, FormStyle.Format, true);
      break;
    case "BBBB":
      formatter = dateStrGetter(0, TranslationWidth.Wide, FormStyle.Format, true);
      break;
    case "BBBBB":
      formatter = dateStrGetter(0, TranslationWidth.Narrow, FormStyle.Format, true);
      break;
    case "h":
      formatter = dateGetter(3, 1, -12);
      break;
    case "hh":
      formatter = dateGetter(3, 2, -12);
      break;
    case "H":
      formatter = dateGetter(3, 1);
      break;
    case "HH":
      formatter = dateGetter(3, 2);
      break;
    case "m":
      formatter = dateGetter(4, 1);
      break;
    case "mm":
      formatter = dateGetter(4, 2);
      break;
    case "s":
      formatter = dateGetter(5, 1);
      break;
    case "ss":
      formatter = dateGetter(5, 2);
      break;
    case "S":
      formatter = dateGetter(6, 1);
      break;
    case "SS":
      formatter = dateGetter(6, 2);
      break;
    case "SSS":
      formatter = dateGetter(6, 3);
      break;
    case "Z":
    case "ZZ":
    case "ZZZ":
      formatter = timeZoneGetter(0);
      break;
    case "ZZZZZ":
      formatter = timeZoneGetter(3);
      break;
    case "O":
    case "OO":
    case "OOO":
    case "z":
    case "zz":
    case "zzz":
      formatter = timeZoneGetter(1);
      break;
    case "OOOO":
    case "ZZZZ":
    case "zzzz":
      formatter = timeZoneGetter(2);
      break;
    default:
      return null;
  }
  DATE_FORMATS[format] = formatter;
  return formatter;
}
function timezoneToOffset(timezone, fallback) {
  timezone = timezone.replace(/:/g, "");
  const requestedTimezoneOffset = Date.parse("Jan 01, 1970 00:00:00 " + timezone) / 6e4;
  return isNaN(requestedTimezoneOffset) ? fallback : requestedTimezoneOffset;
}
function addDateMinutes(date, minutes) {
  date = new Date(date.getTime());
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}
function convertTimezoneToLocal(date, timezone, reverse) {
  const reverseValue = -1;
  const dateTimezoneOffset = date.getTimezoneOffset();
  return addDateMinutes(date, reverseValue * (timezoneToOffset(timezone, dateTimezoneOffset) - dateTimezoneOffset));
}
function toDate(value) {
  if (isDate(value)) return value;
  if (typeof value === "number" && !isNaN(value)) return new Date(value);
  if (typeof value === "string") {
    value = value.trim();
    if (/^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(value)) {
      const [y, m = 1, d = 1] = value.split("-").map((val) => +val);
      return createDate(y, m - 1, d);
    }
    const parsedNb = parseFloat(value);
    if (!isNaN(value - parsedNb)) return new Date(parsedNb);
    let match;
    if (match = value.match(ISO8601_DATE_REGEX)) return isoStringToDate(match);
  }
  const date = new Date(value);
  if (!isDate(date)) throw new RuntimeError(2311, false);
  return date;
}
function isoStringToDate(match) {
  const date = /* @__PURE__ */ new Date(0);
  let tzHour = 0;
  let tzMin = 0;
  const dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear;
  const timeSetter = match[8] ? date.setUTCHours : date.setHours;
  if (match[9]) {
    tzHour = Number(match[9] + match[10]);
    tzMin = Number(match[9] + match[11]);
  }
  dateSetter.call(date, Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  const h = Number(match[4] || 0) - tzHour;
  const m = Number(match[5] || 0) - tzMin;
  const s = Number(match[6] || 0);
  const ms = Math.floor(parseFloat("0." + (match[7] || 0)) * 1e3);
  timeSetter.call(date, h, m, s, ms);
  return date;
}
function isDate(value) {
  return value instanceof Date && !isNaN(value.valueOf());
}
var NUMBER_FORMAT_REGEXP = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
var MAX_DIGITS = 22;
var DECIMAL_SEP = ".";
var ZERO_CHAR = "0";
var PATTERN_SEP = ";";
var GROUP_SEP = ",";
var DIGIT_CHAR = "#";
var CURRENCY_CHAR = "\xA4";
var PERCENT_CHAR = "%";
function formatNumberToLocaleString(value, pattern, locale, groupSymbol, decimalSymbol, digitsInfo, isPercent = false) {
  let formattedText = "";
  let isZero = false;
  if (!isFinite(value)) formattedText = getLocaleNumberSymbol(locale, Number.isNaN(value) ? NumberSymbol.NaN : NumberSymbol.Infinity);
  else {
    let parsedNumber = parseNumber(value);
    if (isPercent) parsedNumber = toPercent(parsedNumber);
    let minInt = pattern.minInt;
    let minFraction = pattern.minFrac;
    let maxFraction = pattern.maxFrac;
    if (digitsInfo) {
      const parts = digitsInfo.match(NUMBER_FORMAT_REGEXP);
      if (parts === null) throw new RuntimeError(2306, false);
      const minIntPart = parts[1];
      const minFractionPart = parts[3];
      const maxFractionPart = parts[5];
      if (minIntPart != null) minInt = parseIntAutoRadix(minIntPart);
      if (minFractionPart != null) minFraction = parseIntAutoRadix(minFractionPart);
      if (maxFractionPart != null) maxFraction = parseIntAutoRadix(maxFractionPart);
      else if (minFractionPart != null && minFraction > maxFraction) maxFraction = minFraction;
      const MAX_ALLOWED_DIGITS = 100;
      if (minInt > MAX_ALLOWED_DIGITS || minFraction > MAX_ALLOWED_DIGITS || maxFraction > MAX_ALLOWED_DIGITS) throw new RuntimeError(2306, false);
    }
    roundNumber(parsedNumber, minFraction, maxFraction);
    let digits = parsedNumber.digits;
    let integerLen = parsedNumber.integerLen;
    const exponent = parsedNumber.exponent;
    let decimals = [];
    isZero = digits.every((d) => !d);
    for (; integerLen < minInt; integerLen++) digits.unshift(0);
    for (; integerLen < 0; integerLen++) digits.unshift(0);
    if (integerLen > 0) decimals = digits.splice(integerLen, digits.length);
    else {
      decimals = digits;
      digits = [0];
    }
    const groups = [];
    if (digits.length >= pattern.lgSize) groups.unshift(digits.splice(-pattern.lgSize, digits.length).join(""));
    while (digits.length > pattern.gSize) groups.unshift(digits.splice(-pattern.gSize, digits.length).join(""));
    if (digits.length) groups.unshift(digits.join(""));
    formattedText = groups.join(getLocaleNumberSymbol(locale, groupSymbol));
    if (decimals.length) formattedText += getLocaleNumberSymbol(locale, decimalSymbol) + decimals.join("");
    if (exponent) formattedText += getLocaleNumberSymbol(locale, NumberSymbol.Exponential) + "+" + exponent;
  }
  if (value < 0 && !isZero) formattedText = pattern.negPre + formattedText + pattern.negSuf;
  else formattedText = pattern.posPre + formattedText + pattern.posSuf;
  return formattedText;
}
function formatCurrency(value, locale, currency, currencyCode, digitsInfo) {
  const pattern = parseNumberFormat(getLocaleNumberFormat(locale, NumberFormatStyle.Currency), getLocaleNumberSymbol(locale, NumberSymbol.MinusSign));
  pattern.minFrac = getNumberOfCurrencyDigits(currencyCode);
  pattern.maxFrac = pattern.minFrac;
  return formatNumberToLocaleString(value, pattern, locale, NumberSymbol.CurrencyGroup, NumberSymbol.CurrencyDecimal, digitsInfo).replace(CURRENCY_CHAR, currency).replace(CURRENCY_CHAR, "").trim();
}
function formatPercent(value, locale, digitsInfo) {
  return formatNumberToLocaleString(value, parseNumberFormat(getLocaleNumberFormat(locale, NumberFormatStyle.Percent), getLocaleNumberSymbol(locale, NumberSymbol.MinusSign)), locale, NumberSymbol.Group, NumberSymbol.Decimal, digitsInfo, true).replace(new RegExp(PERCENT_CHAR, "g"), getLocaleNumberSymbol(locale, NumberSymbol.PercentSign));
}
function formatNumber(value, locale, digitsInfo) {
  return formatNumberToLocaleString(value, parseNumberFormat(getLocaleNumberFormat(locale, NumberFormatStyle.Decimal), getLocaleNumberSymbol(locale, NumberSymbol.MinusSign)), locale, NumberSymbol.Group, NumberSymbol.Decimal, digitsInfo);
}
function parseNumberFormat(format, minusSign = "-") {
  const p = {
    minInt: 1,
    minFrac: 0,
    maxFrac: 0,
    posPre: "",
    posSuf: "",
    negPre: "",
    negSuf: "",
    gSize: 0,
    lgSize: 0
  };
  const patternParts = format.split(PATTERN_SEP);
  const positive = patternParts[0];
  const negative = patternParts[1];
  const positiveParts = positive.indexOf(DECIMAL_SEP) !== -1 ? positive.split(DECIMAL_SEP) : [positive.substring(0, positive.lastIndexOf(ZERO_CHAR) + 1), positive.substring(positive.lastIndexOf(ZERO_CHAR) + 1)], integer = positiveParts[0], fraction = positiveParts[1] || "";
  p.posPre = integer.substring(0, integer.indexOf(DIGIT_CHAR));
  for (let i = 0; i < fraction.length; i++) {
    const ch = fraction.charAt(i);
    if (ch === ZERO_CHAR) p.minFrac = p.maxFrac = i + 1;
    else if (ch === DIGIT_CHAR) p.maxFrac = i + 1;
    else p.posSuf += ch;
  }
  const groups = integer.split(GROUP_SEP);
  p.gSize = groups[1] ? groups[1].length : 0;
  p.lgSize = groups[2] || groups[1] ? (groups[2] || groups[1]).length : 0;
  if (negative) {
    const trunkLen = positive.length - p.posPre.length - p.posSuf.length, pos = negative.indexOf(DIGIT_CHAR);
    p.negPre = negative.substring(0, pos).replace(/'/g, "");
    p.negSuf = negative.slice(pos + trunkLen).replace(/'/g, "");
  } else {
    p.negPre = minusSign + p.posPre;
    p.negSuf = p.posSuf;
  }
  return p;
}
function toPercent(parsedNumber) {
  if (parsedNumber.digits[0] === 0) return parsedNumber;
  const fractionLen = parsedNumber.digits.length - parsedNumber.integerLen;
  if (parsedNumber.exponent) parsedNumber.exponent += 2;
  else {
    if (fractionLen === 0) parsedNumber.digits.push(0, 0);
    else if (fractionLen === 1) parsedNumber.digits.push(0);
    parsedNumber.integerLen += 2;
  }
  return parsedNumber;
}
function parseNumber(num) {
  let numStr = Math.abs(num) + "";
  let exponent = 0, digits, integerLen;
  let i, j, zeros;
  if ((integerLen = numStr.indexOf(DECIMAL_SEP)) > -1) numStr = numStr.replace(DECIMAL_SEP, "");
  if ((i = numStr.search(/e/i)) > 0) {
    if (integerLen < 0) integerLen = i;
    integerLen += +numStr.slice(i + 1);
    numStr = numStr.substring(0, i);
  } else if (integerLen < 0) integerLen = numStr.length;
  for (i = 0; numStr.charAt(i) === ZERO_CHAR; i++) ;
  if (i === (zeros = numStr.length)) {
    digits = [0];
    integerLen = 1;
  } else {
    zeros--;
    while (numStr.charAt(zeros) === ZERO_CHAR) zeros--;
    integerLen -= i;
    digits = [];
    for (j = 0; i <= zeros; i++, j++) digits[j] = Number(numStr.charAt(i));
  }
  if (integerLen > MAX_DIGITS) {
    digits = digits.splice(0, 21);
    exponent = integerLen - 1;
    integerLen = 1;
  }
  return {
    digits,
    exponent,
    integerLen
  };
}
function roundNumber(parsedNumber, minFrac, maxFrac) {
  if (minFrac > maxFrac) throw new RuntimeError(2307, false);
  let digits = parsedNumber.digits;
  let fractionLen = digits.length - parsedNumber.integerLen;
  const fractionSize = Math.min(Math.max(minFrac, fractionLen), maxFrac);
  let roundAt = fractionSize + parsedNumber.integerLen;
  let digit = digits[roundAt];
  if (roundAt > 0) {
    digits.splice(Math.max(parsedNumber.integerLen, roundAt));
    for (let j = roundAt; j < digits.length; j++) digits[j] = 0;
  } else {
    fractionLen = Math.max(0, fractionLen);
    parsedNumber.integerLen = 1;
    digits.length = Math.max(1, roundAt = fractionSize + 1);
    digits[0] = 0;
    for (let i = 1; i < roundAt; i++) digits[i] = 0;
  }
  if (digit >= 5) {
    if (roundAt - 1 < 0) {
      for (let k = 0; k > roundAt; k--) {
        digits.unshift(0);
        parsedNumber.integerLen++;
      }
      digits.unshift(1);
      parsedNumber.integerLen++;
    } else digits[roundAt - 1]++;
  }
  for (; fractionLen < Math.max(0, fractionSize); fractionLen++) digits.push(0);
  let dropTrailingZeros = fractionSize !== 0;
  const minLen = minFrac + parsedNumber.integerLen;
  const carry = digits.reduceRight(function(carry2, d, i, digits2) {
    d = d + carry2;
    digits2[i] = d < 10 ? d : d - 10;
    if (dropTrailingZeros) {
      if (digits2[i] === 0 && i >= minLen) digits2.pop();
      else dropTrailingZeros = false;
    }
    return d >= 10 ? 1 : 0;
  }, 0);
  if (carry) {
    digits.unshift(carry);
    parsedNumber.integerLen++;
  }
}
function parseIntAutoRadix(text) {
  const result = parseInt(text);
  if (isNaN(result)) throw new RuntimeError(2305, false);
  return result;
}
var NgLocalization = /* @__PURE__ */ (() => {
  const _NgLocalization = class _NgLocalization {
  };
  __publicField(_NgLocalization, "\u0275fac", function NgLocalization_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgLocalization)();
  });
  __publicField(_NgLocalization, "\u0275prov", /* @__PURE__ */ __defineService({
    token: _NgLocalization,
    factory: () => (() => new NgLocaleLocalization(inject(LOCALE_ID)))()
  }));
  let NgLocalization2 = _NgLocalization;
  return NgLocalization2;
})();
function getPluralCategory(value, cases, ngLocalization, locale) {
  let key = `=${value}`;
  if (cases.indexOf(key) > -1) return key;
  key = ngLocalization.getPluralCategory(value, locale);
  if (cases.indexOf(key) > -1) return key;
  if (cases.indexOf("other") > -1) return "other";
  throw new RuntimeError(2308, false);
}
var NgLocaleLocalization = /* @__PURE__ */ (() => {
  const _NgLocaleLocalization = class _NgLocaleLocalization extends NgLocalization {
    constructor(locale) {
      super();
      __publicField(this, "locale");
      this.locale = locale;
    }
    getPluralCategory(value, locale) {
      switch (getLocalePluralCase(locale || this.locale)(value)) {
        case Plural.Zero:
          return "zero";
        case Plural.One:
          return "one";
        case Plural.Two:
          return "two";
        case Plural.Few:
          return "few";
        case Plural.Many:
          return "many";
        default:
          return "other";
      }
    }
  };
  __publicField(_NgLocaleLocalization, "\u0275fac", function NgLocaleLocalization_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgLocaleLocalization)(__inject(LOCALE_ID));
  });
  __publicField(_NgLocaleLocalization, "\u0275prov", /* @__PURE__ */ __defineInjectable({
    token: _NgLocaleLocalization,
    factory: _NgLocaleLocalization.\u0275fac
  }));
  let NgLocaleLocalization2 = _NgLocaleLocalization;
  return NgLocaleLocalization2;
})();
var WS_REGEXP = /\s+/;
var EMPTY_ARRAY = [];
var NgClass = /* @__PURE__ */ (() => {
  const _NgClass = class _NgClass {
    constructor(_ngEl, _renderer) {
      __publicField(this, "_ngEl");
      __publicField(this, "_renderer");
      __publicField(this, "initialClasses", EMPTY_ARRAY);
      __publicField(this, "rawClass");
      __publicField(this, "stateMap", /* @__PURE__ */ new Map());
      this._ngEl = _ngEl;
      this._renderer = _renderer;
    }
    set klass(value) {
      this.initialClasses = value != null ? value.trim().split(WS_REGEXP) : EMPTY_ARRAY;
    }
    set ngClass(value) {
      this.rawClass = typeof value === "string" ? value.trim().split(WS_REGEXP) : value;
    }
    ngDoCheck() {
      for (const klass of this.initialClasses) this._updateState(klass, true);
      const rawClass = this.rawClass;
      if (Array.isArray(rawClass) || rawClass instanceof Set) for (const klass of rawClass) this._updateState(klass, true);
      else if (rawClass != null) for (const klass of Object.keys(rawClass)) this._updateState(klass, Boolean(rawClass[klass]));
      this._applyStateDiff();
    }
    _updateState(klass, nextEnabled) {
      const state = this.stateMap.get(klass);
      if (state !== void 0) {
        if (state.enabled !== nextEnabled) {
          state.changed = true;
          state.enabled = nextEnabled;
        }
        state.touched = true;
      } else this.stateMap.set(klass, {
        enabled: nextEnabled,
        changed: true,
        touched: true
      });
    }
    _applyStateDiff() {
      for (const stateEntry of this.stateMap) {
        const klass = stateEntry[0];
        const state = stateEntry[1];
        if (state.changed) {
          this._toggleClass(klass, state.enabled);
          state.changed = false;
        } else if (!state.touched) {
          if (state.enabled) this._toggleClass(klass, false);
          this.stateMap.delete(klass);
        }
        state.touched = false;
      }
    }
    _toggleClass(klass, enabled) {
      klass = klass.trim();
      if (klass.length > 0) klass.split(WS_REGEXP).forEach((klass2) => {
        if (enabled) this._renderer.addClass(this._ngEl.nativeElement, klass2);
        else this._renderer.removeClass(this._ngEl.nativeElement, klass2);
      });
    }
  };
  __publicField(_NgClass, "\u0275fac", function NgClass_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgClass)(__directiveInject(ElementRef), __directiveInject(Renderer2));
  });
  __publicField(_NgClass, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NgClass,
    selectors: [[
      "",
      "ngClass",
      ""
    ]],
    inputs: {
      klass: [
        0,
        "class",
        "klass"
      ],
      ngClass: "ngClass"
    }
  }));
  let NgClass2 = _NgClass;
  return NgClass2;
})();
var NgComponentOutlet = /* @__PURE__ */ (() => {
  const _NgComponentOutlet = class _NgComponentOutlet {
    constructor(_viewContainerRef) {
      __publicField(this, "_viewContainerRef");
      __publicField(this, "ngComponentOutlet", null);
      __publicField(this, "ngComponentOutletInputs");
      __publicField(this, "ngComponentOutletInjector");
      __publicField(this, "ngComponentOutletEnvironmentInjector");
      __publicField(this, "ngComponentOutletContent");
      __publicField(this, "ngComponentOutletNgModule");
      __publicField(this, "_componentRef");
      __publicField(this, "_moduleRef");
      __publicField(this, "_inputsUsed", /* @__PURE__ */ new Map());
      this._viewContainerRef = _viewContainerRef;
    }
    get componentInstance() {
      var _a2, _b2;
      return (_b2 = (_a2 = this._componentRef) == null ? void 0 : _a2.instance) != null ? _b2 : null;
    }
    _needToReCreateNgModuleInstance(changes) {
      return changes["ngComponentOutletNgModule"] !== void 0;
    }
    _needToReCreateComponentInstance(changes) {
      return changes["ngComponentOutlet"] !== void 0 || changes["ngComponentOutletContent"] !== void 0 || changes["ngComponentOutletInjector"] !== void 0 || changes["ngComponentOutletEnvironmentInjector"] !== void 0 || this._needToReCreateNgModuleInstance(changes);
    }
    ngOnChanges(changes) {
      var _a2;
      if (this._needToReCreateComponentInstance(changes)) {
        this._viewContainerRef.clear();
        this._inputsUsed.clear();
        this._componentRef = void 0;
        if (this.ngComponentOutlet) {
          const injector = this.ngComponentOutletInjector || this._viewContainerRef.parentInjector;
          if (this._needToReCreateNgModuleInstance(changes)) {
            (_a2 = this._moduleRef) == null ? void 0 : _a2.destroy();
            if (this.ngComponentOutletNgModule) this._moduleRef = createNgModule(this.ngComponentOutletNgModule, getParentInjector(injector));
            else this._moduleRef = void 0;
          }
          this._componentRef = this._viewContainerRef.createComponent(this.ngComponentOutlet, {
            injector,
            ngModuleRef: this._moduleRef,
            projectableNodes: this.ngComponentOutletContent,
            environmentInjector: this.ngComponentOutletEnvironmentInjector
          });
        }
      }
    }
    ngDoCheck() {
      if (this._componentRef) {
        if (this.ngComponentOutletInputs) for (const inputName of Object.keys(this.ngComponentOutletInputs)) this._inputsUsed.set(inputName, true);
        this._applyInputStateDiff(this._componentRef);
      }
    }
    ngOnDestroy() {
      var _a2;
      (_a2 = this._moduleRef) == null ? void 0 : _a2.destroy();
    }
    _applyInputStateDiff(componentRef) {
      for (const [inputName, touched] of this._inputsUsed) if (!touched) {
        componentRef.setInput(inputName, void 0);
        this._inputsUsed.delete(inputName);
      } else {
        componentRef.setInput(inputName, this.ngComponentOutletInputs[inputName]);
        this._inputsUsed.set(inputName, false);
      }
    }
  };
  __publicField(_NgComponentOutlet, "\u0275fac", function NgComponentOutlet_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgComponentOutlet)(__directiveInject(ViewContainerRef));
  });
  __publicField(_NgComponentOutlet, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NgComponentOutlet,
    selectors: [[
      "",
      "ngComponentOutlet",
      ""
    ]],
    inputs: {
      ngComponentOutlet: "ngComponentOutlet",
      ngComponentOutletInputs: "ngComponentOutletInputs",
      ngComponentOutletInjector: "ngComponentOutletInjector",
      ngComponentOutletEnvironmentInjector: "ngComponentOutletEnvironmentInjector",
      ngComponentOutletContent: "ngComponentOutletContent",
      ngComponentOutletNgModule: "ngComponentOutletNgModule"
    },
    exportAs: ["ngComponentOutlet"],
    features: [__NgOnChangesFeature]
  }));
  let NgComponentOutlet2 = _NgComponentOutlet;
  return NgComponentOutlet2;
})();
function getParentInjector(injector) {
  return injector.get(NgModuleRef$1).injector;
}
var NgForOfContext = class {
  constructor($implicit, ngForOf, index, count) {
    __publicField(this, "$implicit");
    __publicField(this, "ngForOf");
    __publicField(this, "index");
    __publicField(this, "count");
    this.$implicit = $implicit;
    this.ngForOf = ngForOf;
    this.index = index;
    this.count = count;
  }
  get first() {
    return this.index === 0;
  }
  get last() {
    return this.index === this.count - 1;
  }
  get even() {
    return this.index % 2 === 0;
  }
  get odd() {
    return !this.even;
  }
};
var NgForOf = /* @__PURE__ */ (() => {
  const _NgForOf = class _NgForOf {
    constructor(_viewContainer, _template, _differs) {
      __publicField(this, "_viewContainer");
      __publicField(this, "_template");
      __publicField(this, "_differs");
      __publicField(this, "_ngForOf", null);
      __publicField(this, "_ngForOfDirty", true);
      __publicField(this, "_differ", null);
      __publicField(this, "_trackByFn");
      this._viewContainer = _viewContainer;
      this._template = _template;
      this._differs = _differs;
    }
    set ngForOf(ngForOf) {
      this._ngForOf = ngForOf;
      this._ngForOfDirty = true;
    }
    set ngForTrackBy(fn) {
      this._trackByFn = fn;
    }
    get ngForTrackBy() {
      return this._trackByFn;
    }
    set ngForTemplate(value) {
      if (value) this._template = value;
    }
    ngDoCheck() {
      if (this._ngForOfDirty) {
        this._ngForOfDirty = false;
        const value = this._ngForOf;
        if (!this._differ && value) this._differ = this._differs.find(value).create(this.ngForTrackBy);
      }
      if (this._differ) {
        const changes = this._differ.diff(this._ngForOf);
        if (changes) this._applyChanges(changes);
      }
    }
    _applyChanges(changes) {
      const viewContainer = this._viewContainer;
      changes.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
        if (item.previousIndex == null) viewContainer.createEmbeddedView(this._template, new NgForOfContext(item.item, this._ngForOf, -1, -1), currentIndex === null ? void 0 : currentIndex);
        else if (currentIndex == null) viewContainer.remove(adjustedPreviousIndex === null ? void 0 : adjustedPreviousIndex);
        else if (adjustedPreviousIndex !== null) {
          const view = viewContainer.get(adjustedPreviousIndex);
          viewContainer.move(view, currentIndex);
          applyViewChange(view, item);
        }
      });
      for (let i = 0, ilen = viewContainer.length; i < ilen; i++) {
        const context = viewContainer.get(i).context;
        context.index = i;
        context.count = ilen;
        context.ngForOf = this._ngForOf;
      }
      changes.forEachIdentityChange((record) => {
        applyViewChange(viewContainer.get(record.currentIndex), record);
      });
    }
    static ngTemplateContextGuard(dir, ctx) {
      return true;
    }
  };
  __publicField(_NgForOf, "\u0275fac", function NgForOf_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgForOf)(__directiveInject(ViewContainerRef), __directiveInject(TemplateRef), __directiveInject(IterableDiffers));
  });
  __publicField(_NgForOf, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NgForOf,
    selectors: [[
      "",
      "ngFor",
      "",
      "ngForOf",
      ""
    ]],
    inputs: {
      ngForOf: "ngForOf",
      ngForTrackBy: "ngForTrackBy",
      ngForTemplate: "ngForTemplate"
    }
  }));
  let NgForOf2 = _NgForOf;
  return NgForOf2;
})();
function applyViewChange(view, record) {
  view.context.$implicit = record.item;
}
var NgIf = /* @__PURE__ */ (() => {
  const _NgIf = class _NgIf {
    constructor(_viewContainer, templateRef) {
      __publicField(this, "_viewContainer");
      __publicField(this, "_context", new NgIfContext());
      __publicField(this, "_thenTemplateRef", null);
      __publicField(this, "_elseTemplateRef", null);
      __publicField(this, "_thenViewRef", null);
      __publicField(this, "_elseViewRef", null);
      this._viewContainer = _viewContainer;
      this._thenTemplateRef = templateRef;
    }
    set ngIf(condition) {
      this._context.$implicit = this._context.ngIf = condition;
      this._updateView();
    }
    set ngIfThen(templateRef) {
      assertTemplate(templateRef);
      this._thenTemplateRef = templateRef;
      this._thenViewRef = null;
      this._updateView();
    }
    set ngIfElse(templateRef) {
      assertTemplate(templateRef);
      this._elseTemplateRef = templateRef;
      this._elseViewRef = null;
      this._updateView();
    }
    _updateView() {
      if (this._context.$implicit) {
        if (!this._thenViewRef) {
          this._viewContainer.clear();
          this._elseViewRef = null;
          if (this._thenTemplateRef) this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
        }
      } else if (!this._elseViewRef) {
        this._viewContainer.clear();
        this._thenViewRef = null;
        if (this._elseTemplateRef) this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context);
      }
    }
    static ngTemplateContextGuard(dir, ctx) {
      return true;
    }
  };
  __publicField(_NgIf, "ngIfUseIfTypeGuard");
  __publicField(_NgIf, "ngTemplateGuard_ngIf");
  __publicField(_NgIf, "\u0275fac", function NgIf_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgIf)(__directiveInject(ViewContainerRef), __directiveInject(TemplateRef));
  });
  __publicField(_NgIf, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NgIf,
    selectors: [[
      "",
      "ngIf",
      ""
    ]],
    inputs: {
      ngIf: "ngIf",
      ngIfThen: "ngIfThen",
      ngIfElse: "ngIfElse"
    }
  }));
  let NgIf2 = _NgIf;
  return NgIf2;
})();
var NgIfContext = class {
  constructor() {
    __publicField(this, "$implicit", null);
    __publicField(this, "ngIf", null);
  }
};
function assertTemplate(templateRef, property) {
  if (templateRef && !templateRef.createEmbeddedView) throw new RuntimeError(2020, false);
}
var SwitchView = class {
  constructor(_viewContainerRef, _templateRef) {
    __publicField(this, "_viewContainerRef");
    __publicField(this, "_templateRef");
    __publicField(this, "_created", false);
    this._viewContainerRef = _viewContainerRef;
    this._templateRef = _templateRef;
  }
  create() {
    this._created = true;
    this._viewContainerRef.createEmbeddedView(this._templateRef);
  }
  destroy() {
    this._created = false;
    this._viewContainerRef.clear();
  }
  enforceState(created) {
    if (created && !this._created) this.create();
    else if (!created && this._created) this.destroy();
  }
};
var NgSwitch = /* @__PURE__ */ (() => {
  const _NgSwitch = class _NgSwitch {
    constructor() {
      __publicField(this, "_defaultViews", []);
      __publicField(this, "_defaultUsed", false);
      __publicField(this, "_caseCount", 0);
      __publicField(this, "_lastCaseCheckIndex", 0);
      __publicField(this, "_lastCasesMatched", false);
      __publicField(this, "_ngSwitch");
    }
    set ngSwitch(newValue) {
      this._ngSwitch = newValue;
      if (this._caseCount === 0) this._updateDefaultCases(true);
    }
    _addCase() {
      return this._caseCount++;
    }
    _addDefault(view) {
      this._defaultViews.push(view);
    }
    _matchCase(value) {
      const matched = value === this._ngSwitch;
      this._lastCasesMatched || (this._lastCasesMatched = matched);
      this._lastCaseCheckIndex++;
      if (this._lastCaseCheckIndex === this._caseCount) {
        this._updateDefaultCases(!this._lastCasesMatched);
        this._lastCaseCheckIndex = 0;
        this._lastCasesMatched = false;
      }
      return matched;
    }
    _updateDefaultCases(useDefault) {
      if (this._defaultViews.length > 0 && useDefault !== this._defaultUsed) {
        this._defaultUsed = useDefault;
        for (const defaultView of this._defaultViews) defaultView.enforceState(useDefault);
      }
    }
  };
  __publicField(_NgSwitch, "\u0275fac", function NgSwitch_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgSwitch)();
  });
  __publicField(_NgSwitch, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NgSwitch,
    selectors: [[
      "",
      "ngSwitch",
      ""
    ]],
    inputs: { ngSwitch: "ngSwitch" }
  }));
  let NgSwitch2 = _NgSwitch;
  return NgSwitch2;
})();
var NgSwitchCase = /* @__PURE__ */ (() => {
  const _NgSwitchCase = class _NgSwitchCase {
    constructor(viewContainer, templateRef, ngSwitch) {
      __publicField(this, "ngSwitch");
      __publicField(this, "_view");
      __publicField(this, "ngSwitchCase");
      this.ngSwitch = ngSwitch;
      ngSwitch._addCase();
      this._view = new SwitchView(viewContainer, templateRef);
    }
    ngDoCheck() {
      this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase));
    }
  };
  __publicField(_NgSwitchCase, "\u0275fac", function NgSwitchCase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgSwitchCase)(__directiveInject(ViewContainerRef), __directiveInject(TemplateRef), __directiveInject(NgSwitch, 9));
  });
  __publicField(_NgSwitchCase, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NgSwitchCase,
    selectors: [[
      "",
      "ngSwitchCase",
      ""
    ]],
    inputs: { ngSwitchCase: "ngSwitchCase" }
  }));
  let NgSwitchCase2 = _NgSwitchCase;
  return NgSwitchCase2;
})();
var NgSwitchDefault = /* @__PURE__ */ (() => {
  const _NgSwitchDefault = class _NgSwitchDefault {
    constructor(viewContainer, templateRef, ngSwitch) {
      ngSwitch._addDefault(new SwitchView(viewContainer, templateRef));
    }
  };
  __publicField(_NgSwitchDefault, "\u0275fac", function NgSwitchDefault_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgSwitchDefault)(__directiveInject(ViewContainerRef), __directiveInject(TemplateRef), __directiveInject(NgSwitch, 9));
  });
  __publicField(_NgSwitchDefault, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NgSwitchDefault,
    selectors: [[
      "",
      "ngSwitchDefault",
      ""
    ]]
  }));
  let NgSwitchDefault2 = _NgSwitchDefault;
  return NgSwitchDefault2;
})();
var NgPlural = /* @__PURE__ */ (() => {
  const _NgPlural = class _NgPlural {
    constructor(_localization) {
      __publicField(this, "_localization");
      __publicField(this, "_activeView");
      __publicField(this, "_caseViews", {});
      this._localization = _localization;
    }
    set ngPlural(value) {
      this._updateView(value);
    }
    addCase(value, switchView) {
      this._caseViews[value] = switchView;
    }
    _updateView(switchValue) {
      this._clearViews();
      const key = getPluralCategory(switchValue, Object.keys(this._caseViews), this._localization);
      this._activateView(this._caseViews[key]);
    }
    _clearViews() {
      if (this._activeView) this._activeView.destroy();
    }
    _activateView(view) {
      if (view) {
        this._activeView = view;
        this._activeView.create();
      }
    }
  };
  __publicField(_NgPlural, "\u0275fac", function NgPlural_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgPlural)(__directiveInject(NgLocalization));
  });
  __publicField(_NgPlural, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NgPlural,
    selectors: [[
      "",
      "ngPlural",
      ""
    ]],
    inputs: { ngPlural: "ngPlural" }
  }));
  let NgPlural2 = _NgPlural;
  return NgPlural2;
})();
var NgPluralCase = /* @__PURE__ */ (() => {
  const _NgPluralCase = class _NgPluralCase {
    constructor(value, template, viewContainer, ngPlural) {
      __publicField(this, "value");
      this.value = value;
      const isANumber = !isNaN(Number(value));
      ngPlural.addCase(isANumber ? `=${value}` : value, new SwitchView(viewContainer, template));
    }
  };
  __publicField(_NgPluralCase, "\u0275fac", function NgPluralCase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgPluralCase)(__injectAttribute("ngPluralCase"), __directiveInject(TemplateRef), __directiveInject(ViewContainerRef), __directiveInject(NgPlural, 1));
  });
  __publicField(_NgPluralCase, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NgPluralCase,
    selectors: [[
      "",
      "ngPluralCase",
      ""
    ]]
  }));
  let NgPluralCase2 = _NgPluralCase;
  return NgPluralCase2;
})();
var NgStyle = /* @__PURE__ */ (() => {
  const _NgStyle = class _NgStyle {
    constructor(_ngEl, _differs, _renderer) {
      __publicField(this, "_ngEl");
      __publicField(this, "_differs");
      __publicField(this, "_renderer");
      __publicField(this, "_ngStyle", null);
      __publicField(this, "_differ", null);
      this._ngEl = _ngEl;
      this._differs = _differs;
      this._renderer = _renderer;
    }
    set ngStyle(values) {
      this._ngStyle = values;
      if (!this._differ && values) this._differ = this._differs.find(values).create();
    }
    ngDoCheck() {
      if (this._differ) {
        const changes = this._differ.diff(this._ngStyle);
        if (changes) this._applyChanges(changes);
      }
    }
    _setStyle(nameAndUnit, value) {
      const [name, unit] = nameAndUnit.split(".");
      const flags = name.indexOf("-") === -1 ? void 0 : RendererStyleFlags2.DashCase;
      if (value != null) this._renderer.setStyle(this._ngEl.nativeElement, name, unit ? `${value}${unit}` : value, flags);
      else this._renderer.removeStyle(this._ngEl.nativeElement, name, flags);
    }
    _applyChanges(changes) {
      changes.forEachRemovedItem((record) => this._setStyle(record.key, null));
      changes.forEachAddedItem((record) => this._setStyle(record.key, record.currentValue));
      changes.forEachChangedItem((record) => this._setStyle(record.key, record.currentValue));
    }
  };
  __publicField(_NgStyle, "\u0275fac", function NgStyle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgStyle)(__directiveInject(ElementRef), __directiveInject(KeyValueDiffers), __directiveInject(Renderer2));
  });
  __publicField(_NgStyle, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NgStyle,
    selectors: [[
      "",
      "ngStyle",
      ""
    ]],
    inputs: { ngStyle: "ngStyle" }
  }));
  let NgStyle2 = _NgStyle;
  return NgStyle2;
})();
var NgTemplateOutlet = /* @__PURE__ */ (() => {
  const _NgTemplateOutlet = class _NgTemplateOutlet {
    constructor(_viewContainerRef) {
      __publicField(this, "_viewContainerRef");
      __publicField(this, "_viewRef", null);
      __publicField(this, "ngTemplateOutletContext", null);
      __publicField(this, "ngTemplateOutlet", null);
      __publicField(this, "ngTemplateOutletInjector", null);
      __publicField(this, "injector", inject(Injector));
      this._viewContainerRef = _viewContainerRef;
    }
    ngOnChanges(changes) {
      if (this._shouldRecreateView(changes)) {
        const viewContainerRef = this._viewContainerRef;
        if (this._viewRef) viewContainerRef.remove(viewContainerRef.indexOf(this._viewRef));
        if (!this.ngTemplateOutlet) {
          this._viewRef = null;
          return;
        }
        const viewContext = this._createContextForwardProxy();
        this._viewRef = viewContainerRef.createEmbeddedView(this.ngTemplateOutlet, viewContext, { injector: this._getInjector() });
      }
    }
    _getInjector() {
      var _a2;
      if (this.ngTemplateOutletInjector === "outlet") return this.injector;
      return (_a2 = this.ngTemplateOutletInjector) != null ? _a2 : void 0;
    }
    _shouldRecreateView(changes) {
      return !!changes["ngTemplateOutlet"] || !!changes["ngTemplateOutletInjector"];
    }
    _createContextForwardProxy() {
      return new Proxy({}, {
        set: (_target, prop, newValue) => {
          if (!this.ngTemplateOutletContext) return false;
          return Reflect.set(this.ngTemplateOutletContext, prop, newValue);
        },
        get: (_target, prop, receiver) => {
          if (!this.ngTemplateOutletContext) return;
          return Reflect.get(this.ngTemplateOutletContext, prop, receiver);
        }
      });
    }
  };
  __publicField(_NgTemplateOutlet, "\u0275fac", function NgTemplateOutlet_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgTemplateOutlet)(__directiveInject(ViewContainerRef));
  });
  __publicField(_NgTemplateOutlet, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NgTemplateOutlet,
    selectors: [[
      "",
      "ngTemplateOutlet",
      ""
    ]],
    inputs: {
      ngTemplateOutletContext: "ngTemplateOutletContext",
      ngTemplateOutlet: "ngTemplateOutlet",
      ngTemplateOutletInjector: "ngTemplateOutletInjector"
    },
    features: [__NgOnChangesFeature]
  }));
  let NgTemplateOutlet2 = _NgTemplateOutlet;
  return NgTemplateOutlet2;
})();
function invalidPipeArgumentError(type, value) {
  return new RuntimeError(2100, false);
}
var SubscribableStrategy = class {
  createSubscription(async, updateLatestValue, onError) {
    return untracked(() => async.subscribe({
      next: updateLatestValue,
      error: onError
    }));
  }
  dispose(subscription) {
    untracked(() => subscription.unsubscribe());
  }
};
var PromiseStrategy = class {
  createSubscription(async, updateLatestValue, onError) {
    async.then((v) => updateLatestValue == null ? void 0 : updateLatestValue(v), (e) => onError == null ? void 0 : onError(e));
    return { unsubscribe: () => {
      updateLatestValue = null;
      onError = null;
    } };
  }
  dispose(subscription) {
    subscription.unsubscribe();
  }
};
var _promiseStrategy = /* @__PURE__ */ new PromiseStrategy();
var _subscribableStrategy = /* @__PURE__ */ new SubscribableStrategy();
var AsyncPipe = /* @__PURE__ */ (() => {
  const _AsyncPipe = class _AsyncPipe {
    constructor(ref) {
      __publicField(this, "_ref");
      __publicField(this, "_latestValue", null);
      __publicField(this, "markForCheckOnValueUpdate", true);
      __publicField(this, "_subscription", null);
      __publicField(this, "_obj", null);
      __publicField(this, "_strategy", null);
      __publicField(this, "applicationErrorHandler", inject(INTERNAL_APPLICATION_ERROR_HANDLER));
      this._ref = ref;
    }
    ngOnDestroy() {
      if (this._subscription) this._dispose();
      this._ref = null;
    }
    transform(obj) {
      if (!this._obj) {
        if (obj) try {
          this.markForCheckOnValueUpdate = false;
          this._subscribe(obj);
        } finally {
          this.markForCheckOnValueUpdate = true;
        }
        return this._latestValue;
      }
      if (obj !== this._obj) {
        this._dispose();
        return this.transform(obj);
      }
      return this._latestValue;
    }
    _subscribe(obj) {
      this._obj = obj;
      this._strategy = this._selectStrategy(obj);
      this._subscription = this._strategy.createSubscription(obj, (value) => this._updateLatestValue(obj, value), (e) => this.applicationErrorHandler(e));
    }
    _selectStrategy(obj) {
      if (isPromise(obj)) return _promiseStrategy;
      if (isSubscribable(obj)) return _subscribableStrategy;
      throw invalidPipeArgumentError();
    }
    _dispose() {
      this._strategy.dispose(this._subscription);
      this._latestValue = null;
      this._subscription = null;
      this._obj = null;
    }
    _updateLatestValue(async, value) {
      var _a2;
      if (async === this._obj) {
        this._latestValue = value;
        if (this.markForCheckOnValueUpdate) (_a2 = this._ref) == null ? void 0 : _a2.markForCheck();
      }
    }
  };
  __publicField(_AsyncPipe, "\u0275fac", function AsyncPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AsyncPipe)(__directiveInject(ChangeDetectorRef, 16));
  });
  __publicField(_AsyncPipe, "\u0275pipe", /* @__PURE__ */ __definePipe({
    name: "async",
    type: _AsyncPipe,
    pure: false
  }));
  let AsyncPipe2 = _AsyncPipe;
  return AsyncPipe2;
})();
var LowerCasePipe = /* @__PURE__ */ (() => {
  const _LowerCasePipe = class _LowerCasePipe {
    transform(value) {
      if (value == null) return null;
      assertPipeArgument(_LowerCasePipe, value);
      return value.toLowerCase();
    }
  };
  __publicField(_LowerCasePipe, "\u0275fac", function LowerCasePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LowerCasePipe)();
  });
  __publicField(_LowerCasePipe, "\u0275pipe", /* @__PURE__ */ __definePipe({
    name: "lowercase",
    type: _LowerCasePipe,
    pure: true
  }));
  let LowerCasePipe2 = _LowerCasePipe;
  return LowerCasePipe2;
})();
var unicodeWordMatch = /(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])\S*/g;
var TitleCasePipe = /* @__PURE__ */ (() => {
  const _TitleCasePipe = class _TitleCasePipe {
    transform(value) {
      if (value == null) return null;
      assertPipeArgument(_TitleCasePipe, value);
      return value.replace(unicodeWordMatch, (txt) => txt[0].toUpperCase() + txt.slice(1).toLowerCase());
    }
  };
  __publicField(_TitleCasePipe, "\u0275fac", function TitleCasePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TitleCasePipe)();
  });
  __publicField(_TitleCasePipe, "\u0275pipe", /* @__PURE__ */ __definePipe({
    name: "titlecase",
    type: _TitleCasePipe,
    pure: true
  }));
  let TitleCasePipe2 = _TitleCasePipe;
  return TitleCasePipe2;
})();
var UpperCasePipe = /* @__PURE__ */ (() => {
  const _UpperCasePipe = class _UpperCasePipe {
    transform(value) {
      if (value == null) return null;
      assertPipeArgument(_UpperCasePipe, value);
      return value.toUpperCase();
    }
  };
  __publicField(_UpperCasePipe, "\u0275fac", function UpperCasePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UpperCasePipe)();
  });
  __publicField(_UpperCasePipe, "\u0275pipe", /* @__PURE__ */ __definePipe({
    name: "uppercase",
    type: _UpperCasePipe,
    pure: true
  }));
  let UpperCasePipe2 = _UpperCasePipe;
  return UpperCasePipe2;
})();
function assertPipeArgument(pipe, value) {
  if (typeof value !== "string") throw invalidPipeArgumentError();
}
var DEFAULT_DATE_FORMAT = "mediumDate";
var DATE_PIPE_DEFAULT_TIMEZONE = /* @__PURE__ */ new InjectionToken("");
var DATE_PIPE_DEFAULT_OPTIONS = /* @__PURE__ */ new InjectionToken("");
var DatePipe = /* @__PURE__ */ (() => {
  const _DatePipe = class _DatePipe {
    constructor(locale, defaultTimezone, defaultOptions) {
      __publicField(this, "locale");
      __publicField(this, "defaultTimezone");
      __publicField(this, "defaultOptions");
      this.locale = locale;
      this.defaultTimezone = defaultTimezone;
      this.defaultOptions = defaultOptions;
    }
    transform(value, format, timezone, locale) {
      var _a2, _b2, _c2, _d2, _e2;
      if (value == null || value === "" || value !== value) return null;
      try {
        const _format = (_b2 = format != null ? format : (_a2 = this.defaultOptions) == null ? void 0 : _a2.dateFormat) != null ? _b2 : DEFAULT_DATE_FORMAT;
        const _timezone = (_e2 = (_d2 = timezone != null ? timezone : (_c2 = this.defaultOptions) == null ? void 0 : _c2.timezone) != null ? _d2 : this.defaultTimezone) != null ? _e2 : void 0;
        return formatDate(value, _format, locale || this.locale, _timezone);
      } catch (error) {
        throw invalidPipeArgumentError(_DatePipe, error.message);
      }
    }
  };
  __publicField(_DatePipe, "\u0275fac", function DatePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DatePipe)(__directiveInject(LOCALE_ID, 16), __directiveInject(DATE_PIPE_DEFAULT_TIMEZONE, 24), __directiveInject(DATE_PIPE_DEFAULT_OPTIONS, 24));
  });
  __publicField(_DatePipe, "\u0275pipe", /* @__PURE__ */ __definePipe({
    name: "date",
    type: _DatePipe,
    pure: true
  }));
  let DatePipe2 = _DatePipe;
  return DatePipe2;
})();
var _INTERPOLATION_REGEXP = /#/g;
var I18nPluralPipe = /* @__PURE__ */ (() => {
  const _I18nPluralPipe = class _I18nPluralPipe {
    constructor(_localization) {
      __publicField(this, "_localization");
      this._localization = _localization;
    }
    transform(value, pluralMap, locale) {
      if (value == null) return "";
      if (typeof pluralMap !== "object" || pluralMap === null) throw invalidPipeArgumentError();
      return pluralMap[getPluralCategory(value, Object.keys(pluralMap), this._localization, locale)].replace(_INTERPOLATION_REGEXP, value.toString());
    }
  };
  __publicField(_I18nPluralPipe, "\u0275fac", function I18nPluralPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _I18nPluralPipe)(__directiveInject(NgLocalization, 16));
  });
  __publicField(_I18nPluralPipe, "\u0275pipe", /* @__PURE__ */ __definePipe({
    name: "i18nPlural",
    type: _I18nPluralPipe,
    pure: true
  }));
  let I18nPluralPipe2 = _I18nPluralPipe;
  return I18nPluralPipe2;
})();
var I18nSelectPipe = /* @__PURE__ */ (() => {
  const _I18nSelectPipe = class _I18nSelectPipe {
    transform(value, mapping) {
      if (value == null) return "";
      if (typeof mapping !== "object" || typeof value !== "string") throw invalidPipeArgumentError();
      if (Object.hasOwn(mapping, value)) return mapping[value];
      if (Object.hasOwn(mapping, "other")) return mapping["other"];
      return "";
    }
  };
  __publicField(_I18nSelectPipe, "\u0275fac", function I18nSelectPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _I18nSelectPipe)();
  });
  __publicField(_I18nSelectPipe, "\u0275pipe", /* @__PURE__ */ __definePipe({
    name: "i18nSelect",
    type: _I18nSelectPipe,
    pure: true
  }));
  let I18nSelectPipe2 = _I18nSelectPipe;
  return I18nSelectPipe2;
})();
var JsonPipe = /* @__PURE__ */ (() => {
  const _JsonPipe = class _JsonPipe {
    transform(value) {
      return JSON.stringify(value, null, 2);
    }
  };
  __publicField(_JsonPipe, "\u0275fac", function JsonPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _JsonPipe)();
  });
  __publicField(_JsonPipe, "\u0275pipe", /* @__PURE__ */ __definePipe({
    name: "json",
    type: _JsonPipe,
    pure: false
  }));
  let JsonPipe2 = _JsonPipe;
  return JsonPipe2;
})();
function makeKeyValuePair(key, value) {
  return {
    key,
    value
  };
}
var KeyValuePipe = /* @__PURE__ */ (() => {
  const _KeyValuePipe = class _KeyValuePipe {
    constructor(differs) {
      __publicField(this, "differs");
      __publicField(this, "differ");
      __publicField(this, "keyValues", []);
      __publicField(this, "compareFn", defaultComparator);
      this.differs = differs;
    }
    transform(input2, compareFn = defaultComparator) {
      var _a2;
      if (!input2 || !(input2 instanceof Map) && typeof input2 !== "object") return null;
      (_a2 = this.differ) != null ? _a2 : this.differ = this.differs.find(input2).create();
      const differChanges = this.differ.diff(input2);
      const compareFnChanged = compareFn !== this.compareFn;
      if (differChanges) {
        this.keyValues = [];
        differChanges.forEachItem((r) => {
          this.keyValues.push(makeKeyValuePair(r.key, r.currentValue));
        });
      }
      if (differChanges || compareFnChanged) {
        if (compareFn) this.keyValues.sort(compareFn);
        this.compareFn = compareFn;
      }
      return this.keyValues;
    }
  };
  __publicField(_KeyValuePipe, "\u0275fac", function KeyValuePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KeyValuePipe)(__directiveInject(KeyValueDiffers, 16));
  });
  __publicField(_KeyValuePipe, "\u0275pipe", /* @__PURE__ */ __definePipe({
    name: "keyvalue",
    type: _KeyValuePipe,
    pure: false
  }));
  let KeyValuePipe2 = _KeyValuePipe;
  return KeyValuePipe2;
})();
function defaultComparator(keyValueA, keyValueB) {
  const a = keyValueA.key;
  const b = keyValueB.key;
  if (a === b) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a == "string" && typeof b == "string") return a < b ? -1 : 1;
  if (typeof a == "number" && typeof b == "number") return a - b;
  if (typeof a == "boolean" && typeof b == "boolean") return a < b ? -1 : 1;
  const aString = String(a);
  const bString = String(b);
  return aString == bString ? 0 : aString < bString ? -1 : 1;
}
var DecimalPipe = /* @__PURE__ */ (() => {
  const _DecimalPipe = class _DecimalPipe {
    constructor(_locale) {
      __publicField(this, "_locale");
      this._locale = _locale;
    }
    transform(value, digitsInfo, locale) {
      if (!isValue(value)) return null;
      locale || (locale = this._locale);
      try {
        return formatNumber(strToNumber(value), locale, digitsInfo);
      } catch (error) {
        throw invalidPipeArgumentError(_DecimalPipe, error.message);
      }
    }
  };
  __publicField(_DecimalPipe, "\u0275fac", function DecimalPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DecimalPipe)(__directiveInject(LOCALE_ID, 16));
  });
  __publicField(_DecimalPipe, "\u0275pipe", /* @__PURE__ */ __definePipe({
    name: "number",
    type: _DecimalPipe,
    pure: true
  }));
  let DecimalPipe2 = _DecimalPipe;
  return DecimalPipe2;
})();
var PercentPipe = /* @__PURE__ */ (() => {
  const _PercentPipe = class _PercentPipe {
    constructor(_locale) {
      __publicField(this, "_locale");
      this._locale = _locale;
    }
    transform(value, digitsInfo, locale) {
      if (!isValue(value)) return null;
      locale || (locale = this._locale);
      try {
        return formatPercent(strToNumber(value), locale, digitsInfo);
      } catch (error) {
        throw invalidPipeArgumentError(_PercentPipe, error.message);
      }
    }
  };
  __publicField(_PercentPipe, "\u0275fac", function PercentPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PercentPipe)(__directiveInject(LOCALE_ID, 16));
  });
  __publicField(_PercentPipe, "\u0275pipe", /* @__PURE__ */ __definePipe({
    name: "percent",
    type: _PercentPipe,
    pure: true
  }));
  let PercentPipe2 = _PercentPipe;
  return PercentPipe2;
})();
var CurrencyPipe = /* @__PURE__ */ (() => {
  const _CurrencyPipe = class _CurrencyPipe {
    constructor(_locale, _defaultCurrencyCode = "USD") {
      __publicField(this, "_locale");
      __publicField(this, "_defaultCurrencyCode");
      this._locale = _locale;
      this._defaultCurrencyCode = _defaultCurrencyCode;
    }
    transform(value, currencyCode = this._defaultCurrencyCode, display = "symbol", digitsInfo, locale) {
      if (!isValue(value)) return null;
      locale || (locale = this._locale);
      if (typeof display === "boolean") display = display ? "symbol" : "code";
      let currency = currencyCode || this._defaultCurrencyCode;
      if (display !== "code") {
        if (display === "symbol" || display === "symbol-narrow") currency = getCurrencySymbol(currency, display === "symbol" ? "wide" : "narrow", locale);
        else currency = display;
      }
      try {
        return formatCurrency(strToNumber(value), locale, currency, currencyCode, digitsInfo);
      } catch (error) {
        throw invalidPipeArgumentError(_CurrencyPipe, error.message);
      }
    }
  };
  __publicField(_CurrencyPipe, "\u0275fac", function CurrencyPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CurrencyPipe)(__directiveInject(LOCALE_ID, 16), __directiveInject(DEFAULT_CURRENCY_CODE, 16));
  });
  __publicField(_CurrencyPipe, "\u0275pipe", /* @__PURE__ */ __definePipe({
    name: "currency",
    type: _CurrencyPipe,
    pure: true
  }));
  let CurrencyPipe2 = _CurrencyPipe;
  return CurrencyPipe2;
})();
function isValue(value) {
  return !(value == null || value === "" || value !== value);
}
function strToNumber(value) {
  if (typeof value === "string" && !isNaN(Number(value) - parseFloat(value))) return Number(value);
  if (typeof value !== "number") throw new RuntimeError(2309, false);
  return value;
}
var SlicePipe = /* @__PURE__ */ (() => {
  const _SlicePipe = class _SlicePipe {
    transform(value, start, end) {
      if (value == null) return null;
      if (!(typeof value === "string" || Array.isArray(value))) throw invalidPipeArgumentError();
      return value.slice(start, end);
    }
  };
  __publicField(_SlicePipe, "\u0275fac", function SlicePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SlicePipe)();
  });
  __publicField(_SlicePipe, "\u0275pipe", /* @__PURE__ */ __definePipe({
    name: "slice",
    type: _SlicePipe,
    pure: false
  }));
  let SlicePipe2 = _SlicePipe;
  return SlicePipe2;
})();
var CommonModule = /* @__PURE__ */ (() => {
  const _CommonModule = class _CommonModule {
  };
  __publicField(_CommonModule, "\u0275fac", function CommonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CommonModule)();
  });
  __publicField(_CommonModule, "\u0275mod", /* @__PURE__ */ __defineNgModule({
    type: _CommonModule,
    imports: [
      NgClass,
      NgComponentOutlet,
      NgForOf,
      NgIf,
      NgTemplateOutlet,
      NgStyle,
      NgSwitch,
      NgSwitchCase,
      NgSwitchDefault,
      NgPlural,
      NgPluralCase,
      AsyncPipe,
      UpperCasePipe,
      LowerCasePipe,
      JsonPipe,
      SlicePipe,
      DecimalPipe,
      PercentPipe,
      TitleCasePipe,
      CurrencyPipe,
      DatePipe,
      I18nPluralPipe,
      I18nSelectPipe,
      KeyValuePipe
    ],
    exports: [
      NgClass,
      NgComponentOutlet,
      NgForOf,
      NgIf,
      NgTemplateOutlet,
      NgStyle,
      NgSwitch,
      NgSwitchCase,
      NgSwitchDefault,
      NgPlural,
      NgPluralCase,
      AsyncPipe,
      UpperCasePipe,
      LowerCasePipe,
      JsonPipe,
      SlicePipe,
      DecimalPipe,
      PercentPipe,
      TitleCasePipe,
      CurrencyPipe,
      DatePipe,
      I18nPluralPipe,
      I18nSelectPipe,
      KeyValuePipe
    ]
  }));
  __publicField(_CommonModule, "\u0275inj", /* @__PURE__ */ __defineInjector({}));
  let CommonModule2 = _CommonModule;
  return CommonModule2;
})();
var BRAND = {
  name: "Mbay Diaay",
  /** Logotype en deux mots : couleurs distinctes selon la variante (voir `ui-brand-logo`). */
  wordmark: ["Mbay", "Diaay"],
  monogram: "MD",
  tagline: "Pilotage des SCOOP",
  partners: "CRADESC",
  symbol: {
    /** Variante « Couleur » : fonds blanc ou crème. */
    color: "/brand/mbay-diaay_symbole_couleur.svg",
    /** Variante « Inverse » : fond forêt uniquement. */
    inverse: "/brand/mbay-diaay_symbole_inverse.svg"
  }
};
var CRADESC = {
  acronym: "CRADESC",
  url: "https://cradesc.org",
  urlLabel: "www.cradesc.org",
  email: "contact@cradesc.org",
  phone: "33 865 05 44",
  phoneHref: "+221338650544",
  address: "Cit\xE9 COSEPI, Ngor Almadies, Dakar",
  /** Logo complet avec le nom développé (sur fond clair uniquement). */
  logo: "/brand/cradesc-logo.png",
  /** Emblème sans sous-titre, lisible en petit (sur fond clair uniquement). */
  emblem: "/brand/cradesc-embleme.png"
};
var LOGIN_PHOTOS = [
  {
    src: "/brand/niayes-oignons.webp",
    author: "Pacocreat",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Ognons_(_s%C3%A9n%C3%A9gal_)_22.jpg",
    position: "50% 65%"
  },
  {
    src: "/brand/niayes-wakhinane.webp",
    author: "Pamgueye",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Lac_de_wakhinane_10.jpg",
    position: "40% 60%"
  },
  {
    src: "/brand/jardin-salades.webp",
    author: "Adama Diop",
    license: "Domaine public",
    source: "https://commons.wikimedia.org/wiki/File:Dans_le_jardin_de_Agnam-Goly.jpg",
    position: "50% 50%"
  },
  {
    src: "/brand/jardin-agroforesterie.webp",
    author: "treesftf",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:KedougouAgroforestry.jpg",
    position: "45% 55%"
  },
  {
    src: "/brand/champ-maraicher.webp",
    author: "Lifelame44",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:Champ_de_Khadim_Diop_14.jpg",
    position: "50% 60%"
  }
];
var PAYMENT_PHOTO = {
  src: "/brand/cotisation-maraichage.webp",
  author: "Habib Houndekindo",
  license: "CC BY-SA 4.0",
  source: "https://commons.wikimedia.org/wiki/File:RURAL_WOMEN_FEEDING_SENEGAL.jpg",
  position: "55% 30%"
};
var ICONS = {
  agriculture: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M145-599q-11.48 0-19.24-9-7.76-9-7.76-21t7.76-21q7.76-9 19.24-9h149q25.16 0 43.08 17.5Q355-624 360-599H145Zm84.88 379Q284-220 322-257.88q38-37.88 38-92T322.12-442q-37.88-38-92-38T138-442.12q-38 37.88-38 92T137.88-258q37.88 38 92 38ZM838-241.82q22-21.83 22-53Q860-326 838.18-348q-21.83-22-53-22Q754-370 732-348.18q-22 21.83-22 53Q710-264 731.82-242q21.83 22 53 22Q816-220 838-241.82ZM230.12-280q-29.12 0-49.62-20.38-20.5-20.38-20.5-49.5t20.38-49.62q20.38-20.5 49.5-20.5t49.62 20.38q20.5 20.38 20.5 49.5t-20.38 49.62q-20.38 20.5-49.5 20.5ZM810-428q19 5 31.5 11t28.5 18v-260q0-26-17-43t-43-17H538l-49-49 62-62-18-18-141 141 18 19 61-61 49 47.64V-597q0 41.66-28.5 71.33T421-496h-69q17 14 26.5 27t21.5 33h21q65 0 112-48t47-113v-62h230v231ZM653-320q6-22 12.5-34.5T684-381H418q2 18 2 30.5t-2 30.5h235Zm132.5 160q-56.5 0-96-38.66Q650-237.31 650-292q0-57.17 40.41-97.59Q730.83-430 788-430q54.69 0 93.34 39.54Q920-350.93 920-295q0 57-39 96t-95.5 39ZM228-160q-79 0-133.5-55.57Q40-271.15 40-350q0-78.85 55.5-134.42Q151-540 229.89-540q78.9 0 134.5 55.61Q420-428.79 420-349.89q0 78.89-55.5 134.39Q309-160 228-160Zm394-360Z"/></svg>',
  analytics: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M292.5-473.38Q284-464.75 284-452v145q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-145q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62Zm332-215Q616-679.75 616-667v360q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-360q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62Zm-166 302Q450-377.75 450-365v58q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-58q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Zm321.5 289.32q8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5 12.82 0 21.32-8.68Z"/></svg>',
  badge: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M232-247h239v-14q0-18-9-32t-23-19q-32-11-50-14.5t-35-3.5q-19 0-40.5 4.5T265-312q-15 5-24 19t-9 32v14Zm361-67h120q11 0 18-7t7-18q0-11-7-18t-18-7H593q-11 0-18 7t-7 18q0 11 7 18t18 7Zm-200.5-65.5Q408-395 408-418t-15.5-38.5Q377-472 354-472t-38.5 15.5Q300-441 300-418t15.5 38.5Q331-364 354-364t38.5-15.5ZM593-427h120q11 0 18-7t7-18q0-11-7-18t-18-7H593q-11 0-18 7t-7 18q0 11 7 18t18 7ZM140-80q-24 0-42-18t-18-42v-480q0-24 18-42t42-18h250v-140q0-24 18-42t42-18h60q24 0 42 18t18 42v140h250q24 0 42 18t18 42v480q0 24-18 42t-42 18H140Zm0-60h680v-480H570v30q0 28-18 44t-42 16h-60q-24 0-42-16t-18-44v-30H140v480Zm310-450h60v-230h-60v230Zm30 210Z"/></svg>',
  calendar_month: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-28q0-13.6 9-22.8 9-9.2 23.02-9.2t23.5 9.2Q310-861.6 310-848v28h340v-28q0-13.6 9-22.8 9-9.2 23.02-9.2t23.5 9.2Q715-861.6 715-848v28h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Zm300 230q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-188.5-11.5Q280-423 280-440t11.5-28.5Q303-480 320-480t28.5 11.5Q360-457 360-440t-11.5 28.5Q337-400 320-400t-28.5-11.5ZM640-400q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-188.5-11.5Q280-263 280-280t11.5-28.5Q303-320 320-320t28.5 11.5Q360-297 360-280t-11.5 28.5Q337-240 320-240t-28.5-11.5ZM640-240q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>',
  chevron_left: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="m406-481 177 177q9 9 8.5 21t-9.5 21q-9 9-21.5 9t-21.5-9L341-460q-5-5-7-10t-2-11q0-6 2-11t7-10l199-199q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5L406-481Z"/></svg>',
  info: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M504.5-288.63q8.5-8.62 8.5-21.37v-180q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v180q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63Zm-1-314.57q9.5-9.2 9.5-22.8 0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2t23.52-9.2ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>',
  csv: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M221-357h102q10.83 0 17.92-7.12 7.08-7.11 7.08-18 0-10.88-7.08-17.88-7.09-7-17.92-7h-85v-146h85q10.83 0 17.92-7.12 7.08-7.11 7.08-18 0-10.88-7.08-17.88-7.09-7-17.92-7H221q-14.02 0-23.51 9.78Q188-583.45 188-569v179q0 14.02 9.49 23.51Q206.98-357 221-357Zm191 0h112q14.03 0 23.51-9.49Q557-375.98 557-390v-78q0-13-9.49-22-9.48-9-23.51-9h-87v-54h95q10.83 0 17.92-7.12 7.08-7.11 7.08-18 0-10.88-7.08-17.88-7.09-7-17.92-7H420q-14.02 0-23.51 9.49Q387-584.03 387-570v78q0 14 9.49 23.5T420-459h87v52h-95q-10.83 0-17.92 7.12-7.08 7.11-7.08 18 0 10.88 7.08 17.88 7.09 7 17.92 7Zm275-63-42-165q-2-8-8.35-13-6.34-5-14.8-5-11.85 0-19.35 10-7.5 10-4.5 21l54 195q2 9 10 14.5t17.44 5.5h15.12q9.44 0 16.94-5.5Q719-368 721-376l60-197q4-11.35-3.45-20.68-7.44-9.32-19.17-9.32-8.38 0-14.88 4.5T735-586l-48 166ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z"/></svg>',
  lock: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M220-80q-24.75 0-42.37-17.63Q160-115.25 160-140v-434q0-24.75 17.63-42.38Q195.25-634 220-634h70v-96q0-78.85 55.61-134.42Q401.21-920 480.11-920q78.89 0 134.39 55.58Q670-808.85 670-730v96h70q24.75 0 42.38 17.62Q800-598.75 800-574v434q0 24.75-17.62 42.37Q764.75-80 740-80H220Zm0-60h520v-434H220v434Zm314.5-162.03Q557-324.06 557-355q0-30-22.67-54.5t-54.5-24.5q-31.83 0-54.33 24.5t-22.5 55q0 30.5 22.67 52.5t54.5 22q31.83 0 54.33-22.03ZM350-634h260v-96q0-54.17-37.88-92.08-37.88-37.92-92-37.92T388-822.08q-38 37.91-38 92.08v96ZM220-140v-434 434Z"/></svg>',
  public: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM437-141v-82q-35 0-59-26t-24-61v-44L149-559q-5 20-7 39.5t-2 39.5q0 130 84.5 227T437-141Zm294-108q44-48 66.5-107.5T820-480q0-106-58-192.5T607-799v18q0 35-24 61t-59 26h-87v87q0 17-13.5 28T393-568h-83v88h258q17 0 28 13t11 30v127h43q29 0 51 17t30 44Z"/></svg>',
  block: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-140q61.01 0 117.51-20.5Q654-181 699-220L220-699q-38 46-59 102.17T140-480q0 142.37 98.81 241.19Q337.63-140 480-140Zm259-121q37-45 59-101.49 22-56.5 22-117.51 0-142.38-98.81-241.19T480-820q-60.66 0-116.83 21T261-739l478 478ZM480-480Z"/></svg>',
  admin_panel_settings: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M480-877q5 0 10.5 1t10.5 3l260 97q17.25 6.93 28.13 22.34Q800-738.26 800-719v187q0 12.33-9 20.66-9 8.34-21 8.34t-21-9q-9-9-9-21v-186l-260-96-260 96v197q0 70 21 129.5T295-286q33 47 74.5 80.5T451-154q11 5 16 16.5t.38 22.63Q462-103 449.5-98 437-93 425-98q-125-51-195-170.74Q160-388.48 160-522v-197q0-19.26 10.88-34.66Q181.75-769.07 199-776l260-97q5.25-2.4 10.5-3.2 5.25-.8 10.5-.8ZM692.5-80Q615-80 560-135.5T505-267q0-78.43 54.99-133.72Q614.98-456 693-456q77 0 132.5 55.28Q881-345.43 881-267q0 76-55.5 131.5T692.5-80ZM480-479Zm254.88 190Q753-308 753-333.88q0-25.88-18.12-44t-44-18.12Q665-396 646-377.88q-19 18.12-19 44T646-289q19 19 44.88 19 25.88 0 44-19Zm-44.69 144q28.19 0 53-11T786-187q4-5 2.5-11t-6.5-8q-22-10-45.22-15.5-23.21-5.5-47-5.5-23.78 0-46.78 5t-45 16q-5 2-7 8t2 11q18 21 43.5 31.5t53.69 10.5Z"/></svg>',
  how_to_reg: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M140-160q-24.75 0-42.37-17.63Q80-195.25 80-220v-34q0-34 17-62.5t51-43.5q72-32 132-46t120-14q14 0 29 .75t27 2.25q12.12 1.55 20.56 11.64 8.44 10.08 6.44 22.5-2 10.86-11.5 18.36T450-358q-14-1-27-1.5t-23-.5q-58 0-105.5 10.5T172-306q-17 8-24.5 23t-7.5 29v34h319q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H140Zm485-68 192-192q9-9 21-9t21 9q9 9 9 21t-9 21L646-165q-9 9-21 9t-21-9l-99-99q-9-9-9-21t9-21q9-9 21-9t21 9l78 78ZM292-524q-42-42-42-108t42-108q42-42 108-42t108 42q42 42 42 108t-42 108q-42 42-108 42t-108-42Zm153 290Zm19.5-333.5Q490-593 490-632t-25.5-64.5Q439-722 400-722t-64.5 25.5Q310-671 310-632t25.5 64.5Q361-542 400-542t64.5-25.5ZM400-632Z"/></svg>',
  notifications_active: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M190-200q-13 0-21.5-8.5T160-230q0-13 8.5-21.5T190-260h50v-304q0-84 49.5-150.5T420-798v-22q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v22q81 17 130.5 83.5T720-564v304h50q13 0 21.5 8.5T800-230q0 13-8.5 21.5T770-200H190Zm290-302Zm0 422q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM300-260h360v-304q0-75-52.5-127.5T480-744q-75 0-127.5 52.5T300-564v304ZM150-566q-13 0-21.5-9t-7.5-22q6-71 38-132t83-106q10-9 22.5-8.5T285-832q8 11 5.5 23.5T278-787q-40 36-65 84t-31 105q-2 14-10.5 23t-21.5 9Zm660 0q-13 0-21.5-9T778-598q-6-57-31-105t-65-84q-10-9-12.5-21.5T675-832q8-11 20.5-11.5T718-835q51 45 83 106t38 132q1 13-7.5 22t-21.5 9Z"/></svg>',
  undo: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M289-200q-13 0-21.5-8.5T259-230q0-13 8.5-21.5T289-260h280q70 0 120.5-46.5T740-422q0-69-50.5-115.5T569-584H274l93 93q9 9 9 21t-9 21q-9 9-21 9t-21-9L181-593q-5-5-7-10t-2-11q0-6 2-11t7-10l144-144q9-9 21-9t21 9q9 9 9 21t-9 21l-93 93h294q95 0 163.5 64T800-422q0 94-68.5 158T568-200H289Z"/></svg>',
  content_copy: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M300-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560ZM180-80q-24 0-42-18t-18-42v-590q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v590h470q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32Q662.75-80 650-80H180Zm120-180v-560 560Z"/></svg>',
  refresh: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-99q0-13 8.5-21.5T770-800q13 0 21.5 8.5T800-770v194q0 13-8.5 21.5T770-546H576q-13 0-21.5-8.5T546-576q0-13 8.5-21.5T576-606h138q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q75 0 140-39.5T717-366q5-11 16.5-16.5t22.5-.5q12 5 16 16.5t-1 23.5q-39 84-117.5 133.5T480-160Z"/></svg>',
  delete_forever: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-11q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h158q0-13 8.63-21.5 8.62-8.5 21.37-8.5h204q12.75 0 21.38 8.62Q612-822.75 612-810h158q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5h-11v570q0 24.75-17.62 42.37Q723.75-120 699-120H261Zm438-630H261v570h438v-570Zm-438 0v570-570Zm219 330 96 97q10 10 24 10.5t24-10q10-10.5 10-24T624-370l-96-98 96-98q10-10 10-23.5T624-613q-10-10-24-10t-24 10l-96 97-95-97q-10-10-24-10t-24 10q-10 10-10 24t10 24l96 97-96 97q-10 10-10 24t10 24q10 10 24 10t24-10l95-97Z"/></svg>',
  accessibility: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M428.5-755.42q-21.5-21.42-21.5-51.5t21.42-51.58q21.42-21.5 51.5-21.5t51.58 21.42q21.5 21.42 21.5 51.5t-21.42 51.58q-21.42 21.5-51.5 21.5t-51.58-21.42ZM372-110v-503H150q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H588v503q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63Q528-97.25 528-110v-230h-96v230q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63Q372-97.25 372-110Z"/></svg>',
  chevron_right: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M530-481 353-658q-9-9-8.5-21t9.5-21q9-9 21.5-9t21.5 9l198 198q5 5 7 10t2 11q0 6-2 11t-7 10L396-261q-9 9-21 8.5t-21-9.5q-9-9-9-21.5t9-21.5l176-176Z"/></svg>',
  credit_score: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M140-640h680v-100H140v100ZM80-740q0-24 18-42t42-18h680q24 0 42 18t18 42v209q0 12.75-8.62 21.37Q862.75-501 850-501H140v281h203q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H140q-24 0-42-18t-18-42v-520Zm60 0v520-120 89-489ZM598-92q-5 0-10.5-2t-10.5-7L449-229q-9-9-8.5-21.5t9.71-21.89q8.45-8.61 21.12-8.61 12.67 0 21.67 9l105 106 218-218q9.07-9 21.53-8.5Q850-392 859-383q8.25 9 8.63 21 .37 12-8.63 21L619-101q-5 5-10.09 7T598-92Z"/></svg>',
  database: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M480-120q-151 0-255.5-46.5T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v400q0 67-104.5 113.5T480-120Zm0-488q86 0 176.5-26.5T773-694q-27-32-117.5-59T480-780q-88 0-177 26t-117 60q28 35 116 60.5T480-608Zm-1 214q42 0 84-4.5t80.5-13.5q38.5-9 73.5-22t63-29v-155q-29 16-64 29t-74 22q-39 9-80 14t-83 5q-42 0-84-5t-80.5-14q-38.5-9-73-22T180-618v155q27 16 61 29t72.5 22q38.5 9 80.5 13.5t85 4.5Zm1 214q48 0 99-8.5t93.5-22.5q42.5-14 72-31t35.5-35v-125q-28 16-63 28.5T643.5-352q-38.5 9-80 13.5T479-334q-43 0-85-4.5T313.5-352q-38.5-9-72.5-21.5T180-402v126q5 17 34 34.5t72 31q43 13.5 94 22t100 8.5Z"/></svg>',
  dataset: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M320-290h80q12 0 21-9t9-21v-80q0-12-9-21t-21-9h-80q-12 0-21 9t-9 21v80q0 12 9 21t21 9Zm240 0h80q12 0 21-9t9-21v-80q0-12-9-21t-21-9h-80q-12 0-21 9t-9 21v80q0 12 9 21t21 9ZM320-530h80q12.75 0 21.38-8.63Q430-547.25 430-560v-80q0-12.75-8.62-21.38Q412.75-670 400-670h-80q-12.75 0-21.37 8.62Q290-652.75 290-640v80q0 12.75 8.63 21.37Q307.25-530 320-530Zm240 0h80q12.75 0 21.38-8.63Q670-547.25 670-560v-80q0-12.75-8.62-21.38Q652.75-670 640-670h-80q-12.75 0-21.37 8.62Q530-652.75 530-640v80q0 12.75 8.63 21.37Q547.25-530 560-530ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Z"/></svg>',
  description: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M349-250h262q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H349q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5Zm0-170h262q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H349q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h336q12.44 0 23.72 5T599-862l183 183q8 8 13 19.28 5 11.28 5 23.72v496q0 24-18 42t-42 18H220Zm331-584v-156H220v680h520v-494H581q-12.75 0-21.37-8.63Q551-651.25 551-664ZM220-820v186-186 680-680Z"/></svg>',
  devices: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M501-540Zm-30 380H110q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32Q97.25-220 110-220h361q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5ZM180-280q-24 0-42-18t-18-42v-400q0-24 18-42t42-18h630q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H180v400h291q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H180Zm640 60v-400H621v400h199Zm-214 60q-18 0-31.5-13.5T561-205v-430q0-18 13.5-31.5T606-680h229q18 0 31.5 13.5T880-635v430q0 18-13.5 31.5T835-160H606Zm115-360q12 0 21-9t9-21q0-12-9-21t-21.48-9Q709-580 700-571t-9 21.48q0 11.52 9 20.52t21 9Zm0 100Z"/></svg>',
  diversity_3: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M40-190v-130q0-29 20.5-49.5T110-390h141q17 0 32.5 8.5T310-358q29 42 74 65t96 23q51 0 96-23t75-65q11-15 26-23.5t32-8.5h141q29 0 49.5 20.5T920-320v130q0 13-8.5 21.5T890-160H690q-13 0-21.5-8.5T660-190v-89q-36 33-82.5 51T480-210q-51 0-97-18t-83-51v89q0 13-8.5 21.5T270-160H70q-13 0-21.5-8.5T40-190Zm440-140q-35 0-67.5-16.5T360-392q-16-23-38.5-37T273-448q29-30 91-46t116-16q54 0 116.5 16t91.5 46q-26 5-48.5 19T601-392q-20 29-52.5 45.5T480-330ZM160-460q-45 0-77.5-32.5T50-570q0-46 32.5-78t77.5-32q46 0 78 32t32 78q0 45-32 77.5T160-460Zm640 0q-45 0-77.5-32.5T690-570q0-46 32.5-78t77.5-32q46 0 78 32t32 78q0 45-32 77.5T800-460ZM480-580q-45 0-77.5-32.5T370-690q0-46 32.5-78t77.5-32q46 0 78 32t32 78q0 45-32 77.5T480-580Z"/></svg>',
  event: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M528-248.18q-28-28.19-28-69Q500-358 528.18-386q28.19-28 69-28Q638-414 666-385.82q28 28.19 28 69Q694-276 665.82-248q-28.19 28-69 28Q556-220 528-248.18ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-28q0-13.6 9-22.8 9-9.2 23.02-9.2t23.5 9.2Q310-861.6 310-848v28h340v-28q0-13.6 9-22.8 9-9.2 23.02-9.2t23.5 9.2Q715-861.6 715-848v28h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"/></svg>',
  event_note: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-28q0-13.6 9-22.8 9-9.2 23.02-9.2t23.5 9.2Q310-861.6 310-848v28h340v-28q0-13.6 9-22.8 9-9.2 23.02-9.2t23.5 9.2Q715-861.6 715-848v28h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Zm130 210q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h340q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H310Zm0 180q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h219q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H310Z"/></svg>',
  fact_check: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M132-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h696q24 0 42 18t18 42v600q0 24-18 42t-42 18H132Zm0-60h696v-600H132v600Zm228-100q17 0 28.5-11.5T400-320q0-17-11.5-28.5T360-360H240q-17 0-28.5 11.5T200-320q0 17 11.5 28.5T240-280h120Zm222-193-29-29q-12-12-28-11.5T497-501q-11 12-11.5 28t11.5 28l64 64q9 9 21 9t21-9l149-149q12-12 12-28t-12-28q-12-12-28.5-12T695-586L582-473Zm-222 33q17 0 28.5-11.5T400-480q0-17-11.5-28.5T360-520H240q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440h120Zm0-160q17 0 28.5-11.5T400-640q0-17-11.5-28.5T360-680H240q-17 0-28.5 11.5T200-640q0 17 11.5 28.5T240-600h120ZM132-180v-600 600Z"/></svg>',
  folder_shared: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M140-160q-24 0-42-18.5T80-220v-520q0-23 18-41.5t42-18.5h256q12.44 0 23.72 5t19.37 13.09L481-740h339q23 0 41.5 18.5T880-680v460q0 23-18.5 41.5T820-160H140Zm0-60h680v-460H456l-60-60H140v520Zm0 0v-520 520Zm299-70h320v-19q0-42-42.5-68.5T599-404q-75 0-117.5 26.5T439-309v19Zm211.5-195.42q21.5-21.42 21.5-51.5t-21.42-51.58q-21.42-21.5-51.5-21.5t-51.58 21.42q-21.5 21.42-21.5 51.5t21.42 51.58q21.42 21.5 51.5 21.5t51.58-21.42Z"/></svg>',
  group: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M38-254q0-35 18-63.5t50-42.5q73-32 131.5-46T358-420q62 0 120 14t131 46q32 14 50.5 42.5T678-254v34q0 25-17.5 42.5T618-160H98q-25 0-42.5-17.5T38-220v-34Zm824 94H724q5-15 9.5-29.5T738-220v-34q0-63-29-101.5T622-420q69 8 130 22t99 34q33 19 52 47t19 63v34q0 25-17.5 42.5T862-160ZM250-523q-42-42-42-108t42-108q42-42 108-42t108 42q42 42 42 108t-42 108q-42 42-108 42t-108-42Zm426 0q-42 42-108 42-11 0-24.5-1.5T519-488q24-25 36.5-61.5T568-631q0-45-12.5-79.5T519-774q11-3 24.5-5t24.5-2q66 0 108 42t42 108q0 66-42 108ZM98-220h520v-34q0-16-9.5-31T585-306q-72-32-121-43t-106-11q-57 0-106.5 11T130-306q-14 6-23 21t-9 31v34Zm324.5-346.5Q448-592 448-631t-25.5-64.5Q397-721 358-721t-64.5 25.5Q268-670 268-631t25.5 64.5Q319-541 358-541t64.5-25.5ZM358-220Zm0-411Z"/></svg>',
  history: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M477-120q-142 0-243.5-95.5T121-451q-1-12 7.5-21t21.5-9q12 0 20.5 8.5T181-451q11 115 95 193t201 78q127 0 215-89t88-216q0-124-89-209.5T477-780q-68 0-127.5 31T246-667h75q13 0 21.5 8.5T351-637q0 13-8.5 21.5T321-607H172q-13 0-21.5-8.5T142-637v-148q0-13 8.5-21.5T172-815q13 0 21.5 8.5T202-785v76q52-61 123.5-96T477-840q75 0 141 28t115.5 76.5Q783-687 811.5-622T840-482q0 75-28.5 141t-78 115Q684-177 618-148.5T477-120Zm34-374 115 113q9 9 9 21.5t-9 21.5q-9 9-21 9t-21-9L460-460q-5-5-7-10.5t-2-11.5v-171q0-13 8.5-21.5T481-683q13 0 21.5 8.5T511-653v159Z"/></svg>',
  home_work: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M920-780v600q0 24.75-17.62 42.37Q884.75-120 860-120H671q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h189v-600H465v70q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-70q0-24.62 17.69-42.31T465-840h395q24.75 0 42.38 17.62Q920-804.75 920-780ZM40-479q0-14 6.5-27.5T65-528l211-151q8.34-5.87 17.07-8.43 8.72-2.57 17.83-2.57 9.1 0 17.89 2.57 8.8 2.56 17.21 8.43l210 151q12 8 18.5 21.5T581-479v299q0 24.75-17.62 42.37Q545.75-120 521-120h-97q-24.75 0-42.37-17.63Q364-155.25 364-180v-141H258v141q0 24.75-17.62 42.37Q222.75-120 198-120h-98q-24.75 0-42.37-17.63Q40-155.25 40-180v-299Zm60 .42V-180h98v-141q0-24.75 17.63-42.38Q233.25-381 258-381h106q24.75 0 42.38 17.62Q424-345.75 424-321v141h97v-298.58L311-630 100-478.58ZM615-563ZM424-180v-201H198v201-201h226v201Zm288-443h30q6 0 10.5-4.5T757-638v-30q0-6-4.5-10.5T742-683h-30q-6 0-10.5 4.5T697-668v30q0 6 4.5 10.5T712-623Zm0 171h30q6 0 10.5-4.5T757-467v-30q0-6-4.5-10.5T742-512h-30q-6 0-10.5 4.5T697-497v30q0 6 4.5 10.5T712-452Zm0 170h30q6 0 10.5-4.5T757-297v-30q0-6-4.5-10.5T742-342h-30q-6 0-10.5 4.5T697-327v30q0 6 4.5 10.5T712-282Z"/></svg>',
  hub: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M153-73q-33-33-33-81t33.25-81q33.25-33 80.75-33 14 0 24.5 2.5T280-258l85-106q-19-23-29-52.5t-5-61.5l-121-41q-15 25-39.5 39T114-466q-47.5 0-80.75-33.25T0-580q0-47.5 33.25-80.75T114-694q47.5 0 80.75 33.25T228-580v4l122 42q18-32 43.5-49t56.5-24v-129q-39-11-61.5-43T366-846q0-47.5 33-80.75T480-960q48 0 81 33.25T594-846q0 35-23 67t-61 43v129q31 7 57 24t44 49l121-42v-4q0-47.5 33.25-80.75T846-694q47.5 0 80.75 33T960-580q0 48-33.25 81T846-466q-32 0-57-14t-39-39l-121 41q5 32-4.5 61.5T595-364l85 106q11-5 21.5-7.5t24.06-2.5Q774-268 807-235t33 81q0 48-33 81t-81 33q-48 0-81-33.25T612-154q0-20 5.5-36t15.5-31l-85-106q-32.13 17-68.56 17Q443-310 411-327l-84 107q10 15 15.5 30.5T348-154q0 47.5-33 80.75T234-40q-48 0-81-33Zm-38.96-453q22.96 0 38.46-15.54 15.5-15.53 15.5-38.5 0-22.96-15.54-38.46-15.53-15.5-38.5-15.5Q91-634 75.5-618.46 60-602.93 60-579.96 60-557 75.54-541.5q15.53 15.5 38.5 15.5ZM272.5-115.54q15.5-15.53 15.5-38.5 0-22.96-15.54-38.46-15.53-15.5-38.5-15.5-22.96 0-38.46 15.54-15.5 15.53-15.5 38.5 0 22.96 15.54 38.46 15.53 15.5 38.5 15.5 22.96 0 38.46-15.54Zm246-692q15.5-15.53 15.5-38.5 0-22.96-15.54-38.46-15.53-15.5-38.5-15.5-22.96 0-38.46 15.54-15.5 15.53-15.5 38.5 0 22.96 15.54 38.46 15.53 15.5 38.5 15.5 22.96 0 38.46-15.54ZM480.5-370q37.5 0 63.5-26.5t26-64q0-37.5-26.1-63.5T480-550q-37 0-63.5 26.1T390-460q0 37 26.5 63.5t64 26.5Zm284 254.46q15.5-15.53 15.5-38.5 0-22.96-15.54-38.46-15.53-15.5-38.5-15.5-22.96 0-38.46 15.54-15.5 15.53-15.5 38.5 0 22.96 15.54 38.46 15.53 15.5 38.5 15.5 22.96 0 38.46-15.54Zm120-426q15.5-15.53 15.5-38.5 0-22.96-15.54-38.46-15.53-15.5-38.5-15.5-22.96 0-38.46 15.54-15.5 15.53-15.5 38.5 0 22.96 15.54 38.46 15.53 15.5 38.5 15.5 22.96 0 38.46-15.54ZM480-846ZM114-580Zm366 120Zm366-120ZM234-154Zm492 0Z"/></svg>',
  inventory_2: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M180-80q-24.75 0-42.37-17.63Q120-115.25 120-140v-483q-17-6-28.5-21.39T80-680v-140q0-24.75 17.63-42.38Q115.25-880 140-880h680q24.75 0 42.38 17.62Q880-844.75 880-820v140q0 20.22-11.5 35.61T840-623v483q0 24.75-17.62 42.37Q804.75-80 780-80H180Zm0-540v480h600v-480H180Zm-40-60h680v-140H140v140Zm250 260h180q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H390q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5Zm90 40Z"/></svg>',
  left_panel_close: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M663-380v-200q0-9.92-9.5-13.46Q644-597 637-590l-89 89q-9 9-9 21t9 21l89 89q7 7 16.5 3.46T663-380ZM180-120q-24.75 0-42.37-17.63Q120-155.25 120-180v-600q0-24.75 17.63-42.38Q155.25-840 180-840h600q24.75 0 42.38 17.62Q840-804.75 840-780v600q0 24.75-17.62 42.37Q804.75-120 780-120H180Zm147-60v-600H180v600h147Zm60 0h393v-600H387v600Zm-60 0H180h147Z"/></svg>',
  left_panel_open: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M527-580v200q0 9.92 9.5 13.46Q546-363 553-370l89-89q9-9 9-21t-9-21l-89-89q-7-7-16.5-3.46T527-580ZM180-120q-24.75 0-42.37-17.63Q120-155.25 120-180v-600q0-24.75 17.63-42.38Q155.25-840 180-840h600q24.75 0 42.38 17.62Q840-804.75 840-780v600q0 24.75-17.62 42.37Q804.75-120 780-120H180Zm147-60v-600H180v600h147Zm60 0h393v-600H387v600Zm-60 0H180h147Z"/></svg>',
  link: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M280-280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h140q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H280q-58.33 0-99.17 40.76-40.83 40.77-40.83 99Q140-422 180.83-381q40.84 41 99.17 41h140q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H280Zm75-170q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h250q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H355Zm185 170q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h140q58.33 0 99.17-40.76 40.83-40.77 40.83-99Q820-538 779.17-579q-40.84-41-99.17-41H540q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h140q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H540Z"/></svg>',
  manage_accounts: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M292-527q-42-42-42-108t42-108q42-42 108-42t108 42q42 42 42 108t-42 108q-42 42-108 42t-108-42ZM80-224v-34q0-35 17.5-64t50.5-44q58-26 119.5-42T393-424q13 0 21.5 8.5T423-394q0 13-8.5 21.5T393-364q-58 0-113.5 14T172-310q-14 8-23 21.5t-9 30.5v34h254q13 0 21.5 8.5T424-194q0 13-8.5 21.5T394-164H140q-25 0-42.5-17.5T80-224Zm584 81-7-43q-17-5-34.5-14.5T593-222l-38 8q-8 2-15-1t-11-10l-6-10q-5-8-3.5-16t7.5-14l33-31q-2-9-2-25t2-25l-33-31q-6-5-7.5-13.5T523-406l6-12q4-7 10.5-9.5t14.5-.5l39 8q12-12 29.5-21.5T657-456l7-43q2-10 9-16.5t17-6.5h8q10 0 17 6.5t9 16.5l7 43q17 5 34.5 14.5T795-420l38-8q8-2 15 1t11 10l6 10q5 8 3.5 16t-7.5 14l-33 31q2 9 2 25t-2 25l33 31q6 5 7.5 13.5T865-236l-6 12q-4 7-10.5 9.5t-14.5.5l-39-8q-12 12-29.5 21.5T731-186l-7 43q-2 10-9 16.5t-17 6.5h-8q-10 0-17-6.5t-9-16.5Zm88-120q22-22 22-58t-22-58q-22-22-58-22t-58 22q-22 22-22 58t22 58q22 22 58 22t58-22ZM464.5-570.5Q490-596 490-635t-25.5-64.5Q439-725 400-725t-64.5 25.5Q310-674 310-635t25.5 64.5Q361-545 400-545t64.5-25.5ZM400-635Zm9 411Z"/></svg>',
  map: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="m592-127-243-86-188 75q-8 3-15 1.5t-13-5.5q-6-4-9.5-10t-3.5-14v-565q0-13 7.5-23t19.5-15l182-64q5-2 10-2.5t10-.5q5 0 10 .5t10 2.5l243 85 187-75q8-3 15-2t13 5q6 4 9.5 10.5T840-795v572q0 11-7.5 19T814-192l-182 65q-5 2-10 2.5t-10 .5q-5 0-10-.5t-10-2.5Zm-14-68v-505l-196-66v505l196 66Zm60 0 142-47v-512l-142 54v505Zm-458-12 142-54v-505l-142 47v512Zm458-493v505-505Zm-316-66v505-505Z"/></svg>',
  payments: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M540-420q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM220-280q-24.75 0-42.37-17.63Q160-315.25 160-340v-400q0-24.75 17.63-42.38Q195.25-800 220-800h640q24.75 0 42.38 17.62Q920-764.75 920-740v400q0 24.75-17.62 42.37Q884.75-280 860-280H220Zm100-60h440q0-42 29-71t71-29v-200q-42 0-71-29t-29-71H320q0 42-29 71t-71 29v200q42 0 71 29t29 71Zm450 180H100q-24.75 0-42.37-17.63Q40-195.25 40-220v-430q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v430h670q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5ZM220-340v-400 400Z"/></svg>',
  pin_drop: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M480-276q109-83 164.5-169.5T700-600q0-97-61.5-158.5T480-820q-97 0-158.5 61.5T260-600q0 67 55.5 153.5T480-276Zm-18 59q-9-3-17-9-125-97-185-192.5T200-600q0-123 78.5-201.5T480-880q123 0 201.5 78.5T760-600q0 86-60 181.5T515-226q-8 6-17 9t-18 3q-9 0-18-3Zm17-303q34 0 57.5-23.5T560-600q0-33-23.5-56.5T479-680q-33 0-56 23.5T400-600q0 33 23 56.5t56 23.5ZM230-80q-13 0-21.5-8.5T200-110q0-13 8.5-21.5T230-140h500q13 0 21.5 8.5T760-110q0 13-8.5 21.5T730-80H230Zm250-520Z"/></svg>',
  potted_plant: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M317-140h326l48-190H269l48 190Zm0 60q-20 0-36.29-12.54Q264.43-105.08 259-125l-52-205h546l-52 205q-5.43 19.92-21.71 32.46Q663-80 643-80H317ZM180-390h600v-100H180v100Zm300-251q5-88 67-150t149-83q4.23-1 7.62-.5 3.38.5 6.38 3.5t4 6.54q1 3.53 0 7.46-17 79-71 138t-133 73.74V-550h300q12.75 0 21.38 8.62Q840-532.75 840-520v130q0 24.75-17.62 42.37Q804.75-330 780-330H180q-24.75 0-42.37-17.63Q120-365.25 120-390v-130q0-12.75 8.63-21.38Q137.25-550 150-550h300v-95q-79-15-133-74t-71-138q-1-3.93 0-7.46 1-3.54 4-6.54t6.38-4q3.39-1 7.62 0 88 20 150 83t66 151Z"/></svg>',
  query_stats: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M63.06-431.41q-10.15-6.88-12.11-18.74Q49-462 55-472l135-217q16.23-26.25 46.12-28.13Q266-719 286-696l72 84 116-189q17.35-28.26 50.18-28.63Q557-830 575-803l73 109 126-199q6.55-10.91 19.27-13.45 12.73-2.55 23.62 5.7Q827-894 828.5-882.5T824-861L698-662q-17 28-49.5 28.5T598-660l-73-108-116 188q-15.85 25.61-46.43 27.8Q332-550 312-573l-71-83-135 216q-7 11-19.5 14t-23.44-5.41ZM582.79-220q48.21 0 82.71-33.49 34.5-33.5 34.5-82Q700-384 666.07-418q-33.93-34-83.07-34-48.3 0-81.65 34.5Q468-383 468-334.79q0 48.21 33.29 81.5t81.5 33.29Zm.21 60q-72.92 0-123.96-51.06-51.04-51.06-51.04-124T459.04-460q51.04-52 123.96-52 73.75 0 125.38 51.62Q760-408.75 760-335q0 29-8.5 54.5T727-233l91 90q9 9 9 21t-9 21q-9 9-21 9t-21-9l-91-91q-22 15-47.5 23.5T583-160Z"/></svg>',
  receipt_long: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M222-80q-43.75 0-74.37-30.63Q117-141.25 117-185v-95q0-12.75 8.63-21.38Q134.25-310 147-310h97v-552q0-5.25 4.5-7.13Q253-871 257-867l36 36q4.64 5 10.82 5 6.18 0 11.18-5l38-38q4.64-5 10.82-5 6.18 0 11.18 5l37 38q4.64 5 10.82 5 6.18 0 11.18-5l38-38q4.64-5 10.82-5 6.18 0 11.18 5l38 38q4.64 5 10.82 5 6.18 0 11.18-5l38-38q4.64-5 10.82-5 6.18 0 11.18 5l38 38q4.64 5 10.82 5 6.18 0 11.18-5l38-38q4.64-5 10.82-5 6.18 0 11.18 5l38 38q4.64 5 10.82 5 6.18 0 11.18-5l36-36q4-4 8.5-2.13 4.5 1.88 4.5 7.13v677q0 43.75-30.62 74.37Q781.75-80 738-80H222Zm516-60q20 0 32.5-12.5T783-185v-595H304v470h359q12.75 0 21.38 8.62Q693-292.75 693-280v94.85q0 20.15 12.5 32.65T738-140ZM387-682h180q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H387q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5Zm0 134h180q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H387q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5Zm303-74q-12 0-21-9t-9-21q0-12 9-21t21-9q12 0 21 9t9 21q0 12-9 21t-21 9Zm0 129q-12 0-21-9t-9-21q0-12 9-21t21-9q12 0 21 9t9 21q0 12-9 21t-21 9ZM221-140h412v-110H177v65q0 20 12.65 32.5T221-140Zm-44 0v-110 110Z"/></svg>',
  schedule: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M513-492v-171q0-13-8.5-21.5T483-693q-13 0-21.5 8.5T453-663v183q0 6 2 11t6 10l144 149q9 10 22.5 9.5T650-310q9-9 9-22t-9-22L513-492ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-82 31.5-155t86-127.5Q252-817 325-848.5T480-880q82 0 155 31.5t127.5 86Q817-708 848.5-635T880-480q0 82-31.5 155t-86 127.5Q708-143 635-111.5T480-80Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480-820q-140 0-240 100T140-480q0 140 100 240t240 100Z"/></svg>',
  sell: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M863-404 557-97q-9 8.5-20.25 12.75T514.25-80Q503-80 492-84.5T472-97L98-472q-8-8-13-18.96-5-10.95-5-23.04v-306q0-24.75 17.63-42.38Q115.25-880 140-880h307q12.07 0 23.39 4.87Q481.7-870.25 490-862l373 373q9.39 9 13.7 20.25 4.3 11.25 4.3 22.5t-4.5 22.75Q872-412 863-404ZM516-138l306-307-375-375H140v304l376 378ZM245-664q21 0 36.5-15.5T297-716q0-21-15.5-36.5T245-768q-21 0-36.5 15.5T193-716q0 21 15.5 36.5T245-664Zm236 185Z"/></svg>',
  space_dashboard: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h270v-600H180v600Zm330 0h270v-301H510v301Zm0-361h270v-239H510v239Z"/></svg>',
  storefront: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M179-120q-24 0-42-18t-18-42v-339q-28-24-37-59t2-70l43-135q8-27 28-42t46-15h553q28 0 49 15.5t29 41.5l44 135q11 35 1.5 70T840-519v339q0 24-18 42t-42 18H179Zm391-430q29 0 49-19t16-46l-25-165H510v165q0 26 17 45.5t43 19.5Zm-187 0q28 0 47.5-19t19.5-46v-165H350l-25 165q-4 26 14 45.5t44 19.5Zm-182 0q24 0 41.5-16.5T263-607l26-173H189l-46 146q-10 31 8 57.5t50 26.5Zm557 0q32 0 50.5-26t8.5-58l-46-146H671l26 173q3 24 20.5 40.5T758-550ZM179-180h601v-311q1 1-6.5 1H758q-25 0-47.5-10.5T666-533q-16 20-40 31.5T573-490q-30 0-51.5-8.5T480-527q-15 18-38 27.5t-52 9.5q-31 0-55-11t-41-32q-24 21-47 32t-46 11h-13.5q-6.5 0-8.5-1v311Zm601 0H179h601Z"/></svg>',
  trending_up: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M102-252q-9-9-9-21.5t9-21.5l228-227q16.93-17 41.97-17Q397-539 414-522l125 125 241-241h-97q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h167q12.75 0 21.38 8.62Q880-680.75 880-668v167q0 12-8.27 21t-20.5 9Q839-471 830-480t-9-21v-93L580-354q-16.93 17-41.97 17Q513-337 496-354L371-478 145-252q-9 9-21.5 9t-21.5-9Z"/></svg>',
  tune: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M435.5-128.63Q427-137.25 427-150v-165q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v53h323q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H487v52q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63ZM150-202q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h187q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm165.5-174.63Q307-385.25 307-398v-52H150q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h157v-54q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v166q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63ZM457-450q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h353q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H457Zm144.5-173.63Q593-632.25 593-645v-165q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v52h157q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H653v53q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63ZM150-698q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h353q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Z"/></svg>',
  upload_file: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M452-403v171q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63 8.5-8.62 8.5-21.37v-171l61 61q3 3 15-2t22.5-9q10.5-4 14.5-3.5T615-342q9-9 8.5-21t-9.5-21L501-494q-5-5-10.13-7-5.14-2-11-2-5.87 0-10.87 2-5 2-10 7L347-382q-9 9-9 21t9 21.39q9 8.61 21 8.61t21-9l63-63ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h336q12.44 0 23.72 5T599-862l183 183q8 8 13 19.28 5 11.28 5 23.72v496q0 24-18 42t-42 18H220Zm331-584v-156H220v680h520v-494H581q-12.75 0-21.37-8.63Q551-651.25 551-664ZM220-820v186-186 680-680Z"/></svg>',
  verified: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="m437-433-73-76q-9-10-22-10t-23 9q-10 10-10 23t10 23l97 96q9 9 21 9t21-9l183-182q9-9 9-22t-10-22q-9-8-21.5-7.5T598-593L437-433ZM332-84l-62-106-124-25q-11-2-18.5-12t-5.5-21l14-120-79-92q-8-8-8-20t8-20l79-91-14-120q-2-11 5.5-21t18.5-12l124-25 62-107q6-10 17-14t22 1l109 51 109-51q11-5 22-1.5t17 13.5l63 108 123 25q11 2 18.5 12t5.5 21l-14 120 79 91q8 8 8 20t-8 20l-79 92 14 120q2 11-5.5 21T814-215l-123 25-63 107q-6 10-17 13.5T589-71l-109-51-109 51q-11 5-22 1t-17-14Zm41-55 107-45 110 45 67-100 117-30-12-119 81-92-81-94 12-119-117-28-69-100-108 45-110-45-67 100-117 28 12 119-81 94 81 92-12 121 117 28 70 100Zm107-341Z"/></svg>',
  account_balance: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M212-271v-279q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v279q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37Zm242 0v-279q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v279q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37ZM110-121q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32Q97.25-181 110-181h740q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H110Zm578-150v-279q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v279q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37Zm166-369H103q-9.58 0-16.29-6.71Q80-653.42 80-663v-17q0-6 3.5-11.5T92-700l358-204q14.17-8 30-8t30 8l357 203q6 4 9.5 10t3.5 13.5v10.23q0 11.59-7.47 19.43Q865.05-640 854-640Zm-640-60h532-532Zm0 0h532L480-852 214-700Z"/></svg>',
  close: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg>',
  apartment: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M180-120q-24.75 0-42.37-17.63Q120-155.25 120-180v-435q0-24.75 17.63-42.38Q155.25-675 180-675h105v-105q0-24.75 17.63-42.38Q320.25-840 345-840h270q24.75 0 42.38 17.62Q675-804.75 675-780v270h105q24.75 0 42.38 17.62Q840-474.75 840-450v270q0 24.75-17.62 42.37Q804.75-120 780-120H533v-165H427v165H180Zm0-60h105v-105H180v105Zm0-165h105v-105H180v105Zm0-165h105v-105H180v105Zm165 165h105v-105H345v105Zm0-165h105v-105H345v105Zm0-165h105v-105H345v105Zm165 330h105v-105H510v105Zm0-165h105v-105H510v105Zm0-165h105v-105H510v105Zm165 495h105v-105H675v105Zm0-165h105v-105H675v105Z"/></svg>',
  grid_view: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M180-510q-24.75 0-42.37-17.63Q120-545.25 120-570v-210q0-24.75 17.63-42.38Q155.25-840 180-840h210q24.75 0 42.38 17.62Q450-804.75 450-780v210q0 24.75-17.62 42.37Q414.75-510 390-510H180Zm0 390q-24.75 0-42.37-17.63Q120-155.25 120-180v-210q0-24.75 17.63-42.38Q155.25-450 180-450h210q24.75 0 42.38 17.62Q450-414.75 450-390v210q0 24.75-17.62 42.37Q414.75-120 390-120H180Zm390-390q-24.75 0-42.37-17.63Q510-545.25 510-570v-210q0-24.75 17.63-42.38Q545.25-840 570-840h210q24.75 0 42.38 17.62Q840-804.75 840-780v210q0 24.75-17.62 42.37Q804.75-510 780-510H570Zm0 390q-24.75 0-42.37-17.63Q510-155.25 510-180v-210q0-24.75 17.63-42.38Q545.25-450 570-450h210q24.75 0 42.38 17.62Q840-414.75 840-390v210q0 24.75-17.62 42.37Q804.75-120 780-120H570ZM180-570h210v-210H180v210Zm390 0h210v-210H570v210Zm0 390h210v-210H570v210Zm-390 0h210v-210H180v210Zm390-390Zm0 180Zm-180 0Zm0-180Z"/></svg>',
  view_list: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M350-220h470v-137H350v137ZM140-603h150v-137H140v137Zm0 187h150v-127H140v127Zm0 196h150v-137H140v137Zm210-196h470v-127H350v127Zm0-187h470v-137H350v137ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Z"/></svg>',
  more_horiz: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M207.86-432Q188-432 174-446.14t-14-34Q160-500 174.14-514t34-14Q228-528 242-513.86t14 34Q256-460 241.86-446t-34 14Zm272 0Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm272 0Q732-432 718-446.14t-14-34Q704-500 718.14-514t34-14Q772-528 786-513.86t14 34Q800-460 785.86-446t-34 14Z"/></svg>',
  archive: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M458.5-572.38Q450-563.75 450-551v171l-66-66q-7.82-8-19.91-8T344-446.14q-8 7.85-8 20 0 12.14 8 20.14l115 115q9 9 21 9t21-9l115-115q8-7.82 8-19.91T616.14-446q-7.85-8-20-8-12.14 0-20.14 8l-66 66v-171q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62ZM180-674v494h600v-494H180Zm0 554q-24.75 0-42.37-17.63Q120-155.25 120-180v-529q0-9.88 3-19.06 3-9.18 9-16.94l52-71q8-11 20.94-17.5Q217.88-840 232-840h495q14.12 0 27.06 6.5T775-816l53 71q6 7.76 9 16.94 3 9.18 3 19.06v529q0 24.75-17.62 42.37Q804.75-120 780-120H180Zm17-614h565l-36.41-46H233l-36 46Zm283 307Z"/></svg>',
  unarchive: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M501.5-287.63q8.5-8.62 8.5-21.37v-171l66 66q7.82 8 19.91 8t20.09-7.86q8-7.85 8-20 0-12.14-8-20.14L501-569q-9-9-21-9t-21 9L344-454q-8 7.82-8 19.91t7.86 20.09q7.85 8 20 8 12.14 0 20.14-8l66-66v171q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63ZM180-674v494h600v-494H180Zm0 554q-24.75 0-42.37-17.63Q120-155.25 120-180v-529q0-9.88 3-19.06 3-9.18 9-16.94l52-71q8-11 20.94-17.5Q217.88-840 232-840h495q14.12 0 27.06 6.5T775-816l53 71q6 7.76 9 16.94 3 9.18 3 19.06v529q0 24.75-17.62 42.37Q804.75-120 780-120H180Zm17-614h565l-36.41-46H233l-36 46Zm283 307Z"/></svg>',
  edit: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M180-180h44l472-471-44-44-472 471v44Zm-30 60q-13 0-21.5-8.5T120-150v-73q0-12 5-23.5t13-19.5l557-556q8-8 19-12.5t23-4.5q11 0 22 4.5t20 12.5l44 44q9 9 13 20t4 22q0 11-4.5 22.5T823-694L266-138q-8 8-19.5 13t-23.5 5h-73Zm629-617-41-41 41 41Zm-105 64-22-22 44 44-22-22Z"/></svg>',
  person_add: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M730-530H630q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h100v-100q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v100h100q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H790v100q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-100Zm-478 7q-42-42-42-108t42-108q42-42 108-42t108 42q42 42 42 108t-42 108q-42 42-108 42t-108-42ZM40-220v-34q0-35 17.5-63.5T108-360q75-33 133.34-46.5t118.5-13.5Q420-420 478-406.5T611-360q33 15 51 43t18 63v34q0 24.75-17.62 42.37Q644.75-160 620-160H100q-24.75 0-42.37-17.63Q40-195.25 40-220Zm60 0h520v-34q0-16-9-30.5T587-306q-71-33-120-43.5T360-360q-58 0-107.5 10.5T132-306q-15 7-23.5 21.5T100-254v34Zm324.5-346.5Q450-592 450-631t-25.5-64.5Q399-721 360-721t-64.5 25.5Q270-670 270-631t25.5 64.5Q321-541 360-541t64.5-25.5ZM360-631Zm0 411Z"/></svg>',
  add_business: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M726-161h-90q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h90v-90q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v90h90q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5h-90v91q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63Q726-57.25 726-70v-91Zm-592 0q-12.75 0-21.37-8.63Q104-178.25 104-191v-227H78q-14.14 0-23.07-11T49-454l44-202q2-11 10.25-17.5T122-680h554q10.5 0 18.75 6.5T705-656l44 202q3 14-5.93 25T720-418h-24v137q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-137H420v227q0 12.75-8.62 21.37Q402.75-161 390-161H134Zm30-60h196v-197H164v197Zm-50-257h572-572Zm14-262q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h543q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H128Zm-14 262h572l-31-142H145l-31 142Z"/></svg>',
  mark_email_unread: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h399q12.75 0 21.38 9 8.62 9 7.62 22-1 12-9.34 20.5-8.33 8.5-20.66 8.5H140v520h680v-325q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v325q0 24-18 42t-42 18H140Zm0-580v520-520Zm340 218 137-89q10-7 19.38-3.85Q645.75-611.7 651-604q5 8 4.5 17.5T644-570l-148 97q-7.5 5-15.75 5T464-473L140-681v-59l340 218Zm202-160.12q-32-32.12-32-78T682.12-838q32.12-32 78-32T838-837.88q32 32.12 32 78T837.88-682q-32.12 32-78 32T682-682.12Z"/></svg>',
  summarize: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M330-630q9-9 9-21t-9-21q-9-9-21-9t-21 9q-9 9-9 21t9 21q9 9 21 9t21-9Zm0 171q9-9 9-21t-9-21q-9-9-21-9t-21 9q-9 9-9 21t9 21q9 9 21 9t21-9Zm0 171q9-9 9-21t-9-21q-9-9-21-9t-21 9q-9 9-9 21t9 21q9 9 21 9t21-9ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h437q12.44 0 23.72 5T660-822l162 162q8 8 13 19.28 5 11.28 5 23.72v437q0 24-18 42t-42 18H180Zm0-60h600v-429H639q-12.75 0-21.37-8.63Q609-626.25 609-639v-141H180v600Zm0-600v171.43V-780v600-600Z"/></svg>',
  table_view: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M300-80q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h520q24 0 42 18t18 42v520q0 24-18 42t-42 18H300Zm0-60h230v-147H300v147Zm290 0h230v-147H590v147ZM109.82-244Q97-244 88.5-252.63 80-261.25 80-274v-546q0-24 18-42t42-18h546q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H140v546q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63ZM300-347h230v-148H300v148Zm290 0h230v-148H590v148ZM300-555h520v-105H300v105Z"/></svg>',
  visibility: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M600.5-379.62q49.5-49.62 49.5-120.5T600.38-620.5Q550.76-670 479.88-670T359.5-620.38Q310-570.76 310-499.88t49.62 120.38q49.62 49.5 120.5 49.5t120.38-49.62Zm-200-41.12q-32.5-32.73-32.5-79.5 0-46.76 32.74-79.26 32.73-32.5 79.5-32.5 46.76 0 79.26 32.74 32.5 32.73 32.5 79.5 0 46.76-32.74 79.26-32.73 32.5-79.5 32.5-46.76 0-79.26-32.74ZM234.5-276Q124-352 57-470q-4-7.13-6-14.65-2-7.52-2-15.43 0-7.92 2-15.38 2-7.47 6-14.54 67-118 177.5-194T480-800q135 0 245.5 76T903-530q4 7.12 6 14.65 2 7.52 2 15.43 0 7.92-2 15.38-2 7.47-6 14.54-67 118-177.5 194T480-200q-135 0-245.5-76ZM480-500Zm222.5 174.5Q804-391 857-500q-53-109-154.33-174.5Q601.34-740 480.17-740T257.5-674.5Q156-609 102-500q54 109 155.33 174.5Q358.66-260 479.83-260t222.67-65.5Z"/></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="m378-332 363-363q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5L399-267q-9 9-21 9t-21-9L175-449q-9-9-8.5-21.5T176-492q9-9 21.5-9t21.5 9l159 160Z"/></svg>',
  lab_profile: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M350-490q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h260q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H350Zm0-160q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h260q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H350ZM220-390h320q26.43 0 49.22 12Q612-366 628-346l112 146v-620H220v430Zm0 250h490L581-309q-7.57-9.88-18.28-15.44Q552-330 540-330H220v190Zm520 60H220q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h520q24 0 42 18t18 42v680q0 24-18 42t-42 18Zm-520-60v-680 680Zm0-190v-60 60Z"/></svg>',
  folder_open: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M140-160q-23 0-41.5-18.5T80-220v-520q0-23 18.5-41.5T140-800h256q12.44 0 23.72 5t19.37 13.09L481-740h369q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H455l-60-60H140v520l90-355q5-20 21.83-32.5Q268.65-620 289-620h574q29 0 47.5 23t10.5 52l-88 339q-6 24-22 35t-41 11H140Zm63-60h572l84-340H287l-84 340Zm-63-353v-167 167Zm63 353 84-340-84 340Z"/></svg>',
  calendar_today: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-28q0-13.6 9-22.8 9-9.2 23.02-9.2t23.5 9.2Q310-861.6 310-848v28h340v-28q0-13.6 9-22.8 9-9.2 23.02-9.2t23.5 9.2Q715-861.6 715-848v28h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"/></svg>',
  account_balance_wallet: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M180-233v53-600 547Zm0 113q-24.75 0-42.37-17.63Q120-155.25 120-180v-600q0-24.75 17.63-42.38Q155.25-840 180-840h600q24.75 0 42.38 17.62Q840-804.75 840-780v134h-60v-134H180v600h600v-133h60v133q0 24.75-17.62 42.37Q804.75-120 780-120H180Zm358-173q-30.52 0-52.26-21.44Q464-335.89 464-366v-227q0-30.11 21.74-51.56Q507.48-666 538-666h270q30.53 0 52.26 21.44Q882-623.11 882-593v227q0 30.11-21.74 51.56Q838.53-293 808-293H538Zm284-60v-253H524v253h298Zm-124.5-81.96Q716-453.92 716-481q0-26.25-19-44.63Q678-544 652-544t-45 18.37q-19 18.38-19 44.63 0 27.08 18.74 46.04Q625.47-416 652.24-416q26.76 0 45.26-18.96Z"/></svg>',
  gavel: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M190-180h420q13 0 21.5 8.5T640-150q0 13-8.5 21.5T610-120H190q-13 0-21.5-8.5T160-150q0-13 8.5-21.5T190-180Zm150-194L202-512q-17-17-17.5-41.5T201-596l29-30 224 222-30 30q-17 17-42 17t-42-17Zm296-212L414-810l30-29q18-17 42.5-16.5T528-838l138 138q17 17 17 42t-17 42l-30 30Zm181 405L302-696l42-42 515 515q9 9 9 21t-9 21q-9 9-21 9t-21-9Z"/></svg>',
  progress_activity: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M323-111q-73-31-127-85t-85-127q-31-73-31-157t31-157q31-73 85-127t127-85q73-31 157-31 12 0 21 9t9 21q0 12-9 21t-21 9q-141 0-240.5 99.5T140-480q0 141 99.5 240.5T480-140q141 0 240.5-99.5T820-480q0-12 9-21t21-9q12 0 21 9t9 21q0 84-31 157t-85 127q-54 54-127 85T480-80q-84 0-157-31Z"/></svg>',
  file_export: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M480-480ZM329-207 222-100q-9 9-21 8.5t-21.39-9.5q-8.61-9-8.61-21t9-21l107-107h-96q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h168q12.75 0 21.38 8.62Q389-292.75 389-280v168q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63Q329-99.25 329-112v-95ZM168.5-378.63Q160-387.25 160-400v-420q0-24.75 17.63-42.38Q195.25-880 220-880h340l240 240v500q0 24.75-17.62 42.37Q764.75-80 740-80H479q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h261v-460H550q-12.75 0-21.37-8.63Q520-617.25 520-630v-190H220v420q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63Z"/></svg>',
  notifications: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M190-200q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h50v-304q0-84 49.5-150.5T420-798v-22q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v22q81 17 130.5 83.5T720-564v304h50q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H190Zm290-302Zm0 422q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM300-260h360v-304q0-75-52.5-127.5T480-744q-75 0-127.5 52.5T300-564v304Z"/></svg>',
  help: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M511-258.03q11-11.03 11-27T510.97-312q-11.03-11-27-11T457-311.97q-11 11.03-11 27T457.03-258q11.03 11 27 11T511-258.03ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Zm2.77-180Q513-660 536-641.5q23 18.5 23 47.2 0 26.3-15.65 45.73Q527.7-529.14 508-512q-23 19-40 42.38-17 23.39-17 52.62 0 11 8.4 17.5T479-393q12 0 19.88-8 7.87-8 10.12-20 3-21 16-38t30.23-30.78Q580-510 596-537q16-27 16-58.61 0-50.39-37.5-83.89T485.55-713Q450-713 417-698t-54 44q-7 10-6.5 21.5t9.47 18.5q11.41 8 23.65 5 12.23-3 20.38-14 12.75-17.9 31.88-27.45Q461-660 482.77-660Z"/></svg>',
  settings: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M421-80q-14 0-25-9t-13-23l-15-94q-19-7-40-19t-37-25l-86 40q-14 6-28 1.5T155-226L97-330q-8-13-4.5-27t15.5-23l80-59q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521l-80-59q-12-9-15.5-23t4.5-27l58-104q8-13 22-17.5t28 1.5l86 40q16-13 37-25t40-18l15-95q2-14 13-23t25-9h118q14 0 25 9t13 23l15 94q19 7 40.5 18.5T669-710l86-40q14-6 27.5-1.5T804-734l59 104q8 13 4.5 27.5T852-580l-80 57q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l80 58q12 8 15.5 22.5T863-330l-58 104q-8 13-22 17.5t-28-1.5l-86-40q-16 13-36.5 25.5T592-206l-15 94q-2 14-13 23t-25 9H421Zm15-60h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Zm44-210q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-130Z"/></svg>',
  add: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M450-450H230q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h220v-220q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v220h220q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H510v220q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-220Z"/></svg>',
  download: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M469-327q-5-2-10-7L308-485q-9-9.27-8.5-21.64.5-12.36 9.11-21.36 9.39-9 21.89-9t21.5 9l98 99v-341q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v341l99-99q8.8-9 20.9-8.5 12.1.5 21.49 9.5 8.61 9 8.61 21.5t-9 21.5L501-334q-5 5-10.13 7-5.14 2-11 2-5.87 0-10.87-2ZM220-160q-24 0-42-18t-18-42v-113q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v113h520v-113q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v113q0 24-18 42t-42 18H220Z"/></svg>',
  arrow_forward: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M686-450H190q-13 0-21.5-8.5T160-480q0-13 8.5-21.5T190-510h496L459-737q-9-9-9-21t9-21q9-9 21-9t21 9l278 278q5 5 7 10t2 11q0 6-2 11t-7 10L501-181q-9 9-21 9t-21-9q-9-9-9-21t9-21l227-227Z"/></svg>',
  arrow_outward: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M654-658 263-267q-9 9-21 9t-21-9q-9-9-9-21t9-21l391-391H264q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h420q12.75 0 21.38 8.62Q714-742.75 714-730v420q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-348Z"/></svg>',
  square_foot: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M200-120q-33 0-56.5-23.5T120-200v-539q0-37 34.5-51t61.5 13l45 45-42 42 27 27 42-42 117 117-42 42 27 27 42-42 118 118-42 42 27 27 42-42 117 117-42 42 27 27 42-42 45 45q30 30 15 68.5T726-120H200Zm0-80h463L200-663v463Z"/></svg>',
  female: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M450-200h-50q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h50v-102q-82-11-136-73.71-54-62.7-54-145.29 0-91.42 64.5-155.21Q389-800 480-800t155.5 63.79Q700-672.42 700-581q0 82.59-54 145.29Q592-373 510-362v102h50q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5h-50v50q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-50Zm143-266.8q47-46.8 47-113T593.2-693q-46.8-47-113-47T367-693.2q-47 46.8-47 113T366.8-467q46.8 47 113 47T593-466.8Z"/></svg>',
  warning: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M92-120q-9 0-15.5-4T66-135q-4-7-4.5-14.5T66-165l388-670q5-8 11.5-11.5T480-850q8 0 14.5 3.5T506-835l388 670q5 8 4.5 15.5T894-135q-4 7-10.5 11t-15.5 4H92Zm52-60h672L480-760 144-180Zm361.5-65.5Q514-254 514-267t-8.5-21.5Q497-297 484-297t-21.5 8.5Q454-280 454-267t8.5 21.5Q471-237 484-237t21.5-8.5Zm0-111Q514-365 514-378v-164q0-13-8.5-21.5T484-572q-13 0-21.5 8.5T454-542v164q0 13 8.5 21.5T484-348q13 0 21.5-8.5ZM480-470Z"/></svg>',
  check_circle: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="m421-389-98-98q-9-9-22-9t-23 10q-9 9-9 22t9 22l122 123q9 9 21 9t21-9l239-239q10-10 10-23t-10-23q-10-9-23.5-8.5T635-603L421-389Zm59 309q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"/></svg>',
  mail: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm680-525L496-473q-4 2-7.5 3.5T480-468q-5 0-8.5-1.5T464-473L140-685v465h680v-465ZM480-522l336-218H145l335 218ZM140-685v7-39.32.73V-740v23-.91V-678v-7 465-465Z"/></svg>',
  call: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M795-120q-116 0-236.5-56T335-335Q232-438 176-558.5T120-795q0-19.29 12.86-32.14Q145.71-840 165-840h140q14 0 24 10t14 25l26.93 125.64Q372-665 369.5-653.5t-10.73 19.73L259-533q26 44 55 82t64 72q37 38 78 69.5t86 55.5l95-98q10-11 23.15-15 13.15-4 25.85-2l119 26q15 4 25 16.04 10 12.05 10 26.96v135q0 19.29-12.86 32.14Q814.29-120 795-120ZM229-588l81-82-23-110H180q2 42 13.5 88.5T229-588Zm369 363q41 19 89 31t93 14v-107l-103-21-79 83ZM229-588Zm369 363Z"/></svg>',
  menu_book: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M248-300q53.57 0 104.28 12.5Q403-275 452-250v-427q-45-30-97.62-46.5Q301.76-740 248-740q-38 0-74.5 9.5T100-707v434q31-14 70.5-20.5T248-300Zm264 50q50-25 98-37.5T712-300q38 0 78.5 6t69.5 16v-429q-34-17-71.82-25-37.82-8-76.18-8-54 0-104.5 16.5T512-677v427Zm-44.5 77.5Q461-174 456-178q-47-29-99.85-45-52.84-16-108.15-16-36.54 0-71.77 9T106-208q-23.1 11-44.55-3Q40-225 40-251v-463q0-15 7-27.5T68-761q42-20 87.39-29.5 45.4-9.5 92.61-9.5 63 0 122.5 17T482-731q51-35 109.5-52T712-800q46.87 0 91.93 9.5Q849-781 891-761q14 7 21.5 19.5T920-714v463q0 27.89-22.5 42.45Q875-194 853-208q-34-14-69.23-22.5Q748.54-239 712-239q-54.27 0-106.14 16Q554-207 508-178q-5 4-11.5 5.5T482-171q-8 0-14.5-1.5ZM276-489Zm284-119q0-5.52 4.02-11.34 4.03-5.82 8.98-7.66 30-11 61.34-17 31.33-6 65.91-6 21.61 0 42.68 2.5T784-640q6 2 11 7.4 5 5.39 5 12.13 0 11.47-7.5 17.47-7.5 6-18.5 3-16.8-5-35.4-7.5Q720-610 700-610q-29 0-56 5.5T591-588q-14 5-22.5-.5T560-608Zm0 220q0-5.81 4.02-11.94 4.03-6.12 8.98-8.06 30-11 61.34-16.5 31.33-5.5 65.91-5.5 21.61 0 42.68 2.5T784-420q6 2 11 7.4 5 5.39 5 12.13 0 11.47-7.5 17.47-7.5 6-18.5 3-16.8-5-35.4-7.5Q720-390 700-390q-29 0-56 5t-53 16q-14 5-22.5 0t-8.5-19Zm0-110q0-5.52 4.02-11.34 4.03-5.82 8.98-7.66 30-11 61.34-17 31.33-6 65.91-6 21.61 0 42.68 2.5T784-530q6 2 11 7.4 5 5.39 5 12.13 0 11.47-7.5 17.47-7.5 6-18.5 3-16.8-5-35.4-7.5Q720-500 700-500q-29 0-56 5.5T591-478q-14 5-22.5-.5T560-498Z"/></svg>',
  quiz: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M572-352q12-12 12-29t-12-29q-12-12-29-12t-29 12q-12 12-12 29t12 29q12 12 29 12t29-12Zm-30-114q10 0 16.5-6.5T567-489q3-16 10.8-27.62 7.8-11.62 28.2-31.38 28-27 38-45.95 10-18.95 10-44.56 0-46.1-31.5-75.29Q591-743 540.37-743q-32.76 0-59.57 15-26.8 15-42.8 42-5 8-1 17t14 14q9 4 18 .67 9-3.34 15-11.67 11-16 24.85-23.5Q522.69-697 540-697q29 0 48 17t19 43q0 20-9 35t-32 32q-28 25-36.5 40T519-489q-1 9.2 5.84 16.1 6.85 6.9 17.16 6.9ZM260-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560v-560H260v560ZM140-80q-24 0-42-18t-18-42v-590q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v590h590q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32Q742.75-80 730-80H140Zm120-740v560-560Z"/></svg>',
  language: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M323-111.5Q250-143 196-197t-85-127.5Q80-398 80-482t31-156.5Q142-711 196-765t127-84.5Q396-880 480-880t157 30.5Q710-819 764-765t85 126.5Q880-566 880-482t-31 157.5Q818-251 764-197t-127 85.5Q564-80 480-80t-157-31.5ZM480-138q35-36 58.5-82.5T577-331H384q14 60 37.5 108t58.5 85Zm-85-12q-25-38-43-82t-30-99H172q38 71 88 111.5T395-150Zm171-1q72-23 129.5-69T788-331H639q-13 54-30.5 98T566-151ZM152-391h159q-3-27-3.5-48.5T307-482q0-25 1-44.5t4-43.5H152q-7 24-9.5 43t-2.5 45q0 26 2.5 46.5T152-391Zm221 0h215q4-31 5-50.5t1-40.5q0-20-1-38.5t-5-49.5H373q-4 31-5 49.5t-1 38.5q0 21 1 40.5t5 50.5Zm275 0h160q7-24 9.5-44.5T820-482q0-26-2.5-45t-9.5-43H649q3 35 4 53.5t1 34.5q0 22-1.5 41.5T648-391Zm-10-239h150q-33-69-90.5-115T565-810q25 37 42.5 80T638-630Zm-254 0h194q-11-53-37-102.5T480-820q-32 27-54 71t-42 119Zm-212 0h151q11-54 28-96.5t43-82.5q-75 19-131 64t-91 115Z"/></svg>',
  person: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M372-523q-42-42-42-108t42-108q42-42 108-42t108 42q42 42 42 108t-42 108q-42 42-108 42t-108-42ZM160-220v-34q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5T731-360q31 14 50 41t19 65v34q0 25-17.5 42.5T740-160H220q-25 0-42.5-17.5T160-220Zm60 0h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm324.5-346.5Q570-592 570-631t-25.5-64.5Q519-721 480-721t-64.5 25.5Q390-670 390-631t25.5 64.5Q441-541 480-541t64.5-25.5ZM480-631Zm0 411Z"/></svg>',
  logout: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h269q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H180v600h269q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H180Zm545-330H390q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h333l-81-81q-9-9-8.5-21t9.5-21q9-9 21.5-9t21.5 9l133 133q9 9 9 21t-9 21L687-326q-8.8 9-20.9 8.5-12.1-.5-21.49-9.5-8.61-9-8.61-21.5t9-21.5l80-80Z"/></svg>',
  search: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M378-329q-108.16 0-183.08-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l242 240q9 8.56 9 21.78T818-143q-9 9-22.22 9-13.22 0-21.78-9L533-384q-30 26-69.96 40.5Q423.08-329 378-329Zm-1-60q81.25 0 138.13-57.5Q572-504 572-585t-56.87-138.5Q458.25-781 377-781q-82.08 0-139.54 57.5Q180-666 180-585t57.46 138.5Q294.92-389 377-389Z"/></svg>',
  keyboard_arrow_down: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M469-358q-5-2-10-7L261-563q-9-9-8.5-21.5T262-606q9-9 21.5-9t21.5 9l175 176 176-176q9-9 21-8.5t21 9.5q9 9 9 21.5t-9 21.5L501-365q-5 5-10 7t-11 2q-6 0-11-2Z"/></svg>',
  north_east: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M700-658 223-181q-9 9-21 9t-21-9q-9-9-9-21t9-21l477-477H394q-13 0-21.5-8.5T364-730q0-13 8.5-21.5T394-760h336q13 0 21.5 8.5T760-730v336q0 13-8.5 21.5T730-364q-13 0-21.5-8.5T700-394v-264Z"/></svg>',
  south_east: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M658-260 181-737q-9-9-9-21t9-21q9-9 21-9t21 9l477 477v-264q0-13 8.5-21.5T730-596q13 0 21.5 8.5T760-566v336q0 13-8.5 21.5T730-200H394q-13 0-21.5-8.5T364-230q0-13 8.5-21.5T394-260h264Z"/></svg>',
  event_upcoming: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M780-80H596q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h184v-430H180v190q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-380q0-24 18-42t42-18h65v-28q0-13.6 9-22.8 9-9.2 23.02-9.2t23.5 9.2Q310-861.6 310-848v28h340v-28q0-13.6 9-22.8 9-9.2 23.02-9.2t23.5 9.2Q715-861.6 715-848v28h65q24 0 42 18t18 42v620q0 24-18 42t-42 18Zm-389-90H80q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32Q67.25-230 80-230h311l-92-93q-8-9-8.5-21.1-.5-12.1 8.5-20.9 9-9 21-9t21 9l144 144q9 9 9 21t-9 21L341-35q-9 9-21 9t-21-9q-9-9-9-21t9-21l92-93ZM180-630h600v-130H180v130Zm0 0v-130 130Z"/></svg>',
  location_on: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M480-159q133-121 196.5-219.5T740-552q0-118-75.5-193T480-820q-109 0-184.5 75T220-552q0 75 65 173.5T480-159Zm-21.5 55.5Q448-107 440-115q-42-38-91-87.5T258-309q-42-57-70-119t-28-124q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 62-28 124t-70 119q-42 57-91 106.5T520-115q-8 8-18.5 11.5T480-100q-11 0-21.5-3.5ZM480-560Zm49.5 49.5Q550-531 550-560t-20.5-49.5Q509-630 480-630t-49.5 20.5Q410-589 410-560t20.5 49.5Q451-490 480-490t49.5-20.5Z"/></svg>',
  landscape: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M100-240q-19 0-27-16.5t3-31.5l180-240q5-6 11-9t13-3q7 0 13 3t11 9l171 228h325L560-619 459-485q-9 12-21 12.5t-21-6.5q-9-7-12-18.5t6-23.5l125-167q5-6 11-9t13-3q7 0 13 3t11 9l300 400q11 15 3 31.5T860-240H100Zm335-60h365-334 51-82Zm-275 0h240L280-460 160-300Zm0 0h240-240Z"/></svg>',
  grass: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M110-160q-13 0-21.5-8.5T80-190q0-13 8.5-21.5T110-220h210q-16-72-62-129.5T151-441q-23-13-20-26t29-13q134 0 227 93t93 227H110Zm430 0q0-42-8-73.5T512-296q40-88 120-136t168-48q26 0 29 13t-20 26q-63 35-109 93.5T640-220h210q13 0 21.5 8.5T880-190q0 13-8.5 21.5T850-160H540Zm-58-193q-14-128 51.5-223.5T704-705q25-8 33.5 4t-9.5 29q-38 36-67.5 82T621-494q-44 21-80 58.5T482-353Zm-61-76q-16-15-35-30t-32-23q3-12 4.5-26.5T360-532q0-55-13-106t-37-97q-13-23-1-31t33 8q45 34 77.5 81T468-573q-18 32-30.5 69.5T421-429Z"/></svg>',
  task_alt: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M480-80q-85 0-158-30.5T195-195q-54-54-84.5-127T80-480q0-84 30.5-157T195-764q54-54 127-85t158-31q60 0 117 17.5T704-811q11 7 13.5 19t-5.5 22q-8 10-20 11t-23-6q-42-27-90-41t-99-14q-145 0-242.5 97.5T140-480q0 145 97.5 242.5T480-140q145 0 242.5-97.5T820-480q0-19-1.5-37t-5.5-35q-2-13 4-24t18-13q13-3 24 4.5t13 20.5q4 20 6 41t2 43q0 85-31 158t-85 127q-54 54-127 84.5T480-80Zm-59-309 392-392q9-9 22-9t23 9q10 10 10 23t-10 23L442-319q-9 9-21 9t-21-9L278-442q-9-9-8.5-22.5T279-487q9-9 22.5-9t22.5 9l97 98Z"/></svg>',
  support_agent: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M470-120q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h310v-304q0-123.69-87.32-209.84Q605.36-780 480-780q-125.36 0-212.68 86.16Q180-607.69 180-484v224q0 8.5-5.75 14.25T160-240q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v69q0 24.75-17.62 42.37Q804.75-120 780-120H470ZM338.5-418.68q-8.5-8.67-8.5-21.5 0-12.82 8.68-21.32 8.67-8.5 21.5-8.5 12.82 0 21.32 8.68 8.5 8.67 8.5 21.5 0 12.82-8.68 21.32-8.67 8.5-21.5 8.5-12.82 0-21.32-8.68Zm240 0q-8.5-8.67-8.5-21.5 0-12.82 8.68-21.32 8.67-8.5 21.5-8.5 12.82 0 21.32 8.68 8.5 8.67 8.5 21.5 0 12.82-8.68 21.32-8.67 8.5-21.5 8.5-12.82 0-21.32-8.68ZM241-462q-7-106 64-182t177-76q87 0 151 57.5T711-519q-89-1-162.5-50T434.72-698Q419-618 367.5-555.5T241-462Z"/></svg>',
  open_in_new: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h249q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H180v600h600v-249q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v249q0 24-18 42t-42 18H180Zm600-617L403-360q-9 9-21 8.5t-21-9.5q-9-9-9-21t9-21l377-377H549q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h261q12.75 0 21.38 8.62Q840-822.75 840-810v261q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-188Z"/></svg>',
  account_circle: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm160.5-234.5Q343-529 343-587t39.5-97.5Q422-724 480-724t97.5 39.5Q617-645 617-587t-39.5 97.5Q538-450 480-450t-97.5-39.5ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm107.5-76Q640-172 691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140q55 0 107.5-16Zm-52-375.5Q557-553 557-587t-21.5-55.5Q514-664 480-664t-55.5 21.5Q403-621 403-587t21.5 55.5Q446-510 480-510t55.5-21.5ZM480-587Zm0 374Z"/></svg>'
};
var IconComponent = (_a = class {
  constructor() {
    this.name = input.required(...[]);
    this.size = input(20, ...[]);
    this.sanitizer = inject(DomSanitizer);
    this.svg = computed(() => this.sanitizer.bypassSecurityTrustHtml(ICONS[this.name()]), ...[]);
  }
}, _a.\u0275fac = function IconComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["ui-icon"]],
  hostAttrs: [
    "aria-hidden",
    "true",
    1,
    "inline-grid",
    "shrink-0",
    "place-items-center"
  ],
  hostVars: 5,
  hostBindings: function IconComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      __domProperty("innerHTML", ctx.svg(), __sanitizeHtml);
      __styleProp("width", ctx.size(), "px")("height", ctx.size(), "px");
    }
  },
  inputs: {
    name: [1, "name"],
    size: [1, "size"]
  },
  decls: 0,
  vars: 0,
  template: function IconComponent_Template(rf, ctx) {
  },
  styles: ["[_nghost-%COMP%]     svg {\n      width: 100%;\n      height: 100%;\n      fill: currentColor;\n    }"]
}), _a);
var FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function focusableIn(root) {
  return Array.from(root.querySelectorAll(FOCUSABLE)).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
}
function focusInitial(root) {
  var _a2;
  const target = (_a2 = focusableIn(root)[0]) != null ? _a2 : root;
  if (!root.hasAttribute("tabindex")) root.tabIndex = -1;
  target.focus({ preventScroll: true });
}
function trapTabKey(root, event) {
  if (event.key !== "Tab") return false;
  const items = focusableIn(root);
  if (items.length === 0) {
    event.preventDefault();
    root.focus({ preventScroll: true });
    return true;
  }
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus({ preventScroll: true });
    return true;
  }
  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus({ preventScroll: true });
    return true;
  }
  return false;
}
var bodyLockCount = 0;
var previousOverflow = "";
function lockBodyScroll() {
  if (typeof document === "undefined") return;
  if (bodyLockCount === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  bodyLockCount += 1;
}
function unlockBodyScroll() {
  if (typeof document === "undefined") return;
  bodyLockCount = Math.max(0, bodyLockCount - 1);
  if (bodyLockCount === 0) document.body.style.overflow = previousOverflow;
}
var UiModalA11yDirective = (_b = class {
  constructor(host) {
    this.host = host;
    this.dismiss = output();
    this.previous = null;
    this.locked = false;
  }
  ngOnInit() {
    const el = this.host.nativeElement;
    this.previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    lockBodyScroll();
    this.locked = true;
    setTimeout(() => focusInitial(el), 0);
  }
  ngOnDestroy() {
    var _a2;
    if (this.locked) {
      unlockBodyScroll();
      this.locked = false;
    }
    (_a2 = this.previous) == null ? void 0 : _a2.focus({ preventScroll: true });
    this.previous = null;
  }
  onKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      this.dismiss.emit();
      return;
    }
    trapTabKey(this.host.nativeElement, event);
  }
}, _b.\u0275fac = function UiModalA11yDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _b)(__directiveInject(ElementRef));
}, _b.\u0275dir = /* @__PURE__ */ __defineDirective({
  type: _b,
  selectors: [[
    "",
    "uiModalA11y",
    ""
  ]],
  hostBindings: function UiModalA11yDirective_HostBindings(rf, ctx) {
    if (rf & 1) __listener("keydown", function UiModalA11yDirective_keydown_HostBindingHandler($event) {
      return ctx.onKeydown($event);
    }, __resolveDocument);
  },
  outputs: { dismiss: "dismiss" }
}), _b);
function BrandLogoComponent_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    __domElementStart(0, "span", 4);
    __text(1);
    __domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __styleProp("font-family", "var(--v2-font-logo)")("font-size", ctx_r0.Math.max(9, ctx_r0.size() * 0.15), "px")("color", ctx_r0.signatureColor());
    __advance();
    __textInterpolate(ctx_r0.t()("auth.layout.signature"));
  }
}
function BrandLogoComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __domElementStart(0, "span", 1)(1, "span", 2)(2, "span");
    __text(3);
    __domElementEnd();
    __domElement(4, "br");
    __domElementStart(5, "span");
    __text(6);
    __domElementEnd()();
    __conditionalCreate(7, BrandLogoComponent_Conditional_1_Conditional_7_Template, 2, 7, "span", 3);
    __domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __attribute("aria-label", ctx_r0.brand.name);
    __advance();
    __styleProp("font-family", "var(--v2-font-logo)")("font-size", ctx_r0.size() * 0.46, "px");
    __advance();
    __styleProp("color", ctx_r0.first());
    __advance();
    __textInterpolate(ctx_r0.brand.wordmark[0]);
    __advance(2);
    __styleProp("color", ctx_r0.second());
    __advance();
    __textInterpolate(ctx_r0.brand.wordmark[1]);
    __advance();
    __conditional(ctx_r0.signature() ? 7 : -1);
  }
}
var BrandLogoComponent = (_c = class {
  constructor() {
    this.variant = input("color", ...[]);
    this.size = input(48, ...[]);
    this.wordmark = input(true, ...[]);
    this.signature = input(false, ...[]);
    this.brand = BRAND;
    this.Math = Math;
    this.t = inject(LocaleService).t;
    this.symbolSrc = computed(() => this.variant() === "inverse" ? BRAND.symbol.inverse : BRAND.symbol.color, ...[]);
    this.first = computed(() => this.variant() === "inverse" ? "var(--v2-blanc)" : "var(--v2-vert-pousse)", ...[]);
    this.second = computed(() => this.variant() === "inverse" ? "var(--v2-citron)" : "var(--v2-terre)", ...[]);
    this.signatureColor = computed(() => this.variant() === "inverse" ? "color-mix(in oklab, var(--v2-blanc) 75%, transparent)" : "var(--v2-vert-pousse)", ...[]);
  }
}, _c.\u0275fac = function BrandLogoComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _c)();
}, _c.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _c,
  selectors: [["ui-brand-logo"]],
  hostAttrs: [
    1,
    "inline-flex",
    "items-center"
  ],
  inputs: {
    variant: [1, "variant"],
    size: [1, "size"],
    wordmark: [1, "wordmark"],
    signature: [1, "signature"]
  },
  decls: 2,
  vars: 6,
  consts: [
    [
      1,
      "w-auto",
      "shrink-0",
      3,
      "src",
      "alt"
    ],
    [
      "role",
      "img",
      1,
      "ml-3",
      "flex",
      "flex-col"
    ],
    [
      1,
      "font-bold",
      "leading-[0.95]",
      "tracking-[-0.01em]"
    ],
    [
      1,
      "mt-1",
      "font-medium",
      3,
      "font-family",
      "font-size",
      "color"
    ],
    [
      1,
      "mt-1",
      "font-medium"
    ]
  ],
  template: function BrandLogoComponent_Template(rf, ctx) {
    if (rf & 1) {
      __domElement(0, "img", 0);
      __conditionalCreate(1, BrandLogoComponent_Conditional_1_Template, 8, 12, "span", 1);
    }
    if (rf & 2) {
      __styleProp("height", ctx.size(), "px");
      __domProperty("src", ctx.symbolSrc())("alt", ctx.wordmark() ? "" : ctx.t()("brand.logoAlt"));
      __attribute("aria-hidden", ctx.wordmark() ? true : null);
      __advance();
      __conditional(ctx.wordmark() ? 1 : -1);
    }
  },
  encapsulation: 2
}), _c);
var DEFAULT_DURATION = {
  success: 4e3,
  info: 4e3,
  warning: 6e3,
  error: 6e3,
  /** Bloquant / hors ligne : reste affiché jusqu'à fermeture. */
  blocking: 0
};
var SnackbarService = (_d = class {
  constructor() {
    this.current = signal(null, ...[]);
    this.snack = this.current.asReadonly();
    this.seq = 0;
  }
  show(kind, text, duration = DEFAULT_DURATION[kind]) {
    clearTimeout(this.timer);
    this.current.set({
      id: ++this.seq,
      kind,
      text,
      duration
    });
    if (duration > 0) this.timer = setTimeout(() => this.dismiss(), duration);
  }
  success(text, duration) {
    this.show("success", text, duration);
  }
  info(text, duration) {
    this.show("info", text, duration);
  }
  warning(text, duration) {
    this.show("warning", text, duration);
  }
  error(text, duration) {
    this.show("error", text, duration);
  }
  blocking(text, duration) {
    this.show("blocking", text, duration);
  }
  dismiss() {
    clearTimeout(this.timer);
    this.current.set(null);
  }
}, _d.\u0275fac = function SnackbarService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _d)();
}, _d.\u0275prov = /* @__PURE__ */ __defineInjectable({
  token: _d,
  factory: _d.\u0275fac,
  providedIn: "root"
}), _d);
var _c0 = (a0) => [a0];
var _forTrack0 = ($index, $item) => $item.id;
function SnackbarComponent_Conditional_0_For_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) __element(0, "span", 7);
  if (rf & 2) {
    const item_r3 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(2);
    __styleProp("background", ctx_r1.kind[item_r3.kind].fg)("animation-duration", item_r3.duration, "ms");
  }
}
function SnackbarComponent_Conditional_0_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "div", 1)(1, "span", 2);
    __element(2, "lucide-angular", 3);
    __elementEnd();
    __elementStart(3, "p", 4);
    __text(4);
    __elementEnd();
    __elementStart(5, "button", 5);
    __listener("click", function SnackbarComponent_Conditional_0_For_1_Template_button_click_5_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.service.dismiss());
    });
    __element(6, "lucide-angular", 3);
    __elementEnd();
    __conditionalCreate(7, SnackbarComponent_Conditional_0_For_1_Conditional_7_Template, 1, 4, "span", 6);
    __elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r1 = __nextContext(2);
    __styleProp("background", ctx_r1.kind[item_r3.kind].bg)("color", ctx_r1.kind[item_r3.kind].fg);
    __attribute("role", item_r3.kind === "error" || item_r3.kind === "blocking" ? "alert" : "status")("aria-live", item_r3.kind === "error" || item_r3.kind === "blocking" ? "assertive" : "polite");
    __advance();
    __styleProp("background", ctx_r1.kind[item_r3.kind].fg)("color", ctx_r1.kind[item_r3.kind].bg);
    __advance();
    __property("img", ctx_r1.kind[item_r3.kind].icon)("size", 20);
    __advance(2);
    __textInterpolate(item_r3.text);
    __advance();
    __attribute("aria-label", ctx_r1.t()("auth.snack.close"));
    __advance();
    __property("img", ctx_r1.closeIcon)("size", 18);
    __advance();
    __conditional(item_r3.duration > 0 ? 7 : -1);
  }
}
function SnackbarComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) __repeaterCreate(0, SnackbarComponent_Conditional_0_For_1_Template, 8, 17, "div", 0, _forTrack0);
  if (rf & 2) __repeater(__pureFunction1(0, _c0, ctx));
}
var KIND = {
  success: {
    bg: "var(--v2-succes-bg)",
    fg: "var(--v2-succes-fg)",
    icon: CircleCheck
  },
  info: {
    bg: "var(--v2-info-bg)",
    fg: "var(--v2-info-fg)",
    icon: Info
  },
  warning: {
    bg: "var(--v2-attente-bg)",
    fg: "var(--v2-attente-fg)",
    icon: Clock
  },
  error: {
    bg: "var(--v2-erreur-bg)",
    fg: "var(--v2-erreur-fg)",
    icon: CircleAlert
  },
  blocking: {
    bg: "var(--v2-bloquant-bg)",
    fg: "var(--v2-bloquant-fg)",
    icon: CloudOff
  }
};
var SnackbarComponent = (_e = class {
  constructor() {
    this.service = inject(SnackbarService);
    this.t = inject(LocaleService).t;
    this.kind = KIND;
    this.closeIcon = X;
    inject(DestroyRef).onDestroy(() => this.service.dismiss());
  }
}, _e.\u0275fac = function SnackbarComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _e)();
}, _e.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _e,
  selectors: [["ui-snackbar"]],
  hostAttrs: [
    1,
    "pointer-events-none",
    "fixed",
    "inset-x-0",
    "top-0",
    "z-[200]",
    "flex",
    "justify-center",
    "px-4",
    "pt-[max(1rem,env(safe-area-inset-top))]"
  ],
  decls: 1,
  vars: 1,
  consts: [
    [
      1,
      "snack",
      "pointer-events-auto",
      "flex",
      "w-full",
      "max-w-[460px]",
      "items-center",
      "gap-3",
      "rounded-[18px]",
      "py-3",
      "pl-3",
      "pr-2",
      3,
      "background",
      "color"
    ],
    [
      1,
      "snack",
      "pointer-events-auto",
      "flex",
      "w-full",
      "max-w-[460px]",
      "items-center",
      "gap-3",
      "rounded-[18px]",
      "py-3",
      "pl-3",
      "pr-2"
    ],
    [
      1,
      "grid",
      "size-10",
      "shrink-0",
      "place-items-center",
      "rounded-[12px]"
    ],
    [
      3,
      "img",
      "size"
    ],
    [
      1,
      "min-w-0",
      "flex-1",
      "text-[15px]",
      "font-bold",
      "leading-snug"
    ],
    [
      "type",
      "button",
      1,
      "close",
      "grid",
      "size-10",
      "shrink-0",
      "place-items-center",
      "rounded-[12px]",
      3,
      "click"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "timer",
      3,
      "background",
      "animation-duration"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "timer"
    ]
  ],
  template: function SnackbarComponent_Template(rf, ctx) {
    if (rf & 1) __conditionalCreate(0, SnackbarComponent_Conditional_0_Template, 2, 2);
    if (rf & 2) {
      let tmp_0_0;
      __conditional((tmp_0_0 = ctx.service.snack()) ? 0 : -1, tmp_0_0);
    }
  },
  dependencies: [LucideAngularModule, LucideAngularComponent],
  styles: [".snack[_ngcontent-%COMP%] {\n      position: relative;\n      overflow: hidden;\n      box-shadow:\n        0 1px 2px color-mix(in oklab, var(--%NS%v2-foret) 10%, transparent),\n        0 24px 60px color-mix(in oklab, var(--%NS%v2-foret) 28%, transparent);\n      animation: _ngcontent-%COMP%_snack-in 0.42s cubic-bezier(0.32, 0.72, 0, 1) both;\n    }\n    .timer[_ngcontent-%COMP%] {\n      position: absolute;\n      inset: auto 0 0 0;\n      height: 3px;\n      opacity: 0.35;\n      transform-origin: left;\n      animation-name: _ngcontent-%COMP%_snack-timer;\n      animation-timing-function: linear;\n      animation-fill-mode: both;\n    }\n    .close[_ngcontent-%COMP%] {\n      cursor: pointer;\n      transition: background-color 0.15s ease;\n    }\n    .close[_ngcontent-%COMP%]:hover {\n      background: color-mix(in oklab, currentColor 10%, transparent);\n    }\n    .close[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid currentColor;\n      outline-offset: 1px;\n    }\n    @keyframes _ngcontent-%COMP%_snack-in {\n      from {\n        opacity: 0;\n        transform: translateY(-120%) scale(0.98);\n      }\n      to {\n        opacity: 1;\n        transform: translateY(0) scale(1);\n      }\n    }\n    @keyframes _ngcontent-%COMP%_snack-timer {\n      from {\n        transform: scaleX(1);\n      }\n      to {\n        transform: scaleX(0);\n      }\n    }\n    @media (prefers-reduced-motion: reduce) {\n      .snack[_ngcontent-%COMP%], \n   .timer[_ngcontent-%COMP%] {\n        animation: none;\n      }\n    }"]
}), _e);

export { BRAND as B, CommonModule as C, IconComponent as I, LOGIN_PHOTOS as L, NgTemplateOutlet as N, PAYMENT_PHOTO as P, SnackbarService as S, UiModalA11yDirective as U, CRADESC as a, BrandLogoComponent as b, SnackbarComponent as c, focusInitial as f, lockBodyScroll as l, trapTabKey as t, unlockBodyScroll as u };
//# sourceMappingURL=snackbar.component-sjBBVJT0.mjs.map
