import like_active from "../images/like-active.svg"
import like_inactive from "../images/like-inactive.svg"

export function putLike(button){
    const currentBackGround = button.style.background;
    if(currentBackGround.includes(like_active)){
        button.style.background = `transparent url(${like_inactive}) no-repeat`;
    }
    else{
    button.style.background = `transparent url(${like_active}) no-repeat`;
    }
}