
const searched = document.getElementById('search');
const btn = document.querySelector('.btn');
const url ="https://newsapi.org/v2/everything?q="
const apiKey = "d8f037b32e424c7f843d8a6d4f1895e4"

function bindData(articles){
    const cardContainer = document.querySelector('.card-container');
    const templateContainer = document.querySelector('.template-container');

    cardContainer.innerHTML ="";

    articles.forEach(element => {
        if(!element.urlToImage) return;
        const cloneCard = templateContainer.content.cloneNode(true);
        fillDataInCard(cloneCard,element);
        cardContainer.appendChild(cloneCard)
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector(".myImage");
    const newsTitle = cardClone.querySelector(".title");
    // const newsSource = cardClone.querySelector("#myLink");
    const newsDesc = cardClone.querySelector(".desc"); 

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=`${article.title.slice(0,60)}...`;
    newsDesc.innerHTML=`${article.description.slice(0,150)}...`;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{ timeZone:"Asia/Jakarta"})

    // newsSource.innerHTML = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

async function getnews(){
    try {
        const Response = await fetch(`${url}${searched.value.trim()}&apiKey=${apiKey}`)
        // console.log(Response);
        data = await Response.json();
        // title.innerHTML = data.articles[0].title
        // desc.innerHTML=data.articles[0].description
        // myImage.src=data.articles[0].urlToImage
        // // console.log(data.articles[0].publishedAt)
        // link.href=data.articles[0].url
        // // console.log(link.href)
        // console.log(data.articles[0].urlToImage)
        bindData(data.articles)
    } catch (error) {
        console.log("error" , error)
    }
}

btn.addEventListener('click',(e)=>{
    e.preventDefault();
    // console.log(searched.value);
    getnews()
});

