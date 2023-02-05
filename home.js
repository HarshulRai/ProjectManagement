const token = localStorage.getItem('token')
var addProjectBtn = document.querySelector(".submit-btn")
var itemList = document.querySelector("#items") 
var filter = document.querySelector("#filter")


addProjectBtn.addEventListener("click", addItem)
itemList.addEventListener("click", removeElement)
filter.addEventListener("keyup", filterItems)

let projectname= document.querySelector("#projectname")
let description = document.querySelector("#description")
let status = document.querySelector('#status')


window.addEventListener('DOMContentLoaded', (e)=>{
    axios.get('http://localhost:3000/home', { headers: {"Authorization" : token} })
    .then(user=>{

 

        axios.get('http://localhost:3000/home/getProjects', { headers: {"Authorization" : token} })
        .then(res=>{
        console.log(res)

            let projects = res.data.projects

            for(let i=0; i<projects.length; i++){
                let proId = projects[i].id
                let proName = projects[i].projectname
                let proStat = projects[i].status
                let proDescription = projects[i].description

                displayProject(proName, proStat, proDescription, proId)
                
            }
        })
    })
    
})

const btn = document.getElementById("btn");
const nav = document.getElementById("nav");

btn.addEventListener("click", () => {
    nav.classList.toggle("active");
    btn.classList.toggle("active");
});

function addItem(e){
    e.preventDefault()
    let project = {projectName: projectName.value, description: prodescription.value, status: status.value}
    const token = localStorage.getItem('token')
    axios.post('http://localhost:3000/home/addProject',{project},{ headers: {"Authorization" : token} })
    .then(res=>{
        let addedProject = res.data.result
        

        displayProject(addedProject.projectName, addedproject.status, addedProject.description)

        
    })
    .catch(err=>{
        console.log(err)
    })


}

function removeElement(e){
    if(e.target.classList.contains("delete")){
        if(confirm("Are you sure?")){
            let id = e.target.parentElement.id
            axios.post('http://localhost:3000/home/deleteProject',{id},{ headers: {"Authorization" : token} })
            .then((res)=>{
                console.log(res)

                var li = e.target.parentElement
                itemList.removeChild(li)
            }).catch(err=>console.log(err))

            
        }
    }
}

var n = itemList.children.length

for(i=0; i<n; i++){
    var editBtn = document.createElement("button")

    editBtn.appendChild(document.createTextNode("Edit"))
    editBtn.className = "btn btn-sm float-right edit"

    itemList.children[i].appendChild(editBtn)
}

function filterItems(e){
    
    var text = e.target.value.toLowerCase()
    //console.log(text)

    // Get List
    var items = itemList.querySelectorAll("li")
    //console.log(item)

    Array.from(items).forEach(item => {
        var itemName = item.firstChild.textContent
        
        if(itemName.toLowerCase().indexOf(text) != -1){
            item.style.display = "block"
        }else{
            item.style.display = "none"
        }

    });
}

function displayProject(proName, proStat, proDescription, proId){
    let newProject = `
            ${proName} : ${proStat} : ${proDescription}

        `
        // Creating new list element
        var li = document.createElement("li")
        li.className = "list-group-item"
        li.id = proId
        // Adding text node with input value
        li.appendChild(document.createTextNode(newProject))

        // Creating del button element
        var delBtn = document.createElement("button")
        delBtn.className = "btn btn-danger btn-sm float-right delete"

        delBtn.appendChild(document.createTextNode("X"))

        li.appendChild(delBtn)

        itemList.appendChild(li)
}


let logoutBtn = document.querySelector('#logout')

logoutBtn.addEventListener('click', (e)=>{
    localStorage.clear()
    window.location.replace('login.html')
})
