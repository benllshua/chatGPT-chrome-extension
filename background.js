// Listen for changes to the active tab
chrome.tabs.onActivated.addListener(function (activeInfo) {
  // Get the active tab
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    // If the active tab is a Google search page, perform a search
    if (tab.url.startsWith("https://www.google.com/search?")) {
      // Parse the search query from the URL
      const params = new URLSearchParams(tab.url.split("?")[1]);
      const query = params.get("q");

      // Send the search query to the content script
      chrome.tabs.sendMessage(tab.id, { type: "search", query: query });
    }
  });
});
