import React from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	WebView,
	Button,
	TouchableHighlight
} from 'react-native';
import data from './data.json';

export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			site: "",
			type: "",
			type2: "",
			type3: "",
			notes: "",
			message: "",
		};

	}

	determineSite = (text) => {
		text = text.toLowerCase();
		let currentSite = data[text]; 
		// Taken from github.com/bs-detector/ext/js/bsdetector.js:172
	         if (currentSite === undefined) {
                    	msg = "Site not listed in the database of fraudulent site, potentially benign or unlisted fraudulent site"
                    }
	         if (text === 'nytimes.com')
			msg = "Known trustworthy site" 	

		 if (currentSite != undefined) {
			msg = "Fraudulent because of " + currentSite.type 
                }	
		let newState = {
			site: "" + text, 
			type: "",
			type2: "",
			type3: "",
			notes: "",
			messages: msg
		};
		if (currentSite) {
			newState = {...newState, ...currentSite}
		}
		console.log(newState)
		this.setState(newState);
	}

	render() {
		return (
			<View style={styles.container}>
			<View style={{ flexDirection: 'row',
					padding: 16,
					paddingTop: 48}}>
			<TextInput
			style={styles.txtInput}
			onChangeText={this.determineSite}
			value={this.state.site}
			autoCorrect={false}
			autoFocus={true}
			autoCapitalize='none'
			/>
			</View>
			<Text>{this.state.messages}</Text>
			</View>
			


		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	txtInput: {
		flex:1,
		flexDirection: 'row',
		fontSize: 20,
		padding: 8,
		borderWidth: 2,
		borderColor: "black",
	},
		
});
