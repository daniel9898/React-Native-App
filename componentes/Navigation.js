import React, { Component } from 'react';
import {createStackNavigator, createAppContainer} from "react-navigation";
import Formulario from "./Formulario";
import Lista from "./Lista";
import Dashboard from "./Dashboard";

const Routes = {
  Dashboard: {screen: Dashboard},
  Formulario: {screen: Formulario},
  Lista: {screen: Lista}
};

const Navigator = createStackNavigator(Routes, {
  initialRouteName: "Dashboard"
});

const AppContainer = createAppContainer(Navigator);

export default class Navigation extends Component {
  render() {
    return (
      <AppContainer/>
    )
  }

}


