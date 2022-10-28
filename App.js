import { StyleSheet, Text, View } from 'react-native';
import CalendarCarouselScreen from './src/screens/CalendarCarouselScreen';
import Test from './src/screens/Test';

export default function App() {
	return (
		<View style={styles.container}>
			<Test />
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
