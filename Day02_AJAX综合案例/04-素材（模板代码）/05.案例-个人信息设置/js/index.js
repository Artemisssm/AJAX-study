/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
// 获取用户数据
const creator = '播仔'
axios({
    url: 'http://hmajax.itheima.net/api/settings',
    params: {
        creator
    }
}).then(res => {
    const userobj = res.data.data;
    // 回显数据,keys返回的是一个数组
    Object.keys(userobj).forEach(key => {
        if (key === 'avatar') {
            // 头像
            document.querySelector('.prew').src = userobj[key];
        }else if(key === 'gender'){
            // 获取性别单选框
            const gradiolist = document.querySelectorAll('.gender')
            // 获取性别的数字0男1女
            const gnum = userobj[key];
            // 通过性别数字，作为索引，获取对应的单选框
            const g = gradiolist[gnum];
            // 设置单选框选中
            g.checked = true;
        }else{
            // 其他数据
            document.querySelector(`.${key}`).value = userobj[key];
        }
    })
})


// 修改用户头像
// 获取文件上传框
// 文件选择元素添加change事件
document.querySelector('.upload').addEventListener('change', function () {
    // 获取文件对象
    const file = this.files[0];
    // 创建formdata对象
    const fd = new FormData();
    // 将文件对象添加到fd中
    fd.append('avatar', file);
    fd.append('creator', creator);
    // 发送请求
    axios({
        url: 'http://hmajax.itheima.net/api/avatar',
        method: 'put',
        data: fd
    }).then(res => {
        // 获取头像地址
        const avatar = res.data.data.avatar;
        // 设置头像
        document.querySelector('.prew').src = avatar;
    })
})


// 修改用户信息
document.querySelector('.submit').addEventListener('click', function () {
    // 获取表单数据
    const fd = serialize(document.querySelector('.user-form'), { hash: true, empty: true });

    fd.creator = creator;
    // 性别字符串转数字
    fd.gender = +fd.gender;
    // 发送请求
    axios({
        url: 'http://hmajax.itheima.net/api/settings',
        method: 'put',
        data: fd
    }).then(res => {
        console.log(res);

        const toastdom = document.querySelector('.my-toast');
        // 显示提示框
        const toast = new bootstrap.Toast(toastdom);
        toast.show();
    })
})
