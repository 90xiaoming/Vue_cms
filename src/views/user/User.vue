<template>
    <div class="user">
        <el-row>
            <el-col :span="24">
               <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
                    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
                </el-breadcrumb> 
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-input placeholder="请输入内容" class="search-input " v-model="query" @keydown.native.enter="initList">
                <el-button slot="append" icon="el-icon-search" @click="initList"></el-button>
            </el-input>
            <el-button type="success" plain @click="addDialogFormVisible=true">添加用户</el-button>
            </el-col>
        </el-row>

        <el-table
            class="margin-20"
            v-loading="loading"
            :data="userList"
            border
            style="width: 100%">
            <el-table-column
            type="index"
            width="50">
            </el-table-column>
            <el-table-column
            prop="username"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column 
            prop="email"
            label="邮箱"
            width="180">
            </el-table-column>
            <el-table-column
            prop="mibile"
            label="电话">
            </el-table-column>
                 <el-table-column label="用户状态">
                <template slot-scope="scope">
                   <el-switch v-model="scope.row.mg_state" @change="changeUserState(scope.row)"></el-switch>
                </template>
            </el-table-column>
             <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary"  plain icon="el-icon-edit" @click="showEditDialog(scope.row)" ></el-button>
                     <el-button size="mini" type="danger"  plain icon="el-icon-delete" @click="showDeleteDialog(scope.row)"></el-button>
                     <el-button size="mini" type="warning"  plain icon="el-icon-check" @click="showgrantDialog(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="1"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>

        <!-- 添加用户对话框 -->
       <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
            <el-form :model="addform" label-width="80px" :rules="rules" ref="addUserForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addform.username" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="密码" prop="password">
                    <el-input v-model="addform.password" auto-complete="off"></el-input>
                </el-form-item>
                  <el-form-item label="邮箱" prop="emai">
                    <el-input v-model="addform.email" auto-complete="off"></el-input>
                </el-form-item>
                  <el-form-item label="电话" prop="mobile">
                    <el-input v-model="addform.mobile" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUserSubmit('addUserForm')">确 定</el-button>
            </div>
        </el-dialog>
          <!-- 编辑用户对话框 -->
        <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
            <el-form :model="editform" label-width="80px" :rules="rules" ref="editUserForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editform.username" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                 <el-form-item label="邮箱" prop="emai">
                    <el-input v-model="editform.email" auto-complete="off"></el-input>
                </el-form-item>
                  <el-form-item label="电话" prop="mobile">
                    <el-input v-model="editform.mobile" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserSubmit('editUserForm')">确 定</el-button>
            </div>
        </el-dialog>
    
          <!-- 分配角色对话框 -->
        <el-dialog title="分配角色" :visible.sync="grantDialogFormVisible">
            <el-form :model="grantform" label-width="120px">
                <el-form-item label="当前的用户：" prop="username">
                    <el-tag type="info">{{grantform.username}}</el-tag>
                </el-form-item>
                    <el-form-item label="请选择角色：">
                        <el-select v-model="roleId" placeholder="请选择角色：">
                        <el-option 
                        v-for="(role,index) in roleList"
                        :key="index"
                        :label="role.roleName" 
                        :value="role.id">
                        </el-option>
                       
                        </el-select>
                    </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="grantDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="grantUserSubmit()">确 定</el-button>
            </div>
        </el-dialog>
    
    </div>
</template>
<script>
import {getUserList,changeUserState,addUser,getUserById,editUser,deleteUser,getRoleList,grantUserRole} from '@/api'
export default {
        data() {
            return {
                loading:true,
                query:'',
                total:0,
                pagesize:10,
                pagenum:1,
                userList: [],
                addDialogFormVisible:false,
                addform:{
                    username:'',
                    password:'',
                    email:'',
                    mobile:'',
                },
                editDialogFormVisible:false,
                editform:{
                    username:'',
                    email:'',
                    mobile:'',
                    id:0
                },
                grantDialogFormVisible:false,
                grantform:{},
                roleList:[],
                roleId:'',
                // 添加用户的表单验证
                rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                ],
                mobile: [
                    { required: true, message: '电话不能为空' }
                ]
                }
            }
        },
        created(){
            this.initList()
        },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val
        this.initList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum=val
        this.initList()
      },
       // 初始化表格数据
        initList(){
            this.loading=true
            getUserList({params:{query:this.query,pagenum:this.pagenum,pagesize:this.pagesize}}).then(res=>{
                console.log(res);
                this.userList =res.data.users
                this.total=res.data.total
                this.loading=false
                
            })
        },
        // 改变用户状态
        changeUserState(row){
            changeUserState({uid:row.id,type:row.mg_state}).then(res=>{
                if(res.meta.status===200){
                   this.$message({
                       type:'success',
                       message:'修改用户状态成功'
                   }) 
                }else{
                    this.$message({
                       type:'warning',
                       message:'res.meta.msg'
                   })  
                }
            })
        },
        // 添加用户
        addUserSubmit(formName){
            this.$refs[formName].validate(valide=>{
                if(valide){
                    addUser(this.addform).then(res=>{
                        if(res.meta.status===201){
                           this.$message({
                            type:'success',
                            message:'创建用户成功'
                            })   
                        }
                        this.addDialogFormVisible=false
                        this.initList()
                    })
                }
            })
        },
        //显示编辑用户对话框
        showEditDialog(row){
            this.editDialogFormVisible=true
            getUserById(row.id).then(res=>{
             if(res.meta.status===200){
                 this.editform.username=res.data.username
                 this.editform.email=res.data.email
                 this.editform.mobile=res.data.mobile
                 this.editform.id=res.data.id
             }    
            }) 
        },
        //编辑用户提交
        editUserSubmit(formName){
            this.$refs[formName].validate(valide=>{
                if(valide){
                    editUser(this.editform).then(res=>{
                        if(res.meta.status===200){
                            this.$message({
                            type:'success',
                            message:'编辑用户成功'
                            })  
                            this. editDialogFormVisible=false
                             this.initList()
                        }
                    })
                }
            })
        },
        //显示删除对话框
        showDeleteDialog(row){
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    //执行删除用户操作
                 deleteUser(row.id).then(res=>{
                     if(res.meta.status===200){
                         this.$message({
                         type: 'success',
                         message: '删除成功!'
                        })
                        this.initList()
                     }
                 })
              
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //显示分配角色对话框
        showgrantDialog(row){
            this.grantform=row
            this.grantDialogFormVisible=true
            getRoleList().then(res=>{
                console.log(res)
                if(res.meta.status===200){
                    this.roleList = res.data
                }
            })
        },
        //分配角色
        grantUserSubmit(){
            if(!this.roleId){
                this.$message({
                    type:'warning',
                    message:'角色不能为空,请选择'
                })
            }else{
            grantUserRole({id:this.grantform.id,rid:this.roleId}).then(res=>{
                console.log(res)
                if(res.meta.status===200){
                        this.$message({
                        type: 'success',
                        message: '设置角色成功!'
                    })
                    this.grantDialogFormVisible=false
                        
                } 
            })
            }
            
        }
    }
   
}
</script>
<style lang="scss" scoped>
.user {
    .margin-20{
        margin: 20px 0;
    }
  .search-input {
    width: 300px;
  }
  .page {
    padding: 5px 0;
    background-color: #D3DCE6;
  }
}
</style>
