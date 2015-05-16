/**
 * Created by shoko on 15/5/16.
 */
require(["zoom"], function(zoom){
    var z = document.getElementById('zoomer');
    zoom.init(z,{
        ratio: 2
    });
});