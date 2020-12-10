import * as React from 'react';
import { Text,View,StyleSheet,ActivityIndicator,FlatList,Dimensions,Image, TouchableWithoutFeedback,Linking} from 'react-native';
const {width, height} = Dimensions.get('window');
console.disableYellowBox = true;

export default class App extends React.Component{
  state = {
    news : [],
    loading : true
  }
  fetchnews = () =>{
    fetch(
'http://newsapi.org/v2/top-headlines?country=lv&category=sports&apiKey=ce1d1fa67f784efabe714caf8a0c597f'
)
    .then((res)=>res.json())
    .then((response)=>{
      this.setState({
        news : response.articles,
        loading : false
      })
    })
  }
  componentDidMount(){
    this.fetchnews()
  }
  render(){
    if(this.state.loading){
      return(
        <View style={{flex:1,
        alignItems:'center',
        justifyContent : 'center',
        backgroundColor:'#fff)'}}>
        <ActivityIndicator size='large' color='#fff'/>
        </View>
      );
    }
    else{
      return(
      <View style={styles.container}>
          <Text style={styles.paragraph}>Ziņas</Text>

        <View style={styles.news}>
          <FlatList
          data={this.state.news}
          renderItem={({item})=>{
            return(
              <TouchableWithoutFeedback onPress={()=>Linking.openURL(item.url)}>
                <View style={{
                  width:width-50,
                  height:200,
                  backgroundColor:'#fff',
                  marginBottom:15,
                  borderRadius:15
                  }}>
                  <Image source={{uri:item.urlToImage}} 
                  style={StyleSheet.absoluteFill,{borderRadius:15}}/>
                  <View style={styles.gradient}>
                  <Text style={{
                    position:'absolute',
                    bottom:0, color:'#fff',
                    fontSize:20, padding:5
                    }}>
                    {item.title}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
          />
        </View>
      </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor : '#333'
  },
  paragraph : {
    padding : 30,
    fontSize : 25,
    color : 'white'
  },
  news:{
    alignSelf:'center'
  },
  gradient:{
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(0,0,0,0.5)',
    borderRadius: 15
  }
})