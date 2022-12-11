"use strict";
const url = window.location.href;
const params = new URLSearchParams(url.split("?")[1]);
const query = params.get("q");
if (query && url.startsWith("https://www.google.com/search?")) {
	// getting html element ready
	document
		.getElementById("extabar")
		.insertAdjacentHTML("afterend", `<div id="chatGPTDiv"></div>`);
	const chatDiv = document.getElementById("chatGPTDiv");
	chatDiv.style.width = "var(--center-width)";
	chatDiv.style.maxWidth =
		"Calc(var(--center-abs-margin) + var(--center-width) + var(--rhs-margin) + var(--rhs-width))";
	chatDiv.style.background = "#343541";
	chatDiv.style.borderRadius = "4px";
	chatDiv.style.padding = "8px";
	chatDiv.style.fontFamily = "Google Sans,arial,sans-serif";
	chatDiv.innerText = query;
	const answerDiv = document.createElement("div");
	answerDiv.style.padding = "8px";
	answerDiv.style.fontFamily = "Google Sans,arial,sans-serif";
	answerDiv.style.marginTop = "16px";
	answerDiv.style.borderRadius = "4px";
	answerDiv.style.color = "white";
	answerDiv.style.backgroundColor = "#444654";
	answerDiv.innerText = "loading...";
	chatDiv.appendChild(answerDiv);

	fetch(`https://api.openai.com/v1/completions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer [API Kay]`,
		},
		body: JSON.stringify({
			prompt: query,
			model: "text-davinci-002",
			temperature: 0.5,
			max_tokens: 1024,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		}),
	})
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			} else {
				const { error } = await response.json();
				answerDiv.style.color = "red";
				answerDiv.innerText = error.message;
			}
		})
		.then((data) => {
			if (data && data.choices && data.choices.length) {
				const choices = data.choices;
				answerDiv.innerText = choices[0].text;
			}
		})
		.catch((error) => {
			console.error(error);
			answerDiv.style.color = "red";
			answerDiv.innerText = error;
		});
}
