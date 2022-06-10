//LOGIN FUNCTION STARTS HERE

let loginBtn = document.getElementsByClassName('btn')[0].addEventListener("click", loginClicked)

// Fetching API Request
const Users = async () => {
  let url = 'https://jsonplaceholder.typicode.com/users';
  try {
    let request = await fetch(url);
    let response = await request.json()
    userLoginFun(response)

  } catch (error) {
    console.log(error)
  }
}

function userLoginFun(response) {
  localStorage.setItem('users', JSON.stringify(response))
  console.log(localStorage.setItem('users', JSON.stringify(response)))

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  for (let i = 0; i < response.length; i++) {

    if ((email === response[i].email) && (password === "1234")) {
      console.log("email Found", email)
      return showAlert("Logged In Successfully", "success", "../dashboard.html");
    }

  }
  console.log("Email NoT Found")
  showAlert("Invalid Login Credentials", "error", "#");

}

// function getUsers() {

//   let users = localStorage.getItem('users');
//   console.log(convertedUsers)
// }

// getUsers()

function loginClicked(e) {
  e.preventDefault();
  Users()
}

// Alert Function
function showAlert(message, iconClass, Url) {

  let theAlert = Swal.fire({
    position: 'center',
    icon: `${iconClass}`,
    title: `${message}`,
    showConfirmButton: false,
    timer: 2000
  }).then(() => {
    window.location.href = `${Url}`;
  })


  return theAlert;

}

// LOGIN FUNCTIONS ENDS HERE


//MAIN APPLICATION FUNCTION STARTS  HERE
let AddTask = document.getElementById("addTask").addEventListener("click", addTaskClicked)

async function addTaskClicked() {

  const {
    value: dataProvided
  } = await Swal.fire({
    // title: 'Multiple inputs',
    html: `
  <input type="text" class="form-control" id="title" placeholder="Title" style="margin-bottom: 10px">
  <textarea class="form-control" id="description" placeholder="Description" style="height: 150px"></textarea>
`,
    confirmButtonText: 'Add Task',
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      let title = document.getElementById('title').value
      let description = document.getElementById('description').value

      if (!title || !description) {

        Swal.fire({
          icon: 'error',
          title: 'Ensure All Details Are Provided',
          text: '',
        })
        return
      }

      messageAlert("Task Added Successfully", "success", taskDisplay(title, description))
      return
    }
  })
}

// The Display Function
function taskDisplay(title, description) {

  let cardContainer = document.getElementsByClassName("row-cols-4")[0]
  console.log(cardContainer)
  let cardColumn = document.createElement("div");
  cardColumn.classList.add("col", "cardCol")
  console.log(cardColumn)

  cardColumn.innerHTML = `
  <div class="card shadow p-3 mb-5 bg-body rounded" >
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <h6 class="card-subtitle mb-2">${new Date().toLocaleDateString()}</h6>
    <p class="card-text">${description}</p>

    <div class="cardIcons">
      <div>
        <i class="fa fa-star" aria-hidden="true" id="icon-star"></i>
        <i class="fa-solid fa-trash-can"></i>
      </div>
      <div class="dotToggle">
      <p class="tag">Personal</p>
      <p class="tag">Work</p>
      <p class="tag">Social</p>
      <p class="tag">Important</p>
    </div>
      <div>
      <i class="fa-solid fa-ellipsis-vertical"></i>
      </div>
    </div>
  </div>
</div>`

  cardContainer.appendChild(cardColumn)

  cardColumn.getElementsByClassName("fa-ellipsis-vertical")[0].addEventListener("click", ellipseHandler)

  //Adding Deleting option on the new element created on the fly
  let deleteTaskButtons = document.getElementsByClassName("fa-trash-can");

  for (let i = 0; i < deleteTaskButtons.length; i++) {
    let deleteTaskButton = deleteTaskButtons[i];
    deleteTaskButton.addEventListener("click", deleteTaskClicked)
  }
}


// The Delete Function

let deleteTaskButtons = document.getElementsByClassName("fa-trash-can");

for (let i = 0; i < deleteTaskButtons.length; i++) {
  let deleteTaskButton = deleteTaskButtons[i];
  deleteTaskButton.addEventListener("click", deleteTaskClicked)
}

function deleteTaskClicked(e) {

  Swal.fire({
  position: 'center',
  icon: 'error',
  title: 'Task Deleted',
  showConfirmButton: false,
  timer: 1500
}).then(() => {
  let removeBtn = e.target;
  removeBtn.parentElement.parentElement.parentElement.parentElement.remove()
})
}

//End of Delete Function



//Adding Star Button

let starAddedButtons = document.getElementsByClassName("fa-star");

for (let i = 0; i < starAddedButtons.length; i++) {
  let starAddedBtn = starAddedButtons[i];
  console.log(starAddedBtn)
  starAddedBtn.addEventListener("click", (e) => {
    let theClickStar = e.target
    starAddedBtn.style.color = "red"
  })
}


function messageAlert(theMessage, icon, reDirectFunc) {

  let message = Swal.fire({
    position: 'center',
    icon: `${icon}`,
    title: `${theMessage}`,
    showConfirmButton: false,
    timer: 1500
  }).then(() => {
    `${reDirectFunc}`
  })

  return message
}


let verticalDot = document.getElementsByClassName("fa-ellipsis-vertical")

for (let i = 0; i < verticalDot.length; i++) {

  let clickedEllipsis = verticalDot[i]
  console.log(clickedEllipsis, '210')
  clickedEllipsis.addEventListener("click", ellipseHandler)


}

function ellipseHandler(e) {
    // console.log(e.target,'212')
    let dotToggle = e.target.parentElement.previousElementSibling
    console.log(dotToggle, '215')

    dotToggle.style.display = 'block'
}

let allTags = document.getElementsByClassName("tag");
for (let i = 0; i < allTags.length; i++) {
  let tag = allTags[i]
  console.log(tag)
  tag.addEventListener("click", tagSelectorHandler)
}


function tagSelectorHandler(e) {

  let target = e.target
  console.log(e.target, '240')

  let dotToggle = target.parentElement
  console.log(dotToggle, "244")
  let personal = allTags[0]
  let work =  allTags[1]
  let social = allTags[2]
  let important =  allTags[3]

  let cardBody = document.getElementsByClassName("card-body")[0]
  console.log(cardBody, '253')

  personal.addEventListener("click", (e) => {
    if(cardBody.style.backgroundColor = "white"){
      cardBody.style.backgroundColor = "rgb(157, 146, 146"
    } else {
      cardBody.style.backgroundColor = "white"
    }

    dotToggle.style.display = "none"
  })

  work.addEventListener("click", (e) => {
    cardBody.style.backgroundColor = "black"
    cardBody.style.color = "white"
    dotToggle.style.display = "none"
  })

  social.addEventListener("click", (e) => {
    cardBody.style.backgroundColor = "rgb(246, 104, 104)"
    dotToggle.style.display = "none"
  })

  important.addEventListener("click", (e) => {
    cardBody.style.backgroundColor = "rgb(171, 95, 95)"
    dotToggle.style.display = "none"
  })

}





// function starAddedBtnClicked(e) {
//   let theClickStar = e.target
//   theClickStar.
// }

//Truncate Function for
// function truncateDescription(description, num) {

//   if (description.length <= num){
//     return description.padEnd(num, ".")
//   }

//   return description.slice(0, num) + "...";
// }