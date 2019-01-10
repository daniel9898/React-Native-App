import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Icon, ToastAndroid } from 'react-native';

import t from 'tcomb-form-native';
const Form = t.form.Form;
const User = t.struct({
  nombre: t.maybe(t.String),
  apellido: t.String,
  email: t.String
});
const formStyles = {
  ...Form.stylesheet,
  controlLabel: {
    normal: {
      color: '#48BBEC',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
  }
}
const options = {
  fields: {
    apellido: {
      error: 'Ingrese un apellido valido',
    },
    email: {
      error: 'Ingrese un email valido',
    },
  },
  stylesheet: formStyles,
};

import Cuenta  from '../clases/cuenta.js';

export default class Formulario extends Component {
  static navigationOptions = {
      title: 'Alta Usuario',
  };


  constructor(props){
    super(props);
    this.cuenta = new Cuenta();
    
    this.state = {
      nombre : '',
      apellido : '',
      email : '',
      cuentas : null,
      mostrarForm : false
    }
  }

  render() { 
    return (
      <View style={styles.container}>
        <Form type={User}
              ref={c => this._form = c}
              options={options}/>
        <TouchableHighlight style={styles.button} onPress={this.guardarCuenta.bind(this)} underlayColor='#99d9f4'>    
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableHighlight>
      </View>   
    )
  }

  guardarCuenta(){
    const value = this._form.getValue(); 
    if(value && value.apellido && value.email){
      this.cuenta.guardar(value)
        .then(data => {
          ToastAndroid.show("Los datos se guardaron exitosamente",ToastAndroid.SHORT);
          this.props.navigation.navigate('Lista');
        })
        .catch(error => { console.log("error : ",error) })
    }
  }

}

const styles = StyleSheet.create({
 container: {
    justifyContent: 'center',
    marginTop: 30,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})


