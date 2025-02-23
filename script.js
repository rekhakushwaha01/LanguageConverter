document.addEventListener("DOMContentLoaded", () => {
    const translateBtn = document.querySelector('.translate-btn');
    const fromText = document.querySelector('#input-text');
    const toText = document.querySelector('#output-text');
    const fromLang = document.querySelector('#input-language');
    const toLang = document.querySelector('#output-language');

    // Populate language options
    const languages = {
        "en": "English",
        "hi": "Hindi",
        "es": "Spanish",
        "fr": "French"
    };

    for (const code in languages) {
        const optionFrom = document.createElement('option');
        optionFrom.value = code;
        optionFrom.textContent = languages[code];
        fromLang.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = code;
        optionTo.textContent = languages[code];
        toLang.appendChild(optionTo);
    }

    translateBtn.addEventListener("click", () => {
        let text = fromText.value;
        let translateFrom = fromLang.value;
        let translateTo = toLang.value;

        // Split text into chunks of 500 characters
        const chunkSize = 500;
        const chunks = [];
        for (let i = 0; i < text.length; i += chunkSize) {
            chunks.push(text.substring(i, i + chunkSize));
        }

        // Function to translate a single chunk
        const translateChunk = (chunk) => {
            let apiURL = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=${translateFrom}|${translateTo}`;
            return fetch(apiURL)
                .then(res => res.json())
                .then(data => data.responseData.translatedText || "Translation not available");
        };

        // Translate all chunks and combine results
        Promise.all(chunks.map(translateChunk))
            .then(translations => {
                toText.value = translations.join(' '); // Combine translations
            })
            .catch(error => {
                console.error("Error fetching translation:", error);
                toText.value = "Error fetching translation";
            });
    });
});
