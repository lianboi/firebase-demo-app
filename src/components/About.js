import React, { Component } from 'react';
/*import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from '../Components/Login'*/

class About extends Component{

    backBtn = () => {
        window.location.href='/';
    }

    render(){
        console.log('props.in about page----',this.props);
        return(
            <div className='about-page-div1'>
                <button onClick={this.backBtn}>Back</button>
                <h4>About Firebase!!!</h4>
                <span>Firebase gives you the tools to develop high-quality apps, grow your user base, and earn more money.
                    We cover the essentials so you can monetize your business and focus on your users.</span>

                <h4>History</h4>
                <span>Firebase evolved from Envolve, a prior startup founded by James Tamplin and Andrew Lee in 2011.
                    Envolve provided developers an API that enables the integration of online chat functionality into their websites.
                    After releasing the chat service, Tamplin and Lee found that it was being used to pass application data that wasn't chat messages. Developers were using
                    Envolve to sync application data such as game state in real time across their users.
                    Tamplin and Lee decided to separate the chat system and the real-time architecture that powered it.
                    They founded Firebase as a separate company in April 2012.


                    Firebase Inc. raised seed funding in May 2012. The company further raised Series A funding in
                    June 2013. In October 2014, Firebase was acquired by Google. In October 2015, Google acquired
                    Divshot to merge it with the Firebase team. Since the acquisition, Firebase has grown inside Google and
                    expanded their services to become a unified platform for mobile developers. Firebase now integrates with various other
                    Google services to offer broader products and scale for developers. In January 2017, Google acquired
                    Fabric and Crashlytics from Twitter to join those services to the Firebase team. In October 2017, According to
                    the report,Firebase would be launching Cloud Firestore, a Document Database
                </span>
            </div>
        );
    }
}

export default About;