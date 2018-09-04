# react-native-text-field

`react-native-text-field` is a text field that wras React Native TextInput with customizable title and placeholder.

## Installation

### Install Dependencies
`npm install react-native-masked-text`

### Install react-native-text-field
`npm install react-native-text-field`


## Example

```
import TextField from 'react-native-text-field';

render() {
  <TextField
      title="Header"
      placeholder="Placeholder"
      value=""
      cellHeight={40}
      textType="default"
      onInputChange={(text) => this.onInputChange(text)}
      style={{ marginBottom: 15 }}
      titleStyle={{ color: '#000000' }}
      textFieldStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E5E5' }}
      placeholderStyle={{ color: '#E5E5E5' }}
      selectionColor="#000000"
  />
  
}

onInputChange(text) {
  console.log(text)
}

```
