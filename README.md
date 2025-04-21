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
- Structure endpoints by domain (movies, series, authentication)
- Enable easy mocking for testing

### Firebase Integration

Firebase was selected for authentication because it:

- Provides secure, reliable user management
- Offers multiple login methods (email/password, social)
- Scales well with growing user bases
- Integrates with other Firebase services for future expansion

### The Movie Database API

We chose TMDB API (https://www.themoviedb.org/documentation/api) for its:

- Extensive database of movies and TV shows
- High-quality imagery (posters, backdrops)
- Detailed metadata (cast, crew, ratings)
- Regular updates with new content
- Well-documented endpoints

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.
