import React, { Component } from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { TextInputMask } from 'react-native-masked-text';

const CELL_HEIGHT = 40;

export default class TextField extends Component {
	static propTypes = {
		title       	: PropTypes.string,
		value       	: PropTypes.any,
		placeholder 	: PropTypes.string,
		cellHeight		: PropTypes.number,
		onInputChange 	: PropTypes.func,
		textType 		: PropTypes.string,
		marginLeft		: PropTypes.number,
		marginRight		: PropTypes.number,
		titleStyle		: PropTypes.object,
		textFieldStyle	: PropTypes.object,
		placeholderStyle: PropTypes.object,
		selectionColor	: PropTypes.string,
	};

	static defaultProps = {
		title       : '',
		value       : null,
		placeholder : '',
		cellHeight	: CELL_HEIGHT,
		textType 	: 'default',
        marginLeft	: 15,
        marginRight	: 15
	};

	state = {
        text: null
	}

	componentDidMount() {
		this.setState({
			text: this.props.value
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.setState({
				text: nextProps.value
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
					{title}
				</Text>
			);
		}
	}

	renderMaskedTextInput = () => {
		const { placeholder, cellHeight, marginLeft, marginRight } = this.props;
		return (
			<View>
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
					placeholderTextColor={this.props.placeholderStyle && this.props.placeholderStyle.color ? this.props.placeholderStyle.color : undefined}
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
		return [styles.textField, this.props.textFieldStyle, { height: cellHeight }];
	}

	renderTextInput = () => {
		const { placeholder, cellHeight } = this.props;
		return (
			<View>
				<TextInput
					allowFontScaling={false}
					style={this.stylishTextInput()}
					value={this.state.text}
					placeholder={Platform.OS === 'ios' ? placeholder : ''}
					placeholderTextColor={this.props.placeholderStyle && this.props.placeholderStyle.color ? this.props.placeholderStyle.color : undefined}
					selectionColor={this.props.selectionColor}
					editable={true}
					multiline={cellHeight > CELL_HEIGHT}
					onChangeText={this.onTextChange}
					blurOnSubmit={true}
					underlineColorAndroid='transparent'
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

	render() {
		const { title, textType } = this.props;
		return (
			<View>
				{this.renderTitle(title)}
				{ textType === 'price' ? this.renderMaskedTextInput() : this.renderTextInput() }
			</View>
		);
	}
}

