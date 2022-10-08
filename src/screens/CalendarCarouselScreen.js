import React from 'react';
import { Dimensions, Text, View, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

function Index() {
	const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').width/2;
    const imgUri = `https://picsum.photos/${width}/${height}`;
	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<Carousel
				// loop
				width={width}
				height={width}
				autoPlay={true}
				mode={'parallax'}
				data={[...new Array(6).keys()]}
				scrollAnimationDuration={1000}
				onSnapToItem={(index) => console.log('current index:', index)}
				renderItem={({ index }) => (
					<View
						style={{
							flex: 1,
							borderWidth: 1,
							justifyContent: 'flex-start',
						}}
					>
                        <Image style={{width: width, height: height}} source={{uri: `https://picsum.photos/${width}/${height}?random=${index+1}` }} />
						<Text style={{ textAlign: 'center', fontSize: 30 }}>{index}</Text>
					</View>
				)}
			/>
		</View>
	);
}

export default Index;
