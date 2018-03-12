var dice_regex = /([\d]*?)[dD]([\d]+)([\+\-\*])?([\d+])?/gmi

// remove previous elements
$(".dice-roller, #dice-modal").remove();

function textChildNodes(parentNode) {
  var textNodes = [];
  for (let node of parentNode.childNodes) {
    if (node.nodeType == Node.TEXT_NODE) {
      textNodes.push(node);
    }
  }
  return textNodes;
}


for (let node of $("div,span")) {
  var textNodes = textChildNodes(node);
  if (textNodes.length) {
    for (let tnode of textNodes) {
      var text = tnode.wholeText;
      while ((results = dice_regex.exec(text)) !== null) {
        console.log(results);
        var offset = results[4];
        if (offset != undefined && results[3] != undefined) {
          offset = results[3] == "-" ? -offset : offset;
        }
        var button = $("<button>")
          .addClass("btn btn-sm btn-outline-primary dice-roller ml-2")
          .attr({'data-toggle': "modal", 'data-target': "#dice-modal"})
          .text("🎲")
          .data({min: 1, max: results[2], num: results[1], offset: offset});
        button.insertAfter(tnode);
      } 
    }
  }
}

var modal = $(`
<div id="dice-modal" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div>
          <b>Number of dice</b>: <span id="die-num"></span>
        </div>
        <div>
          <b>Type of dice</b>: <span id="die-max"></span>
        </div>
        <div>
          <b>Offset</b>: <span id="die-offset"></span>
        </div>
        <div>
            <button id="random-org-link" class="btn btn-link" href="" target="blank">
            Roll !
            </a>
        </div>
        <div>
          <b>Result</b>: <span id="die-result"></span>
        </div>
    </div>
  </div>
</div>
`);

$("div").first().append(modal);

$("#random-org-link").click(function () {
  var $this = $(this);
  $.get($this.data("href"), function(data) {
    modal.find("#die-result").text(data);
  });
});

$(".dice-roller").click(function() {
  var $this = $(this);
  var data = $this.data();
  modal.find("#die-num").text(data.num);
  modal.find("#die-max").text("d" + data.max);
  modal.find("#die-offset").text(offset);
  modal.find("#random-org-link").data("href", `https://www.random.org/integers/?\
    num=${ data.num }&min=1&max=${ data.max }&col=${ data.num }&base=10&format=plain&rnd=new`)
});

console.log("fin de parsing");