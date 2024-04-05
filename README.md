# EcoQuest

## Overview

EcoQuest is a mobile application designed to gamify the process of cleaning up our planet. Using React Native and Firebase, EcoQuest engages users in environmental conservation through a simple, interactive interface. Participants can log litter pickups, complete daily quests, and earn points, contributing to a global effort towards a cleaner earth.

## Installation

Get EcoQuest up and running on your local machine for development and testing purposes. Here's how:

1. Clone the repository:

   ```git clone https://github.com/tchan70/EcoQuest```

2. Navigate into the project directory:

   ```cd EcoQuest```

3. Install dependencies:
 
   ```npm install```

   or if you're using Yarn:

   ```yarn install```

4. Set up your Firebase project:
   
   i.  Create a new Firebase project in the Firebase console.
  
   ii. Create a new firebaseConfig file.

5. Start the development server:

   ```npx expo start```

6. Run the app:

   i.  Install the Expo Go app on your iOS or Android device.
  
   ii. Scan the QR code displayed in the terminal or Expo developer tools with the Expo Go app.

## Firebase API Key

In order to link your Firebase database to the app, you need to create a .env file at the root of your project, in which you declare a "REACT_APP_FIREBASE_API_KEY" variable, set to your key. 

The file contents should look like so:

  ```REACT_APP_FIREBASE_API_KEY: APIkey```

## Features

- Log Litter: Users can log the litter they pick up, contributing to their personal and global points and location.
- Daily Quests: Engage with daily quests to earn extra points and badges.
- Leaderboards: View your all-time ranking or daily ranking.
- Customize Profile: Personalize your EcoQuest experience with profile customizations.
- Map: Users can see a heatmap of places where people have been picking up the most litter.

## Technologies Used

- Frontend: React Native for cross-platform mobile app development.
- Maps: React-Native-Maps for integrating map functionality.
- Navigation: React Navigation for routing and navigation.
- Backend: Firebase Realtime Database for storing data; Firebase Authentication for user management. 
- Deployment: Expo Go for testing and deployment.

