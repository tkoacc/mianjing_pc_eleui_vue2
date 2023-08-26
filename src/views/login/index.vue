<template>
  <div class="login-page">
    <el-card>
      <template #header> 黑马面经运营后台 </template>
      <!-- 表单校验 -->
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="用户名：" prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item class="tc">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      // 校验规则
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['blur', 'change']
          },
          {
            min: 5,
            max: 11,
            message: '长度在 5 到 11 个字符',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^\w{5,10}$/,
            message: '长度在 5 到 11 个字符',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    login() {
      // 兜底校验，如果校验失败,不会继续往下执行
      this.$refs.form.validate((valid) => {
        if (!valid) return false
      })
    },
    reset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: url(@/assets/login-bg.svg) no-repeat center / cover;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .el-card {
    width: 420px;
    /* 深度选择器 */
    ::v-deep .el-card__header {
      height: 80px;
      background: rgba(114, 124, 245, 1);
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
    }
  }
  .el-form {
    padding: 0 20px;
  }
  .tc {
    text-align: center;
  }
}
</style>
