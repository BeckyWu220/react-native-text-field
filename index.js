import React, { Component } from 'react';
import { View, Text, TextInput, Platform, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { TextInputMask } from 'react-native-masked-text';

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
		textType 		: PropTypes.string,
		marginLeft		: PropTypes.number,
		marginRight		: PropTypes.number,
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
		textType 	: 'default',
        marginLeft	: 15,
		marginRight	: 15,
		isRequired	: false,
		isSecured	: false,
		onValidate	: null,
		invalidHint : 'Your input is not valid.',
		hintHeight	: 20
	};

	state = {
		text: null,
		isValid: true,
		invalidMessage: '',
	}

	componentDidMount() {
		this.setState({
			text: this.props.value,
			invalidMessage: this.props.invalidHint
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
		const { placeholder, cellHeight, marginLeft, marginRight } = this.props;
		return (
			<View style={{width: this.props.width || deviceWidth}}>
				<TextInputMask
					allowFontScaling={false}
					ref={(ref) => { this.maskedTextInput = ref; }}
					type={'money'}
					options={{
						unit: '$',
						separator: '.',
						delimiter: ',',
					}}
					style={[styles.textField, this.props.textFieldStyle, { height: cellHeight, marginLeft, marginRight }]}
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
			return [styles.textField, this.props.textFieldStyle, { height: cellHeight }];
		}
		return [styles.invalidTextField, this.props.invalidTextFieldStyle, { height: cellHeight }];
	}

	renderTextInput = () => {
		const { placeholder, cellHeight } = this.props;
		return (
			<View style={{width: this.props.width || deviceWidth}}>
				<TextInput
					allowFontScaling={false}
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
					secureTextEntry={this.props.isSecured}
					onEndEditing={(event) => this.validate(event.nativeEvent.text)}
				/>
				{ Platform.OS !== 'ios' && this.renderPlaceholder() }
			</View>
		);
	}

	renderPlaceholder = () => {
		if (this.state.text === null || this.state.text === '') {
			return (
				<View pointerEvents='none' style={styles.placeholderContainer}>
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

	render() {
		const { title, textType } = this.props;
		return (
			<View style={this.props.style}>
				{this.renderTitle(title)}
				{ textType === 'price' ? this.renderMaskedTextInput() : this.renderTextInput() }
				{ this.props.onValidate && this.renderInvalidHint()}
			</View>
		);
	}

	validate(text) {
		if (this.props.onValidate) {
			this.setState({
				isValid: this.props.onValidate(text)
			})
		}
	}

	setAsInvalid(errorMessage = '') {
		this.setState({
			isValid: false,
			invalidMessage: errorMessage
		})
	}
}

