import React, {Component} from 'react';
import {API_URL, API_KEY,IMAGE_BASE_URL,POSTER_SIZE } from '../../config';
import './ActorInfo.css';

class ActorInfo extends Component{
    state={
       actor:[],
        loading:false
    }

    componentDidMount(){
        this.setState({
            loading:true
        })
        const endpoint= `${API_URL}person/${this.props.match.params.actorId}?api_key=${API_KEY}`;
        console.log(endpoint);
        this.fetchItems(endpoint);
    }

    fetchItems=(endpoint)=>{
        fetch(endpoint)
        .then(result=>result.json())
        .then(result=>{
            console.log(result);
            
                this.setState({
                    actor:result
                })
            
        })
        .catch(error=>console.error('Error',error));
    }

    render(){
        console.log(this.state.actor);
        return(
            <div className="actor-info"> 
                <div className="actorinfo-content">
                <div className="actorinfo-thumb">
                <img src={
                this.state.actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${this.state.actor.profile_path}` : './images/no_image.jpg'
                } alt="actorthumb"
                />
                </div>
                <div className="actorinfo-text">
                <h1>{this.state.actor.name}</h1>
                <h3>Birthday: {this.state.actor.birthday ? this.state.actor.birthday : 'No information' }</h3>
                {this.state.actor.deathday ? <h3>Deathday: {this.state.actor.deathday}</h3>: null }
                <p>Biography: {this.state.actor.biography ? this.state.actor.biography : 'No information'}</p>
                </div>
                </div>
                
              
   
    </div>
    )
    }
}

export default ActorInfo;