import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,FlatList
} from 'react-native';
import { MonoText } from '../components/StyledText';
import { Card, CardItem, Body, Header,Title, Root } from 'native-base';
import { Font, AppLoading } from 'expo';

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Detail',
  };
  async componentWillMount() {
  await Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
    });
    this.setState({ loading: false });
  }
  constructor(props) {
    super(props);
    this.state = { 
      loading: true, 
      item: this.props.navigation.state.params.item 
    };
  }
  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (
      <View
      style={styles.container}>
        
        <Image source={{uri: this.state.item.image}} style={styles.image}/>
        <Text>{this.state.item.name}</Text>

        <Text>{this.state.item.gender}</Text>

        <Text>{this.state.item.status}</Text>
        <Text>{this.state.item.location.name}</Text>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
