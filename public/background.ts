import browser from "webextension-polyfill";

console.log("Background");

browser.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
  console.log(tabs[0].url);
});
