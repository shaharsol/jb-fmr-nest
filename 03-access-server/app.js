function changeColor() {
    document.getElementById('color-button').style.backgroundColor = document.getElementById('color-button').style.backgroundColor === 'blue' ? 'red' : 'blue'
}

function loadData() {

    // for (let i = 0; i < 1000000; i++) {
    //     console.log(i)
    // }

    // document.getElementById('data').innerText = 'here is your data'

    setTimeout(() => {
        document.getElementById('data').innerText = 'here is your data'
    }, 5 * 1000)
}


// https://excalidraw.com/#json=vlVrUZiNSGFajd9m_jnV-,WpYiXk7UT4ooklvs7JyZSg