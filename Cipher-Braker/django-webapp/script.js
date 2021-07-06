var cdn = 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.4.1/';
Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,
  help: true, // Show help overlay when ? is pressed
  transition: 'convex', // default / none / slide / concave / convex / zoom
  transitionSpeed: 'default', // default / fast / slow
  backgroundTransition: 'default', // default / none / fade / slide / convex / concave/ zoom
  dependencies: [ // Comment in/out as needed
    { src: cdn+'lib/js/classList.js', // Cross-browser shim that fully implements classList
      condition: function() { return !document.body.classList; } },
    // { src: cdn+'plugin/markdown/marked.js',   // Interpret Markdown in <section> elements [1]
    //   condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    // { src: cdn+'plugin/markdown/markdown.min.js', // Interpret Markdown in <section> elements [2]
    //   condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: cdn+'plugin/highlight/highlight.min.js', async: true,  // Syntax highlighting <code> elements
      callback: function() { hljs.initHighlightingOnLoad(); } },
    { src: cdn+'plugin/zoom-js/zoom.min.js', async: true}, // Alt+click zoom on elements
    { src: cdn+'plugin/notes/notes.min.js', async: true}, // Speaker notes
		{ src: cdn+'plugin/math/math.min.js', async: true }  // MathJax
  ], 
  math: {
		mathjax: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js',
		config: 'TeX-AMS_HTML-full'  // See https://docs.mathjax.org/en/latest/config-files.html
	},
});

// Probably should link these to smaller test images / faster site! 
var kImg = document.getElementById("test-img");
kImg.onclick = function() {
  var newNum = Number(kImg.getAttribute("num")) + 1;
  kImg.setAttribute("num", newNum);
  // kImg.setAttribute("data-src", kodakImg(newNum));
  kImg.src = kodakImg(newNum);
}

// Randomize inital image on document load -- too late?
// Reveal.addEventListener( 'ready', function( event ) {
//   kImg.src = kodakImg(Math.round(Math.random()*24));
// } );

function kodakImg(n) {
  // Images are numbered 01, 02, ..., 24
  var num = n < 1 ? n + 23 : n-1;
  num = (num % 24) + 1;
  num = ((num < 10) ? "0" : "") + String(num); // Pad to two digits with a zero
  return "http://r0k.us/graphics/kodak/kodak/kodim"+num+".png"
}