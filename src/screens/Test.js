import React, { useRef, useEffect, useState } from 'react';
import {
	SafeAreaView,
	Text,
	StyleSheet,
	View,
	ImageBackground,
	Animated,
	FlatList,
	useWindowDimensions,
} from 'react-native';

const slidesToShow = 30;
const data = [...new Array(slidesToShow).keys()];

const Test = () => {
	const [quote, setQuote] = useState([]);
	const [author, setAuthor] = useState([]);
    const [random, setRandom] = useState(0);

	const getQuotes = () => {
		fetch(
			'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
		)
			.then((res) => res.json())
			.then((data) => {
				let dataQ = data.quotes;
				let ranNum = Math.floor(Math.random() * (dataQ.length - slidesToShow));
                setRandom(ranNum);
				const allQuotes = dataQ.map((element) => element.quote);

				setQuote(
					dataQ.map((element) => element.quote).splice(ranNum, slidesToShow)
				);
				setAuthor(
					dataQ.map((element) => element.author).splice(ranNum, slidesToShow)
				);
			});
	};

	const scrollX = useRef(new Animated.Value(0)).current;

	const { width: windowWidth } = useWindowDimensions();

	useEffect(() => {
		getQuotes();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.scrollContainer}>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					onScroll={Animated.event(
						[
							{
								nativeEvent: {
									contentOffset: {
										x: scrollX,
									},
								},
							},
						],
						{ useNativeDriver: false }
					)}
					scrollEventThrottle={1}
					data={data}
					renderItem={({ item, index }) => (
						<View style={{ width: windowWidth, height: 250 }}>
							<ImageBackground
								source={{
									uri: `https://picsum.photos/${windowWidth}/${
										windowWidth * 0.8
									}?random=${index + random}`,
								}}
								style={styles.card}
							>
								<View style={styles.textContainer}>
									<Text style={styles.infoText}>{quote[index]}</Text>
									<Text style={styles.authorText}>{author[index]}</Text>
								</View>
							</ImageBackground>
						</View>
					)}
				/>
			</View>

			<View style={styles.indicatorContainer}>
				{data.map((image, imageIndex) => {
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
		textAlign: 'center',
	},
	authorText: {
		color: 'white',
		fontSize: 16,
		paddingStart: 10,
		paddingTop: 10,
		fontStyle: 'italic',
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

export default Test;
