import browser from "webextension-polyfill";

/**
 * Returns an Error if extension.runtime.lastError is present
 * this is a workaround for the non-standard error object that's used
 *
 * According to the docs, we are expected to check lastError in runtime API callbacks:
 * "
 * If you call an asynchronous function that may set lastError, you are expected to
 * check for the error when you handle the result of the function. If lastError has been
 * set and you don't check it within the callback function, then an error will be raised.
 * "
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/lastError}
 */
export function checkForLastError() {
  const { lastError } = browser.runtime;
  if (!lastError) {
    return undefined;
  }

  // @ts-ignore
  // if it quacks like an Error, its an Error
  if (lastError.stack && lastError.message) {
    return lastError;
  }
  // repair incomplete error object (eg chromium v77)
  return new Error(lastError.message);
}

export function getSerializableObject(jsonObject: any) {
  return JSON.parse(
    JSON.stringify(jsonObject, (_, value) => {
      if (typeof value === "bigint") {
        return "0x".concat(value.toString(16));
      }
      return value;
    }),
  );
}
