import React, { Component } from 'react';
import moment from 'moment';

class LolProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }
    render() {
        let data = this.props.data;
        let matches = data.recentMatches.map(match => {
            return (
                <div key={match.gameId} className={match.playerData.stats.win === true ? "game-details win" : "game-details fail"}>
                    <div className="grid equal-h">
                        <div className="grid__item large--one-quarter">
                            <img src={`https://ddragon.leagueoflegends.com/cdn/8.14.1/img/champion/${match.championKey}.png`} alt={`champion: ${match.champion}`} />
                        </div>
                        <div className="grid__item large--one-quarter gd gd--primary-data">
                            <p className={match.playerData.stats.win === true ? "victory-text" : "defeat-text"}>{match.playerData.stats.win === true ? "Victory" : "Defeat"} </p>
                            <p>{`Champion: ${match.champion}`}</p>
                            <p>Lane: <span className="lowercase">{match.lane}</span></p>
                        </div>
                        <div className="grid__item large--one-quarter gd gd--secondary-data">
                            <p>{`Level: ${match.playerData.stats.champLevel}`}</p>
                            <p>{`KDA: ${match.playerData.stats.kills}/`} <span className="defeat-text">{`${match.playerData.stats.deaths}`}</span> {`/${match.playerData.stats.assists}`}</p>
                            <p>{`Map: ${match.mapName}`}</p>
                        </div>
                        <div className="grid__item large--one-quarter gd gd--tertiary-data">
                            <p>{`Lenght: ${moment.utc(match.gameDuration * 1000).format('mm:ss')}`}</p>
                            <p>{moment(match.gameCreation).fromNow()}</p>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className="search-result__lol">
                <div className="search-result__lol__name equal-h">
                    <div>
                        <img src={`https://ddragon.leagueoflegends.com/cdn/8.14.1/img/profileicon/${data.profileIconId}.png`} alt="profile icon" />
                    </div>
                    <div>
                        <h1>{data.name}</h1>
                        <p>Level: {data.summonerLevel}</p>
                        <p>server: Euw 1</p>
                    </div>
                </div>
                <div className="matchcontainer">
                    {matches}
                </div>
            </div>
        );
    }
}

export default LolProfile;