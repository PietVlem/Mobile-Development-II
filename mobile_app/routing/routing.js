import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';


// import screens
import SearchScreen from '../screens/lolSearch';
import BlogScreen from '../screens/blog';
import ProfileScreen from '../screens/profile';

export default createBottomTabNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      tabBatLabel: 'Search',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-search" color={tintColor} size={24} />
      )
    }
  },
  Blog: {
    screen: BlogScreen,
    navigationOptions: {
      tabBatLabel: 'News',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-paper" color={tintColor} size={24} />
      )
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBatLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-person" color={tintColor} size={24}/>
      )
    }
  }
},{
  initialRouteName:'Search',
  order:['Search','Blog','Profile'],
  navigationOptions:{
    tabBarVisible: true,
  },
  tabBarOptions:{
    activeTintColor:'red',
    inactiveTintColor: 'grey'
  }
})




