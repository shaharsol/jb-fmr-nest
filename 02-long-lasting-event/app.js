function changeColor() {
    document.getElementById('color-button').style.backgroundColor = document.getElementById('color-button').style.backgroundColor === 'blue' ? 'red' : 'blue'
}

function loadData() {

    for (let i = 0; i < 1000000; i++) {
        console.log(i)
    }

    document.getElementById('data').innerText = 'here is your data'
}