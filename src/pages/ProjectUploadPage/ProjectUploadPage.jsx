import "./ProjectUploadPage.css"
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Header from '../../components/Header/Header'
import InputLink from '../../components/InputLink/InputLink'
import InputSection from '../../components/InputSection/InputSection'
import InputTagItem from "../../components/InputTagItem/InputTagItem";
import MessageBox from "../../components/MessageBox/MessageBox";
import Footer from "../../components/Footer/Footer";


export default class ProjectUploadPage extends Component {
    state = {
        currentTag: '',
        projects: [],
        tagItem: '',
        author: '',
        title: '',
        flag: 'UX/UI design',
        tag: [],
        text: [{ index: 0, heading: '', text: '' }],
        textNum: 1,
        link: [{ index: 0, name: '', url: '' }],
        linkNum: 1,
        img:[],
        imageFiles: []
    }


    handleChange = (evt) => {
        if (evt.target.name == "img"){
            console.log(evt.target.files)
            let arr = []
            for(let i=0; i < evt.target.files.length; i++){
                arr.push(URL.createObjectURL(evt.target.files[i]))
            }
            this.setState({
                img: arr,
                imageFiles: evt.target.files
            })
        }else {
            this.setState({[evt.target.name]: evt.target.value})
        }
    };


    submitProject = async (evt) => {
        evt.preventDefault()
        if (!this.state.title) {
            alert("Invalid Project Title!")
        } else if (!this.state.tag[0]) {
            alert("Your project need at least 1 tag")
        } else if (!this.state.link[0].name) {
            alert("You must name your link to the Url!")
        } else if (!this.state.link[0].url) {
            alert("Your project should have link to your GitHub repo or your website product!")
        } else if (!this.state.text[0].heading) {
            alert("Your project should have smaller heading for each section")
        } else if (!this.state.text[0].text) {
            alert("You must describe or introduce your project!")
        } else {
            if (window.confirm("Your project will be published. Do you want to continue ?")) {
                try {
                    let imageArray = []
                    for(let i=0; i < this.state.imageFiles.length; i++){
                        let {url} = await fetch("/s3Url").then(res => res.json())
                        let file = this.state.imageFiles[i]
                        let sendPhoto = await fetch(url,{
                            method: "PUT",
                            headers: {
                                "Content-Type": "multipart/form-data"
                            },
                            body: file
                        })
                        const imageUrl = url.split('?')[0]
                        imageArray.push(imageUrl)
                    }

                    let jwt = localStorage.getItem('token')
                    const sendProjectData = await fetch('/api/projects/new',{
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + jwt,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            title: this.state.title,
                            text: this.state.text,
                            projectLink: this.state.link,
                            flag: this.state.flag,
                            tag: this.state.tag,
                            images: imageArray
                        })
                    })

                    if (!sendProjectData.ok) {
                        throw new Error('Fetch failed - Bad request')
                    } else {
                        window.location.href = "/"
                    }

                } catch (err) {
                    console.log("Submit error", err)
                }
            } 
        }
    }

    addTag = (evt) => {
        evt.preventDefault()
        evt.target.firstChild.value = ""
        this.setState({ tag: [...this.state.tag, this.state.tagItem.toLowerCase() ], tagItem: '' })
    }
    
    removeTag = (tag) => {
        let tagCopy = this.state.tag
        tagCopy.splice(tagCopy.findIndex(m => {
            return m == tag
        }), 1)
        this.setState({ tag: tagCopy })
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
                <Header
                    openChatList={this.props.openChatList}
                    userLogout={this.props.userLogout}
                    user={this.props.user} 
                />

                <h3>Upload a Project</h3>

                <div className="upload">
                    <div className="upload-text">
                        <div>
                            <p>Title</p>
                            <input onChange={this.handleChange} 
                                name="title" type="text" required 
                            />
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
                            <form className="tag-form" onSubmit={this.addTag}>
                                <input onChange={this.handleChange} name="tagItem" type="text" placeholder="Ex: javascript, nodejs, mongodb" required />
                                <button onSubmit={this.addTag}>+</button>
                            </form>
                            <div className="tag-items">
                                {this.state.tag.map(tag => <InputTagItem key={tag} tag={tag} removeTag={this.removeTag} /> )}
                            </div>
                        </div>
                        <div className="input-li-container-top">
                            <div className="input-li-container" >
                                {this.state.link.map(obj => <InputLink key={obj.index} link={obj} handleInputLinkNameChange={this.handleInputLinkNameChange} handleInputLinkUrlChange={this.handleInputLinkUrlChange} deleteLink={this.deleteLink} />)}
                            </div>
                            <p onClick={this.addLink} className="upload-btn-li">Add Link</p>
                        </div>
                        <div>
                            {this.state.text.map(obj => <InputSection key={obj} text={obj} handleInputTextHeadingChange={this.handleInputTextHeadingChange} handleInputTextBoxChange={this.handleInputTextBoxChange} deleteSection={this.deleteSection} />)}
                            <p onClick={this.addSection} className="upload-btn-sec">Add Section</p>
                        </div>
                    </div>
                    <div  className="upload-img">
                        <form>
                            <input onChange={this.handleChange}className="input-img" type="file" name="img" accept="image/*" multiple />
                        </form>
                        {this.state.img.length ?
                        <div className="image-preview">
                            {this.state.img.map(i => 
                                <img src={i}></img>)}
                        </div>
                        :
                        false 
                        }
                    </div>
                </div>

                <div className="form-action">
                    <Link to="/"  className="form-action-link">Close</Link>
                    <button onClick={this.submitProject}>Publish</button>
                </div>

                <Footer />

                {this.props.openChat ? 
                    <MessageBox 
                        messageList={this.props.messageList} 
                        openChatList={this.props.openChatList}
                        currentUser={this.props.user}
                    /> 
                    : false }
            </div>
        )
    }
}