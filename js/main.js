import {getAccessToken} from './utilities.js';
const rootURL = 'https://photo-app-secured.herokuapp.com';

const showStories = async (token) => {
    const endpoint = `${rootURL}/api/stories`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log('Stories:', data);
}

const showPosts = async (token) => {
    console.log('code to show posts');
}


const initPage = async () => {
    // first log in (we will build on this after Spring Break):
    const token = await getAccessToken(rootURL, 'webdev', 'password');

    // then use the access token provided to access data on the user's behalf
    showStories(token);
    showPosts(token);
    showProfile(token);
}

initPage();
const showProfile = token => {
    fetch("https://photo-app-secured.herokuapp.com/api/profile/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const profileContainer = document.querySelector('header.aside-header');
    
        const profileImage = document.createElement('img');
        profileImage.src = data.thumb_url;
        profileContainer.appendChild(profileImage);
        
        const profileName = document.createElement('h3');
        profileName.textContent = data.first_name;
        profileContainer.appendChild(profileName);
    
        const profileBio = document.createElement('p');
        profileBio.textContent = data.bio;
        profileContainer.appendChild(profileBio);
    });
}

