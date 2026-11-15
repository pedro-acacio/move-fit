# MoveFit

## App Name

**MoveFit**: a workout app that connects gym students and their personal trainers.

## Description

MoveFit is a mobile app for gyms. It has two types of users: **students** and **teachers** (personal trainers).

Teachers create workouts and send them to their students. Students see their workouts, follow each exercise and mark the workout as done. The app saves the history and shows the weekly progress of each student.

Students and teachers connect with a simple 4-digit code. After that, they can also talk in a private chat.

The app also has an AI assistant that answers questions about exercises, stretching, rest and healthy habits.

## Features

**For everyone**

- Sign up and log in with e-mail and password.
- Password recovery by e-mail.
- Terms of Use and Privacy Policy that follow the Brazilian data protection law (LGPD). Users must accept them to create an account.
- Profile page with name, e-mail, a 4-digit code and a profile photo.
- Real-time chat between a student and a teacher.

**For students**

- Home screen with a weekly goal (progress ring and bar).
- List of workouts sent by the teacher.
- Workout details with each exercise, images and instructions.
- Mark a workout as done. It goes to the history.
- Workout history.
- List of teachers at the gym, with a link to chat.
- AI assistant (Google Gemini) for questions about training.

**For teachers**

- Dashboard with class engagement: how many students trained today and this week.
- Create, edit, copy and delete workouts.
- Choose exercises from a library with more than 800 exercises, or create new ones.
- List of linked students and details of each one (weekly progress, workouts and history).
- Link a student with the 4-digit code.

## Technologies

- **React Native** and **Expo** (SDK 57): mobile app for Android and iOS, also runs on the web.
- **JavaScript**.
- **Expo Router**: navigation based on files.
- **Firebase Authentication**: sign up, log in and password recovery.
- **Cloud Firestore** (Firebase): real-time database for users, workouts, history and chat.
- **Google Gemini API**: AI assistant.
- **React Native SVG**: progress ring.
- **Expo Image Picker** and **Expo Image Manipulator**: profile photo.
- **AsyncStorage**: keeps the user logged in on the phone.
- **Free Exercise DB** (open source): exercise list and images.

## How to Run

**Requirements**

- [Node.js](https://nodejs.org) (LTS version).
- The **Expo Go** app on your phone (Android or iOS), or a web browser.

**Steps**

1. Clone the repository:

   ```bash
   git clone https://github.com/acqueiroz/move-fit.git
   cd move-fit
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a file named `.env.local` in the project folder with the Firebase and Gemini keys. Ask the team for the values. This file is not on GitHub.

   ```
   EXPO_PUBLIC_GEMINI_API_KEY=
   EXPO_PUBLIC_FIREBASE_API_KEY=
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   EXPO_PUBLIC_FIREBASE_APP_ID=
   ```

4. Start the app:

   ```bash
   npx expo start
   ```

5. Open the app:
   - **On the phone:** scan the QR code with Expo Go (Android) or with the camera (iOS).
   - **On the computer:** press `w` in the terminal, or run `npm run web`.

**Tips**

- If the QR code does not connect, run `npx expo start --tunnel`.
- If you change the `.env.local` file, restart with `npx expo start --clear`.

**How to use**

1. Create an account and choose **Student** or **Teacher**.
2. Accept the Terms of Use.
3. Link the student and the teacher with the 4-digit code (on the Profile page).
4. The teacher creates a workout and sends it to the student.
5. The student opens the workout, does the exercises and marks it as done.
