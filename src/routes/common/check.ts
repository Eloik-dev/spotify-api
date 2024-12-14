import { ValidationErr } from '@src/common/classes';

type TReqObj = Record<string, unknown>;

/**
 * Check that param/s is a string
 */
function isStr(reqObj: TReqObj, params: string): string;
function isStr(reqObj: TReqObj, params: readonly string[]): string[];
function isStr(
  reqObj: TReqObj,
  params: string | readonly string[],
): string | string[] {
  return _checkWrapper(reqObj, params, _checkStr);
}

/**
 * Check validator for string
 */
function _checkStr(val: unknown): string | undefined {
  if (!!val && typeof val === 'string') {
    return val;
  } else {
    return undefined;
  }
}

/**
 * Check that param/s is a number.
 */
function isNum(reqObj: TReqObj, params: string): number;
function isNum(reqObj: TReqObj, params: readonly string[]): number[];
function isNum(
  reqObj: TReqObj,
  params: string | readonly string[],
): number | number[] {
  return _checkWrapper(reqObj, params, _checkNum);
}

/**
 * Check validator for number
 */
function _checkNum(val: unknown): number | undefined {
  const valF = Number(val);
  if (!isNaN(valF)) {
    return valF;
  } else {
    return undefined;
  }
}

/**
 * Check that param/s is a boolean.
 */
function isBool(reqObj: TReqObj, params: string): boolean;
function isBool(reqObj: TReqObj, params: readonly string[]): boolean[];
function isBool(
  reqObj: TReqObj,
  params: string | readonly string[],
): boolean | boolean[] {
  return _checkWrapper(reqObj, params, _checkBool);
}

/**
 * Check validator for boolean
 */
function _checkBool(val: unknown): boolean | undefined {
  if (typeof val === 'boolean') {
    return val;
  } else if (typeof val === 'string') {
    val = val.toLowerCase();
    if (val === 'true') {
      return true;
    } else if (val === 'false') {
      return false;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}

/**
 * Check that param is an array.
 */
function isArr(reqObj: TReqObj, params: string): any[];
function isArr(reqObj: TReqObj, params: readonly string[]): any[][];
function isArr(
  reqObj: TReqObj,
  params: string | readonly string[],
): any[] | any[][] {
  return _checkWrapper(reqObj, params, _checkArr);
}

/**
 * Check validator for array
 */
function _checkArr(val: unknown): any[] | undefined {
  if (Array.isArray(val)) {
    return val;
  } else {
    return undefined;
  }
}

/**
 * Check that param is a date.
 */
function isDate(reqObj: TReqObj, params: string): Date;
function isDate(reqObj: TReqObj, params: readonly string[]): Date[];
function isDate(
  reqObj: TReqObj,
  params: string | readonly string[],
): Date | Date[] {
  return _checkWrapper(reqObj, params, _checkDate);
}

/**
 * Check validator for date
 */
function _checkDate(val: unknown): Date | undefined {
  const date = new Date(val as string);
  if (!isNaN(date.getTime())) {
    return date;
  } else {
    return undefined;
  }
}

/**
 * Check that param satisfies the validator function.
 */
function isValid<T>(
  reqObj: TReqObj,
  param: string,
  validatorFn: (param: unknown) => param is T,
): T {
  const val = reqObj[param];
  if (validatorFn(val)) {
    return val;
  } else {
    throw new ValidationErr(param);
  }
}

// **** Shared Helpers **** //

/**
 * Do stuff based on whether or not params is an array
 */
function _checkWrapper<T>(
  reqObj: TReqObj,
  params: string | readonly string[],
  checkFn: (val: unknown) => T | undefined,
): T | T[] {
  // If is array
  if (params instanceof Array) {
    const retVal: T[] = [];
    for (const param of params) {
      const val = checkFn(reqObj[param]);
      if (val !== undefined) {
        retVal.push(val);
      } else {
        throw new ValidationErr(param);
      }
    }
    return retVal;
  }
  // If not an array
  const val = checkFn(reqObj[params]);
  if (val !== undefined) {
    return val;
  }
  // Throw error
  throw new ValidationErr(params);
}

// **** Export Default **** //

export default {
  isStr,
  isNum,
  isBool,
  isArr,
  isDate,
  isValid,
} as const;