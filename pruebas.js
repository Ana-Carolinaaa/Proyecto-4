

function desordenar () {
    return Math.random() - 0.5
}

const pregunta = {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Entertaiment: Television",
    "question": "How many seasons did the TV show &quot; Donkey Kong Country&quot; last?",
    "correct_answer": "2",
    "incorrect_answers": [
        "1",
        "4",
        "5"
    ]
}

const miArray = [pregunta.correct_answer, ...pregunta.incorrect_answers];

miArray.sort(desordenar)

console.log(miArray)