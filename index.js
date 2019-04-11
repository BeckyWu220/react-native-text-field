import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import PropTypes from 'prop-types';
import styles from './styles';

const CELL_HEIGHT = 40;

export default class TextField extends Component {
	static propTypes = {
		title       	: PropTypes.string,
		value       	: PropTypes.any,
		placeholder 	: PropTypes.string,
		cellHeight		: PropTypes.number,
		isMultiline		: PropTypes.bool,
		width			: PropTypes.number, //Optional
		style			: PropTypes.style,
		onInputChange 	: PropTypes.func,
		autoCapitalize	: PropTypes.string, //enum('none', 'sentences', 'words', 'characters')
		autoCorrect		: PropTypes.bool,
		textType 		: PropTypes.string,
		titleStyle		: PropTypes.object,
		textFieldStyle	: PropTypes.object,
		textInputStyle	: PropTypes.object,
		placeholderStyle: PropTypes.object,
		selectionColor	: PropTypes.color,
		isRequired		: PropTypes.bool,
		isRequiredHint	: PropTypes.string,
		isSecured		: PropTypes.bool,
		onValidate		: PropTypes.func,
		validateAsTyping: PropTypes.bool,
		invalidTextFieldStyle : PropTypes.object,
		invalidTextInputStyle : PropTypes.object,
		invalidHint		: PropTypes.string,
		invalidHintStyle: PropTypes.object,
		visibilityIconTintColor: PropTypes.color,
		invisibilityIconSource: PropTypes.object,
		visibilityIconSource: PropTypes.object
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
		isRequiredHint : 'Field is required.',
		isSecured	: false,
		onValidate	: null,
		validateAsTyping: false,
		invalidHint : 'Your input is not valid.',
		textFieldStyle : styles.textField,
		invalidTextFieldStyle : styles.invalidTextField,
		visibilityIconTintColor: null
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
			isVisible: !this.props.isSecured
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
			if (this.props.validateAsTyping) {
				this.validate(text);
			}
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
					placeholder={placeholder}
					placeholderTextColor={this.props.placeholderStyle.color}
					selectionColor={this.props.selectionColor}
					keyboardType={'numeric'}
					editable={true}
					onChangeText={this.onMaskedTextChange}
					blurOnSubmit={true}
					underlineColorAndroid='transparent'
				/>
			</View>
		);
	}

	stylishTextInput = () => {
		const { cellHeight, textInputStyle, invalidTextInputStyle } = this.props;
		if (this.state.isValid) {
			return [styles.textInput, textInputStyle , { height: cellHeight }];
		}
		return [styles.textInput, textInputStyle, invalidTextInputStyle, { height: cellHeight }];
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
					placeholder={placeholder}
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
			</View>
		);
	}

	renderInvalidHint = () => {
		return (
			<View>
				{ 
					!this.state.isValid &&
					<Text
						numberOfLines={0}
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
			<TouchableOpacity style={{ width: visibleIconWidth, height: visibleIconWidth, ...styles.central}} onPress={() => { 
				this.setState({ 
					isVisible: !this.state.isVisible
				}) }}>
				{ 	this.state.isVisible ? 
					<Image source={ this.props.invisibilityIconSource || require('./images/invisible.png')} resizeMode="contain" style={{ tintColor: this.props.visibilityIconTintColor }} width={24} height={24}/> :
					<Image source={ this.props.visibilityIconSource || require('./images/visible.png')} resizeMode="contain" style={{ tintColor: this.props.visibilityIconTintColor }} width={24} height={24}/> 
				}
			</TouchableOpacity>
		)
	}

	renderTextField = () => {
		const { textFieldStyle, textType, invalidTextFieldStyle } = this.props
		return (
			<View>
				<View style={[styles.defaultPadding, this.state.isValid ? textFieldStyle : invalidTextFieldStyle, styles.flexRowEnd]}>
					{ textType === 'price' ? this.renderMaskedTextInput() : this.renderTextInput() }
					{ this.props.isSecured && this.renderVisibilityIcon() }
				</View>
			</View>
		)
	}

	render() {
		const { title, cellHeight } = this.props;
		return (
			<View style={[this.props.style, this.props.width ? { width: this.props.width } : null]}>
				{ this.renderTitle(title) }
				{ this.renderTextField() }
				{ !this.state.isValid && this.renderInvalidHint()}
			</View>
		);
	}

	validate(text) {
		if (this.props.isRequired) {
			if (!text) {
				this.setAsInvalid(this.props.isRequiredHint)
				return 
			} else {
				this.setState({
					isValid: true
				})
			}
		}

		if (this.props.onValidate) {
			const validateResult = this.props.onValidate(text)
			if (validateResult === true) {
				this.setState({
					isValid: true
				})
			} else {
				if (validateResult === false) {
					this.setState({
						isValid: false
					})
				}
				if (validateResult !== false && typeof(validateResult) === 'string') {
					this.setAsInvalid(validateResult)
				}
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

