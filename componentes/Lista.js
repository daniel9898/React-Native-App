import React, { Component } from 'react';
import {

  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ToastAndroid,
  ActivityIndicator

} from 'react-native';

import { List, ListItem } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Cuenta  from '../clases/cuenta.js';

export default class Lista extends Component {
  static navigationOptions = {
    title: 'Usuarios',
  };

  constructor(props){
    super(props);

    this.cuenta = new Cuenta();

    this.state = {
      mostrarForm : true,
      spinner : false
    };

    this.lista = this.traerCuentas();
    console.log("lista : ",this.lista);
  }

  traerCuentas() {   
    this.cuenta.traerTodas()
      .then(data => {
        this.setState({ cuentas : data});
        this.props.getStatus(this.state.mostrarForm, this.state.cuentas);
      })
      .catch(error => { console.log("error : ",error) })
  }

  renderItem({ item, rowMap }) {
    return (
      <View style={{backgroundColor:'#CCC',borderBottomColor: 'black',borderBottomWidth: 2}}>
        <ListItem
          roundAvatar
          key={item.id}
          title={`${item.nombre} ${item.apellido}`}
          subtitle={item.email}
          avatar={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}
          /*leftIcon={{ name:'angle-double-right', type:'font-awesome', style: {color: '#5F9EA0'} }}
          rightIcon={{ name:'angle-double-left', type:'font-awesome', style: {color: '#5F9EA0'} }}*/
        />
       </View>
    )
  }
  //HACER UNA FACHADA PARA LOS ALERT LOS SPPINER Y TODO LO DEMAS QUE NO TNGA QUE VER CON ESTE CMP
  deleteAccount(account){
    this.mostrarSpinner(true);
    this.cuenta.eliminar(account.id)
      .then((data)=>{
        ToastAndroid.showWithGravity('Registro borrado con exito !!', ToastAndroid.TOP, ToastAndroid.CENTER);
          this.cuenta.traerTodas()
            .then(cuentas => {
              console.log("lista actualizada : ",cuentas);
              //LLEGAN PERO EL RENDER NO REFRESCA CREAR UNA PROP(CUENTAS) EN STATE Y SETEAR CON PROP LISTA
              this.props.lista = cuentas; 
              this.mostrarSpinner(false);
            })
            .catch(error => { console.log("error : ",error) })
      })
      .catch((error)=>{
        this.windowConfirm("Error al intentar eliminar el registro",error);
      });
  }

  windowConfirm(title, msg, callbackOk, cuenta){
    Alert.alert(
      title,
      msg,
      [
        {text: 'Cancelar', onPress: () => { return false }, style: 'cancel'},
        {text: 'OK', onPress: () => { callbackOk != null ? callbackOk(cuenta) : 'sin callback' } },
      ],
    )
  }

  updateAccount(account){
    console.log("cuenta a actualizar ",account);
  }

  renderHiddenItem({ item, rowMap }){
    return (
      <View style={styles.rowBack}>
        <View>
             <Icon    
                onPress={()=> this.windowConfirm(`${item.nombre} ${item.apellido}`,'Esta seguro que desea eliminar este registro ?',this.deleteAccount.bind(this), item ) }
                key={item.id}
                name='trash'
                size={35}
                color='red'
                style={{height:35,width:35}}
                backgroundColor="white" />
        </View>
        <View>
             <Icon
                onPress={()=> this.updateAccount(item) }   
                key={item.id}
                name='edit'
                size={35}
                color='orange'
                style={{height:35,width:35}}
                backgroundColor="white" />
        </View>
      </View>
    )
  }

  _keyExtractor = (item, index) => { item.id };

  mostrarSpinner(mostrar){
    this.setState({spinner: mostrar});
  }

  render() { 
    return (
        <View>
        {
           this.state.spinner ? <ActivityIndicator/> :
           <View>
              <View style={{paddingBottom: 15}}>
               <Button color="#32CD32" title="Volver" onPress={() => this.props.getStatus(this.state.mostrarForm)}/> 
              </View>
              <SwipeListView
                  useFlatList
                  directionalDistanceChangeThreshold={1}
                  stopLeftSwipe={75}
                  stopRightSwipe={-75}
                  data={this.lista} //ACA IRIA EL ATRIBUTE CEUNTAS QUE VA ESTAR EN EL STATE
                  renderItem={this.renderItem}
                  renderHiddenItem={this.renderHiddenItem.bind(this)} />
            </View>
        }
        </View>
    )
  }


}

const styles = StyleSheet.create({
 
  titulo: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5,
    color: 'black'
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
})
