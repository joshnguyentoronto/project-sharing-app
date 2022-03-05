import "./ProjectUploadPage.css"
import React, { Component } from 'react'
import Header from '../../components/Header/Header'

export default class ProjectUploadPage extends Component {
    state = {
        currentTag: '',
        projects: []
    }
    
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    };

    submitProject = (evt) => {
        evt.preventDefault()
        console.log("submit project")
    }

    addSection = () => {
        console.log('add section')
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
                            <img src={require('../../images/icons/upload.svg')} alt="svg icon" />
                            <p>Upload an image</p>
                        </div>
                        <div>
                            <p>Title</p>
                            <input onChange={this.handleChange} name="title" type="text" />
                        </div>
                        <div>
                            <p>Flag</p>
                            <input onChange={this.handleChange} name="flag" type="text" />
                        </div>
                        <div>
                            <p>Tag</p>
                            <input onChange={this.handleChange} name="tag" type="text" />
                        </div>
                        <div>
                            <p>Section title:</p>
                            <input onChange={this.handleChange} name="secTitle" type="text" />
                            <p>Section description:</p>
                            <textarea onChange={this.handleChange} name="secDes"></textarea>
                        </div>
                        <a onClick={this.addSection} className="upload-btn-sec" href="#" >Add Section</a>
                    </form>
                </div>
            </div>
        )
    }
}