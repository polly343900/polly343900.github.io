(function(){
    setHeight();

    window.addEventListener('resize', function () {
        setHeight();
    })

    function setHeight(){
        var header = document.getElementById('site-header');
        header.style.height = window.innerHeight + 'px';
    }
})();

