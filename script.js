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
document.addEventListener("DOMContentLoaded", () => {
    const translateBtn = document.querySelector('.translate-btn');
    const fromText = document.querySelector('#input-text');
    const toText = document.querySelector('#output-text');

    // Example translation function (replace with your actual translation logic)
    translateBtn.addEventListener("click", () => {
        const text = fromText.value;
        // Simulate translation (replace with actual API call)
        toText.value = text.split('').reverse().join(''); // Just reversing text for demonstration
    });

    // Copy to Clipboard functionality for given text
    document.getElementById('copy-given-btn').addEventListener("click", () => {
        const inputText = fromText.value; // Get the input text

        if (inputText) {
            navigator.clipboard.writeText(inputText)
                .then(() => {
                    alert("Given text copied to clipboard!"); // Notify the user
                })
                .catch(err => {
                    console.error("Failed to copy: ", err);
                    alert("Failed to copy given text."); // Notify if copying fails
                });
        } else {
            alert("Nothing to copy!"); // Notify if there's no text to copy
        }
    });

    // Copy to Clipboard functionality for translated text
    document.getElementById('copy-translated-btn').addEventListener("click", () => {
        const translatedText = toText.value; // Get the translated text

        if (translatedText) {
            navigator.clipboard.writeText(translatedText)
                .then(() => {
                    alert("Translated text copied to clipboard!"); // Notify the user
                })
                .catch(err => {
                    console.error("Failed to copy: ", err);
                    alert("Failed to copy translated text."); // Notify if copying fails
                });
        } else {
            alert("Nothing to copy!"); // Notify if there's no text to copy
        }
    });
});
