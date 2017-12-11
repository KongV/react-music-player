import React, {Component} from 'react';
import Header from './header';
import Player from "../page/player";
import MusicList from "../page/MusicList";
import {MUSIC_LIST} from "../config/musiclist";
import{Router ,IndexRoute, Link, Route,hashHistory}from 'react-router';
import Pubsub from 'pubsub-js';
class App extends Component{
    constructor(){
        super();
        this.state = {
            musicList:MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0]};


    }
    playMusic(musicItem){
        //console.log(musicItem.file);
        $('#player').jPlayer('setMedia',{
            mp3: musicItem.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem:musicItem
        })
    }
    playNext(type){
        let index = this.findMusicIndex(this.state.currentMusicItem);
        let newIndex = null;
        let musicListLength = this.state.musicList.length;
        if(type === 'next'){
            newIndex = (index + 1) % musicListLength;
        }else {
            newIndex = (index - 1 + musicListLength) % musicListLength;
        }
        this.playMusic(this.state.musicList[newIndex]);
    }
    findMusicIndex(musicItem){
        return this.state.musicList.indexOf(musicItem);
    }
    componentDidMount(){
        $('#player').jPlayer({
            supplied:'mp3',
            wmode:'window'
        });
        this.playMusic(this.state.currentMusicItem);
        $('#player').bind($.jPlayer.event.ended,(e) => {
            this.playNext('next');
        })
        Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem)=>{
            this.setState({
                musicList: this.state.musicList.filter(item=> {
                    return item !== musicItem;
                })
            })
        });
        Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem)=>{
            this.playMusic(musicItem);
        })
        Pubsub.subscribe('PLAY_PREV', (msg, musicItem)=>{
            this.playNext('prev');
        })
        Pubsub.subscribe('PLAY_NEXT', (msg, musicItem)=>{
            this.playNext('next');
        })
    }
    componentWillUnMount(){
       Pubsub.unsubscribe('PLAY_MUSIC');
       Pubsub.unsubscribe('PLAY_PREV');
       Pubsub.unsubscribe('PLAY_NEXT');
       Pubsub.unsubscribe('DELETE_MUSIC');
        $('#player').unbind($.jPlayer.event.ended)
    }

    render(){
        return(
            <div>
                <Header/>
                <div id="player"></div>
                {React.cloneElement(this.props.children, this.state)};

            </div>
        )
    }
}

class Root extends Component{
   render(){
       return(
           <Router history={hashHistory}>
           <Route path="/" component={App}>
               <IndexRoute component={Player}></IndexRoute>
               <Route path="/list" component={MusicList}></Route>
           </Route>
       </Router>
       )
   }
}
export default Root;