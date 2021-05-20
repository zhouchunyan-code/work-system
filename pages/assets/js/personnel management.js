
	<head>
		<meta charset="utf-8">
		<title>人员信息管理</title>
		<script type="text/javascript">
			
			var index = 1;
			var p1 = {
				"id":index,
				"name":"科比",
				"sex":"男",
				"old":41,
				"area":"美国洛杉矶",
			};
			index++;
			var p2 = {
				"id":index,
				"name":"乔丹",
				"sex":"男",
				"old":56,
				"area":"美国纽约",
			};
			index++;
			var p = new Array();//var p = [];
			p.push(p1);
			p.push(p2);
			/**显示人员信息**/
			function showPerson(){
				//显示表格
				var table1 = document.getElementById("table1");
				table1.style = "";
				var str = "<tr> <th>编号</th><th>姓名</th><th>性别</th><th>年龄</th><th>籍贯</th><th colspan='2'>操作</th> </tr>";
				for(var i=0;i<p.length;i++){
					var a = p[i];
					str += "<tr> <td>"+a.id+"</td><td>"+a.name+"</td><td>"+a.sex+"</td><td>"+a.old+"</td><td>"+a.area+"</td><td><button type='button' onclick='deletePerson("+a.id+")'>删除</button></td><td><button type='button' onclick='showUpdatePerson("+a.id+")'>更新</button></td> </tr>";
				}
				table1.innerHTML = str;
			}
			/**显示新增人员信息**/
			function showAddPerson(){
				//隐藏更新人员界面
				var div3 = document.getElementById("div3");
				div3.style = "display: none;";
				var div2 = document.getElementById("div2");
				div2.style = "";	
			}
			/**新增人员信息**/
			function addPerson(){
				var field2 = document.getElementById("field2");
				var a = {};//var a = new Array();
				// var a = p[index-1];
				a.id = index;
				a.name = document.getElementById("name").value;
				a.old = document.getElementById("old").value;
				a.sex = document.getElementById("sex").value;
				a.area = document.getElementById("area").value;
				// alert(a.id+" "+a.name+" "+a.old+" "+a.sex+" "+a.area +" ");
				index++;
				//数组添加表单的值
				p.push(a);
				//添加之后重新查询表单
				showPerson();
				
			}
			/**取消按钮，隐藏表单**/
			function cancel(){
				//隐藏新增人员信息界面
				var div2 = document.getElementById("div2");
				div2.style = "display: none;";
				//隐藏更新人员信息界面
				var div3 = document.getElementById("div3");
				div3.style = "display: none;";
			}
			/**根据id删除人员信息**/
			function deletePerson(id){
				var flag = confirm("确定删除？");
				if(flag){
					for(var i=0;i<p.length;i++){
						var a = p[i];
						if(a.id == id){
							p.splice(i,1);//从第i个位置开始删除一个元素
						}
					}
				}
				//删除完毕重新加载表单
				showPerson();
			}
			/**根据id修改人员信息**/
			function showUpdatePerson(id){
				//隐藏添加人员界面
				var div2 = document.getElementById("div2");
				div2.style = "display: none;";
				//显示更新人员界面
				var div3 = document.getElementById("div3");
				div3.style = "";
				//根据id遍历数组得到要修改的值,然后用document对象进行修改
				for(var i=0;i<p.length;i++){
					var a = p[i];
					if(a.id == id){
						document.getElementById("uname").value = a.name;
						document.getElementById("uold").value = a.old;
						document.getElementById("usex").value = a.sex;
						document.getElementById("uarea").value = a.area;
						document.getElementById("uid").value = a.id;
					}
				}
			}
			function updatePerson(){
				var id = document.getElementById("uid").value;
				//再根据id把表单中的value值存入对于的p[]i数组中
				for(var i=0;i<p.length;i++){
					var a = p[i];
					if(a.id == id){
						p[i].name = document.getElementById("uname").value;
						p[i].old = document.getElementById("uold").value;
						p[i].sex = document.getElementById("usex").value;
						p[i].area = document.getElementById("uarea").value;
					}
				}
				//重新调用表单刷新
				showPerson();
				//隐藏添加人员界面
				var div3 = document.getElementById("div3");
				div3.style = "display: none;";
			}
		</script>


