var hamMenu = document.querySelector(".ham-menu");
var dropMenu = document.querySelector(".drop-menu");
var dropMenuList = document.querySelectorAll(".drop-menu div");
var dropMenuListText = document.querySelectorAll(".drop-menu div a");

hamMenu.addEventListener("click", () => {
  dropMenu.classList.toggle("drop-down");
  hamMenu.children[0].classList.toggle("top");
  hamMenu.children[1].classList.toggle("mid");
  hamMenu.children[2].classList.toggle("bottom");
});

var $pswp = $(".pswp")[0],
  galleries = {},
  photoSwipe;
$("[data-gallery]").each(function () {
  var $this = $(this);
  var galleryName = $this.data("gallery");
  var bigSize = ($this.data("size") || "800x600").split("x");
  var gallery = galleries[galleryName] || (galleries[galleryName] = []);
  var thumb = $this.find("img")[0];
  var index =
    gallery.push({
      w: bigSize[0],
      h: bigSize[1],
      src: $this.attr("href"),
      msrc: thumb.src,
      title: $this.data("title") || $this.attr("title"),
    }) - 1;
  $this.on("click", function (event) {
    event.preventDefault();
    photoSwipe = new PhotoSwipe($pswp, PhotoSwipeUI_Default, gallery, {
      getThumbBoundsFn: nodeBounder(thumb),
      galleryUID: galleryName,
      index: index,
      bgOpacity: 0.7,
    });
    photoSwipe.init();
  });
  // prevent the famous hoverZoom browser plugin form ruining the experience
  setTimeout(function () {
    $this.removeClass("hoverZoomLink");
  }, 100);
});
var nodeBounder = function (node) {
  return function (i) {
    //don't need the index, we have the thumb node itself (as a closure variable)
    var rect = node.getBoundingClientRect();
    return {
      x: rect.left,
      w: rect.width,
      h: rect.height,
      y: rect.top + document.documentElement.scrollTop,
    };
  };
};

$('[data-fancybox="images"]').fancybox({
  buttons: ["download", "thumbs", "close"],
});
