$(function(){
  $('.slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      variableWidth: true,
      arrows: false,
      dots:true,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            slidesToShow: 1
          }
        }
      ]
  });
});

// スマホメニュー
$(function(){
  $(".p-header__burger").on("click",function(){
      $(".l-layout").toggleClass("is-active")
      $(".l-drawer").toggleClass("is-active")
      $(".p-header__burger").toggleClass("is-active")
      $("body").toggleClass("have_curtain")
  })
})


// 「選ばれる理由」ページ
// タブ切り替え
$(function(){
  $('.js-tabs a').on('click', function(event){
    event.preventDefault();
    var activeTab = $(this).attr("href");
    $('.js-tabs a').removeClass('is-active');
    $(this).addClass('is-active');
    $('.js-tab-content').removeClass('is-active');
    $(activeTab).addClass('is-active');
  });
});


// トップページ
// スライダー
$(function(){
  $('.home-intro__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    // centerMode: true,
    variableWidth: true,
    arrows: false,
    dots:true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          // centerMode: true,
          slidesToShow: 1
        }
      }
    ]
  });
});

// ジェイヘアメイク専攻一覧
// タブ切り替え
document.addEventListener('DOMContentLoaded', function(){
  // タブに対してクリックイベントを適用
  const tabs = document.getElementsByClassName('tab');
  for(let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', tabSwitch);
  }

  // タブをクリックすると実行する関数
  function tabSwitch(){
    // タブのclassの値を変更
    document.getElementsByClassName('is-active')[0].classList.remove('is-active');
    this.classList.add('is-active');
    // コンテンツのclassの値を変更
    document.getElementsByClassName('is-show')[0].classList.remove('is-show');
    const arrayTabs = Array.prototype.slice.call(tabs);
    const index = arrayTabs.indexOf(this);
    document.getElementsByClassName('panel')[index].classList.add('is-show');
  };
});