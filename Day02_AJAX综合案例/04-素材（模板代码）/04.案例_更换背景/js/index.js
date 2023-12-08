/**
 * 目标：网站-更换背景
 *  1. 选择图片上传，设置body背景
 *  2. 上传成功时，"保存"图片url网址
 *  3. 网页运行后，"获取"url网址使用
 * */
// 获取元素，绑定change事件
document.querySelector('.bg-ipt').addEventListener('change', e=> {
    // 拿到图片
    const fd = new FormData()
    fd.append('img', e.target.files[0])
    // 发送请求
    axios({
        url: 'http://hmajax.itheima.net/api/uploadimg',
        method: 'POST',
        data: fd
    }).then(res => {
        console.log(res);
        // 拿到图片地址
        const url = res.data.data.url
        // 设置背景
        document.body.style.backgroundImage = `url(${url})`

        // 上传成功的时候，保存图片的url
        localStorage.setItem('bg', url)
    })
})

// 网页运行后，获取图片url
const url = localStorage.getItem('bg')
// 本地有背景图的时候，设置背景
url && (document.body.style.backgroundImage = `url(${url})`)