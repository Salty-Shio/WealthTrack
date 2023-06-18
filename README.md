## Version 1
# Overview

This is a simple react app that allows the user to budget. This is done through defining a series of categories, and diving money up among the category. The app also allows the user to record the transactions that have been made in each category which allows the user to track their expenses and view what is remaining in each category.

This app is run through node package manager. To open this app up on your computer, make sure that node package manager is installed. Then run the command `npm start` in the parent directory of this project. This will load the web app up to the homepage of the application.

This app was used to learn the basics of creating a react app including user interactivity, recording data, and updating state.

[Software Demo Video](https://youtu.be/4kGqFDGeQkQ)

# Web Pages

There are three main views associated with this app. The first is the Budget Selection screen. It will allows the user to save a budget and retrieve the budget. This will be stored in a database. This has not yet been implemented.

The second view is the allotment screen. This allows the user to create new categories and specify how money is divided out among each category. The two options are to use the total budget or to use the running total. The total budget will alot money from the total budget whereas the running total will subtract all the money alloted to the categories above it and will base it's assingment on the remaining unalloted balance. These categories are tabulated for summary on the right side of the screen.

The third view is the envelope view. Each category is separated out into an envelope. Each envelope has an allotted budget and a remaining budget attached. The user is able to record transactions with a date, name, transfer direction, and value. The remaining amount is then displayed to the user. This is to allow the user to track their finances and see what categories are running out of money and what categories have surplus.

All views are dynamically generated and codependent on each other. For instance in the allotment view the list of categoires is dynamically generated as the user adds more categories, and the summary table is dynamically updated in relatime as the user edits the categories. Similary the list of envelopes is dynamically generated as well as the transactions, remaining balance and all other values displayed on the screen.

# Development Environment

VSCode was used as the coding enviornment. Canva and GIMP were used to created the logo.

The project was created in react.
The packages used were:
- react-router-dom - Used for routing the user to the correct screens
- jotai - Used for global state management, allowing the data to be accessible all over the app.
- react-datepicker - This was used to allow the user to more easily pick a given date and forced the date's to be standardized.

# Useful Websites
* [React Documentation](https://react.dev/)
* [Jotai Documentation](https://jotai.org/)
* [Datepicker Documentaion](https://www.npmjs.com/package/react-datepicker)

# Future Work

* User Authentication - Allowing the user to sign up with the site will allow us to store user specific data on a server.
* Database Linkup - The current iteration of the project is not linked to a database. This means that any instance of the budget is stored within the session and is lost upon navigating away from the page or closing the tab or browser. Hooking up to the browser would allow the user to store their data for later use.
* Category Reordering - Currently there is no way to reorder the categories. This means that to change a category that requires the running total you would need to manually remove categories or add categories above. Allowing reordering would solve this inconvenience.

## Version 2
# Overview
This is the implementation of Firebase into the wealthrack app. This changes the functionality of the app greatly. The puprose of this was to gain database skills that allow me to hook a frontend up to a backend which allowed me to keep data persistant throughout sessions as well as allows the user to have more than just one budget.

This required me to add an authentication to the application itself which hooks into Firebase's preexisting authentication protocols. Currently it is a baseline implementation, with the possiblity of more complex security checks possible. Once authenticated the user then is given the same options as before but with the added functionality of being able to create new budgets, save budgets, load budgets, and delete budgets.

[Software Demo Video](https://youtu.be/WIqW6YLb6T8)

# Cloud Database

I am using firebase for this project. The structure of the database is fairly simple. Using the standard authentication for a user on firebase, each user has a document stored on firebase with the userID as the name. Each of these documents contains a collection of budgets with a unique generated ID. Each budget contains data in the same form it is stored on the wealthtrack frontend. This makes it easy to load data into the frontend as well as to send it to the backend.

# Development Environment

The only addition to the tools that were previously used are the firebase package as well as the firebase application itself. The application can be found [here](https://console.firebase.google.com/).

# Useful Websites
The same websites as before were used in addition to the following:

- [Firebase Documentation](https://firebase.google.com/docs/?hl=en&authuser=0&_gl=1*1pd37l2*_ga*MTkwNDgyODg3NS4xNjgyOTgxNjg2*_ga_CW55HF8NVT*MTY4NzA3MDM1OC45LjEuMTY4NzA3MDQxNy4wLjAuMA..)

# Future Work

- There is still no way to reorder the data within the app. This to both the transactions and the categories. This would greatly improve the usablity of the application itself. 
- There is currently no feature that checks if the budget that you are currently creating has the same id as a budget in the database. This means that the ability to edit budgets does not exist. Rather, you load a copy, save the copy, and then delete the old copy manually.
- More secure user authentication as well as the ability to manage your account with options such as getting a new password if you forgot yours, deleting your account, allowing users to pick usernames over emails would all be something that would streamline the app to make it more flexible.