import React ,{Component} from 'react';
import './musiclistItem.less';
class MusicListItem extends Component{
    render(){
        let musicItem = this.props.musicItem;
        return(
            <li className={`components-listitem row ${this.props.focus?'focus':''}`}>
                <p>{musicItem.title}-{musicItem.artist}</p>
            </li>
        )
    }
}
export default MusicListItem;