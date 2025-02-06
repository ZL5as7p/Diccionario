var word,
	sound,
	results,
	word_name,
	defs = ``,
	finding = document.querySelector('.finding'),
	words = document.querySelector('.words'),
	textbox = document.querySelector('.textbox');

//variables declared above

function find() {
	word = textbox.value.trim()
	fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
		.then((response) => {
			return response.json()
			//turning the fetch response into json format
		})
		.then((res) => {
			results = res
			//html block start here
			for (let i in results[0].meanings) {
				defs += `<li class="def">
							<h4>Part of Speech - ${results[0].meanings[i].partOfSpeech}</h4>
							<p>meaning - ${results[0].meanings[i].definitions[0].definition}</p>
							<span>example - "${results[0].meanings[i].definitions[0].example}"</span>
						</li>`
			}
			render_this = /*html*/ `
			<div class="word">
				<button class="sound"
				onclick="pronunce('${results[0].phonetics[0].audio}')">
					${results[0].phonetics[0].text}
					<i class="fas fa-volume-up"></i>
				</button>
				<h2>${word}</h2>
				<ol class="text">
					${defs}
				</ol>
			</div>`
			// html block end here
			words.insertAdjacentHTML('afterbegin', render_this)
			// adding htmls after the begin of the element
		})
		.catch((error) => {
			console.log(error)
			// catch any error
		})
}

//function to play the pronunciation
function pronunce(voice) {
	voice = new Audio(voice)
	voice.play()
}

//event on enter key click
textbox.addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		find()
		textbox.value = '';
		defs = '';
	}
})




