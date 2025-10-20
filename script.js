// Select Dom Elements
const input=document.getElementById('todo-input')
const addBtn=document.getElementById('add-btn')
const list=document.getElementById('todo-list')

//Try to load saved todos from localStorage (if any)
const saved=localStorage.getItem('todos');
const todos=saved  ? JSON.parse(saved):[];

function saveTodos(){
    //Save current todo array to localStorage
    localStorage.setItem('todos',JSON.stringify(todos));
}

//Create a dom node for a todo object and append it to the list - give individual node for our todo
function createTodoNode(todo,index){
    const li=document.createElement('li');
    
    //Checkbox to toggle completion
    const checkbox=document.createElement('input');
    checkbox.type='checkbox';
    checkbox.checked= !!todo.completed; // to convert into boolean equivalent value to exact boolean
    checkbox.addEventListener("change",()=>{
        todo.completed=checkbox.checked;

        //TODO: Visual Feedback : strike-through when completed
        textSpan.style.textDecoration=todo.completed?'line-through':'';
        saveTodos();
    })

    //Text of the todo
    const textSpan=document.createElement("span");
    textSpan.textContent=todo.text;
    textSpan.style.margin= '0 8px';
    if(todo.completed){
        textSpan.style.textDecoration='line-through';
    }


        // Add double click event listener to edit todo
        textSpan.addEventListener("dblclick",()=>{
            const newText=prompt("Edit Todo", todo.text);
            if(newText!=-null){
                todo.text=newText.trim();
                textSpan.textContent=todo.text;
                saveTodos();
            }
        })

        //Delete todo button
        const delBtn=document.createElement('button');
        delBtn.textContent="Delete";
        delBtn.addEventListener('click',()=>{
            todos.splice(index,1);
            render();
            saveTodos();
        })

        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delBtn);    
        return li;
    
}


//Render the whole todo list from todos array - call when adding and deleting node of todo
function render(){
    list.innerHTML='';
    
    //Recreate each item
    todos.forEach((todo, index) => {
        const node=createTodoNode(todo, index)
        list.appendChild(node)
    });

}


function addTodo(){
    const text= input.value.trim();
    if(!text){
        return
    }

    //Push a new todo object
    todos.push({text: text,completed:false});
    input.value='';
    render();
    saveTodos();
}


addBtn.addEventListener('click',addTodo);
input.addEventListener('keydown',(e)=>{
    if(e.key=='Enter'){
        addTodo();
    }
})
render();