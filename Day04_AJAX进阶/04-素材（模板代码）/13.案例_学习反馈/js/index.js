/**
 * 目标1：完成省市区下拉列表切换
 *  1.1 设置省份下拉菜单数据
 *  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
 *  1.3 切换城市，设置地区下拉菜单数据
 */

// 1.1 设置省份下拉菜单数据
// 1.1.1 获取省份下拉菜单
axios({
    url: 'http://hmajax.itheima.net/api/province',

}).then(res => {
    console.log(res);
    // 映射成option标签
    const option = res.data.list.map(pname =>`<option value="${pname}">${pname}</option>`).join('');
    console.log(option);

    document.querySelector('.province').innerHTML = `<option value="">省份</option>` + option;
})

// 1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
document.querySelector('.province').addEventListener('change', async e => {
    const result = await axios({
        url: 'http://hmajax.itheima.net/api/city',
        params: {
            pname: e.target.value
        }
    })
    console.log(result);
    // 映射成option标签
    const optioncname = result.data.list.map(cname =>`<option value="${cname}">${cname}</option>`).join('');
    document.querySelector('.city').innerHTML = `<option value="">城市</option>` + optioncname;


    // 清空地区下拉菜单
    document.querySelector('.area').innerHTML = `<option value="">地区</option>`;

})

// 1.3 切换城市，设置地区下拉菜单数据
document.querySelector('.city').addEventListener('change', async e => {
    const result = await axios({
        url: 'http://hmajax.itheima.net/api/area',
        params: {
            pname: document.querySelector('.province').value,
            cname: e.target.value
        }
    })
    console.log(result);
    // 映射成option标签
    const optionaname = result.data.list.map(aname =>`<option value="${aname}">${aname}</option>`).join('');
    document.querySelector('.area').innerHTML = `<option value="">地区</option>` + optionaname;
})

// 2.1 点击提交按钮，获取表单数据
document.querySelector('.submit').addEventListener('click', async () => {
    const form = document.querySelector('.info-form');
    const data = serialize(form, { hash: true, empty: true });
    console.log(data);

    // 2.2 发送请求，提交表单数据
    const result = await axios({
        url: 'http://hmajax.itheima.net/api/feedback',
        method: 'POST',
        data
    })
    console.log(result);
    alert(result.data.message)
}).catch(err => {
    console.log(err);
    alert('提交失败')
})