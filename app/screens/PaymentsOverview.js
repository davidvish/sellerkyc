import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const PaymentsOverview = () => {
  const [viewMode, setViewMode] = useState('daily');

  const dailyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: [1200, 1350, 900, 1800, 2000, 1500, 1700] }],
  };

  const weeklyData = {
    labels: ['W1', 'W2', 'W3', 'W4'],
    datasets: [{ data: [7000, 8800, 6400, 9000] }],
  };

  const earnings = viewMode === 'daily' ? '₹9,450' : '₹31,200';
  const chartData = viewMode === 'daily' ? dailyData : weeklyData;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Payments Overview</Text>

      {/* Toggle Buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            viewMode === 'daily' && styles.activeButton,
          ]}
          onPress={() => setViewMode('daily')}
        >
          <Text
            style={[
              styles.toggleText,
              viewMode === 'daily' && styles.activeText,
            ]}
          >
            Daily
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            viewMode === 'weekly' && styles.activeButton,
          ]}
          onPress={() => setViewMode('weekly')}
        >
          <Text
            style={[
              styles.toggleText,
              viewMode === 'weekly' && styles.activeText,
            ]}
          >
            Weekly
          </Text>
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Earnings</Text>
        <Text style={styles.earnings}>{earnings}</Text>
      </View>

      {/* Chart */}
      <Text style={styles.chartTitle}>Earnings Graph</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#f5f5f5',
          backgroundGradientTo: '#e0f2f1',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`,
          labelColor: () => '#333',
          style: { borderRadius: 16 },
          propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: '#009688',
          },
        }}
        bezier
        style={{ borderRadius: 12, marginVertical: 12 }}
      />

      {/* Withdraw Button */}
      <TouchableOpacity style={styles.withdrawButton}>
        <Text style={styles.withdrawText}>Withdraw</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PaymentsOverview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1F2937',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 8,
  },
  activeButton: {
    backgroundColor: '#10B981', // Teal green
  },
  toggleText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#374151',
  },
  activeText: {
    color: '#fff',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginBottom: 16,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 15,
    color: '#6B7280',
  },
  earnings: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#059669', // Deep green
    marginTop: 6,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10,
    color: '#374151',
  },
  withdrawButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#22C55E',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  withdrawText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

