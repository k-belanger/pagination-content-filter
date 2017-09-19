// get all the students and put them into an array
const students = document.getElementsByClassName("student-item");
// get the page element to append items to
const pageContainer = document.getElementById('page');


/********** ADD PAGINATION FUNCITON **********/
const addPagination = (studentList) => {
    /** determine how many pages there should be based on number of students **/
    let pageNum = studentList.length / 10;
    if (pageNum % 1 != 0) { // if the number of students is not evenly divided by 10 and it has a decimal value
        pageNum = Math.floor(pageNum) + 1; // take the floor value and add 1 to the number of pages
    } 
    
    /** Build Pagination **/
    // create div to hold pagination items
    const pagination = document.createElement('div');
    pagination.className = "pagination";
    pagination.id = "pagination";
    
    // create html sturcture by looping through the number of pages needed
    let paginationHTML = '<ul>';
    for (let i = 1; i <= pageNum; i++) {
        paginationHTML += '<li><a href="#">'+i+'</a></li>';
    }
    paginationHTML += "</ul>"
    pagination.innerHTML = paginationHTML; // put paginationHTML into pagination div

    pageContainer.appendChild(pagination); // append pagination to page
}



/********** DEFAULT DISPLAY WHEN PAGE LOADS **********/
// hide all students by default
for (let i = 0; i < students.length; i++) { 
    students[i].style.display = "none";
}

// disiplay the first 10 students by default
for (let i = 0; i < 10; i++) { 
    students[i].style.display = "block";
}
// add pagination to page by default
addPagination(students);

// set first pagination button to active by default
document.querySelector('#pagination ul li a').classList.add("active");



/********** SHOW PAGE FUNCITON **********/
const paginationUl = document.querySelector('#pagination ul');
const paginationItems = document.querySelectorAll('#pagination ul li a');

/** SHOW PAGE ITEMS ON CLICK **/
paginationUl.addEventListener('click', (event) => {
    event.preventDefault(); // prevent default link behavior so page doesn't jump
    
    for (let i = 0; i < paginationItems.length; i++) { // loop through all a elements within pagination and remove active class
        paginationItems[i].classList.remove("active");
    }

    event.target.className = "active"; // set target class to active
    
    // determine page range by button clicked
    let pageBtn = parseInt(event.target.innerHTML);
    let pageEnd = pageBtn * 10;
    let pageStart = pageEnd - 10;

    // hide all students
    for (let j = 0; j < students.length; j++) { 
        students[j].style.display = "none";
    } 
    // show the 10 students based on page range
    for (let p = pageStart; p < pageEnd; p++) {
        if (!students[p]) { // if student doesn't exist in array exit loop to avoid throwing an error because no students are left
            break;
        } else {
            students[p].style.display = "block"; // if student exists show student
        }
    }

});
