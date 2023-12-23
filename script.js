let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const messageEl = document.getElementById("message-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")
const infoBtn = document.getElementById("info-btn")
const info = document.getElementById("info-el")

infoBtn.addEventListener("click", function() {
    if(info.style.display == "none"){
        info.style.display = "block";
    }
    else{
        info.style.display = "none";
    }
})

tabBtn.addEventListener("click", function(){   
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        const url = tabs[0].url
        if (!myLeads.includes(url)) {
            myLeads.push(url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        } else {
            showMessage("This tab is already saved.")
        }
    })
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    const inputValue = inputEl.value
    if(inputValue && isValidHttpUrl(inputValue)) {
        if (!myLeads.includes(inputValue)) {
            myLeads.push(inputValue)
            inputEl.value = ""
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        } else {
            showMessage("This link is already saved.")
        }
    } else {
        showMessage("Please enter a valid URL.")
    }
})