import "./AboutPage.css"
import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import Footer from "../../components/Footer/Footer"

export default class AboutPage extends Component {
    render() {
        return(
            <div className="aboutPage">
                <Header
                    openChatList={this.props.openChatList}
                    userLogout={this.props.userLogout}
                    user={this.props.user} 
                />
                <div className="about">
                    <h1>About Us</h1>
                    <p>THE EXHIBIT is a group project which ideas originally come from the Needs of sharing student's projects to showcase to the world.</p>
                    <p>THE EXHIBIT is the place where we can Learn new thing, Get ideas for your next projects, help others to improve and meet potential employer.</p>
                    <p>THE EXHIBIT was founded by three student: Lu Ye, Janusshan Paramasivam, and Josh Nguyen; and was build completely by them. With the help of three design students from GA's UXDI course: Linette Yang, Paula Abejero, Paulo Saroma; the app was build from scratch to finish in just one week.</p>
                    <p>This collaborate project help us the SEI and UXDI students to gain direct experiences that is relevant to our future carrer.</p>
                    <p>Interesting fact about THE EXHIBIT:</p>
                    <ul>
                        <li>It was build within only 8 days.</li>
                        <li>Total amount of hours the SEI student put in is estimated at least 240 hours.</li>
                        <li>The entire code base have at least 10,000 line of codes as of due date.</li>
                    </ul>
                    <h1>Usages:</h1>
                    <ol>
                        <li>Everyone can come and use our app without having to login as a new user. However, in order to use all the features, we recommend user to log in or sign up.</li>
                        <li>Inside the home page, we can see all other's people projects</li>
                        <li>We can find the specific project by their tools, languages, author name, ect.</li>
                        <li>We can view the detail of the project, Like, Save, see info, and Comment on it.</li>
                        <li>We can also view other user page as well to see if they have more cool projects to see.</li>
                        <li>If we want to send a message to our friends, to an author of the project that we like or to make more friend, we can now send the message to them directly in realtime.</li>
                        <li>If we want to share a project, we can go to upload page and create a project easily as we have all instruction for each field.</li>
                        <li>Finally, we can go to our profile page to see our detail, edit our background information, view projects that we created, view projects that we liked or saved.</li>
                    </ol>
                    <h1>FAQs</h1>
                    <p>Currently we do not support FAQs, but if you have any question, feel free to reach out to us</p>
                    <p>Our contact information is in <a href="https://github.com/joshnguyentoronto/project-sharing-app" target="_blank" rel="noopener noreferrer">this GitHub repo</a>.</p>
                    <h1>Career</h1>
                    <p>Unfortunately we are not hiring right now.</p>
                    <p>However if you want to hire us for your company, feel free to reach out to us.</p>
                    <p>Our contact information is in <a href="https://github.com/joshnguyentoronto/project-sharing-app" target="_blank" rel="noopener noreferrer">this GitHub repo</a>.</p>
                    <h1>Support</h1>
                    <p>If the app not working properly, feel free to let us know by contacting us.</p>
                    <p>Our contact information is in <a href="https://github.com/joshnguyentoronto/project-sharing-app" target="_blank" rel="noopener noreferrer">this GitHub repo</a>.</p>
                </div>
                <Footer user={this.props.user} />
            </div>
        )
    }
}