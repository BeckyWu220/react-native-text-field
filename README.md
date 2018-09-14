# react-native-text-field

`react-native-text-field` is a text field that wras React Native TextInput with customizable title and placeholder. In the newest version, text validation was implemented to display error message for certain text field.

<a href="https://imgflip.com/gif/2hwciw"><img src="https://i.imgflip.com/2hwciw.gif" title="made at imgflip.com"/></a>

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
      value=""
      cellHeight={40}
      textType="default"
      onInputChange={(text) => this.onInputChange(text)}
    />
  )
}

onInputChange(text) {
  console.log(text)
}

```

## Style Customization & Error Validation
```
render() {
  return(
    <TextField
      title='Password'
      placeholder="password"
      value=""
      cellHeight={40}
      textType="default"
      onInputChange={(text) => this.onInputChange(text)}
      width={300}
      style={{ marginTop: 20, marginBottom: 100 }}
      isSecured={true}
      titleStyle={{ color: '#5D95EF' }}
      textFieldStyle={{ borderColor: '#BCC4D1' }}
      placeholderStyle={{ color: '#BCC4D1' }}
      selectionColor={'#5D95EF'}
      onValidate={(text) => this.validatePassword(text)}
      invalidTextFieldStyle={{ borderColor: '#EF6C40' }}
      invalidHintStyle=={{ fontSize: 10 }}
      invalidHint='At least 4 digits.'
    />
   )
   //if `onValidate` props is not defined, the error message would not be rendered.
   //`isSecured` props is used to show * in password field.
}

validatePassword = (password) => {
  return password.length >= 4
}

```
