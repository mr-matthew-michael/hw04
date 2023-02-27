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
    getSuggestions(token);
    getUserData(token);
    getCard(token);
    getStoriesData(token);
    //getModalData(token);
    
}

initPage();

/* SUGGESTIONS */
const suggestionsContainer = document.querySelector('.suggestions');

const renderSuggestions = (data) => {
    suggestionsContainer.innerHTML = `
        <p class="suggestion-text">Suggestions for you</p>
        ${data.map((data) => `
            <section>
                <img src=${data.thumb_url} class="pic" />
                <div>
                    <p class="username">${data.username}</p>
                    <p>suggested for you</p>
                </div>
                <button class="button">follow</button>
            </section>
        `).join('')}
    `;
};

const getSuggestions = (token) => {
    fetch("https://photo-app-secured.herokuapp.com/api/suggestions/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('suggestions', data);
        renderSuggestions(data);
    });  
};

const header = document.querySelector('header');

const renderHeader = (data) => {
    header.innerHTML = `
        <img src=${data.thumb_url} class="pic" />
        <h2>${data.username}</h2>
    `;
};

/* USER HEADER */

const getUserData = (token) => {
    fetch("https://photo-app-secured.herokuapp.com/api/profile/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('user data', data);
        renderHeader(data);
    });  
};

/* STORIES */

const storiesHeader = document.querySelector('.stories');

const renderStoriesHeader = (data) => {
    const storiesHtml = data.slice(0, 4).map((item) => `
      <div>
        <img src="${item.user.thumb_url}" class="pic" />
        <p>${item.user.username}</p>
      </div>
    `).join('');
    storiesHeader.innerHTML = storiesHtml;
  };
  

const getStoriesData = (token) => {
    fetch("https://photo-app-secured.herokuapp.com/api/stories/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('stories data', data);
        renderStoriesHeader(data);
    });  
};

/* POSTS */
const cardContainer = document.querySelector('.card-container');

const renderCard = (data) => {
    cardContainer.innerHTML = '';
    cardContainer.innerHTML = `
        ${data.map((data) => `
            <section class="card">
                <div class="header">
                    <h3>${data.user.username}</h3>
                    <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
                </div>
                <img src=${data.image_url} alt="placeholder image" width="300" height="300">
                <div class="info">
                    <div class="buttons">
                        <div>
                            <button class="icon-button ${data.current_user_like_id ? 'liked' : ''}"><i class="${data.current_user_like_id ? 'fas' : 'far'} fa-heart"></i></button>
                            <button class="icon-button"><i class="far fa-comment"></i></button>
                            <button class="icon-button"><i class="far fa-paper-plane"></i></button>
                        </div>
                        <div>
                            <button class="icon-button ${data.current_user_bookmark_id ? 'liked' : ''}"><i class="${data.current_user_bookmark_id ? 'fas' : 'far'} fa-bookmark"></i></button>
                        </div>
                    </div>
                    <p class="likes"><strong>${data.likes.length} likes </strong></p>
                    <div class="caption">
                        <p>
                            <strong>${data.user.username}</strong> 
                            ${data.caption}
                        </p>
                        
                    </div>
                    <div class="comments">
                        ${
                            data.comments.length > 1 ?
                            `
                            <button class="view-comments" onclick="openModal(${data.id});">View all ${data.comments.length} comments</button>
                            <p>
                                <strong>${data.comments[data.comments.length - 1].user.username}</strong> 
                                ${data.comments[data.comments.length - 1].text}
                            </p>
                            ` :
                            data.comments.length === 1 ?
                            `
                            <p>
                                <strong>${data.comments[0].user.username}</strong> 
                                ${data.comments[0].text}
                            </p>
                            ` :
                            ''
                            
                        }
                        <p class="timestamp">${data.display_time}</p>
                    </div>
                </div>
                <div class="add-comment">
                    <div class="input-holder">
                        <i class="far fa-smile"></i>
                        <input type="text" placeholder="Add a comment...">
                    </div>
                    <button class="button">Post</button>
                </div>
            </section>
            
            <div class="modal-bg hidden" aria-hidden="true" role="dialog" id= "modal-${data.id}">
                <section class="modal">
                <button class="close" id = "close" aria-label="Close the modal window" onclick="closeModal(${data.id});"><i class="fa-solid fa-xmark" style="color: white; font-size: 4em;"></i></button>
                    <div class="modal-body">
                        <!-- Uses a background image -->
                        <img src=${data.image_url} alt="placeholder image" width="600" height="430">
                        <section class="the-comments">
                        <p id="modal-username">
                            <img src="${data.user.image_url}" alt="User Image">
                            <strong id= "modal-name">${data.user.username}</strong>
                        </p>
                        ${data.comments.map(comment => `
                          <p>
                            <strong>${comment.user.username}</strong> 
                            ${comment.text}<br><br>
                            ${comment.display_time}
                          </p>
                        `).join('')}
                      </section>
                        </div>
                </section>
            </div>
        `).join('')}
    `;

};  

window.openModal = ev => {
    const modalElement = document.querySelector('#modal-' + ev);
    modalElement.classList.remove('hidden');
    modalElement.setAttribute('aria-hidden', 'false');
    document.querySelector('#close').focus();
}
 
window.closeModal = ev => {
    const modalElement = document.querySelector('#modal-' + ev);
    console.log('close!');
    modalElement.classList.add('hidden');
    modalElement.setAttribute('aria-hidden', 'true');
    const openElement = document.querySelector('.open');
}; 

const getCard = (token) => {
    fetch("https://photo-app-secured.herokuapp.com/api/posts/?limit=10", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('suggestions', data);
        renderCard(data);
    });  
};