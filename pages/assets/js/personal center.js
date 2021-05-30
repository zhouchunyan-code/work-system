import axios from 'axios'
export default {
  data () {
    let checkTel = (rule, value, callback) => {
      // 自定义验证手机号
      if (!value) {
        return callback(new Error('请输入手机号!'))
      } else {
        const reg = /^[1][3,4,5,7,8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入格式正确的手机号'))
        }
      }
    }
    return {
      nickName: '',
      tel: '',
      show: false,
      dialogVisible: false,
      dialogImageUrl: '',
      imageUrl: '',
      infoForm: {},
      rules: {
        nickname: [
          {
            required: true, message: '请输入您的昵称', trigger: 'blur'
          },
          {
            min: 4, max: 20, message: '长度在4到20个字符之间', trigger: 'blur'
          }
        ],
        tel: [
          {
            validator: checkTel, trigger: 'blur'
          }
        ]
      }
    }
  },
  components: {
    Bottom
  },
  computed: {
    // 计算属性 图片上传
    uploadHeaders () {
      return {
        Authorization: this.$store.state.id
      }
    }
  },
  methods: {
    handleClose (done) {
      // 关闭修改头像的弹窗
      this.$confirm('确认取消?').then(_ => {
        done()
      }).catch(_ => {})
    },
    submit () {
      // 修改资料保存触发该方法
      // params里的数据是需要返回给后台的
      axios({
        url: 'api/usercenter',
        method: 'get',
        params: {
          nickname: this.infoForm.nickname,
          tel: this.infoForm.tel,
          headpic: this.infoForm.headpic,
          email: this.infoForm.email
        }
      }).then((res) => {
        if (res.data.status === 200) {
          // 这里的res.data.data的形式是根据后台存储的形式来调用的
          this.infoForm = res.data.data
          window.localStorage.setItem('info', JSON.stringify(this.infoForm))
          // 刷新本页面
          this.$router.go(0)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeAvatarUpload (file) {
      // 图片上传之前的方法，这些都是element-ui里封装的方法
      // 直接拿过来使用就好
      this.infoForm.headpic = file.name
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    submitUpload () {
      // 手动上传头像
      this.$refs.upload.submit()
      let success = false
      if (!success) {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.show = false
      } else {
        this.$message({
          message: '修改失败,请检查网络状况',
          type: 'error'
        })
      }
    },
    showBox () {
      // 修改头像弹框
      this.show = !this.show
    },
    reset () {
      // 重置
      this.infoForm.nickname = ''
      this.infoForm.tel = ''
    }
  },
  mounted () {
    // 这里是在挂载完成之后直接将localStorage的内容更新
    // 简单粗暴还挺有用
    let infomation = JSON.parse(window.localStorage.getItem('info'))
    this.infoForm = infomation
  }
}
