import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Image } from 'react-native';
import axios from 'axios';

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      responseData: ''
    };
  }

  search() {
    console.log('Searching...');
    axios.get(`http://10.0.2.2:8080/api/summoner/${this.state.text}`).then(response => {
      this.setState({ responseData: response.data });
      console.log(response.data);
      if (this.state.responseData !== '') {

      }
    }).catch(error => {
      console.log(error)
      this.setState({ loading: false });
    })
  }

  render() {
    let profile;
    let matchHistory;
    if (this.state.responseData !== null && this.state.responseData !== '') {
      const data = this.state.responseData
      profile = (
        <View style={styles.profile}>
         <Image
              style={styles.profileImg}
              source={{ uri: `https://ddragon.leagueoflegends.com/cdn/8.14.1/img/profileicon/${data.profileIconId}.png` }}
            />
            <View>
              <Text >{data.name}</Text>
              <Text>Level: {data.summonerLevel}</Text>
              <Text>server: Euw 1</Text>
            </View>
        </View>
      )
      matchHistory = data.recentMatches.map(match => {
        return (
          <View style={[match.playerData.stats.win === true ? styles.victoryColor : styles.looseColor]} key={match.gameId}>
            <Image
              style={styles.matchImg}
              source={{ uri: `https://ddragon.leagueoflegends.com/cdn/8.14.1/img/champion/${match.championKey}.png` }}
            />
            <View>
              <Text>{match.playerData.stats.win === true ? "Victory" : "Defeat"}</Text>
              <Text>{`Champion: ${match.champion}`}</Text>
              <Text>{match.lane}</Text>
              <Text>{`Level: ${match.playerData.stats.champLevel}`}</Text>
              <Text>{`KDA: ${match.playerData.stats.kills}/`} {`${match.playerData.stats.deaths}`} {`/${match.playerData.stats.assists}`}</Text>
              <Text>{`Map: ${match.mapName}`}</Text>
            </View>
          </View>
        )
      })
    }
    return (
      <View style={styles.searchWrapper}>
        <Text style={styles.searchTitle}>Search for your League Profile</Text>
        <ScrollView style={styles.searchMain}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
          <Button
            onPress={this.search.bind(this)}
            title="Search"
            style={styles.btn}
            accessibilityLabel="Learn more about this purple button"
          />
          {profile}
          {matchHistory}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchWrapper: {
    flex: 1,
    backgroundColor: '#f3f4f9',
  },
  searchMain:{
    padding: 10,
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#1d91eb',
  },
  textInput: {
    height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20,
  },
  btn: {
    marginBottom: 20,
  },
  profile:{
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
  },
  profileImg:{
    width: 80,
    height: 80,
    marginRight: 10,
  },
  match: {
    margin: 10,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  matchImg: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  victoryColor:{
    margin: 10,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#8ec735',
    borderWidth: 0.5,
    borderColor: '#528806',
  },
  looseColor:{
    margin: 10,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#d9a3a0',
    borderWidth: 0.5,
    borderColor: '#b7332f',
  }
});

export default SearchScreen;