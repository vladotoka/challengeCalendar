import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CalendarCarouselScreen from './src/screens/CalendarCarouselScreen';
import Kotka from './src/screens/Kotka';

export default function App() {
	return (
		<View style={styles.container}>
			{/* <Text>Open up App.js to start working on your app!</Text>
			<StatusBar style="auto" /> */}
			<CalendarCarouselScreen />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
