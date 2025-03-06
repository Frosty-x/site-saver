let myLeads = JSON.parse(localStorage.getItem("myLeads")) || [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

if (myLeads.length > 0) {
    render(myLeads);
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        saveLead(tabs[0].url);
    });
});

inputBtn.addEventListener("click", function () {
    if (inputEl.value.trim() !== "") {
        saveLead(inputEl.value.trim());
        inputEl.value = "";
    }
});

deleteBtn.addEventListener("dblclick", function () {
    if (confirm("Are you sure you want to delete all saved links?")) {
        localStorage.clear();
        myLeads = [];
        render(myLeads);
    }
});

function saveLead(url) {
    const timestamp = new Date().toLocaleString();
    myLeads.push({ url, timestamp });
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
}

function render(leads) {
    ulEl.innerHTML = "";
    for (let i = 0; i < leads.length; i++) {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <a target='_blank' href='${leads[i].url}'>
                ${leads[i].url}
            </a>
            <small style="display: block; color: gray;">Saved on: ${leads[i].timestamp}</small>
        `;
        ulEl.appendChild(listItem);
    }
}
