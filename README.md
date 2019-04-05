# react-native-text-field

`react-native-text-field` is a text field that wraps React Native TextInput with customizable field title and placeholder, **masked text input**, and **text validation**. 

For the text validation, the `react-native-text-field` provides `onValidate` props to allow developers customize validation methods. Before version 3.0, `react-native-text-field` gives a general error to indicate the content in the text field is unexpected. However, for **versions after 3.0**, developers can provide **multiple** different **error messages** for **various cases** that could happen during the validation process.

For example, a Password field might need to be **longer than 4 digits**, and **contains letters** at the same time. 


<img src="https://media.giphy.com/media/e5RznpgXUpzxx3yjxZ/giphy.gif"/>

## Installation

### Install Dependencies
`npm install react-native-masked-text`

### Install react-native-text-field
`npm install react-native-text-field`


## Basic Usage

```
import TextField from 'react-native-text-field';

render() {
  return (
    <TextField
      title="Header"
      placeholder="Placeholder"
      onInputChange={(text) => this.onInputChange(text)}
    />
  )
}

onInputChange(text) {
  console.log(text)
}

```

| Props       | Description |
|-------------| -------------|
| title       | Title of the text field.|
| placeholder | Placeholder of the text field.|
| onInputChange | Same function as `onChangeText` of React Native TextInput. Callback that is called when the text field has any text changes. Changed text is passed as a single string argument to the callback handler.|


## Text Validation
```
render() {
	return(
		<TextField
			title="Password"
			placeholder="password"
			onInputChange={text =>
				this.onInputChange({ password: text })
			}
			onValidate={text => this.validatePassword(text)}
			invalidHint="Password is not valid."
			isSecured={true}
		/>
	)
}

validatePassword = (password) => {
	if (!password.length >= 4) {
		// Return error message as string if the text is not valid.
		return 'Password need to be at least 4 digits.' 
	}
	if (!/[a-zA-Z]/.test(password)) {
		// Return a different error message if the text doesn't match certain criteria. 
		return 'Password need to contain letters.'
	}
	
	return true // Return 'true' to indicate the text is valid.
	
}
```

| Props       | Description |
|-------------| -------------|
| onValidate  | Optional. Validation handler method that will be called when the text in the text field changes. Return `true` to indicate the text is valid. Return error message string to indicate the text doesn't match certain criteria. Return `false` to use the general error message, which is the value of `invalidHint` props. **If this props is omitted, the validation won't be triggered.**  |
| invalidHint | Optional. General error message if the text validation fails. The default value of this props is 'Your input is not valid.' |
| isSecured  | Optional. Display text in the text field as `*`. The text field will have a switchable icon to change between visible and invisible.|


## Style Customization
```
render() {
  return(
    <TextField
      title='Password'
      placeholder="password"
      onInputChange={(text) => this.onInputChange(text)}
      onValidate={(text) => this.validatePassword(text)}
      isSecured={true}
      cellHeight={40}
      isMultiline={false}
      width={300}
      selectionColor={'#5D95EF'}
      autoCapitalize={'none'}
      autoCorrect={false}
      style={{ marginTop: 20, marginBottom: 100 }}
      titleStyle={{ color: '#5D95EF' }}
      textFieldStyle={{ borderColor: '#BCC4D1' }}
      placeholderStyle={{ color: '#BCC4D1' }}
      invalidTextFieldStyle={{ borderColor: '#EF6C40' }}
      invalidHintStyle=={{ fontSize: 10 }}
      visibilityIconTintColor={"#00ff00"}
	  visibilityIconSource={require('@Images/defaultIcon.png') }
	  invisibilityIconSource={require('@Images/defaultIcon.png') }
    />
   )
}

```
| Props       | Description |
|-------------| -------------|
| cellHeight  | Optional. Height of the text input. |
| width 		 | Optional. Width of the text field. By default, the `style` props will determine how the text field looks like. When `width` is specifically assigned, the value of `width` take advantage  of the 'width' in `style`. |
| autoCapitalize | Optional. 'none'/'sentences'/'words'/'characters'. The default value is 'none'. |
| autoCorrect | Optional. true/false. By default, the value is false. |
| selectorColor | Optional. Color of the selector in the text input. |
| style		 | Optional. Style of the whole text field container. |
| titleStyle  | Optional. Style of the text field title. |
| textFieldStyle | Optional. Style of the text field. For example, making it as a round cornered box or a single underline slot. |
| placeholderStyle | Optional. Style of the placeholder. |
| invalidTextFieldStyle | Optional. Style of the text field when the validation fails. For example, highlight the text field border as red when there's error in the content of the text field. |
| invalidHintStyle | Optional. Style of the error message which will be displayed under the text field if there are any errors. |
| visibilityIconTintColor | Optional. The tint color of the visible/invisible icon for secured text field. By default, tint color is null.|
| visibilityIconSource | Optional. Image source of the icon to indicate visiblity for secured text field. |
| invisibilityIconSource | Optional. Image source of the icon to indicate visiblity for secured text field. |

![](https://raw.githubusercontent.com/BeckyWu220/react-native-text-field/visibleIconForSecuredField/screenshot.png)