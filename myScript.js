var Api = 'http://localhost:3000/courses/'
var idForEdit = 0


function start(){
    getCourese(renderCoures)
    handleCreateCourses()    
}

function renderCoures(courses){   
    // console.log(courses) 
    var listCoursesBlock = document.querySelector('#list-courses ul')
    var htmls = courses.map(function(course){
        return `
        <li class="course-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button class="btn-del" onclick="delCoures(${course.id})">Delete</button>
            <button class="btn-edit" onclick="editCourse(${course.id}, '${course.name}', '${course.description}')">Edit</button>
        </li>    
        `;
    })
    listCoursesBlock.innerHTML = htmls.join('')    
}

var editCourse = function(id, name, description){
    document.querySelector('input[name="name"]').value = name
    document.querySelector('input[name="description"]').value = description
    idForEdit = id
}

var btnAccept = document.querySelector('#btn-accept')
btnAccept.onclick = function(){ 
    var editInfo = {    
        id: idForEdit,    
        name: document.querySelector('input[name="name"]').value,
        description: document.querySelector('input[name="description"]').value
    }     
    handleEditCourse(editInfo)
}

function handleEditCourse(data){  
      fetch(Api + data.id,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(function(){
            var idCourse = document.querySelector('.course-'+data.id)
            var h4Element = idCourse.querySelector('h4')
            var pElement = idCourse.querySelector('p')
            h4Element.innerHTML = data.name
            pElement.innerHTML = data.description  
        })  
}

function delCoures(id){
    fetch(Api + id,{
        method: 'DELETE'
    })
        .then(function(response){
            return response.json()
        })
        .then(function(){
            var idCourse = document.querySelector('.course-'+id)
            if(idCourse){
                idCourse.remove()
            }
        })    

}

function handleCreateCourses(){
    var btnCreate = document.querySelector("#btn-create")
    btnCreate.onclick = function(){
        var name = document.querySelector('input[name="name"]').value
        var description = document.querySelector('input[name="description"]').value                            
        createCoure({
            name: name,
            description:description
        }, function(){
            getCourese(renderCoures)
        })
    }
}

start()

function getCourese(callback){
    fetch(Api)
        .then(function(response){
            return response.json()
        })
        .then(callback)
}
function createCoure(data, callback){
    fetch(Api,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'            
        },
    })
        .then(function(response){
            return response.json()
        })
        .then(callback)
}


// coi lai call back + promise


