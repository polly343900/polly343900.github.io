(function(){
    var links = $.query('li', document);
    $.each(links, function(i){
      i.setAttribute('draggable', 'true');
    })
    
    var dragging;
  
    $.on('li', 'dragstart', function(e) {
        dragging = e.target;
        e.dataTransfer.effectAllowed = 'move';
    });
    
    $.on("li", 'dragover', function(e) {
            e.preventDefault();
    });
    
    $.on('li', 'dragenter', function(e){
        if(e.target!==null){
            e.target.parentNode.insertBefore(dragging,e.target);
        } else {
            e.target.parentNode.appendChild(dragging);
        }
    });
})();