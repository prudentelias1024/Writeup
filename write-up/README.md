# Project Structure of Ink Up
# The whole project can be found in the write-up folder
# The Backend folder contains the server code (an Express.js server ),  with middleware and API routes i.e endpoint the frontend calls
# Public folder contains index.html, favicon and some manifest files 
# Src folder contains:
# Components : The app is splited into different components. Each Component has a folder, while all other files are just a template
# Font: The fonts folder contains different font families (.ttf files), which are used on the app
# Store: The store is simply a Redux store (index.js) which allows us to manage our state. A store contains many reducers that are used to mutate the state
# .env: Of course, environment variable that are meant to stay hidden or rather encrypted in the production mode
# App.js: The engine of the frontend, it mounts before other components would. All API request are sent and response are recieved in the App.js after the mounting of the application (before other components loads) which makes the app behaves in a fast manner. All data and information needed for each components are received and stored in the Redux store (see folder Store/index.js) once the App mounts.
# App.test.js: contains test written for the app itself
# firebase.js: Firebase configuration and some firebase credentials
# index.css: Basically all css code and entry point for 
# index.js: This contains all Providers e.g BrowserRouter for routing, GoogleOauthProvider for google account, Custom Redux Provider (see Provider store={store}>)
# todo: contains algorithms to be implemented to make efficient recommendations

# _____________Components ___________________________________

# Admin : Contains Dashboard for admin to monitor how many users, notifications, posts, podcast, reels have been created on the site rather going to the database to check
# Billing: Still under construction but will contain Billing Services for Verified Members
# Dashboard: Contains User Dashboard. It shows how many content a user has posted, how many drafts the users is working on, also contains followers and followings list
# Navbar: Contains all navbar sub-component like App logo, notifications icons, button (displayed when user is not logged in) and user profile image, which when clicked shows a dropdown list.

# Notifications: Contains all sub component for notifications including the different types of notifications that are porcessed which are Bookmarked, Collaborations (when the user gets a collaborations request), Comment (when a post receieved a comment), followed (when a user is followed), liked (when a content is liked), Welcome ( A default notification a new user sees)

# Post : Contains Sub-component for a Post. A post basically contains Author information, Tags, Reactions like Like, comment and Bookmark buttons and the Body of the post.

# PreviewPosts: MyPost.jsx is a template for viewing every posts clicked on the homepage by a user.

# Search: The Search folder contains sub-component for a search page which displays the search result i.e People, Post and Tags

# Settings: For now, only contains a form that helps user to update their profile


