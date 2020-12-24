const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

async function getPosts(){
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
      );

    const data = await res.json();

    return data;        //data is also prromise here
}

//* Show posts in DOM
async function showPosts(){
    const posts = await getPosts();     //await on getPosts as it returns promise
    
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
            <div class ="number">${post.id}</div>
            <div class ="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class= "post-body">${post.body}</p>
            </div>
        `;

        postsContainer.appendChild(postEl);
    });
}

//* show loader and fetch more posts
// Show loader & fetch more posts
function showLoading() {
    loading.classList.add('show');
  
    setTimeout(() => {
      loading.classList.remove('show');
  
      setTimeout(() => {
        page++;
        showPosts();
      }, 300);
    }, 1000);
  }

  //* Filter posts by input
  function filterPosts(e){
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach(post=>{
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(term) > -1 || body.indexOf(term) > -1){  //if given tern is not found return -1
            post.style.display = 'flex';
        }
        else{
            post.style.display = 'none';
        }

    });
  }

//* Show initial posts
showPosts();

//* scoll functionality
window.addEventListener('scroll',()=>{
    // console.log(document.documentElement.scrollTop);  //length from top to where we scroll
    // console.log(document.documentElement.scrollHeight);  //length from top to where we scroll

    const {scrollTop ,scrollHeight, clientHeight} = document.documentElement;

    if(scrollTop+clientHeight >= scrollHeight - 5){ //from stackoverflow means it reached bottom
        showLoading();
    } 
});

//* filter posts
filter.addEventListener('input',filterPosts)

