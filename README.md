# Chat-App-on-SocketIO

Availible on https://mihailo124.netlify.com

### Tech stack:
React(Hooks), Node.js + Express + Socket.io for BackEnd part

The project itself consists of two pages (container components).

### Home Page
There are two inputs on a page, one for login and another for room name. Also below the "Sign In" button Recent rooms are placed. You can hover on it to see who's online. Also you can tap/click on room name to join it, it will put query params in adress and hide room name input. The same happens when someone shares you a link to chat.

### Chat Page
Chat itself becomes fullscreen on small screens. Besides main chat window there is "Online Users" module to the right from it, which is surely hidden on small screens, but can be accessed by clicking on "👥" button on info bar. So the info bar has some more buttons to offer such as "×" button that returns you to home page and "🔗" button that copies URL for chat joining. Right below it stays message module which obviously contains all the messages. Thence we have input and "Send" button on the low.

### Backend
Backend written with Socket.io and handles all the data in "users.js" file.

Project can be run by installing npm dependencies [npm i + npm start]. 
