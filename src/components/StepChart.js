import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import { LinearGradient } from 'expo-linear-gradient';
import StepChart from '../src/components/StepChart';

const { width } = Dimensions.get('window');

const StepChart = ({ 
  data, 
  type = 'bar', 
  title = 'Step Activity', 
  period = 'Weekly',
  goal = 10000,
  showLabels = true
}) => {
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    // Process data for the chart
    if (data && data.length > 0) {
      setChartData(data);
    } else {
      // Sample data if none provided
      const sampleData = generateSampleData();
      setChartData(sampleData);
    }
  }, [data]);

  const generateSampleData = () => {
    if (type === 'bar') {
      // Sample weekly data
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return days.map(day => ({
        label: day,
        value: Math.floor(Math.random() * 12000) + 2000,
        frontColor: getBarColor(Math.floor(Math.random() * 12000) + 2000),
        topLabelComponent: () => (
          <Text style={styles.barLabel}>
            {Math.floor(Math.random() * 12000) + 2000}
          </Text>
        ),
      }));
    } else {
      // Sample monthly data
      return Array(30).fill(0).map((_, i) => ({
        value: Math.floor(Math.random() * 12000) + 2000,
        dataPointText: (i + 1).toString(),
        label: (i + 1).toString(),
        showValuesAsTopLabel: i % 5 === 0,
      }));
    }
  };

  // Returns different colors based on step count relative to goal
  const getBarColor = (steps) => {
    if (steps >= goal) return '#4CAF50';
    if (steps >= goal * 0.7) return '#2196F3';
    if (steps >= goal * 0.4) return '#FF9800';
    return '#F44336';
  };

  const renderChart = () => {
    if (type === 'bar') {
      return (
        <BarChart
          data={chartData}
          barWidth={width / (chartData.length * 2)}
          spacing={width / (chartData.length * 3)}
          roundedTop
          roundedBottom
          hideRules
          xAxisThickness={1}
          yAxisThickness={1}
          xAxisLabelTextStyle={styles.axisLabel}
          yAxisTextStyle={styles.axisLabel}
          noOfSections={5}
          maxValue={goal * 1.2}
          yAxisLabelPrefix=""
          yAxisLabelSuffix=" steps"
          renderTooltip={(item) => (
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>{item.value} steps</Text>
              <Text style={styles.tooltipSubtext}>
                {item.value >= goal ? 'Goal reached! 🎉' : `${Math.round((item.value / goal) * 100)}% of goal`}
              </Text>
            </View>
          )}
        />
      );
    } else {
      return (
        <LineChart
          data={chartData}
          color="#2196F3"
          thickness={3}
          maxValue={goal * 1.2}
          noOfSections={5}
          areaChart
          yAxisTextStyle={styles.axisLabel}
          xAxisLabelTextStyle={styles.axisLabel}
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
          showXAxisLabels={showLabels}
          xAxisLabelTexts={showLabels ? Array(chartData.length).fill(0).map((_, i) => (i + 1).toString()) : []}
          showYAxisText={true}
          yAxisLabelSuffix=" steps"
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
                  <Text style={styles.pointerLabelTextSmall}>
                    Day {items[0].dataPointText}
                  </Text>
                </View>
              );
            },
          }}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f5f7fa', '#e4e6eb']}
        style={styles.gradientContainer}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.period}>{period}</Text>
        </View>
        
        <View style={styles.goalContainer}>
          <Text style={styles.goalText}>
            Goal: <Text style={styles.goalValue}>{goal.toLocaleString()} steps</Text>
          </Text>
        </View>
        
        <View style={styles.chartContainer}>
          {renderChart()}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gradientContainer: {
    borderRadius: 15,
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  period: {
    fontSize: 14,
    color: '#666',
  },
  goalContainer: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  goalText: {
    fontSize: 14,
    color: '#555',
  },
  goalValue: {
    fontWeight: 'bold',
    color: '#2196F3',
  },
  chartContainer: {
    marginTop: 10,
    height: 250,
  },
  axisLabel: {
    color: '#666',
    fontSize: 12,
  },
  barLabel: {
    color: '#333',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tooltip: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 120,
  },
  tooltipText: {
    color: '#2196F3',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tooltipSubtext: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  pointerLabel: {
    height: 70,
    width: 120,
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
    fontSize: 14,
  },
  pointerLabelTextSmall: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default StepChart;

// Custom data:
const myStepData = [
  { label: 'Mon', value: 7500 },
  { label: 'Tue', value: 9200 },
  { label: 'Wed', value: 6800 },
  { label: 'Thu', value: 10300 },
  { label: 'Fri', value: 8700 },
  { label: 'Sat', value: 11500 },
  { label: 'Sun', value: 5200 }
];

// In your component:
<StepChart 
  data={myStepData}
  type="bar"
  title="My Weekly Activity" 
/>
