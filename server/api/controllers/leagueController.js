const async = require('async');
var request = require('request');
var axios = require('axios');
const leagueChamp = require('../models/leagueChamp');

const api_key = 'RGAPI-820aa7e9-03ec-4c0a-8569-dea62e790b0b';


// local champ/map json
var champs = require('../champs.json');
var maps = require('../maps.json');

exports.get_data = function (req, res, next) {

}

exports.get_champs = function (req, res, next) {
    var data = {};
    let count = 0;
    var s_toSearch = req.params.summonerName;

    async.waterfall([
        (callback) => {
            var URL = 'https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + s_toSearch + '?api_key=' + api_key;
            request(URL, function (err, response, body) {
                console.log(response.statusCode);
                if (!err && response.statusCode == 200) {
                    let AccountJson = JSON.parse(body);
                    data = AccountJson;
                    callback(null, data);
                } else {
                    res.send('null');
                }
            });
        },
        (data, callback) => {
            var URL = 'https://euw1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + data.accountId + '?api_key=' + api_key;
            request(URL, (err, response, body) => {
                if (!err && response.statusCode == 200) {
                    let matchesJson = JSON.parse(body);
                    data.recentMatches = [];
                    for (var c = 0; c < 20; c++) {
                        /*
                        leagueChamp.findOne({id: matchesJson.matches[c].champion}, function (err, specificChamp) {
                            if (err) return console.error(err);
                            //console.log(specificChamp);
                            var champName = specificChamp.name;
                            var champKey = specificChamp.key;
                            matchesJson.matches[c].champion = champName;
                            matchesJson.matches[c].championKey = champKey;
                            //console.log(matchesJson.matches[c]);
                            data.recentMatches.push(matchesJson.matches[c])
                        })
                        */
                        for (var x = 0; x < champs.data.length; x++) {
                            if (matchesJson.matches[c].champion === champs.data[x].id) {
                                var champName = champs.data[x].name;
                                var champKey = champs.data[x].key;
                                matchesJson.matches[c].champion = champName;
                                matchesJson.matches[c].championKey = champKey;
                                data.recentMatches.push(matchesJson.matches[c])
                            }
                        }
                    }
                    //console.log(data);
                    callback(null, data);
                } else {
                    console.log(err)
                }
            });
        },
        (data, callback) => {
            for (var x = 0; x < data.recentMatches.length; x++) {
                let gameURL = 'https://euw1.api.riotgames.com/lol/match/v3/matches/' + data.recentMatches[x].gameId + '?api_key=' + api_key;
                const index = x;
                axios.get(gameURL).then(axiosResponse => {
                    let player = axiosResponse.data.participantIdentities.find(obj => {
                        return obj.player.summonerId === data.id;
                    })
                    let playerGameData = axiosResponse.data.participants.find(obj => {
                        return obj.participantId === player.participantId;
                    })
                    data.recentMatches[index].playerData = playerGameData;
                    data.recentMatches[index].gameDuration = axiosResponse.data.gameDuration;
                    data.recentMatches[index].gameCreation = axiosResponse.data.gameCreation;
                    for (var y = 0; y < maps.data.length; y++) {
                        if (axiosResponse.data.mapId === maps.data[y].mapId) {
                            data.recentMatches[index].mapName = maps.data[y].mapName;
                            console.log(data.recentMatches[index].mapName);
                        }
                    }
                    count++;
                    //console.log(count);
                    if (count == 20) {
                        console.log('send');
                        res.send(data);
                    }
                })
            }
        }
    ],
        function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
        });

}