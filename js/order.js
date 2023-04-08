// for order.html

// Global variables
const ser = ["ticket", "dining", "hotel"];
const serLen = ser.length;
const labelBG_base = "lightgray";
const labelBG_hl = "white";
var tableIdx = 0;
var qtys = [];

// initialize
window.onload = function () {
    // set up menu lavel event handlers
    let menuLabels = document.getElementsByClassName("menu_label");
    for (let i = 0; i < menuLabels.length; i++) {
        menuLabels[i].onclick = switchMenu; // event handler
        menuLabels[i].style.backgroundColor = labelBG_base;
    }
    // show first tab and highlight first menu label
    showTab(0);
    hlLabel(0);
    // set up form add button event handlers
    let buttons = document.querySelectorAll("form button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", tableAdd); // event listener
    }
    // set up undo link event handler
    let undo = document.getElementById("undo");
    undo.addEventListener("click", tableRemove); // event listener
};

// label and tab operations
function showTab(serID) {
    let tab = document.getElementById(ser[serID] + "_tab");
    tab.style.display = "inline-block";
    tab.style.boxSizing = "border-box";
    tab.style.borderWidth = "0 1px 1px 1px";
    tab.style.borderStyle = "solid";
    tab.style.borderColor = "black";
}

function hideTab(serID) {
    let tab = document.getElementById(ser[serID] + "_tab");
    tab.style.display = "none";
}

function hlLabel(serID) {
    let label = document.getElementById(ser[serID]);
    label.style.backgroundColor = labelBG_hl;
}

function unhlLabel(serID) {
    let label = document.getElementById(ser[serID]);
    label.style.backgroundColor = labelBG_base;
}

function switchMenu() {
    let series = this.id;
    for (let i = 0; i < serLen; i++) {
        if (series == ser[i]) {
            showTab(i);
            hlLabel(i);
        } else {
            hideTab(i);
            unhlLabel(i);
        }
    }
}

// table operations
function tableAdd() {
    let orderID = this.id;
    let tbody = document.getElementsByTagName("tbody")[0];
    let orderDesc = document.getElementById(orderID + "-img").alt;
    let orderQty = document.getElementById(orderID + "-qty").value;
    tbody.innerHTML += 
        "<tr id=\"row" + tableIdx + "\"class=\"" + (tableIdx % 2 == 0 ? "even" : "odd") + "\">" +
        "<td class=\"description\">" + orderDesc + "</td>" +
        "<td class=\"quantity\">" + orderQty + "</td>" +
        "</tr>\n";
    tableIdx++;
    qtys.push(parseInt(orderQty));
    recal();
}

function tableRemove(ev) {
    // the address in address bar will never change
    ev.preventDefault(); // cancel the link action (goto #)
    ev.returnValue = false;
    if (tableIdx == 0) {
        // no rows to remove
        return;
    }
    let tbody = document.getElementsByTagName("tbody")[0];
    let lastRow = document.getElementById("row" + (tableIdx - 1));
    tbody.removeChild(lastRow);
    tableIdx--;
    qtys.pop();
    recal();
}

function recal() {
    let subtotal = 0;
    for (let i = 0; i < qtys.length; i++) {
        if (!isNaN(qtys[i])) {
            subtotal += qtys[i];
        }
    }
    let totalqty = document.getElementById("totalqty");
    totalqty.innerHTML = subtotal;
}