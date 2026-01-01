var gIndex = null;

var allTasks =JSON.parse(localStorage.getItem("tasks")) || [];

function registerTask(){
var TaskNo = document.getElementById("TaskNo").value;
var Task= document.getElementById("Task").value;
var Description=document.getElementById("Description").value;

var Tasks={
    TaskNo,
    Task,
    Description,
};
allTasks.push(Tasks);
saveToLocalStorage();
document.getElementById("TaskNo").value="";
document.getElementById("Task").value="";
document.getElementById("Description").value="";
console.log(TaskNo,Task,Description);
displayTaskInTable();
}

function displayTaskInTable(){
    document.querySelector("tbody").innerHTML="";
    allTasks.forEach(function(tas,index){
        var myTr = document.createElement("tr");
        for(a in tas) {
            var myTd=document.createElement("td");
            myTd.innerHTML=tas[a];
            myTr.appendChild(myTd)
        }
        



        var editTd = document.createElement("td");
        var editBtn= document.createElement("button");
        editBtn.innerHTML="Edit";
        editBtn.setAttribute("class","edit-btn");
        editBtn.setAttribute("onclick", "editTask("+ index +")");
        editTd.appendChild(editBtn);
        myTr.appendChild(editTd);


        var delTd=document.createElement("td");
        var delBtn=document.createElement("button");
        delBtn.innerHTML="Delete";
        delBtn.setAttribute("class","del-Task");
        delBtn.setAttribute("onclick","deleteTask("+ index +")");
        delTd.appendChild(delBtn);
        myTr.appendChild(delTd);

        document.querySelector("tbody").appendChild(myTr);
    });
}

displayTaskInTable();

function saveToLocalStorage(){
    localStorage.setItem("tasks",JSON.stringify(allTasks));
}

function deleteTask(i){
    allTasks.splice(i,1);
    saveToLocalStorage();
    displayTaskInTable();
}

function editTask(i){
    gIndex=i;
    document.getElementById("TaskNo").value=allTasks[i].TaskNo;
     document.getElementById("Task").value=allTasks[i].Task;
      document.getElementById("Description").value=allTasks[i].Description;

      document.getElementById("updateBtn").style.display="block";
      document.getElementById("register").style.display="none";
}

function updateTask() {
    
    var TaskNo= document.getElementById("TaskNo") .value;
    var Task=document.getElementById("Task").value;
    var Description=document.getElementById("Description").value;

    var tasks={
        TaskNo,
        Task,
        Description,
    };

    allTasks[gIndex]=tasks;
    saveToLocalStorage();
    displayTaskInTable();
    document.getElementById("TaskNo").value="";
    document.getElementById("Task").value="";
    document.getElementById("Description").value="";

    document.getElementById("updateBtn").style.display="none";
    document.getElementById("register").style.display="block";

}
