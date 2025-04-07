import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import StepCounterScreen from './src/screens/StepCounterScreen';
import FoodAnalysisScreen from './src/screens/FoodAnalysisScreen';
import DailySummaryScreen from './src/screens/DailySummaryScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import CalorieGoalCalculatorScreen from './src/screens/CalorieGoalCalculatorScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import AddStepsScreen from './src/screens/AddStepsScreen';
import RecentActivityScreen from './src/screens/RecentActivityScreen'; // Ensure this import is correct

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Step Counter" component={StepCounterScreen} />
        <Stack.Screen name="Food Analysis" component={FoodAnalysisScreen} />
        <Stack.Screen name="Daily Summary" component={DailySummaryScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Calorie Goal Calculator" component={CalorieGoalCalculatorScreen} />
        <Stack.Screen 
          name="Analytics" 
          component={AnalyticsScreen} 
          options={{ title: 'Analytics' }}
        />
        <Stack.Screen name="Add Steps" component={AddStepsScreen} />
        <Stack.Screen name="Recent Activity" component={RecentActivityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
