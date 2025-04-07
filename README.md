# CoachCal

A fitness tracking and coaching app built with React Native and Expo.

## Features

- Step counter with daily goals
- Activity analytics with beautiful charts
- Progress tracking
- Customizable workout plans (coming soon)

## Tech Stack

- React Native
- Expo
- React Navigation
- Gifted Charts for data visualization
- Linear Gradient for modern UI
- Firebase for backend (coming soon)

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/coachcal.git
cd coachcal
```

## Project Structure

```
step-counter-app
├── src
│   ├── main.ts          # Entry point of the application
│   ├── components
│   │   └── StepCounter.tsx # Functional component for step counting
│   ├── styles
│   │   └── styles.css   # CSS styles for the application
│   └── utils
│       └── helpers.ts   # Utility functions for common operations
├── package.json         # npm configuration file
├── tsconfig.json        # TypeScript configuration file
├── app.json             # Expo configuration file
└── README.md            # Documentation for the project
```

## Installation

To get started with the step counter application, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd step-counter-app
npm install
```

## Usage

To run the application, use the following command:

```bash
npm start
```

This will start the development server and open the application in your default web browser.

## Features

- Increment step count
- Reset step count
- Responsive design

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License.

## Expo Configuration

```json
{
  "expo": {
    "name": "Step Counter App",
    "slug": "step-counter-app",
    "version": "1.0.0",
    "orientation": "portrait",
    // "icon": "./assets/icon.png", // Remove this line temporarily
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

## Troubleshooting

### Common Issues

1. Theme Compatibility
If you encounter theme-related errors like "AppCompat widget can only be used with Theme.AppCompat theme", add the following to your app.json:

```json
{
  "expo": {
    "androidStatusBar": {
      "backgroundColor": "#ffffff",
      "barStyle": "dark-content"
    },
    "androidNavigationBar": {
      "backgroundColor": "#ffffff"
    },
    "userInterfaceStyle": "light"
  }
}
```

2. WebSocket Connection Issues
If you experience websocket connection problems during development:
- Ensure your development machine and device are on the same network
- Try restarting the Expo development server
- Clear the Metro bundler cache:
```bash
expo start -c
```

3. Memory Issues
If you encounter memory-related warnings:
- Increase the Java heap size in android/gradle.properties:
```properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=4096m -XX:+HeapDumpOnOutOfMemoryError
```

### Navigation Issues

1. Invalid Component Error
If you encounter the error "Got an invalid value for 'component' prop for the screen", check your navigation setup:

```typescript
// Correct way to define screen components
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Make sure your component is properly exported
export const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

// Correct navigation setup
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} // Must be a valid React component
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

Common fixes:
- Ensure all screen components are properly exported
- Check for circular dependencies in your imports
- Verify that your component is a valid React component
- Make sure the component is imported before being used in navigation

2. Navigation Setup Checklist
- Install required dependencies:
```bash
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
```

- Verify your `babel.config.js`:
```javascript
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['react-native-reanimated/plugin'],
};
```

3. Development Environment
- Clear Metro bundler cache and node modules:
```bash
rm -rf node_modules
npm cache clean --force
npm install
expo start -c
```

### Development Best Practices

1. Always run the development server with clear cache when switching branches:
```bash
npm start -- --clear
```

2. For debugging, enable remote debugging in the Expo development client:
- Shake your device or press Cmd+D (iOS simulator) / Ctrl+M (Android emulator)
- Select "Debug Remote JS"

3. Monitor the Metro bundler console for build errors and warnings

For more detailed troubleshooting, please refer to the [Expo documentation](https://docs.expo.dev/troubleshooting/debugging/).

For more navigation troubleshooting, refer to the [React Navigation documentation](https://reactnavigation.org/docs/troubleshooting/).
