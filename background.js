importScripts('plainstyle_rev2.js');

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'style[-1]',
    title: 'Normal',
    contexts: ['selection']
  });
  fontList.forEach((font, index) => {
    chrome.contextMenus.create({
      id: `style[${index}]`,
      title: font.buttonLabel,
      contexts: ['selection']
    });
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const match = info.menuItemId.match(/^style\[(-?\d+)\]$/);
  if (!match) return;
  const srcText = info.selectionText ?? '';
  const index = parseInt(match[1]);
  const style = fontList[index] ?? null;
  const dstText = new StyledString(srcText, style).toString();
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: (styledText) => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) document.execCommand('insertText', false, styledText);
    },
    args: [dstText]
  });
});
  