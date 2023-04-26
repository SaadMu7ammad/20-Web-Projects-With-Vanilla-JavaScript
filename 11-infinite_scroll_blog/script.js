const post = document.querySelector('.post');
const postContainer = document.querySelector('.list');
// const loading=document.querySelectorAll('.circle')
const loading = document.querySelector('.loader');
const filter = document.querySelector('input');

let limit = 5;
let page = 1;
///fetching
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

//show posts

async function showPosts() {
  const p = await getPosts();
  console.log(p);
  p.forEach((post) => {
    const newPost = document.createElement('div');
    // newPost.classList.add('post');
    newPost.className = 'post';
    newPost.innerHTML = `<div class="number">${post.id}</div>
    <div class="info">
      <h3>${post.title}</h3>
      <p>
      ${post.body}
      </p>
    </div>
    `;

    postContainer.appendChild(newPost);
  });
  loading.classList.remove('show');
}

function showLoading() {
  loading.classList.add('show');
  page++;
  showPosts();
}
window.addEventListener('scroll', () => {
  console.log(document.documentElement.scrollTop);
  console.log(document.documentElement.scrollHeight);
  console.log(document.documentElement.clientHeight);
  
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
    console.log('s');
  }
});

// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');
// console.log(posts);
  posts.forEach(post => {
    const title = post.querySelector('h3').innerText.toUpperCase();
    const body = post.querySelector('p').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}
filter.addEventListener('input', filterPosts);

showPosts();