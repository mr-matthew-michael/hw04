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
    showRightPanel(token);
    showStoriesPanel(token);
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

const showRightPanel = token => {
    fetch("https://photo-app-secured.herokuapp.com/api/suggestions/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        const profileContainer = document.querySelector('#followers');

        // Clear any existing suggestions in the container
       profileContainer.innerHTML = '';

        // Loop through each suggested user and create an HTML representation for them
        data.forEach(user => {
            const userContainer = document.createElement('div');
            userContainer.id = 'sugg-followers';

            const profileImage = document.createElement('img');
            profileImage.src = user.image_url;
            profileImage.alt = 'Profile Image';
            userContainer.appendChild(profileImage);

            const textContainer = document.createElement('div');
            textContainer.id = 'text';

            const profileName = document.createElement('h1');
            profileName.textContent = user.username;
            textContainer.appendChild(profileName);

            const profileBio = document.createElement('p');
            profileBio.textContent = 'suggested for you';
            textContainer.appendChild(profileBio);

            userContainer.appendChild(textContainer);

            const followLink = document.createElement('a');
            followLink.href = '';
            followLink.textContent = 'Follow';
            followLink.id = 'follow';
            userContainer.appendChild(followLink);

            profileContainer.appendChild(userContainer);
        });
    });
};

const showStoriesPanel = token => {
    fetch("https://photo-app-secured.herokuapp.com/api/stories/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        const profileContainer = document.querySelector('#story');

        // Clear any existing suggestions in the container
       profileContainer.innerHTML = '';

        // Loop through each suggested user and create an HTML representation for them
        data.forEach(user => {
            
            const userContainer = document.createElement('div');
            userContainer.id = 'story-card';

            const profileImage = document.createElement('img');
            profileImage.src = user.user.image_url;
            profileImage.alt = 'Profile Image';
            userContainer.appendChild(profileImage);

            const textContainer = document.createElement('div');
            textContainer.id = 'text-story';

            const profileBio = document.createElement('p');
            profileBio.textContent = user.user.username;
            textContainer.appendChild(profileBio);

            profileContainer.appendChild(userContainer);
        });
    });
}

