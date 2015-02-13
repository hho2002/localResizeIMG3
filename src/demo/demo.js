(function () {
    var input = document.querySelector('input');

    input.onchange = function () {
        lrz(this.files[0], {width: 400}, function (results) {
            console.log(results); // 你需要的数据都在这里，以字符串的形式传送base64给服务端转存为图片。





            // 以下为演示用内容
            var tip = document.querySelector('#tip'),
                report = document.querySelector('#report'),
                footer = document.querySelector('footer');

            if(footer) footer.remove();
            report.innerHTML = '';
            tip.innerHTML = '正在生成和上传.. （演示使用了大量内存，不代表真实表现，请亲测。）';

            setTimeout(function () {
                demo_report('原始图片', results.blob, results.origin.size);
                demo_report('客户端预压的图片', results.base64, results.base64.length * 0.8);
                demo_report('服务端实存的图片', results.base64, results.base64.length * 0.8);

                tip.innerHTML = '生成和上传完毕（演示使用了大量内存，不代表真实表现，请亲测。）';
            }, 100);
        });
    };

    /**
     * 演示报告
     * @param title
     * @param src
     * @param size
     */
    function demo_report(title, src, size) {
        var img = new Image(),
            li = document.createElement('li'),
            size = (size / 1024).toFixed(2) + 'KB';

        img.onload = function () {
            var content = '<ul>' +
                '<li>'+ title +'（'+ img.width +' X '+ img.height +'）</li>' +
                '<li>'+ size +'</li>' +
                '</ul>';

            li.className = 'item';
            li.innerHTML = content;
            li.appendChild(img);
            document.querySelector('#report').appendChild(li);
        };

        img.src = src;
    }
})();