
# naPorta Technical Test - Fullstack Development 
This project was developed as a technical test submission for the Fullstack Developer position at naPorta. The objective was to create an application to demonstrate proficiency in API interaction while implementing an offline-first approach with clean code, and more.

## Tech Stack 

**React.js:** A JavaScript library for building user interfaces, developed by Facebook. React.js facilitates the creation of interactive and reusable UI components, making it easier to develop complex web applications.<br>
<br>
**Google Maps Platform:**
<br>
Utilized for Map Interaction: These APIs were utilized to interact with the map implemented in the project, facilitating features such as displaying locations, fetching directions, and providing autocomplete suggestions.<br>
* **Google Maps API:** Provides access to Google's mapping services, allowing integration of interactive maps into web applications.<br>
* **Places API:** Enables searching for places and retrieving detailed place information.<br>
* **Directions API:** Offers route planning and navigation capabilities, including directions between locations.<br>
* **Geocoder API:** Converts between geographic coordinates and human-readable addresses, and vice versa.
* **AutoComplete API:** Provides autocomplete functionality for place predictions based on user input.<br>

**Local Forage:** A JavaScript library providing a simple key-value store interface for storing data locally in the browser, including support for IndexedDB, WebSQL, and localStorage.
Utilized for Offline-First Data Storage: Local Forage API was used to implement offline-first functionality by storing essential data locally in the user's browser, ensuring the application's core features remain accessible even without an internet connection.

**React Hot Toast:**
<br>
React Hot Toast: A lightweight toast library for React applications, allowing easy display of notification messages.

**Jest:** Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase. It allows you to write tests with an approachable, familiar and feature-rich API that gives you results quickly. Jest is well-documented, requires little configuration and can be extended to match your requirements. In this project jest was used to test the component form.
 
## Features  
-  **HomePage:** Displays the project's main page, which contains a list of orders.
-  **Add order page:** Contains form that receives information to create a new order.
-  **Order details page:** Contains details of the selected order. The information shown is: map, order shipping and arrival time and date, customer information.    

## Run Locally  
* Clone the project  

~~~bash  
  git clone https://github.com/Gabianchini/naporta-project/
~~~

* Go to the project directory  

~~~bash  
  cd naporta-project
~~~

* Install dependencies  

~~~bash  
npm install
~~~

* Configure settings in Google Maps Platform:

* 1:  Access with you google account the link to Google Maps Platform: [Google Maps Platform Link](https://console.cloud.google.com/google/maps-apis/home)

* 2:  Select Select Project tab and Create a new project.

* 3:  Go to the "API and Services" section and select **enable** in the following APIS:
  * Maps JavaScript API;
  * Geocoding API;
  * Places API;
  * Places API (New);
  * Directions API;
  * Routes API;
  * Distance Matrix API.

* 4:  Navigate to Credentials and keys tab.

* 5:  Select Create Credentials > Select apiKey and copy your apiKey created.

* 6:  In the same section select Api Keys > Actions > Edit Key

* 7:  Enable the **restrict api** checkbox in API Key restrictions, then in the dropdown menu select the following:
  * Maps JavaScript API;
  * Geocoding API;
  * Places API;
  * Places API(New);
  * Directions API;
  * Distance Matrix API;
  * Routes API.
    
* 8: Save the changes.

* 9:  In the code root directory  create a .env.local file. Open the file and create variable:
  
~~~bash  
REACT_APP_GOOGLE_MAPS_API_KEY=Paste_your_Apikey
~~~

* Start the server  

~~~bash  
npm run start
~~~
<br>

## To Test:

~~~bash  
npm run test
~~~
* press A to run all tests
<br>

## Explore the project and feel free to collaborate! :rocket:
