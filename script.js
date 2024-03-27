'use strict';

// default variables
const body = document.querySelector('body');
const main = document.querySelector('main');
const createTask = document.querySelector('.createTask');
const add = document.querySelector('.add');
const task = document.querySelector('#task');
const taskContainer = document.querySelector('.taskContainer');
const filter = document.querySelector('.filter');
const itemCount = document.querySelector('.items');
const itemQuantity = document.querySelector('.number_of_items');


// creating the theme view for mobile
const day = document.querySelector('.dayTheme');
const night = document.querySelector('.nightTheme');

//changing header background image based on screen width
if(main.getBoundingClientRect().width >= 800) {
    main.style.backgroundImage = 'url(images/bg-desktop-dark.jpg)'; 
}

day.addEventListener('click', function(){
    main.style.backgroundImage = 'url(images/bg-mobile-light.jpg)';
    body.style.background = 'white';
    night.classList.toggle('displayNone');
    day.classList.toggle('displayNone');
    createTask.style.background = 'white';
    taskContainer.style.background = 'white';
    taskContainer.style.boxShadow = '1px 0px 15px 0px grey';
    itemCount.style.background = 'white';
    itemCount.style.boxShadow = '1px 0px 15px 0px grey';
    filter.style.background ='white';
    filter.style.boxShadow = '1px 0px 10px 0px grey';

//changing header background image based on screen width
    if(main.getBoundingClientRect().width >= 800) {
        main.style.backgroundImage = 'url(images/bg-desktop-light.jpg)'; 
    }
})

night.addEventListener('click', function(){
    main.style.backgroundImage = 'url(images/bg-mobile-dark.jpg)';
    body.style.background = 'rgb(22, 22, 32)';
    night.classList.toggle('displayNone');
    day.classList.toggle('displayNone');
    createTask.style.background = 'rgb(37, 39, 60)';
    taskContainer.style.background = 'rgb(37, 39, 60)';
    taskContainer.style.boxShadow = 'none';
    itemCount.style.background = 'rgb(37, 39, 60)';
    itemCount.style.boxShadow = 'none';
    filter.style.background ='rgb(37, 39, 60)';
    filter.style.boxShadow = 'none';

//changing header background image based on screen width
    if(main.getBoundingClientRect().width >= 800) {
        main.style.backgroundImage = 'url(images/bg-desktop-dark.jpg)'; 
    }
})



//array holding all the task data
//very important do not manipulate in code
const tasks = [];

itemCount.classList.add('displayNone');

// adding new tasks to the todo list
add.addEventListener('click', function(e){
    e.preventDefault();


    const div = document.createElement('div');
    let taskValue = task.value;

    const content = `<button class="checkbox"></button>
                     <p class="data" index="${tasks.length}">${taskValue}</p>
                     <img src="images/icon-cross.svg" alt="delet-icon" class="delete" index="${tasks.length}">`;

    if(task.value != '') tasks.push(content);
    
    const dataIndex = tasks.length - 1;

    div.insertAdjacentHTML('beforeend', tasks[dataIndex]);

    div.classList.add(`${tasks.length-1}`);

    if (taskValue === '') {
        alert('Please input a task!');
        return
    } else {
        if(task.value === '') {
            alert('Please input a task!');
            return
        };
        taskContainer.appendChild(div);
        task.value = '';
        itemQuantity.innerHTML = `${taskContainer.children.length}`;
        itemCount.classList.remove('displayNone');


//ticking completed task
        const checkBox = document.querySelectorAll('.checkbox');
        const taskData = document.querySelectorAll('.data');

        checkBox.forEach(checkBox =>
            checkBox.addEventListener('click', function(e) {
                e.preventDefault();
                
                if(checkBox.childNodes.length === 1) {
                    return;
                };

                itemQuantity.innerHTML --;

                checkBox.insertAdjacentHTML('beforeend', 
                '<img src="images/icon-check.svg" alt="icon-check" class="checked">'
                );

                checkBox.classList.add('active__checkbox');
                div.setAttribute('status', 'completed');

                taskData.forEach(task => {
                    if(task.getAttribute('index') === div.className) task.classList.add('completedTask');
                })
            }) 
        );

//deleting tasks
        const deleteTask = document.querySelectorAll('.delete');                      
        deleteTask.forEach(task => 
            task.addEventListener('click', () => {
                if(div.className === task.getAttribute('index')) {
                    div.remove()
                    itemQuantity.innerHTML --;
                }
            })
        );

//deleting completed tasks
    const children = [...taskContainer.children];       
    
        itemCount.addEventListener('click', (e) => {
            e.preventDefault();

            if(e.target.classList.contains('clear_all')) {
                if(div.getAttribute('status') === 'completed') {
                    div.remove();
                    const finished_tasks = children.filter(el => 
                        el.getAttribute('status') === 'completed');
                    
                    itemQuantity.innerHTML = `${children.length - finished_tasks.length}`;                 
                } else {
                    return
                }
            } else {
                return
            }
        })

//filtering task data
        filter.addEventListener('click', (e) => {

            const allTask = document.querySelector('.sortAll');
            const activeTask = document.querySelector('.sortActive');
            const completedTask = document.querySelector('.sortCompleted');

//view all tasks
            if(e.target.classList.contains('sortAll')) {
                allTask.classList.add('active__filter');
                if(activeTask.classList.contains('active__filter')
                    || completedTask.classList.contains('active__filter')) {
                    activeTask.classList.remove('active__filter');
                    completedTask.classList.remove('active__filter');
                }

                if(div) {
                    div.classList.remove('displayNone');
                }

            } else if(e.target.classList.contains('sortActive')) {
//view only active tasks
                activeTask.classList.add('active__filter');
                if(allTask.classList.contains('active__filter')
                    || completedTask.classList.contains('active__filter')) {
                    allTask.classList.remove('active__filter');
                    completedTask.classList.remove('active__filter');
                }

                if(div.getAttribute('status') === 'completed') {
                    div.classList.add('displayNone');
                } else{
                    div.classList.remove('displayNone');
                }

            } else if(e.target.classList.contains('sortCompleted')) {
//view only completed tasks
                completedTask.classList.add('active__filter');
                if(activeTask.classList.contains('active__filter')
                    || allTask.classList.contains('active__filter')) {
                    allTask.classList.remove('active__filter');
                    activeTask.classList.remove('active__filter');
                }

                if(div.getAttribute('status') != 'completed') {
                    div.classList.add('displayNone');
                } else {
                    div.classList.remove('displayNone');
                }     
            } 
        })
    }
});


