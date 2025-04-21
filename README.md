# FlixFlex 🎬

A comprehensive mobile application for exploring movies and TV series built with [Expo](https://expo.dev) and created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Features

- **Browse Movies & TV Series**: Discover the latest films and shows
- **Detailed Information**: View comprehensive details about your favorite content
- **User Authentication**: Create an account to personalize your experience
- **Tabbed Interface**: Easily switch between movies and series content

## Technical Stack

- **Expo Router**: File-based navigation system with `.tsx` files
- **React Query**: Efficient data fetching and state management
- **Firebase Authentication**: Secure user login and registration
- **AsyncStorage**: Local data persistence
- **The Movie Database API**: Comprehensive movie and TV series data source

## Project Structure

```
/FlixFlex
├── .expo/
├── .vscode/
├── android/
├── api/                  # API service layers
├── app/                  # Main application screens
│   ├── (auth)/           # Authentication screens
│   │   ├── _layout.tsx
│   │   ├── signin.tsx
│   │   └── signup.tsx
│   ├── (tabs)/           # Main tab navigation
│   │   ├── _layout.tsx
│   │   ├── movies.tsx
│   │   └── series.tsx
│   ├── movie/            # Movie routes
│   │   ├── _layout.tsx
│   │   └── [id].tsx      # Dynamic movie detail route
│   ├── serie/            # TV series routes
│   │   ├── _layout.tsx
│   │   └── [id].tsx      # Dynamic series detail route
│   ├── _layout.tsx       # Root layout
│   └── index.tsx         # Entry point
├── assets/               # Images, fonts, etc.
├── components/           # Reusable UI components
├── constants/            # App constants
├── dist/                 # Build output
├── firebase/             # Firebase configuration
├── hooks/                # Custom React hooks
├── node_modules/
├── scripts/              # Build and utility scripts
├── services/             # Business logic services
├── types/                # TypeScript type definitions
├── .gitignore
├── app.json              # Expo configuration
├── eas.json              # EAS Build configuration
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json         # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Expo CLI
- EAS CLI (`npm install -g eas-cli`)
- Expo account (create at [expo.dev](https://expo.dev))

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/AboubakreSenouci/FlixFlex.git
   cd FlixFlex
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app
   ```bash
   npx expo start
   ```

## Development Options

In the output, you'll find options to open the app in a:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a sandbox environment for quick testing

## Building the App

FlixFlex uses EAS Build for creating production and preview builds.

### Setup EAS Build

1. Make sure you have the EAS CLI installed:

   ```bash
   npm install -g eas-cli
   ```

2. Log in to your Expo account:

   ```bash
   eas login
   ```

3. Configure your project for EAS Build (if not already done):
   ```bash
   eas build:configure
   ```

### Creating Builds

#### Development Build

Create a development build that can be installed on a device/emulator but includes development tools:

```bash
eas build --profile development --platform android
# or
eas build --profile development --platform ios
```

#### Preview Build

Create a preview build for testing purposes:

```bash
eas build --profile preview --platform android
# or
eas build --profile preview --platform ios
```

#### Production Build

Create a production-ready build for submission to app stores:

```bash
eas build --profile production --platform android
# or
eas build --profile production --platform ios
```

### Installing Builds

After the build completes, you can:

- Download and install the APK/IPA file directly

## Using EAS Update

FlixFlex uses EAS Update to deliver JavaScript updates without requiring new builds.

### Sending Updates

1. Make your changes to the app code

2. Create and publish an update:

   ```bash
   eas update --branch [branch-name] --message "[update description]"
   ```

   Example:

   ```bash
   eas update --branch preview --message "Fix movie details loading bug"
   ```

3. For branch-specific updates:

   ```bash
   # For development branch
   eas update --branch development --message "Add new feature X"

   # For preview branch
   eas update --branch preview --message "UI improvements"

   # For production branch
   eas update --branch production --message "Bug fixes and performance improvements"
   ```

### EAS Update Configuration

Our `eas.json` file contains the following update configurations:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleDebug",
        "withoutCredentials": true
      }
    },
    "preview": {
      "channel": "preview",
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true,
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

This ensures updates are delivered to the correct channel based on the build type.

### Expo Router & File Structure

We implemented a file-based routing system using Expo Router with TypeScript (`.tsx` files). The structure includes:

- Authentication flow with protected routes
- Tab-based navigation for separating movies and series
- Dynamic routes for detailed content pages using parameters (`[id].tsx`)

This approach provides a clean separation of concerns and intuitive navigation.

### API Layer

We created a dedicated API directory to:

- Isolate external service calls
- Implement proper error handling
- Structure endpoints by domain (movies, series, ...)

### Firebase Integration

Firebase was selected for authentication because it:

- Provides secure, reliable user management
- Offers multiple login methods (email/password, social)
- Scales well with growing user bases
- Integrates with other Firebase services for future expansion

### Data Management

React Query was implemented to:

- Handle loading and error states consistently
- Reduce unnecessary network requests

### AsyncStorage

Used for persisting:

- Recently viewed content

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
