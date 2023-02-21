console.log("Code is running")

const url = "https://www.fishwatch.gov/api/species"
const input = document.querySelector("#input")
const log = document.querySelector("#log")
const output = document.querySelector("#output")

const buttonSize5 = document.querySelector("#page-size-5")
const buttonSize10 = document.querySelector("#page-size-10")
const buttonSize20 = document.querySelector("#page-size-20")
const buttonPageFirst = document.querySelector("#first-page")
const buttonPageNext = document.querySelector("#next-page")

let pageLength = 10
let resultOffset = 0

if (pageLength === 5) {
    buttonSize5.disabled = true
} else if (pageLength === 10) {
    buttonSize10.disabled = true
} else if (pageLength === 20) {
    buttonSize20.disabled = true
}

buttonSize5.addEventListener("click", () => sizeButtonCycle(5))
buttonSize10.addEventListener("click", () => sizeButtonCycle(10))
buttonSize20.addEventListener("click", () => sizeButtonCycle(20))

function sizeButtonCycle(select) {
    pageLength = select
    buttonSize5.disabled = false
    buttonSize10.disabled = false
    buttonSize20.disabled = false
    if (pageLength === 5) {
        buttonSize5.disabled = true
    } else if (pageLength === 10) {
        buttonSize10.disabled = true
    } else if (pageLength === 20) {
        buttonSize20.disabled = true
    }
}

async function getList() {
    const response = await fetch(url)
    const data = await response.json()
    //console.log(data)
    printList(data)
}

function printList(array) {
    for (let i = resultOffset; i < array.length; i++) {
        if (i >= resultOffset + pageLength) {
            break
        }
        const element = document.createElement("div")
        const header = document.createElement("h2")
        const picture = document.createElement("img")
        const content = document.createElement("p")
        header.innerText = array[i]["Species Name"]
        content.innerText = array[i]["Scientific Name"]
        picture.src = array[i]["Species Illustration Photo"].src
        picture.alt = array[i]["Species Illustration Photo"].alt
        picture.title = array[i]["Species Illustration Photo"].title
        element.append(header, picture, content)
        element.classList.add("entry")
        output.append(element)
    }
    output.style.display = "flex"

}
getList()