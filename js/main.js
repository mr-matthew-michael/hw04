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
    showFeedPanel2(token);
    updateHeart(token);
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
        data.slice(0,5).forEach(user => {
            console.log(user.user.username);
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

            userContainer.appendChild(textContainer);
            profileContainer.appendChild(userContainer);

            console.log(profileContainer.outerHTML);
        });
    });
}

const showFeedPanel = token => {
    fetch("https://photo-app-secured.herokuapp.com/api/posts/?limit=3", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.slice(0,10).forEach(user => {
            console.log(user.user.username);
            
            const userContainer = document.createElement('section');
            userContainer.id = 'people-post';
            console.log(userContainer.outerHTML);

            const personName = document.createElement('div');
            personName.id = 'heading';

            const personHeading = document.createElement('h1');
            personHeading.textContent = user.user.username;

            userContainer.appendChild(personName);
            userContainer.appendChild(personHeading);
            console.log(userContainer.outerHTML);

             /*
            const textContainer = document.createElement('div');
            textContainer.id = 'text-story';
            
            const profileBio = document.createElement('p');
            profileBio.textContent = user.user.username;
            textContainer.appendChild(profileBio);

            userContainer.appendChild(textContainer);
            profileContainer.appendChild(userContainer);
            */
        });
    });
}

const showFeedPanel2 = token => {
    fetch("https://photo-app-secured.herokuapp.com/api/posts/?limit=3", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
      .then(response => response.json())
      .then(data => {
        const postsContainer = document.querySelector("#people-post");
        console.log(data);
        // Clear any existing posts in the container
        //postsContainer.innerHTML = "";
  
        // Loop through each post and create an HTML representation for them
        data.forEach(post => {
            //console.log(post.current_user_like_id);
            const postContainer = document.createElement("section");
            postContainer.id = "posts";

            const heading = document.createElement("div");
            heading.id = "heading";

            const username = document.createElement("h1");
            username.textContent = post.user.username;
            heading.appendChild(username);

            postContainer.appendChild(heading);

            const postImage = document.createElement("img");
            postImage.src = post.image_url;
            postImage.alt = "Post Image";
            postContainer.appendChild(postImage);

            const contentBox = document.createElement("div");
            contentBox.classList.add("contentbox");
            const interact = document.createElement("div");
            const interactDiv = document.createElement("div");
            interactDiv.id = "interact";

            const heartBtn = document.createElement("button");
            heartBtn.id = "heart-button";
            const heartIcon = document.createElement("i");
            heartIcon.className = "far fa-heart";
            heartBtn.style.backgroundColor = "transparent";
            heartBtn.style.border = "none";
            heartBtn.appendChild(heartIcon);
            interactDiv.appendChild(heartBtn);
            
            heartBtn.addEventListener("click", function() {
                console.log("Button was clicked!");
                heartIcon.className = "fas fa-heart";
                heartIcon.style.color = "red";
            });

            const commentIcon = document.createElement("i");
            commentIcon.className = "far fa-comment";
            interactDiv.appendChild(commentIcon);

            const paperPlaneIcon = document.createElement("i");
            paperPlaneIcon.className = "far fa-paper-plane";
            interactDiv.appendChild(paperPlaneIcon);

            const bookmarkIcon = document.createElement("i");
            bookmarkIcon.className = "far fa-bookmark";
            bookmarkIcon.id = "bookmark";
            interactDiv.appendChild(bookmarkIcon);

            postContainer.appendChild(interactDiv);

            const likesDiv = document.createElement("div");
            likesDiv.id = "likes";
            const likesHeader = document.createElement("h1");
            likesHeader.textContent = post.likes.length + " Likes";
            likesDiv.appendChild(likesHeader);
            postContainer.appendChild(likesDiv);

  /*
          const interact = document.createElement("div");
          interact.classList.add("interact");
  
          const heartIcon = document.createElement("i");
          heartIcon.classList.add("far", "fa-heart");
          interact.appendChild(heartIcon);
  
          const commentIcon = document.createElement("i");
          commentIcon.classList.add("far", "fa-comment");
          interact.appendChild(commentIcon);
  
          const paperPlaneIcon = document.createElement("i");
          paperPlaneIcon.classList.add("far", "fa-paper-plane");
          interact.appendChild(paperPlaneIcon);
  
          const bookmarkIcon = document.createElement("i");
          bookmarkIcon.id = "bookmark";
          bookmarkIcon.classList.add("far", "fa-bookmark");
          interact.appendChild(bookmarkIcon);
  
          contentBox.appendChild(interact);
  
          const likes = document.createElement("div");
          likes.id = "likes";
  
          const likeCount = document.createElement("h1");
          likeCount.textContent = post.likes_count + " likes";
          likes.appendChild(likeCount);
  
          contentBox.appendChild(likes);
  
          post.comments.forEach(comment => {
            const commentContainer = document.createElement("div");
            commentContainer.classList.add("comment");
  
            const username = document.createElement("div");
            username.id = "username";
  
            const boldSpan = document.createElement("span");
            boldSpan.style.fontWeight = "bold";
            boldSpan.textContent = comment.user.username + " ";
            username.appendChild(boldSpan);
  
            username.textContent += comment.content;
            commentContainer.appendChild(username);
  
            contentBox.appendChild(commentContainer);
          });
  
          const timePassed = document.createElement("div");
          timePassed.id = "time-passed";
          //timePassed.textContent = getTimePassed(post.created_at);
          contentBox.appendChild(timePassed);
  */
          //postContainer.appendChild(contentBox);
          postsContainer.appendChild(postContainer);
          console.log(postContainer.outerHTML);
        });
      });
  };
  


