import './ProjectListItem.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import UserCard from '../UserCard/UserCard'

export default class ProjectListItem extends Component {
    // state = {
    //     hoverIsLiked: false
    // }
    
    // componentDidMount() {
    //     console.log("fdasfgagEGG",this.props.user)
    //     console.log("this is project", this.props.project)
    //     console.log(this.props.isLiked)
    //     if (this.props.user.likedPosts.indexOf(this.props.project._id) == -1) {
    //         console.log("is not in")
    //         this.setState({ hoverIsLiked: false})
    //     } else {
    //         console.log("is in the liked post")
    //         this.setState({ hoverIsLiked: true})
    //     }
    // }

    render() {
        return(
            <div className="project-list-item" onMouseEnter={() => this.props.hoverProject(this.props.project)}>
                <div className="project-list-item-img">
                    <button className="img-save-button" onClick={() => this.props.saveProject(this.props.project)}>{ this.props.user.savedPosts.indexOf(this.props.project._id) != -1 ? <img src={require('../../images/icons/save-dark.svg')} alt="svg icon" /> : <img src={require('../../images/icons/save-white.svg')} alt="svg icon" /> }</button>
                    
                    <div className='img-bottom-icons'>
                        <span>
                            <button className="img-like-button" onClick={() => this.props.likeProject(this.props.project)}>{ this.props.user.likedPosts.indexOf(this.props.project._id) != -1 ? <img src={require('../../images/icons/like-red.svg')} alt="svg icon" /> : <img src={require('../../images/icons/like.svg')} alt="svg icon" /> }</button><span>100</span>
                        </span>

                        <span>
                            <img className="img-views-count" src={require('../../images/icons/views.svg')} alt="views" /><span>100</span>
                        </span> 
                    </div>
                    <span className="placeholder-img" onClick={() => this.props.viewProject(this.props.project)} ></span>   
                </div>
                <div className="project-list-item-foot">
                    <div className='profile-btn-hover' >
                        <Link to="/profile"><img id='user-img' src={require('../../images/icons/user.svg')} alt="svg icon" /></Link>
                        <div className="user-card">
                            <UserCard user={this.props.project.author[0]} />
                        </div>
                    </div>
                    <div>
                        <p>{this.props.project.author[0].name}</p>
                    </div>
                </div>
            </div>
        )
    }
}