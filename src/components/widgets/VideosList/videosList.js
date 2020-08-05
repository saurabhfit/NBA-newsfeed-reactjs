import React, { Component } from 'react';
import styles from './videosList.module.css';
import { firebaseTeams, firebaseVideos, firebaseLooper } from '../../../firebase';

import Buttons from '../Buttons/buttons';
import VideosListTemplate from './videosListTemplate';

class VideosList extends Component {
    state = {
        teams:[],
        videos:[],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount
    }

    componentWillMount(){
        this.request(this.state.start, this.state.end);
    }

    request = (start, end) => {

        firebaseTeams.once('value')
        .then((snapshot)=>{
            const teams = firebaseLooper(snapshot);
            this.setState({
                teams
            })
        })

        firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
        .then((snapshot)=>{
            const videos = firebaseLooper(snapshot);
            // console.log(this.state.items);
            this.setState({
                videos:[...this.state.videos, ...videos],
                start,
                end
            })
        })
        .catch(e=>{
            console.log(e)
        })

    }

    renderTitle = ()=> {
        return this.props.title ? 
            <h3><strong>NBA</strong> VIDEOS</h3>
        : null;
    }

    renderVideos = () => {
        let template = null;

        switch(this.props.type){
            case('card'):
                template = <VideosListTemplate 
                                data={this.state.videos}
                                teams={this.state.teams}
                            />
                break;
            
            default:
                template=null;    
        }

        return template;
    }

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end + 1, end)
        // console.log(end)
    }

    renderButton = () => {
        return this.props.loadmore ? 
            <Buttons
                type="loadmore"
                loadMore={()=>this.loadMore()}
                cta="Lode More Videos"
            />
            :
            <Buttons 
                type="linkTo"
                cta="More Videos"
                linkTo="/videos"
            />
            ;
    }

    render(){
        return(
            <div className={styles.videosList_wrapper}>
                { this.renderTitle() }
                { this.renderVideos() }
                { this.renderButton() }
            </div>
        );
    }

    
}


export default VideosList;