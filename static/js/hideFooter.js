/**
 * Created by Ausu on 2017/9/12.
 */
function footerHide () {        //    點擊input框的時候隱藏footer
  if (document.getElementsByTagName('body')[0].offsetHeight < 500) {
    console.log(document.getElementsByClassName('footer')[0])
    document.getElementsByClassName('footer')[0].setAttribute('style', 'display: none')
  } else {
    document.getElementsByClassName('footer')[0].setAttribute('style', 'display: block')
  }
}
