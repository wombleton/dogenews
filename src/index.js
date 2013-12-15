var $ = require('./jquery'),
    glossary = require('keyword-extractor'),
    headlines,
    i,
    $doge,
    prefixes = ['many', 'so', 'much', 'very', 'such'],
    colors = ['red', 'white', 'blue', 'green', 'purple', 'cyan', 'lime', 'yellow', 'orange'],
    positions = [[10, 10], [55, 20], [20, 30], [60, 35], [15, 45], [30, 60], [58, 70], [15, 70], [65, 85], [10, 80]];

function sample(list) {
  var index = Math.floor(Math.random() * list.length);

  return list.splice(index, 1)[0];
}

function jitter(n) {
  return n + (Math.floor(Math.random() * 8)) - 4;
}

function isHerald() {
  return window.location.hostname === 'www.nzherald.co.nz';
}

function isStuff() {
  return window.location.hostname === 'www.stuff.co.nz';
}

function getHeadlines() {
  if (isHerald()) {
    return $('.topHeadlines article h3');
  } else if (isStuff()) {
    return $('#home_top_midcol h1, #home_top_midcol h2');
  }
}

function getImageSrc() {
  if (isHerald()) {
    return $('.topHeadlines img:first').attr('src');
  } else if (isStuff()) {
    return $('#home_features img').attr('src');
  }
}

function dogeIt() {
  var headlines;

  if (!isStuff() && !isHerald()) {
    return;
  }

  headlines = getHeadlines().map(function() {
    var $this = $(this),
        text = $this.text().trim();

    return {
      href: $this.find('a').attr('href'),
      keywords: glossary.extract(text, { return_changed_case: false }),
      text: text
    };
  });

  $doge = $('<div id="doge"></div>').css({
    fontFamily: 'Comic Sans, Comic Sans MS, cursive',
    height: '100%',
    width: '100%',
    position: 'fixed',
    left: 0,
    top: 0,
    'z-index': 8001,
    background: 'white url(' + getImageSrc()  + ') no-repeat',
    'background-size': 'cover'
  });

  $doge.appendTo('body');

  // four words and then wow
  for (i = 0; i < 5; i++) {
    var word = sample(prefixes),
        headline,
        position = sample(positions),
        content,
        $link;

    if (i === 4) {
      if (Math.random() < 0.9) {
        $link = $('<a href="http://knowyourmeme.com/memes/doge">wow</div>');
      } else {
        $link = $('<a href="http://knowyourmeme.com/memes/doge">wow</div>');
      }
    } else {
      headline = sample(headlines);

      if (!headline) {
        continue;
      }

      content = word + ' ' + sample(headline.keywords);
      $link = $('<a href="' + headline.href + '">' + content + '</div>').attr('title', headline.text);
    }

    $link.css({
      color: sample(colors),
      position: 'absolute',
      top: jitter(position[1]) + '%',
      left: jitter(position[0]) + '%',
      fontSize: '3em',
      fontWeight: 'bold',
      textShadow: '2px 2px 5px rgba(0,0,0,0.7)'
    }).appendTo($doge);
  }
}

dogeIt();

$(document).on('click', '#doge', function() {
  $('#doge').remove();
});
