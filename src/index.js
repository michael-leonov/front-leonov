import './styles/style.scss';
import { httpRequest } from './js/http-request.js';

const posts = document.querySelector('.posts');

function postTemplate(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const postImage = document.createElement('img');
    postImage.src = post.urlImg;

    postElement.appendChild(postImage);

    const postType = document.createElement('p');

    postType.textContent = post.type;
    postType.classList.add('post__type');

    postElement.appendChild(postType);

    const postTitle = document.createElement('p');
    postTitle.textContent = post.title;
    postTitle.classList.add('post__title');

    postElement.appendChild(postTitle);

    const postInfo = document.createElement('div');
    postInfo.classList.add('post__info');

    postElement.appendChild(postInfo);

    const postAuthor = document.createElement('p');
    postAuthor.textContent = post.author;
    postAuthor.classList.add('post__author');

    postInfo.appendChild(postAuthor);

    const postDate = document.createElement('p');
    postDate.textContent = post.date;
    postDate.classList.add('post__date');

    postInfo.appendChild(postDate);

    const postViews = document.createElement('p');
    postViews.textContent = post.countViews;
    postViews.classList.add('post__views');

    postInfo.appendChild(postViews);

    const postDetail = document.createElement('p');
    postDetail.textContent = post.detail;
    postDetail.classList.add('post__detail');

    postElement.appendChild(postDetail);

    return postElement;
}

document.addEventListener('DOMContentLoaded', () => {
    httpRequest({
        url: '../static/posts.json',
        onSuccess: (data) => {
            data.forEach((post) => {
                posts.appendChild(postTemplate(post));
            });
        },
    });
});

const nav = document.querySelector('.nav');
let scrollPrev = 0;

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    scrolled > 200 && scrolled > scrollPrev
        ? nav.classList.add('hide')
        : nav.classList.remove('hide');
    scrollPrev = scrolled;
});

const burger = document.querySelector('.header__burger');
const burgerMenu = document.querySelector('.nav-mob');
const burgerOverlay = document.querySelector('.burger-overlay');
const logo = document.querySelector('.header__logo');

burger.addEventListener('click', () => {
    burger.classList.toggle('close');
    burgerMenu.classList.toggle('active');
    burgerOverlay.classList.toggle('active');

    burgerOverlay.classList.contains('active')
        ? ((document.body.style.overflow = 'hidden'),
          (logo.style.display = 'none'))
        : ((document.body.style.overflow = 'visible'),
          (logo.style.display = 'flex'));

    window.addEventListener('resize', () => {
        window.innerWidth > 1024
            ? (logo.style.display = 'flex')
            : (logo.style.display = 'none');
    });
});
