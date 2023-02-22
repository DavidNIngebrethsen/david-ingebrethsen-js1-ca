console.log("Details script is running")

const url = "https://www.fishwatch.gov/api/species/"
const output = document.querySelector("#content")

async function getItem() {
    const link = new URLSearchParams(window.location.search)
    const response = await fetch(url + link.get("fish"))
    const data = await response.json()
    console.log(data)
    if (data[0]) {
        printItem(data[0])
    } else {
        const error = document.createElement("h1")
        error.innerText = "Error, data not found"
        error.style.color = "firebrick"
        output.append(error)
    }
    
}
getItem()

function printItem(array) {
    const element = document.createElement("div")
    const title = document.createElement("h2")
    const latinName = document.createElement("p")
    const picture = document.createElement("img")
    const information = document.createElement("div")

    title.innerText = array["Species Name"]
    latinName.innerText = array["Scientific Name"]
    picture.src = array["Species Illustration Photo"].src
    picture.alt = array["Species Illustration Photo"].alt
    picture.title = array["Species Illustration Photo"].title
    information.innerHTML = array["Biology"]
    element.append(title, latinName, picture, information)
    output.append(element)
}