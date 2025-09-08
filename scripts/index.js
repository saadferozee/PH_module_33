// all API Keys
const getAllLevels = 'https://openapi.programming-hero.com/api/levels/all';
const getWordsByLevels = 'https://openapi.programming-hero.com/api/level/5';
const getAllWords = 'https://openapi.programming-hero.com/api/words/all';
const getWordsDetail = 'https://openapi.programming-hero.com/api/word/5';

const getAllLessonsData = () => {
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
        <button 
            class="btn btn-outline btn-primary text-[12px]">
                <i class="fa-solid fa-book-open"></i> Lesson - ${levelNo}
        </button>
        `
        // append into container
        container.appendChild(newButton);
    });
}

getAllLessonsData();