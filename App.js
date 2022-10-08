import { StyleSheet, Text, View } from 'react-native';
import CalendarCarouselScreen from './src/screens/CalendarCarouselScreen';

export default function App() {
	return (
		<View style={styles.container}>
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
