var dice_regex = /([\d]*?)[dD]([\d]+)([\+\-\*])?([\d+])?/gmi
console.log("pipo");
function textChildNodes(parentNode) {
  var textNodes = [];
  var text = "";
  for (let node of parentNode.childNodes) {
    if (node.nodeType == Node.TEXT_NODE) {
      textNodes.push(node);
      text = text + node.wholeText;
    }
  }
  return [textNodes, text];
}

var popup = $("<div>");
for (let node of $("div,span")) {
  var res = textChildNodes(node);
  textNodes = res[0];
  text = res[1];
  if (textNodes.length) {
    while ((results = dice_regex.exec(text)) !== null) {
      var button = $("<button>")
        .text(results[0])
        .data({min: 1, max: results[2], num: results[1]});
      let $node = $(node);
      html = $node.html();
      console.log(button, button[0].outerHTML);
      $node.html(html.replace(results[0], button[0].outerHTML));
      console.log(results, node);
    }
  }
}
console.log("fin de parsing");