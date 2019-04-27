 import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  FlatList,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { Slider } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Icon, Left, Body, Right,Header,Title } from 'native-base';


export default class HomeScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Characters',
  };
  constructor(props) {
    super(props);
    this.state = {
      value: 5,
      checked: false,
      loading: false,
      books: [],
      url: 'https://rickandmortyapi.com/api/character',

    };
  }


  componentDidMount = () => {
    this.getBooks();
  }

  getBooks = () =>{
    this.setState({loading:true})
    fetch(this.state.url,{

      method: 'GET'
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        books:response.results,
        url: response.info.next,
        loading: false
      })
    })
    .catch((error) => {
      console.error(error)
    });
  };
 
  
  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value),
      };
    });
  }



  render() {
    const {value} = this.state;
    
      if(this.state.loading){
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
      );
    }else{
      return (
     <View style={styles.bottom}>
           
        <ScrollView>
          <FlatList
            data={this.state.books}
            contentContainerStyle={styles.listItem}
            numColumns={2}
            renderItem={
              ({item}) =>
               <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
              <View style={styles.button} key={item.id}>
              <Card>
                  <CardItem cardBody>
                      <Image source={{uri: item.image}} style={styles.image}/>
                  </CardItem>
                  <CardItem>
                      <Body>
                      <Text>
                          {item.name}
                      </Text>
                      </Body>
                  </CardItem>
              </Card>
          </View>
          </TouchableWithoutFeedback>
            }
            keyExtractor={(item, index) => index.toString()}
          />

        </ScrollView>
        <Button
            onPress={this.getBooks}
            title="MORE"
            accessibilityLabel="More characters"
            style={styles.helpContainer}
          />
      </View>
      );
    }
      
  }

  actionOnRow(item) {
   {this.props.navigation.navigate('Detail',{item})}
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }


}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
  },
  bottom: {
    marginBottom: 30
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
    marginBottom: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    padding:5,
    marginBottom: 30,
  },
  image:
  {
    width: '50%',
    aspectRatio: 1,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  toolbar: {
    width: 100,
    resizeMode: 'contain',
    marginTop: 5,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
    marginBottom: 30
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  listItem: {
    margin: 10
  },

});
