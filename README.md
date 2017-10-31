# Pagination and Content Filter
### Project 2 - Treehouse Full Stack JS TechDegree
by Kimberly Belanger<br/>
September 19, 2017


## Project Objective:
Using progressive enhancement and unobtrusive JavaScript, add pagination to the page in order to filter through a long list of students.

## Project Functions:
- The pagination is added dynamically to the page with JavaScript.
- The appropriate number of pagination buttons are dynamically added based on the amount of students provided.
- Each pagination button shows the appropriate group of 10 students from the list when clicked. For example, button 2 shows students 11-20, 3 shows 21-30 and so on. 
- It works with any number of students.
- By default it shows the first 10 students when page is loaded.

## Exceeds Expectations:
- Dynamically adds a search bar to filter the students by name.
- The search returns results where the search term is found in any part of the name or email address.
- For easy testing purposes:
    - all students = 68 results
    - phillip = 7 results
    - phil = 13 resuls
    - mary = 0 results
- If there are less than 10 results no pagination is displayed. If there are more than 10 the appropriate amount of pagination links are displayed.
- If there are no matches found a message displays that tells the user so.
- Clearing the search bar of it's value will display all the students.

<br/>
<br/>
*The project was built using plain JavaScript. No jQuery was used intentionally.