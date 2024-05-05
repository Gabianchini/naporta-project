
# naPorta Technical Test - Fullstack Development 
This project serves as a technical test submission for the Fullstack Developer position at naPorta. The objective was to create an application demonstrating proficiency in API interaction and implementing an offline-first approach, clean code, and more.

## Tech Stack 

**React.js:** A JavaScript library for building user interfaces, developed by Facebook. React.js facilitates the creation of interactive and reusable UI components, making it easier to develop complex web applications.<br>
<br>
**Google Maps Platform:**<br>
Utilized for Map Interaction: These APIs were utilized to interact with the map implemented in the project, facilitating features such as displaying locations, fetching directions, and providing autocomplete suggestions.<br>
* **Google Maps API:** Provides access to Google's mapping services, allowing integration of interactive maps into web applications.<br>
* **Places API:** Enables searching for places and retrieving detailed place information.<br>
* **Directions API:** Offers route planning and navigation capabilities, including directions between locations.<br>
* **Geocoder API:** Converts between geographic coordinates and human-readable addresses, and vice versa.
* **AutoComplete API:** Provides autocomplete functionality for place predictions based on user input.
<br>
**Local Forage:** A JavaScript library providing a simple key-value store interface for storing data locally in the browser, including support for IndexedDB, WebSQL, and localStorage.
Utilized for Offline-First Data Storage: Local Forage API was used to implement offline-first functionality by storing essential data locally in the user's browser, ensuring the application's core features remain accessible even without an internet connection.

**React Hot Toast:**<br>
React Hot Toast: A lightweight toast library for React applications, allowing easy display of notification messages.
 
## Features  
-  **HomePage:** Displays the project's main page, which contains a list of orders.
-  **Add order page:** Contains form that receives information to create a new order.
-  **Order details page:** Contains details of the selected order. The information shown is: map, order shipping and arrival time and date, customer information.    

## Run Locally  
Clone the project  

~~~bash  
  git clone https://link-to-project
~~~

Go to the project directory  

~~~bash  
  cd my-project
~~~

Install dependencies  

~~~bash  
npm install
~~~

Start the server  

~~~bash  
npm run start
~~~  
