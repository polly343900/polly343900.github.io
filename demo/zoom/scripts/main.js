/**
 * Created by shoko on 15/5/16.
 */

require(["zoom"], function(zoom){
    var imgLoader = document.getElementById('imgLoader');
    var z = document.getElementById('zoomer');
    var img_pre = document.getElementById('img_pre');
    var img_url = '';

    imgLoader.addEventListener('change', handler, false);

    function handler(e){
        var reader = new FileReader();
        var file = e.target.files[0];

        // 如果上传文件是图片格式的话，执行
        if(file.type.match(/(image\/)\w+/g)){
            reader.readAsDataURL(file);
            reader.onload = function(event) {
                img_url = img_pre.src = event.target.result;

                // 在图片加载后再加载缩放插件
                img_pre.onload = function() {

                    zoom.init(z, {
                        url: img_url,
                        ratio: 2
                    });
                }
            }
        }
    }
});