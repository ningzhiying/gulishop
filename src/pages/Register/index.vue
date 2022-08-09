<template>
    <div class="register">
        <h3>注册新用户
            <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
					</span>
        </h3>
        <div class="content">
            <label>手机号:</label>
            <input @change="delHandler" ref="del" type="tel" placeholder="请输入你的手机号">
            <span class="error-msg">{{ phoneReminder }}</span>
        </div>
        <div class="content">
            <label>验证码:</label>
            <input @change="verifyCodeHandler" ref="verify" type="text" placeholder="请输入验证码">
            <button @click="getCode" class="verify">获取验证码</button>
            <span class="error-msg">{{ verifyCode }}</span>
        </div>
        <div class="content">
            <label>登录密码:</label>
            <input @input="passwordHandler" type="password" ref="password" placeholder="请输入你的登录密码">
            <span class="error-msg">{{ passwordSpan }}</span>
        </div>
        <div class="content">
            <label>确认密码:</label>
            <input @blur="password2Handler" type="password" ref="password2" placeholder="请输入确认密码">
            <span class="error-msg">{{ password2Span }}</span>
        </div>
        <div class="controls">
            <input @input="protocolHandler" name="m1" type="checkbox" v-model="protocolCheck" ref="protocol">
            <span>同意协议并注册《尚品汇用户协议》</span>
            <span class="error-msg">{{ protocol }}</span>
        </div>
        <div class="btn">
            <button @click="submit">完成注册</button>
        </div>
    </div>
</template>

<script>
import {getSendCode, postRegister} from "@/api";

export default {
    name: "RegisterCom",
    data() {
        return {
            phoneReminder: "",
            verifyCode: "",
            passwordSpan: "",
            password2Span: "",
            protocol: '',
            protocolCheck: true
        }
    },
    methods: {
        delHandler() {
            let regs = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
            if (!regs.test(this.$refs.del.value)) {
                this.phoneReminder = "请输入正确的电话号"
            } else {
                this.phoneReminder = ""
            }
        },
        verifyCodeHandler() {
            if (!this.$refs.verify.value) {
                this.verifyCode = "请输入验证码"
            } else {
                this.verifyCode = ""
            }
        },
        passwordHandler() {
            console.log(this.$refs.password.value)
            if (!this.$refs.password.value) {
                this.passwordSpan = '请输入密码'
            } else {
                this.passwordSpan = ""
            }
        },
        password2Handler() {
            if (!this.$refs.password2.value) {
                this.password2Span = "请输入确认密码"
            } else if (this.$refs.password2.value !== this.$refs.password.value) {
                this.password2Span = "请输入相同的密码"
            } else {
                this.password2Span = ""
            }
        },
        protocolHandler() {
            if (!this.protocolCheck) {
                this.protocol = ""
            } else {
                this.protocol = "请确认注册协议"
            }
        },
       async getCode(){
            if (!this.$refs.del.value){
               alert("请输入正确的手机号")
                return
            }
           const result =await getSendCode(this.$refs.del.value)
           this.$refs.verify.value = result.data
        },
       async submit() {
            this.delHandler()
            this.verifyCodeHandler()
            this.passwordHandler()
            this.password2Handler()
            if (this.protocolCheck) {
                this.protocol = ""
            } else {
                this.protocol = "请确认注册协议"
            }
            const {del,password2,verify}=this.$refs
            let phone = del.value;
            let password = password2.value;
            let code = verify.value;

            console.log(phone,password,code)
            const result = await postRegister({phone,password,code})
           if(result.code!==200){
                alert(result.message)
           }
        }
    }
}
</script>

<style lang="less" scoped>
.register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
            font-size: 14px;
            float: right;

            a {
                color: #e1251b;
            }
        }
    }

    div:nth-of-type(1) {
        margin-top: 40px;
    }

    .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
            font-size: 14px;
            width: 96px;
            text-align: right;
            display: inline-block;
        }

        input {
            width: 270px;
            height: 38px;
            padding-left: 8px;
            box-sizing: border-box;
            margin-left: 5px;
            outline: none;
            border: 1px solid #999;
        }

        img {
            vertical-align: sub;
        }

        .error-msg {
            position: absolute;
            top: 100%;
            left: 495px;
            color: red;
        }
    }

    .controls {
        text-align: center;
        position: relative;

        input {
            vertical-align: middle;
        }

        .error-msg {
            position: absolute;
            top: 100%;
            left: 495px;
            color: red;
        }
    }

    .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
            outline: none;
            width: 270px;
            height: 36px;
            background: #e1251b;
            color: #fff !important;
            display: inline-block;
            font-size: 16px;
        }
    }
}

.copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
        li {
            display: inline-block;
            border-right: 1px solid #e4e4e4;
            padding: 0 20px;
            margin: 15px 0;
        }
    }
}

.verify {
    line-height: 34px;
    padding: 0 20px;
    margin-left: 5px;
}
</style>