import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Dashboard extends Component{
	static navigationOptions = {
        title: 'Dashboard',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',

       },
    };

	render(){
		return(
		    <ImageBackground source={{uri: "https://images.unsplash.com/photo-1504846257989-a76209d9d2ac?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=10a7896f1a6187c14a42a029b1788b02&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb"}}
		    style={styles.image}>
		        <View style={styles.container}>
		        <Text style={styles.title}>Usuarios <Icon name='user' size={15} color='white'/></Text>
		            <TouchableHighlight 
		                onPress={() => this.props.navigation.navigate('Formulario')} 
		                style={styles.agregar_boton}>
                        <View>
                         <Text style={styles.textoBoton}>Agregar <Icon name='plus' size={15} color='white'/></Text>
                        </View>
		            </TouchableHighlight>

		            <TouchableHighlight 
		                onPress={() => this.props.navigation.navigate('Lista')} 
		                style={styles.lista_boton} >
                        <View>
                         <Text style={styles.textoBoton}>Lista <Icon name='list' size={15} color='white'/></Text>
                        </View>
		            </TouchableHighlight>
		        </View>
		    </ImageBackground>
        )
		
	}

}

const styles = StyleSheet.create({
    image:{
        flex:1
    },
    container:{
        flex: 1,
        alignItems:"center",
        justifyContent: 'center'
    },
    agregar_boton:{
        width:300,
        height:40,
        backgroundColor:"red",
        alignItems:"center",
        marginBottom:10,
        borderRadius:8,
        borderWidth:1,
        justifyContent: 'center',
        marginTop:30
    },
    lista_boton:{
        width:300,
        height:40,
        backgroundColor:"gray",
        alignItems:"center",
        marginBottom:10,
        borderRadius:8,
        borderWidth:1,
        justifyContent: 'center',
        marginTop:30
    },
    textoBoton:{
        color:"white"    
    },
    title: {
        marginTop:0,
        fontSize:25,
        color:"white"
    }
});