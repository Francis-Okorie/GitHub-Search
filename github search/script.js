
const searchForm =document.querySelector("#search-form");
const inputBox = document.querySelector("#input-box");
const profileName= document.querySelector(".profile-name");
const profileImageElement = document.querySelector(".profile-img");
const summary =document.querySelector(".summary");
const followerMain = document.querySelector(".follower");
const followingMain = document.querySelector(".following");
const publicRepsitory =document.querySelector(".public-rep");
const submitBtn = document.querySelector(".submit-btn");
const repository = document.querySelector(".repository");


async function searchFrancis(username = "francis-okorie") {
    
    const url=`https://api.github.com/users/${username}`;

    const response= await fetch(url);
    const data = await response.json();

    profileImageElement.innerHTML = "";
    profileName.innerHTML = "";
    summary.innerHTML = "";
    followerMain.innerHTML = "";
    followingMain.innerHTML = "";
    publicRepsitory.innerHTML = "";

    let profileImg = document.createElement("img");
    let profileHeading = document.createElement("h3");
    let profileSubText =document.createElement("p");

    profileSubText.innerHTML=data.login;

    profileImg.setAttribute("class", "profile-image");
    profileHeading.setAttribute("class", "profile-heading");

    profileSubText.setAttribute("class", "profile-sub");

    profileImg.src = data.avatar_url;
    profileHeading.innerHTML=data.login;

    if (data?.login) {
        
      const nameParts = data.login.split(' ');
      const firstName = nameParts[0]; // First word
      const lastName = nameParts[1] || ''; // Second word, or empty if undefined

      profileHeading.innerHTML = `${firstName} <br/> ${lastName}`;
      profileName.appendChild(profileHeading);
    }

    
    profileImageElement.appendChild(profileImg);
    profileName.appendChild(profileSubText)

    let bioElement =document.createElement("p");
    bioElement.innerHTML=data.bio;
    bioElement.setAttribute("class", "bio-text");
    summary.appendChild(bioElement);


    let follower = document.createElement("p");
    let following =document.createElement("p");
    let publicRep = document.createElement("p");

    follower.setAttribute("class", "follower-text");
    following.setAttribute("class", "following-text");
    publicRep.setAttribute("class", "public-repo-text");

    follower.innerHTML=data.followers;
    following.innerHTML=data.following;
    publicRep.innerHTML=data.public_repos;

    followerMain.appendChild(follower);
    followingMain.appendChild(following);
    publicRepsitory.appendChild(publicRep);
}

async function repoFrancis(username = "francis-okorie") {
    repository.innerHTML = "";
    const url =`https://api.github.com/users/${username}/repos?per_page=100`;

    let response = await fetch(url);
    let data = await response.json();

    const sortedRepos = data.sort((a, b) => b.stargazers_count - a.stargazers_count);

        // Get the top 6 repositories
    const topRepos = sortedRepos.slice(0, 6);

    topRepos.forEach(repo =>{
        console.log(repo.language)
        let repoContainer = document.createElement("div");
        let repoMainContent =document.createElement("div")
        let repoLanguage = document.createElement("p");
        let repoName = document.createElement("h3");
        let forkImg =document.createElement("img");
        let forkCount =document.createElement("p");
        let starImg =document.createElement("img");
        let starCount = document.createElement("p");
        

        repoLanguage.innerHTML=repo.language;
        forkImg.src="svg/fork.svg";
        forkCount.innerHTML=repo.forks_count;
        starImg.src ="svg/star.svg"
        starCount.innerHTML=repo.stargazers_count;
        repoName.innerHTML=repo.name;

        repoContainer.setAttribute("class", "repocontainer");
        repoMainContent.setAttribute("class", "repomaincontent");
        repoLanguage.setAttribute("class", "repolanguage");
        repoName.setAttribute("class", "reponame");
        forkImg.setAttribute("class", "forkimg");
        forkCount.setAttribute("class", "forkcount");
        starImg.setAttribute("class", "starimg");
        starCount.setAttribute("class", "starcount");

        repoMainContent.appendChild(repoLanguage);
        repoMainContent.appendChild(forkCount);
        forkCount.appendChild(forkImg);
        repoMainContent.appendChild(starCount);
        starCount.appendChild(starImg);
        repoContainer.appendChild(repoMainContent);
        repoContainer.appendChild(repoName);
        repository.appendChild(repoContainer)
        


        
    });
}




searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const username = inputBox.value.trim();
    if (username) {
        searchFrancis(username);
        repoFrancis(username);
        
    }
});


repoFrancis();
searchFrancis();