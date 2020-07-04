
  var taskInput = document.getElementById("new-task"); 
  //first button
  var addButton = document.getElementsByTagName("button")[0]
  var TasksHolder = document.querySelector(".cards");
  TasksHolder.setAttribute('class', 'cards') 
  

  var createNewTaskElement = function(taskString) {
    var listItem = document.createElement("div");
    listItem.setAttribute('class', 'card') 
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");

    editInput.type = "text";   
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskString;
    
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton); 

      return listItem;
  }
  
  
  //Add a new task
  var addTask = function() {
    console.log("add task");
    var listItem = createNewTaskElement(taskInput.value);
    TasksHolder.appendChild(listItem);
    bindTaskEvents(listItem);
    taskInput.value = "";
    addListeners();
  }
  
  //Edit a task
  var editTask = function() {
  var listItem = this.parentNode; 
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");  
  var containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        label.innerText = editInput.value;
    } else {
           editInput.value = label.innerText;
    }
    listItem.classList.toggle("editMode");
  }
  
  //Delete an existing task
  var deleteTask = function () {
        var listItem = this.parentNode;
        var deletediv = listItem.parentNode;
        deletediv.removeChild(listItem);
  }
  
  addButton.addEventListener("click", addTask); 
  
  
  var bindTaskEvents = function(taskListItem) {
      var editButton = taskListItem.querySelector("button.edit");
      var deleteButton = taskListItem.querySelector("button.delete");
        editButton.onclick = editTask;
        deleteButton.onclick = deleteTask;

  }
  
  for (var i = 0; i < TasksHolder.children.length; i ++) {	
    bindTaskEvents(TasksHolder.children[i]);
  }
  
  
  function addListeners() {
    $(".card").draggable({
      revert: "invalid",
      start: function() {
        $(this).addClass("selected");
      },
      stop: function() {
        $(this).removeClass("selected")
      }
    });
  
    $(".column").droppable({
      accept: ".card",
      drop: function(event, ui) {
        ui.draggable
          .css("left", "0")
          .css("top", "0")
          .appendTo($(this).find(".cards"))
      }
    });
  }
  
