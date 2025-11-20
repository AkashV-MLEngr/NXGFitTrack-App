import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function MetricsCard({ trainingVolumeData, personalBestData }) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
            {/* Training Volume Chart */}
            <View style={styles.metricBox}>
                <Text style={styles.metricTitle}>Total Training Volume</Text>
                <LineChart
                    data={{
                        labels: trainingVolumeData.map(d => d.date),
                        datasets: [{ data: trainingVolumeData.map(d => d.volume) }],
                    }}
                    width={screenWidth * 0.8}
                    height={200}
                    chartConfig={chartConfig}
                    style={{ borderRadius: 16 }}
                    bezier
                />
            </View>

            {/* Personal Best Chart */}
            <View style={styles.metricBox}>
                <Text style={styles.metricTitle}>Personal Best per Exercise</Text>
                <BarChart
                    data={{
                        labels: personalBestData.map(d => d.exercise_name),
                        datasets: [{ data: personalBestData.map(d => d.max_weight) }],
                    }}
                    width={screenWidth * 0.8}
                    height={200}
                    chartConfig={chartConfig}
                    style={{ borderRadius: 16 }}
                />
            </View>
        </ScrollView>
    );
}

const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(86, 37, 92, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(86, 37, 92, ${opacity})`,
    propsForDots: { r: '4', strokeWidth: '2', stroke: '#56255C' },
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    metricBox: {
        backgroundColor: '#f5f0f8',
        marginHorizontal: 10,
        padding: 15,
        borderRadius: 16,
        justifyContent: 'center',
    },
    metricTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#56255C',
        marginBottom: 10,
    },
});
