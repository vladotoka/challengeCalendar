import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

function Index() {
    const slidesToShow = 30;
	const width = Dimensions.get('window').width;
	const height = Dimensions.get('window').width / 2;
	const imgUri = `https://picsum.photos/${width}/${height}`;

	const [quote, setQuote] = useState([]);
	const [author, setAuthor] = useState([]);

	const getQuotes = () => {
		fetch(
			'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
		)
			.then((res) => res.json())
			.then((data) => {
				let dataQ = data.quotes;
				let ranNum = Math.floor(Math.random() * dataQ.length-slidesToShow);
                const allQuotes = dataQ.map(element => element.quote);

				setQuote(dataQ.map(element => element.quote).splice(ranNum, slidesToShow));
				setAuthor(dataQ.map(element => element.author).splice(ranNum, slidesToShow));
			});
	};

	useEffect(() => {
		getQuotes();
	}, []);

	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<Carousel
				// loop
				width={width}
				height={width*1.9}
				autoPlay={true}
				mode={'parallax'}
				data={[...new Array(slidesToShow).keys()]}
				scrollAnimationDuration={2500}
				onSnapToItem={(index) => console.log('current index:', index)}
				renderItem={({ index }) => (
					<View
						style={{
							flex: 1,
							borderWidth: 1,
							justifyContent: 'flex-start',
						}}
					>
						<Image
							style={{ width: width, height: height }}
							source={{
								uri: `https://picsum.photos/${width}/${height}?random=${
									index + 1
								}`,
							}}
						/>
						<Text style={{ textAlign: 'center', fontSize: 29, paddingTop:15 }}>
							{`"${quote[index]}"`}
						</Text><Text style={{ textAlign: 'center', fontSize: 18, paddingTop:15  }}>
							{author[index]}
						</Text>
					</View>
				)}
			/>
		</View>
	);
}

export default Index;
