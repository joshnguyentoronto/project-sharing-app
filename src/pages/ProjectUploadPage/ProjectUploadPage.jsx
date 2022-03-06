import "./ProjectUploadPage.css"
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Header from '../../components/Header/Header'
import InputLink from '../../components/InputLink/InputLink'
import InputSection from '../../components/InputSection/InputSection'

export default class ProjectUploadPage extends Component {
    state = {
        currentTag: '',
        projects: [],

        // author: this.props.user._id,
        author: '',
        title: '',
        flag: '',
        tag: [],
        likeCount: 0,
        viewCount: 0,
        text: [{ index: 0, heading: '', text: '' }],
        textNum: 1,
        link: [{ index: 0, name: '', url: '' }],
        linkNum: 1,
        comment: [],
    }
    
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    };

    submitProject = (evt) => {
        evt.preventDefault()
        window.confirm("Your project will be published. Do you want to continue ?")
        console.log("submit project")
    }

    addLink = () => {
        let curNum = this.state.linkNum 
        let newNum = this.state.linkNum += 1;
        let newObj = {
            index: curNum,
            name: '',
            url: ''
        }
        this.setState({ linkNum: newNum, link: [...this.state.link, newObj ] })
    }

    deleteLink = (index) => {
        let copyLink = this.state.link
        if (copyLink.length > 1) {
            let newNum = this.state.linkNum -= 1;
            for (let i = index + 1; i < copyLink.length; i++) {
                copyLink[i].index = i - 1
            }
            copyLink.splice(index, 1)
            this.setState({ link: copyLink, linkNum: newNum })
        } else {
            alert("You need at least 1 link for your Project!");
        }
    }

    handleInputLinkNameChange = (evt) => {
        let index = evt.target.name
        let copyLink = this.state.link
        let newName = evt.target.value
        copyLink[index].name = newName
        this.setState({ link: copyLink })
    }

    handleInputLinkUrlChange = (evt) => {
        let index = evt.target.name
        let copyLink = this.state.link
        let newUrl = evt.target.value
        copyLink[index].url = newUrl
        this.setState({ link: copyLink })
    }

    addSection = () => {
        let curNum = this.state.textNum 
        let newNum = this.state.textNum += 1;
        let newObj = {
            index: curNum,
            heading: '',
            text: ''
        }
        this.setState({ textNum: newNum, text: [...this.state.text, newObj ] })
    }

    deleteSection = (index) => {
        let copyText = this.state.text
        if (copyText.length > 1) {
            let newNum = this.state.textNum -= 1;
            for (let i = index + 1; i < copyText.length; i++) {
                copyText[i].index = i - 1
            }
            copyText.splice(index, 1)
            this.setState({ text: copyText, textNum: newNum })
        } else {
            alert("You need at least 1 section of text to describe your Project!");
        }
    }

    handleInputTextHeadingChange = (evt) => {
        let index = evt.target.name
        let copyText = this.state.text
        let newHeading = evt.target.value
        copyText[index].heading = newHeading
        this.setState({ text: copyText })
    }

    handleInputTextBoxChange = (evt) => {
        let index = evt.target.name
        let copyText = this.state.text
        let newText = evt.target.value
        copyText[index].text = newText
        this.setState({ text: copyText })
    }

    filterByTag = async (evt) => {
        evt.preventDefault()
        try {
            let fetchProjectList = await fetch('/api/projects/tag', {headers: { "tag": this.state.currentTag }})
            let projects = await fetchProjectList.json()
            this.setState({ projects: projects })
        } catch(err) {
            console.log(err)
        }
    }

    render() {
        return(
            <div className="uploadpage">
                <Header />
                <div className="upload">
                    <h3>Upload a Project</h3>
                    <form autoComplete='off' onSubmit={this.submitProject} >
                        <div  className="upload-img">
                            <input className="input-img" type="file" name="img" accept="image/*" />
                        </div>
                        <div>
                            <p>Title</p>
                            <input onChange={this.handleChange} name="title" type="text" required />
                        </div>
                        <div>
                            <p>Project type:</p>
                            <select className="option" onChange={this.handleChange} name="flag" required >
                                <option value="UX/UI design">UX/UI design</option>
                                <option value="Software Engineer">Software Engineer</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                            </select>
                        </div>
                        <div>
                            <p>Tag</p>
                            <input onChange={this.handleChange} name="tag" type="text" required />
                        </div>
                        <div>
                            <div className="input-li-container" >
                                {this.state.link.map(obj => <InputLink key={obj.index} link={obj} handleInputLinkNameChange={this.handleInputLinkNameChange} handleInputLinkUrlChange={this.handleInputLinkUrlChange} deleteLink={this.deleteLink} />)}
                            </div>
                            <p onClick={this.addLink} className="upload-btn-li">Add Link</p>
                        </div>
                        <div>
                            {this.state.text.map(obj => <InputSection key={obj} text={obj} handleInputTextHeadingChange={this.handleInputTextHeadingChange} handleInputTextBoxChange={this.handleInputTextBoxChange} deleteSection={this.deleteSection} />)}
                            <p onClick={this.addSection} className="upload-btn-sec">Add Section</p>
                        </div>
                        <div className="form-action">
                            <Link to="/" className="form-action-link">Close</Link>
                            <button onClick={this.submitProject}>Publish</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}