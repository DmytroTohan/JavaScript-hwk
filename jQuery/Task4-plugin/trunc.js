$.fn.trunc = function(truncCount) {
  this.each(function() {
    var textContent = this.textContent;
    if (textContent.length > truncCount) {
      var smallStr = textContent.substr(0, truncCount);
      var tag = this.tagName;
      var classValue = this.classList.value;
      var truncElStr = '<span class="trunc-char">...</span>';
      $(this).hide();
      $(this).after('<' + tag.toLowerCase() + ' class="' + classValue + '">' + smallStr + truncElStr + '</' + tag.toLowerCase() + '>');
    }
  });
  $('span.trunc-char').click(function() {
    $(this).parent().hide();
    $(this).parent().prev().show();
  });
}
