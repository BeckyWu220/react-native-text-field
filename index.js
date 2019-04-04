import React, { Component } from 'react';
import { View, Text, TextInput, Platform, Dimensions, Image, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import PropTypes from 'prop-types';
import styles from './styles';

const CELL_HEIGHT = 40;
const deviceWidth = Dimensions.get('window').width;

export default class TextField extends Component {
	static propTypes = {
		title       	: PropTypes.string,
		value       	: PropTypes.any,
		placeholder 	: PropTypes.string,
		cellHeight		: PropTypes.number,
		isMultiline		: PropTypes.bool,
		width			: PropTypes.number,
		style			: PropTypes.style,
		onInputChange 	: PropTypes.func,
		autoCapitalize	: PropTypes.string, //enum('none', 'sentences', 'words', 'characters')
		autoCorrect		: PropTypes.bool,
		textType 		: PropTypes.string,
		titleStyle		: PropTypes.object,
		textFieldStyle	: PropTypes.object,
		placeholderStyle: PropTypes.object,
		selectionColor	: PropTypes.string,
		isRequired		: PropTypes.bool,
		isSecured		: PropTypes.bool,
		onValidate		: PropTypes.func,
		invalidTextFieldStyle : PropTypes.object,
		invalidHint		: PropTypes.string,
		invalidHintStyle: PropTypes.object,
		hintHeight 		: PropTypes.number
	};

	static defaultProps = {
		title       : '',
		value       : null,
		placeholder : '',
		cellHeight	: CELL_HEIGHT,
		isMultiline	: false,
		autoCapitalize: 'none',
		autoCorrect	: false,
		textType 	: 'default',
		isRequired	: false,
		isSecured	: false,
		onValidate	: null,
		invalidHint : 'Your input is not valid.',
		hintHeight	: 20,
		textFieldStyle : {
			borderWidth: 1, 
			borderRadius: 4, 
			borderColor: '#000000'
		},
		invalidTextFieldStyle : {
			borderWidth: 1, 
			borderRadius: 4, 
			borderColor: '#ff0000'
		}
	};

	state = {
		text: null,
		isValid: true,
		invalidMessage: '',
		isVisible: true
	}

	componentDidMount() {
		this.setState({
			text: this.props.value,
			invalidMessage: this.props.invalidHint,
			isVisible: this.props.isSecured
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.setState({
				text: nextProps.value
			});
		}
		if (nextProps.invalidHint !== this.props.invalidHint) {
			this.setState({
				invalidMessage: nextProps.invalidHint
			});
		}
	}

	onMaskedTextChange = (text) => {
		const rawText = this.maskedTextInput.getRawValue();
		this.setState({
			text
		});
		this.props.onInputChange(rawText);
	}

	onTextChange = (text) => {
		this.setState({
			text
		}, () => {
			this.validate(text);
			this.props.onInputChange(text);
		});	
	}
	
	renderTitle = title => {
		if (title.length > 0) {
			return (
				<Text style={[styles.title, this.props.titleStyle]}>
					{`${title}${this.props.isRequired ? '*' : ''}`}
				</Text>
			);
		}
	}

	renderMaskedTextInput = () => {
		const { placeholder } = this.props;
		return (
			<View style={{ flex: 1}}>
				<TextInputMask
					allowFontScaling={false}
					ref={(ref) => { this.maskedTextInput = ref; }}
					type={'money'}
					options={{
						unit: '$',
						separator: '.',
						delimiter: ',',
					}}
					style={this.stylishTextInput()}
					value={this.state.text}
					placeholder={Platform.OS === 'ios' ? placeholder : ''}
					placeholderTextColor={this.props.placeholderStyle.color}
					selectionColor={this.props.selectionColor}
					keyboardType={'numeric'}
					editable={true}
					onChangeText={this.onMaskedTextChange}
					blurOnSubmit={true}
					underlineColorAndroid='transparent'
				/>
				{ Platform.OS !== 'ios' && this.renderPlaceholder() }
			</View>
		);
	}

	stylishTextInput = () => {
		const { cellHeight } = this.props;
		if (this.state.isValid) {
			return [styles.textField, { height: cellHeight }];
		}
		return [styles.textField, { height: cellHeight }];
	}

	renderTextInput = () => {
		const { placeholder} = this.props;
		return (
			<View style={{ flex: 1 }}>
				<TextInput
					allowFontScaling={false}
					autoCapitalize={this.props.autoCapitalize}
					autoCorrect={this.props.autoCorrect}
					style={this.stylishTextInput()}
					value={this.state.text}
					placeholder={Platform.OS === 'ios' ? placeholder : ''}
					placeholderTextColor={this.props.placeholderStyle && this.props.placeholderStyle.color ? this.props.placeholderStyle.color : undefined}
					selectionColor={this.props.selectionColor}
					editable={true}
					multiline={this.props.isMultiline}
					onChangeText={this.onTextChange}
					blurOnSubmit={true}
					underlineColorAndroid='transparent'
					secureTextEntry={!this.state.isVisible}
					onEndEditing={(event) => this.validate(event.nativeEvent.text)}
				/>
				{ Platform.OS !== 'ios' && this.renderPlaceholder() }
			</View>
		);
	}

	renderPlaceholder = () => {
		if (this.state.text === null || this.state.text === '') {
			return (
				<View pointerEvents='none' style={{...styles.placeholderContainer, justifyContent: !this.props.isMultiline ? 'center' : 'flex-start'}}>
					<Text style={[styles.placeholderText, this.props.placeholderStyle]}>{this.props.placeholder}</Text>
				</View>
			);
		}
		return null;
	}

	renderInvalidHint = () => {
		return (
			<View style={{ height: this.props.hintHeight, width: this.props.width || deviceWidth }}>
				{ 
					!this.state.isValid &&
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={[styles.invalidHint, this.props.invalidHintStyle]}
					>{ this.state.invalidMessage }</Text> 
				}
			</View>
		)
	}

	renderVisibilityIcon = () => {
		var visibleIconWidth = Math.min(this.props.cellHeight, CELL_HEIGHT)
		return (
			<TouchableOpacity style={{ width: visibleIconWidth, height: visibleIconWidth, alignItems: 'flex-end', alignItems: 'center', justifyContent: 'center'}} onPress={() => { 
				this.setState({ 
					isVisible: !this.state.isVisible
				}) }}>
				{ 	this.state.isVisible ? 
					<Image source={require('./images/invisible.png')} resizeMode="contain" style={{ flex: 1, tintColor: 'grey' }} width={24} height={24}/> :
					<Image source={require('./images/visible.png')} resizeMode="contain" style={{ flex: 1, tintColor: 'grey' }} width={24} height={24}/> 
				}
			</TouchableOpacity>
		)
	}

	renderTextField = () => {
		const { textFieldStyle, textType, invalidTextFieldStyle } = this.props
		return (
			<View style={{ width: this.props.width || deviceWidth }}>
				<View style={[this.state.isValid ? textFieldStyle : invalidTextFieldStyle, { flexDirection: 'row', display: 'flex', justifyContent: 'flex-end'}]}>
					{ textType === 'price' ? this.renderMaskedTextInput() : this.renderTextInput() }
					{ this.props.isSecured && this.renderVisibilityIcon() }
				</View>
			</View>
		)
	}

	render() {
		const { title } = this.props;
		return (
			<View style={this.props.style}>
				{this.renderTitle(title)}
				{ this.renderTextField() }
				{ !this.state.isValid && this.renderInvalidHint()}
			</View>
		);
	}

	validate(text) {
		if (this.props.onValidate) {
			if (this.props.onValidate(text) === true) {
				this.setState({
					isValid: true
				})
			} else {
				this.setState({
					isValid: false
				})
			}
			// this.setState({
			// 	isValid: this.props.onValidate(text)
			// })
		}
	}

	setAsValid() {
		this.setState({
			isValid: true,
			invalidMessage: ''
		})
	}

	setAsInvalid(errorMessage = '') {
		this.setState({
			isValid: false,
			invalidMessage: errorMessage
		})
	}

	getIsValid() {
        return this.state.isValid
    }
}

