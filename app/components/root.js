import React, {Component} from 'react';
import Header from './header';
import Progress from './Progress';
let duration = null;
class Root extends Component{
    constructor(){
        super();
        this.state = {progress:'_'};

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
        $('#player').bind($.jPlayer.event.timeupdate,(e)=>{
            duration = e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute
            });
        });
    }
    componentWillUnMount(){
        $('#player').unbind($.jPlayer.event.timeupdate)
    }
    progressChangeHandler(progress){
        //console.log(duration * progress)
        $('#player').jPlayer('play',duration * progress)
    }
    render(){
        return(
            <div>
            <Header/>
             <div id="player"></div>
            <Progress progress = {this.state.progress}
                onProgressChange={this.progressChangeHandler}
                barColor = "#ff0000"></Progress>
            </div>
        )
    }
}
export default Root;