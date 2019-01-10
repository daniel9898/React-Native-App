/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Navigation from './componentes/Navigation';

export default class App extends Component {

  /*constructor(props){
    super(props);

    this.state = {
      status : true,
      cuentas : {}
    }
  }*/

  /*getStatusFromChilds(mostrarForm, lista){
    this.setState({ status : mostrarForm, cuentas : lista });
  }*/

  render() {
    return(
      <Navigation/>
    )
    
    /*return (
      <View style={styles.container}>
      {
        this.state.status ? <Formulario getStatus={this.getStatusFromChilds.bind(this)}/> : 
                            <Lista lista={this.state.cuentas} getStatus={this.getStatusFromChilds.bind(this)}/>
      }
      </View>
    )*/
  }
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 20
  },
  textArea: {
    height: 60,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5
  },
  button: {
    backgroundColor: 'skyblue',
    paddingTop: 15,
    paddingBottom: 15
  },
  textButton: {
    textAlign: 'center',
    color: 'white'
  }

})*/


