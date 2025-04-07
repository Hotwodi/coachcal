import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';

export default function AnalyticsScreen({ navigation }) {
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    const generateMockData = () => {
      // Weekly mock data
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const weekData = days.map(day => ({
        label: day,
        value: Math.floor(Math.random() * 10000),
        frontColor: '#2196F3',
      }));
      
      // Monthly mock data
      const monthData = Array(30).fill(0).map((_, i) => ({
        value: Math.floor(Math.random() * 12000),
        dataPointText: (i + 1).toString(),
        frontColor: i % 7 === 0 ? '#FF6B6B' : '#4CAF50',
      }));
      
      setWeeklyData(weekData);
      setMonthlyData(monthData);
    };
    
    generateMockData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Activity Stats</Text>
      </View>
      
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Weekly Step Count</Text>
        <View style={styles.chart}>
          <BarChart 
            data={weeklyData}
            barWidth={30}
            spacing={20}
            roundedTop
            roundedBottom
            hideRules
            xAxisThickness={1}
            yAxisThickness={1}
            xAxisLabelTextStyle={{color: '#333'}}
            yAxisTextStyle={{color: '#333'}}
            noOfSections={5}
            maxValue={12000}
          />
        </View>
      </View>
      
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Monthly Progress</Text>
        <View style={styles.chart}>
          <LineChart
            data={monthlyData}
            color="#2196F3"
            thickness={3}
            maxValue={15000}
            noOfSections={5}
            areaChart
            yAxisTextStyle={{color: '#333'}}
            xAxisLabelTextStyle={{color: '#333'}}
            hideDataPoints={false}
            dataPointsColor="#FF6B6B"
            startFillColor="rgba(33, 150, 243, 0.3)"
            endFillColor="rgba(33, 150, 243, 0.01)"
            startOpacity={0.8}
            endOpacity={0.1}
            spacing={10}
            rulesColor="#DEDEDE"
            rulesType="dashed"
            xAxisColor="#DEDEDE"
            yAxisColor="#DEDEDE"
            pointerConfig={{
              pointerStripHeight: 160,
              pointerStripColor: 'lightgray',
              pointerStripWidth: 2,
              pointerColor: 'lightgray',
              radius: 6,
              pointerLabelWidth: 100,
              pointerLabelHeight: 90,
              activatePointersOnLongPress: true,
              autoAdjustPointerLabelPosition: true,
              pointerLabelComponent: items => {
                return (
                  <View style={styles.pointerLabel}>
                    <Text style={styles.pointerLabelText}>{items[0].value} steps</Text>
                    <Text style={styles.pointerLabelTextSmall}>Day {items[0].dataPointText}</Text>
                  </View>
                );
              },
            }}
          />
        </View>
      </View>
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Monthly Summary</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>8,432</Text>
            <Text style={styles.summaryLabel}>Avg. Steps</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>337</Text>
            <Text style={styles.summaryLabel}>Avg. Calories</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>21</Text>
            <Text style={styles.summaryLabel}>Active Days</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  chartContainer: {
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chart: {
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#eee',
  },
  summaryContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  pointerLabel: {
    height: 70,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pointerLabelText: {
    fontWeight: 'bold',
    color: '#2196F3',
  },
  pointerLabelTextSmall: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
