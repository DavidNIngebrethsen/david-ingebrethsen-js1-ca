console.log("Home script is running")

const url = "https://www.fishwatch.gov/api/species"
const input = document.querySelector("#input")
const log = document.querySelector("#log")
const output = document.querySelector("#output")
const animation = document.querySelector("#animation")

const buttonSize5 = document.querySelector("#page-size-5")
const buttonSize10 = document.querySelector("#page-size-10")
const buttonSize20 = document.querySelector("#page-size-20")
const buttonPageFirst = document.querySelector("#first-page")
const buttonPageNext = document.querySelector("#next-page")

let pageLength = 10
let resultOffset = 0
let library = []
let results = 0

getList()
async function getList() {
    animation.style.display = "block"
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        library = data
        results = data.length
        setTimeout(() => {
            animation.style.display = "none"
        }, 500);
    } catch (error) {
        element = document.createElement("h3")
        element.innerText = "Failed to fetch from API, please refresh to try again."
        log.append(element)
        log.style.display.block
        setTimeout(() => {
            animation.style.display = "none"
        }, 500);
    }
}

const pageNumber = document.querySelector("#page-number")
const lastPageNumber = document.querySelector("#last-page-number")

buttonSize5.addEventListener("click", () => sizeButtonCycle(5))
buttonSize10.addEventListener("click", () => sizeButtonCycle(10))
buttonSize20.addEventListener("click", () => sizeButtonCycle(20))
buttonPageFirst.addEventListener("click", () => firstPage())
buttonPageNext.addEventListener("click", () => nextPage())

function sizeButtonCycle(select) {
    pageLength = select
    buttonSize5.disabled = false
    buttonSize10.disabled = false
    buttonSize20.disabled = false
    buttonPageFirst.disabled = false
    buttonPageNext.disabled = false
    if (pageLength === 5) {
        buttonSize5.disabled = true
    } else if (pageLength === 10) {
        buttonSize10.disabled = true
    } else if (pageLength === 20) {
        buttonSize20.disabled = true
    }
    firstPage()
}

function firstPage() {
    resultOffset = 0
    pageNumber.innerText = 1
    lastPageNumber.innerText = Math.ceil(results/pageLength)
    printList(library)
}

function nextPage() {
    resultOffset += pageLength
    let currentPage = parseInt(pageNumber.innerText)
    currentPage += 1
    pageNumber.innerText = currentPage
    printList(library)
}

function clearList() {
    output.innerHTML = ""
}

function printList(array) {
    animation.style.display = "block"
    clearList()
    for (let i = resultOffset; i < resultOffset + pageLength; i++) {
        if (i >= array.length) {
            buttonPageNext.disabled = true
            break
        }
        setTimeout(() => {
            printItem(array[i])
            animation.style.display = "none"
        }, 500);
    }
    output.style.display = "flex"
}

function printItem(item) {
    const element = document.createElement("a")
    const header = document.createElement("h2")
    const picture = document.createElement("img")
    const content = document.createElement("p")

    header.innerText = item["Species Name"]
    content.innerText = item["Scientific Name"]
    picture.src = item["Species Illustration Photo"].src
    picture.alt = item["Species Illustration Photo"].alt
    picture.title = item["Species Illustration Photo"].title

    element.append(header, picture, content)
    element.classList.add("entry")
    element.href = "details.html" + "?fish=" + item["Path"].slice(10)
    output.append(element)
}
