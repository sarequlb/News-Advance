const loadNewsNav = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json();
    displayNewsNav(data.data.news_category)
}

const displayNewsNav = navs =>{
    const navListContainer = document.getElementById('nav-list')
    const navListUL = document.createElement('ul');
    navListUL.classList.add('navbar-nav', 'gap-5',);
    navListContainer.appendChild(navListUL);
    navs.forEach(nav => {
        const newNavLI = document.createElement('li');
        newNavLI.classList.add('nav-item')
        newNavLI.innerHTML = `
          <a class="nav-link" data-cat-id = "${nav.category_id}" aria-current="page" href="#">${nav.category_name}</a>
        `
      navListUL.appendChild(newNavLI);

      newNavLI.addEventListener('click', function(event){
        event.preventDefault();
        const selectedCategoryId = event.target.getAttribute('data-cat-id');
        loadNews(selectedCategoryId);
      })
    });
}

loadNewsNav()



const loadNews = async categoryId => {
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  const res = await fetch(url)
  const data = await res.json()
  displayNews(data.data)
}


const displayNews = (allNews) =>{
  const newsContainer = document.getElementById('news-container')
  newsContainer.innerHTML = '';
allNews.forEach(news => {
  // console.log(news)
  const newsDiv = document.createElement('div')
  newsDiv.classList.add('row')
  newsDiv.classList.add('p-3')
  newsDiv.classList.add('shadow')
  newsDiv.classList.add('rounded')

  newsDiv.setAttribute('data-cat-id', news.category_id)
  
  newsDiv.innerHTML = `
  <div class="col-md-4">
  <img src="${news.thumbnail_url}" alt="...">
</div>
<div class="col-md-8">
  <div class="card-body my-5">
    <h4 class="card-title mb-3">${news.title}</h4>
    <p class="card-text">${news.details.slice(0, 400)}...</p>
  </div>
  <div class="d-flex gap-5 justify-content-between">
    <div class="d-flex">
      <div>
        <img class="reporter-img" src="${news.author.img}" alt="">
      </div>
      <div class="mx-2">
        <span>${news.author.name}</span> <br>
        <span>${news.author.published_date}</span>
      </div>
    </div>
    <div class="d-flex ">
      <i class="fa-regular fa-eye"></i>
      <p class="mx-2">${news.total_view}</p>
    </div>
    <div>
      <i class="fa-solid fa-star-half-stroke"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
    </div>
    
    <div>
    
    <button onClick = "loadNewsDetails('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
    </div>
  </div>
</div>
  `
  newsContainer.appendChild(newsDiv)
})
}

/**
 * Single news details
 */


const loadNewsDetails =async (newsId) =>{
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;

  const res = await fetch(url);
  const data = await res.json()

  displayNewsDetails(data.data[0])
}


  const displayNewsDetails = newsDetails =>{
    const modalContainer = document.getElementById('exampleModalLabel')
    modalContainer.innerText = 'News More Details';
 
    const newsDetailsContainer = document.getElementById('news-details-container')
 
    newsDetailsContainer.innerHTML = `
        <p>Is Todays Pick: ${newsDetails.others_info.is_todays_pick}</p>
        <p>Badge: ${newsDetails.rating
        .badge}</p>
        <p>Rating : ${newsDetails.rating
        .number}</p>
    `

  }