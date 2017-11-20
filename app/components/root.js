import React, {Component} from 'react';
import Header from './header';
import Player from "../page/player";
import MusicList from "../page/MusicList";
import {MUSIC_LIST} from "../config/musiclist";
import{Router ,IndexRoute, Link, Route,hashHistory}from 'react-router';

class App extends Component{
    constructor(){
        super();
        this.state = {
            musicList:MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0]};


    }
    componentDidMount(){
        $('#player').jPlayer({
            ready:function(){
                $('#player').jPlayer('setMedia',{
                    mp3:'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
                }).jPlayer('play');
            },
            supplied:'mp3',
            wmode:'window'
        });

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