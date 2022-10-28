import React, { useRef } from 'react';
import {
	SafeAreaView,
	ScrollView,
	Text,
	StyleSheet,
	View,
	ImageBackground,
	Animated,
	FlatList,
	useWindowDimensions,
} from 'react-native';

const images = new Array(30).fill(
	'https://images.unsplash.com/photo-1556740749-887f6717d7e4'
);

const images2 = images.map((el, pos) => {
	return { link: el, key: pos };
});

const FlatListMock = () => {
	const scrollX = useRef(new Animated.Value(0)).current;

	const { width: windowWidth } = useWindowDimensions();

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.scrollContainer}>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					onScroll={Animated.event([
						{
							nativeEvent: {
								contentOffset: {
									x: scrollX,
								},
							},
						},
					])}
					scrollEventThrottle={1}
					data={images2}
					renderItem={({ item, index }) => (
						<View style={{ width: windowWidth, height: 250 }}>
							<ImageBackground source={{ uri: item.link }} style={styles.card}>
								<View style={styles.textContainer}>
									<Text style={styles.infoText}>{'Image - ' + index}</Text>
								</View>
							</ImageBackground>
						</View>
					)}
				/>
			</View>
			<View style={styles.scrollContainer}>
				<ScrollView
					horizontal={true}
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					onScroll={Animated.event([
						{
							nativeEvent: {
								contentOffset: {
									x: scrollX,
								},
							},
						},
					])}
					scrollEventThrottle={1}
				>
					{images.map((image, imageIndex) => {
						return (
							<View
								style={{ width: windowWidth, height: 250 }}
								key={imageIndex}
							>
								<ImageBackground source={{ uri: image }} style={styles.card}>
									<View style={styles.textContainer}>
										<Text style={styles.infoText}>
											{'Image - ' + imageIndex}
										</Text>
									</View>
								</ImageBackground>
							</View>
						);
					})}
				</ScrollView>
				<View style={styles.indicatorContainer}>
					{images.map((image, imageIndex) => {
						const width = scrollX.interpolate({
							inputRange: [
								windowWidth * (imageIndex - 1),
								windowWidth * imageIndex,
								windowWidth * (imageIndex + 1),
							],
							outputRange: [3, 6, 3],
							extrapolate: 'clamp',
						});
						return (
							<Animated.View
								key={imageIndex}
								style={[styles.normalDot, { width }]}
							/>
						);
					})}
				</View>
				<Text>"kotka"</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	scrollContainer: {
		height: 300,
		alignItems: 'center',
		justifyContent: 'center',
	},
	card: {
		flex: 1,
		marginVertical: 4,
		marginHorizontal: 16,
		borderRadius: 5,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textContainer: {
		backgroundColor: 'rgba(0,0,0, 0.7)',
		paddingHorizontal: 24,
		paddingVertical: 8,
		borderRadius: 5,
	},
	infoText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	normalDot: {
		height: 3,
		width: 3,
		borderRadius: 1.5,
		backgroundColor: 'silver',
		marginHorizontal: 2,
	},
	indicatorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default FlatListMock;
