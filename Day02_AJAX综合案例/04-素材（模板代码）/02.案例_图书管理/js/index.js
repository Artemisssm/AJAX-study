/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */
// 获取并渲染图书列表的代码：
// 1.1 获取数据
const creator = '老张';
function getData() {

    axios({
        url: 'http://hmajax.itheima.net/api/books',
        params: {
            creator
        }
    }).then(res => {
        console.log(res);
        // 1.2 渲染数据
        const booklist = res.data.data;
        console.log(booklist);

        const htmlstr = booklist.map((item, index)=>{
            return `<tr>
            <td>${index+1}</td>
            <td>${item.bookname}</td>
            <td>${item.author}</td>
            <td>${item.publisher}</td>
            <td data-id=${item.id}>
              <span class="del">删除</span>
              <span class="edit">编辑</span>
            </td>
          </tr>`
        }).join('');
        document.querySelector('.list').innerHTML = htmlstr;
    })
}
getData();

// 给保存按钮添加点击事件
const addmodel = new bootstrap.Modal(document.querySelector('.add-modal'));

document.querySelector('.add-btn').addEventListener('click', e=>{

    // 收集表单数据
    const bookobj = serialize(document.querySelector('.add-form'), {hash: true, empty: true});
    console.log(bookobj);
    // 提交到服务器
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        method: 'post',
        data: {
            ...bookobj,
            creator
        }
    }).then(res=>{
        console.log(res);
        // 重新渲染列表
        getData();
        // 关闭模态框
        addmodel.hide();
        // 把表单数据清空
        document.querySelector('.add-form').reset();
    })
    addmodel.hide();
})

// 给删除按钮添加点击事件
// 给动态添加的元素添加事件，需要使用事件委托
document.querySelector('.list').addEventListener('click', e=>{
    // console.log(e.target);
    // 判断点击的是否是删除按钮
    if(e.target.classList.contains('del')){
        // 获取要删除的图书的id
        const id = e.target.parentNode.dataset.id;
        // 发送请求
        axios({
            // 在路径上传参数
            url: `http://hmajax.itheima.net/api/books/${id}`,
            method: 'delete'
        }).then(res=>{
            console.log(res);
            // 重新渲染列表
            getData();
        })
    }
})

// 给编辑按钮添加点击事件
// 给动态添加的元素添加事件，需要使用事件委托
const editmodel = new bootstrap.Modal(document.querySelector('.edit-modal'));
document.querySelector('.list').addEventListener('click', e=>{
    // console.log(e.target);
    // 判断点击的是否是编辑按钮
    if(e.target.classList.contains('edit')){
        // 清空表单数据
        document.querySelector('.edit-form').reset();
        // 信息回填
        // 获取要编辑的图书的id
        const id = e.target.parentNode.dataset.id;
        // 发送请求
        axios({
            // 在路径上传参数
            url: `http://hmajax.itheima.net/api/books/${id}`,
        }).then(res=>{
            console.log(res);
            // 信息回填
            // 获取要编辑的图书的信息
            const bookobj = res.data.data;
            console.log(bookobj);
            // 把信息回填到表单中
            // 获取表单元素
            // document.querySelector('.edit-form .bookname').value = bookobj.bookname;
            // document.querySelector('.edit-form .author').value = bookobj.author;
            // document.querySelector('.edit-form .publisher').value = bookobj.publisher;
            // 优化,遍历数据对象
            const keys = Object.keys(bookobj); // ['bookname', 'author', 'publisher']
            keys.forEach(key=>{
                document.querySelector(`.edit-form .${key}`).value = bookobj[key];
            })
        })
        // 显示模态框
        editmodel.show();
    }
})

// 点击修改按钮隐藏弹框
document.querySelector('.edit-btn').addEventListener('click', e=>{

    // 收集表单数据
    const bookobj = serialize(document.querySelector('.edit-form'), {hash: true, empty: true});
    console.log(bookobj);
    // 提交到服务器
    axios({
        url: `http://hmajax.itheima.net/api/books/${bookobj.id}`,
        method: 'put',
        data: {
            ...bookobj,
            creator
        }
    }).then(res=>{
        console.log(res);
        // 重新渲染列表
        getData();
        // 关闭模态框
        // editmodel.hide();
        // 把表单数据清空
        document.querySelector('.edit-form').reset();
    })
    editmodel.hide();
})