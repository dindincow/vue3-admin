<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      ref="loginFormRef"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
        <LangSelect class="lang-select" effect="light"></LangSelect>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        />
      </el-form-item>

       <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password" @click="onChangePwdType"></svg-icon>
        </span>
        <el-input
          placeholder="password"
          name="password"
          v-model="loginForm.password"
          :type="passwordType"
        />
        <span class="show-pwd">
          <svg-icon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            @click="onChangePwdType"
          ></svg-icon>
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
        >{{ $t('login.loginBtn') }}</el-button
      >
      <div class="tips" v-html="$t('login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { validatePassword } from './rules'
import router from '@/router'
import LangSelect from '@/components/LangSelect'

// 表單登入
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})

// 表單驗證
const i18n = useI18n()
const loginRules = ref({
  username: [
    { required: true, trigger: 'blur', message: i18n.t('login.usernameRule') }
  ],
  password: [{ validator: validatePassword(), required: true, trigger: 'blur' }]
})

// 切換密碼圖標
const passwordType = ref('password')
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// 處理登入
const loading = ref(false)
const store = useStore()
const loginFormRef = ref(null)
const handleLogin = () => {
  // 1.進行表單驗證
  loginFormRef.value.validate((valid) => {
    if (!valid) return
    // 2.處發登入動做
    loading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then((res) => {
        // 3.進行登入後處理
        loading.value = false
        console.log('router==>', router)
        router.push('/')
      })
      .catch((err) => {
        loading.value = false
        console.log(err)
      })
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100vh;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    ::v-deep .el-input__inner{
      border-radius: 5px;
      box-shadow: none;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 100%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 5px;
        padding: 12px 5px 12px 45px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
    .tips{
      color: #fff;
      font-size: 14px;
      line-height: 24px;
    }
    .lang-select{
      position: absolute;
      top:0;
      right:0;
      font-size: 26px;
      background: #fff;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
    position: absolute;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
