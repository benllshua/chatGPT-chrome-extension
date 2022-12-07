// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // If the message is a search query, perform a ChatGPT search
  if (message.type === "search") {
    // Perform a ChatGPT search using the query in message.query
    fetch(`https://api.openai.com/v1/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_API_KEY`,
      },
      body: JSON.stringify({
        prompt: message.query,
        model: "text-davinci-002",
        temperature: 0.5,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // TODO: Display the ChatGPT search results in the Google search page
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
