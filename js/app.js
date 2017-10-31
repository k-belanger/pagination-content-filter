const students = document.getElementsByClassName("student-item"); // get all the students and put them into an array
const pageContainer = document.getElementById('page'); // get the page element to append pagination to
const pageHeader = document.querySelector('.page-header'); // get the page header element to append search box to
let filteredStudents = []; // create empty array for filtering students for search results
let pageStart = 0;
let pageEnd = 10;


/********** SHOW PAGE FUNCTION **********/
const showPage = (studentL) => {
    // hide all students that are on the page
    for (let j = 0; j < students.length; j++) { 
        students[j].style.display = "none";
    }

    // show the first 10 students from the passed array
    for (let i = pageStart; i < pageEnd; i++) { 
        if (!studentL[i]) { // if student doesn't exist in array exit loop to avoid throwing an error because no students are left
            break;
        } else {
            studentL[i].style.display = "block"; // if student exists show student
        }    
    }
}


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
    
    // set first pagination button to active by default
    document.querySelector('#pagination ul li a').classList.add("active"); 

    const paginationUl = document.querySelector('#pagination ul');
    
    /********** PAGINATION CLICK FUNCTION **********/
    paginationUl.addEventListener('click', (event) => {
        const paginationItems = document.querySelectorAll('#pagination ul li a');
        event.preventDefault(); // prevent default link behavior so page doesn't jump
        
        for (let i = 0; i < paginationItems.length; i++) { // loop through all a elements within pagination and remove active class
            paginationItems[i].classList.remove("active");
        }

        event.target.className = "active"; // set target class to active
        
        // determine page range by button clicked
        let pageBtn = parseInt(event.target.innerHTML);
        pageEnd = pageBtn * 10;
        pageStart = pageEnd - 10;

        // hide all students
        
        // show the 10 students based on page range
        showPage(studentList);
    });
}


/********** CREATE & ADD SEARCH BOX TO PAGE **********/
const searchBox = document.createElement('form');
searchBox.className = 'student-search';
searchBox.id = 'searchBox';
searchBox.innerHTML = '<input placeholder="Search for students..."><button >Search</button>';
pageHeader.appendChild(searchBox);

/********** SEARCH FUNCTION **********/
const searchField = document.querySelector('.page-header input');
let studentName = "";
let studentEmail = "";

searchBox.addEventListener('submit', (e) => {
    e.preventDefault();

    if (document.getElementById('error')) {
        page.removeChild(error);
    }
    
    filteredStudents = [];
    pageStart = 0;
    pageEnd = 10;

    // get the search term from the input box
    let searchTerm = document.querySelector('.student-search input').value;

    // remove previous pagination if it exists on page
    if (typeof pagination !== 'undefined') {
        page.removeChild(pagination); 
    }
    // loop through all students to see if search term exists in name of email
    for (let i = 0; i < students.length; i++) {
        studentName = students[i].querySelector('h3').innerHTML.toLowerCase();
        studentEmail = students[i].querySelector('.email').innerHTML.toLowerCase();
        // if search term matches any part of the student's name or email
        if (studentName.includes(searchTerm.toLowerCase()) || studentEmail.includes(searchTerm.toLowerCase()) ) {
            // put the matching student into the filtered array
            filteredStudents.push(students[i]);
        } 
    }

    // if filtered array is empty add an error message to the page
    if (filteredStudents.length < 1) {
        let error = document.createElement('div');
        error.id = "error";
        error.innerHTML = "Sorry, there are no students with the name  " + searchTerm + ".";
        page.appendChild(error);
    }

    // if filtered array is greater than 10, add pagination links
    if(filteredStudents.length > 10) {
        addPagination(filteredStudents);
    }

    // show the students who match the search term
    showPage(filteredStudents);   
});


/********** SHOW ALL STUDENTS IF SEARCH FIELD IS EMPTY **********/
searchField.addEventListener('keyup', () => {
    if (searchField.value === "") {
        if (typeof pagination !== 'undefined') {
            page.removeChild(pagination); // remove previous pagination if it exists on page
        }
        if (document.getElementById('error')) {
            page.removeChild(error); // remove error if it exists on page
        }
        showPage(students); // show all students
        addPagination(students); // add pagination for all students
    }
});



/********** DEFAULT DISPLAY ON PAGE LOAD **********/
// adds all students to page by default
showPage(students);
// add pagination to page by default
addPagination(students);