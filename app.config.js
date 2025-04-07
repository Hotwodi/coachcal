// Simple app.config.js without native configurations
export default {
  name: "CoachCal",
  slug: "coachcal",
  version: "1.0.0",
  android: {
    package: "com.softaidev.coachcal"
  },
  // Enable new architecture explicitly
  plugins: [
    [
      "expo-build-properties",
      {
        android: {
          newArchEnabled: true
        },
        ios: {
          newArchEnabled: true
        }
      }
    ]
  ],
  // Remove or comment out other ios/android specific configurations
  // ios: { ... },
};
