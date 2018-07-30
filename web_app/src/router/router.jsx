import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

// import Screens
import Lol from '../screens/Lol';
import Blog from '../screens/Blog';
import Post from '../screens/Post';
import BE from '../screens/BE';

const RouterFile = () => (
    <Router>
        <div>
            <div className="content">
                <Route path={`${process.env.PUBLIC_URL}/lol`} component={Lol} />
                <Route path={`${process.env.PUBLIC_URL}/blog`} component={Blog} />
                <Route path={`${process.env.PUBLIC_URL}/post/:postId`} component={Post} />
                <Route path={`${process.env.PUBLIC_URL}/admin`} component={BE} />
            </div>
        </div>
    </Router>
);

export default RouterFile;