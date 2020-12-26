/**
 * GLOBAL VARIABLES
 */

let seq = [0,1,2,3,4,5,6,7,8];
let pictureSlide = 0;
let automatically = false;
let stopTheShow = false;
let dragIndex = seq[0];
let hoverIndex = seq[0];
let drag, hover;
let theCookie;
let image = 0;

/**
 * LISTENERS
 */
document.addEventListener ("DOMContentLoaded", ()=>{
    const gallery = document.getElementById("gallery");
    const searchBar = document.getElementById("searchBar");
    let jsonForCookie = getCookie('thecookie');
    if(jsonForCookie)
    {
        seq=JSON.parse(jsonForCookie);
    }
    fetch ("photos.json")
        .then(response=> response.json())
        .then(json =>{
            seq.forEach((item,index)=>{
                let firstGalleryItem = document.createElement("img");
                let secondGalleryItem = document.createElement("img");
                let pictureTitle = document.createElement("h2");
                pictureTitle.innerHTML = json.photos[item].title;
                let pictureDesc=document.createElement("p");
                pictureDesc.innerHTML = json.photos[item].description;
                firstGalleryItem.setAttribute("src",
                    "pics/"+json.photos[item].src);
                secondGalleryItem.setAttribute("src",
                    "pics/"+json.photos[item].src);
                firstGalleryItem.classList = "fotka";
                firstGalleryItem.id = seq[index];
                firstGalleryItem.setAttribute('onclick','DisplayLayer(false,this.id)');
                gallery.appendChild(firstGalleryItem);
                image= parseInt(seq[index])+5;
                image=image.toString();
                document.getElementById(image).appendChild(secondGalleryItem)
                document.getElementsByClassName("pictureTitle")[item].appendChild(pictureTitle);
                document.getElementsByClassName("pictureDesc")[item].appendChild(pictureDesc);
                firstGalleryItem.ondragstart = (evt)=>{
                    drag=evt.target;
                    dragIndex=searchMe(item);
                }
                firstGalleryItem.ondragover = (evt)=>{
                    if (seq[searchMe(item)]!==seq[dragIndex])
                    {
                        hoverIndex = searchMe(item);
                        hover=evt.target;
                        if (dragIndex>hoverIndex)
                        {
                            gallery.insertBefore(drag, hover);
                        }
                        else {
                            gallery.insertBefore(drag, hover.nextSibling);
                        }
                    }
                }
                firstGalleryItem.ondragend = ()=>{
                    let x=document.getElementsByClassName("fotka");
                    for (let i=0;i<seq.length;i++)
                    {
                        seq[i] = x[i].id;
                    }
                    let jsonForCookie = JSON.stringify(seq);
                    setCookie('thecookie', jsonForCookie, 2);
                }
            })
            searchBar.addEventListener("input", ()=>{
                theCookie = document.getElementById("search").value;
                let myPhotos = document.getElementsByClassName('fotka');
                for (let i=0;i<myPhotos.length;i++)
                {
                    if (!(FilterPhotosViaSearch(json.photos[seq[i]],theCookie)))
                    {
                        myPhotos[i].style.display = "none";
                    }
                    else {
                        myPhotos[i].style.display = "inline-flex";
                    }
                }
            })
        })
});

/**
 * FUNCTIONS
 */

function DisappearOnClick(val)
{
    document.getElementsByClassName("cookiesBg")[0].style.display=val? "none": "block";
    document.getElementsByClassName("cookies")[0].style.display=val? "none": "flex";
}

function FilterPhotosViaSearch(object,val)
{
    return object.title.includes(val) || object.description.includes(val);
}

function setCookie(cookieName, val, expirationPeriod)
{
    let theDate = new Date();
    theDate.setTime(theDate.getTime() + (expirationPeriod * 24 * 60 * 60 * 1000));
    let expires = "expires="+theDate.toUTCString();
    document.cookie = cookieName + "=" + val + ";" + expires + ";path=/";
}

function searchMe(val)
{
    for (let i=0;i<seq.length;i++)
    {
        if (parseInt(seq[i]) === parseInt(val))
        {
            return i;
        }
    }
}

function getCookie(cookieName)
{
    let name = cookieName + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++)
    {
        let c = ca[i];
        while (c.charAt(0) === ' ')
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function addSlides(n,dir)
{
    stopTheShow=false;
    showSlides(pictureSlide += n,false,dir);
}

function showSlides(n,val,dir)
{
    if (stopTheShow)
    {
        pictureSlide-=1;
        return;
    }
    let slides = document.getElementsByClassName("pictureLayer");
    let myPhotos = document.getElementsByClassName('fotka');
    document.getElementById("bgDiv").style.display=val? "none": "block";
    if (n >= slides.length)
    {
        pictureSlide = 0
    }
    if (n < 0)
    {
        pictureSlide = slides.length-1
    }
    for (let index = 0; index < slides.length; index++)
    {
        slides[index].style.display = "none";
    }
    for (let index = 0; index <= slides.length; index++)
    {
        if (dir)
        {
            if (myPhotos[pictureSlide].style.display === "none")
            {
                pictureSlide += 1;
            }
        }
        if (!dir)
        {
            if (myPhotos[pictureSlide].style.display === "none")
            {
                pictureSlide -= 1;
            }
        }
        if (pictureSlide>=slides.length)
        {
            pictureSlide = 0;
        }
        if (pictureSlide < 0)
        {
            pictureSlide = slides.length-1
        }
    }
    slides[seq[(pictureSlide)]].style.display = "block";
    if (automatically)
    {
        setTimeout(function()
        {
            showSlides(pictureSlide+=1,false,true);
        },2000)
    }
}

function AutoStart()
{
    automatically=true;
    stopTheShow=false;
    setTimeout(function()
    {
        showSlides(pictureSlide+=1,false,true);
    },2000)
}

function StopAutoStart()
{
    automatically=false;
    stopTheShow=true;
}

function DisplayLayer(val, id)
{
    document.getElementById("bgDiv").style.display=val? "none": "block";
    document.getElementsByClassName("mainDisplayDiv")[0].style.display=val?"none": "flex";
    let layer = document.getElementsByClassName("pictureLayer");
    for (let i=0;i<seq.length;i++)
    {
        layer[i].style.display="none";
        if (parseInt(seq[i]) === parseInt(id))
        {
            pictureSlide = i;
        }
    }
    layer[id].style.display=val? "none": "block";
}

