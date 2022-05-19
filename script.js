async function newElement() {
    var li = document.createElement("li");
    const input = document.getElementById("input").value;
    var t = document.createTextNode(input);
    li.appendChild(t);
    if (input === '') {
    } 
    else {
        const inputdata = {description: input, done: false};
        const response = await fetch("http://localhost:3000/",{ 
            method: "POST",
            body: JSON.stringify(inputdata),
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            },
        })
        await response.json()
        document.getElementById("list").appendChild(li);
    }
    document.getElementById("input").value = " ";
    var span = document.createElement("SPAN");
    var bin = document.createTextNode("\uD83D\uDDD1");
    span.className = "delete";
    span.appendChild(bin);
    li.appendChild(span);
    li.className = input
    deleteitem()
}

function description(d){
    const dd = d.description
    return dd 
}

function addtodo(d){
    const userList = document.getElementById("list")
    const listItem = document.createElement('li');
    const userName = description(d);
    const nameHeader = document.createElement('p');
    const userTextElem = document.createTextNode(userName);
    listItem.className = userName
    nameHeader.appendChild(userTextElem);
    listItem.appendChild(userTextElem);
    userList.appendChild(listItem);

    var span = document.createElement("SPAN");
    var bin = document.createTextNode("\uD83D\uDDD1");
    span.className = "delete";
    span.appendChild(bin);
    listItem.appendChild(span);
}

function deleted(d){
    const dd = d._id
    return dd 
}

async function deleteitem(){
    var close = document.getElementsByClassName("delete"); 
    var i;
    for (i = 0; i < close.length; i++){
        const naam = document.getElementsByTagName("li")[i].className
        const p = await getdata()
        const f = p.filter(na => na.description.includes(naam))
        const dd = f.map(d => deleted(d))
        console.log(dd)
        close[i].onclick = async function() {
            var div = this.parentElement;
            div.style.display = "none";
            const dat = new URL(dd, "http://localhost:3000/")
            // console.log(dd)
            fetch(dat,  { 
                method: "delete"
            })
        }
    }
}

async function getdata(){
    const response = await fetch("http://localhost:3000/",{ 
        headers: {
            "Content-Type": "application/json"
    }})
    var data = await response.json()
    return data
}

async function all(){
    const da = await getdata()
    da.map(d => addtodo(d))
    deleteitem()
}

all()

