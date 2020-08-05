import React from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

import styles from './cardInfo.module.css';

const CardInfo = (props) => {

    const getTeamName = (teams, team) => {
        let data = teams.find((item)=>{
            return item.teamId===team
        });

        if(data){
            return data.name;
        }
        return null;
    }

    const formatDate = (date) => {
        return moment(date).format(' MM-DD-YYYY');
    }

    return (
        <div className={styles.cardInfo}>
            <span className={styles.teamName}>
                {getTeamName(props.teams, props.team)}
            </span>
            <span className={styles.data}>
                <FontAwesome name="clock-o"/>
                {/* {props.date} */}
                {formatDate(props.date)}
            </span>
        </div>
    );
}

export default CardInfo