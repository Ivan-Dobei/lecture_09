import React from 'react';
import {Link} from "react-router-dom";

function HomePage() {
    return (
        <div>
            <Link to="/new-post">new post</Link>
        </div>
    );
}

export default HomePage;