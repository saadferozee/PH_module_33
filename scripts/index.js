// all API Keys
const getAllLevels = 'https://openapi.programming-hero.com/api/levels/all';
// const getWordsByLevels = 'https://openapi.programming-hero.com/api/level/5';
// const getAllWords = 'https://openapi.programming-hero.com/api/words/all';
// const getWordsDetail = 'https://openapi.programming-hero.com/api/word/5';

const loadAllLessonsData = () => {
    // fetch the API Data
    fetch(getAllLevels)
        .then(data => data.json())
        .then(jsonData => displayLessons(jsonData.data));
}

const displayLessons = (data) => {
    // get container
    const container = document.getElementById('lesson-button-container');
    container.innerHTML = "";

    // get data separately
    data.forEach(element => {
        const levelNo = element.level_no;

        // create a new element
        const newButton = document.createElement('div');
        newButton.innerHTML = `
        <button id="lesson-button-${levelNo}" onclick="loadWordsData(${levelNo})"
            class="btn btn-outline btn-primary text-[12px]">
                <i class="fa-solid fa-book-open"></i> Lesson - ${levelNo}
        </button>
        `
        // append into container
        container.appendChild(newButton);
    });
}

const loadWordsData = (no) => {
    const API = `https://openapi.programming-hero.com/api/level/${no}`;
    fetch(API)
        .then(data => data.json())
        .then(words => displayWord(words.data));
}

const displayWord = (words) => {
    const container = document.getElementById('word-meaning-card-container');
    container.innerHTML = "";

    if (words.length === 0) {
        const alert = document.createElement('div');
        alert.setAttribute('class', 'col-span-3');        
        alert.innerHTML = `
            <div class="text-center">
                <img class="mx-auto" src="./assets/alert-error.png" alt="alert"/>
                <h6 class="siliguri font-light text-xl text-[#79716b]">এই <span class="poppins">Lesson</span> এ কোনও <span class="poppins">Vocabulary</span> যুক্ত করা হয়নি
                </h6>
                <h2 class="siliguri font-medium text-4xl">পরবর্তী <span class="poppins">Lesson</span> এ যান।</h2>
            </div>
        `
        container.appendChild(alert);
    } else {
        words.forEach(wordData => {
            const newCard = document.createElement('div');
            newCard.innerHTML = `
                <div class="bg-white rounded-lg py-5 px-7 space-y-5 text-center">
                    <h2 class="poppins font-semibold text-2xl">${wordData.word ? wordData.word : 'Word not Found'}</h2>
                    <h5 class="poppins font-medium text-sm">Meaning / Pronunciation</h5>
                    <h2 class="siliguri font-medium text-2xl">"${wordData.meaning ? wordData.meaning : "Meaning not Found"}" <span class="poppins">/</span> "${wordData.pronunciation}"</h2>

                    <div class="mt-7 mx-4 flex justify-between">
                        <button class="px-3 py-2 bg-[#1A91FF20] rounded-lg text-sm text-[#374957]"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="px-3 py-2 bg-[#1A91FF20] rounded-lg text-sm text-[#374957]"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
            `
            container.appendChild(newCard);
        });
    }
}

loadAllLessonsData();