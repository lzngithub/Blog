
//计算器的运算方法
class Cal{
    constructor(){
        //给计算赋初值
        this.result = 0;
    }
    add(num){
        this.result += num;
        //这样可以链式操作
        return this;
    }
    sub(num){
        this.result -= num;
        return this;
    }
    mul(num){
        this.result *= num;
        return this;
    }
    div(num){
        this.result /= num;
        return this;
    }
};
//正经的运算过程
class Deal{
    constructor(){
        //引入计算逻辑
        this.cal = new Cal();
        //str是用来渲染进input中的
        this.str = "";
        //这个是用来计算最终结果的
        this.res = null;
        this.pointSwitch = true;
        //记录上次按键的状态
        this.lastState = [];
        //记录每次输入的数字
        this.numList = [];
        //第几次按下功能按键
        this.funcCount = 0;
        //输入输出框
        this.oInput = document.getElementsByTagName("input");
        //数字按键
        this.btns = document.querySelector(".num")
        //功能按键
        this.func = document.querySelector(".signs")
        //加减乘除的符号对照表
        this.path = {
            "+":"add",
            "-":"subtraction",
            "*":"multiplication",
            "/":"division",
        }
        this.register();
    }
    //input框显示内容
    show(){
        this.oInput[0].value = this.str;
    }
    //注册事件
    register(){
        //点击数字键盘的事件
        this.btns.addEventListener("click",(e)=>{
            //别把ul给点了
            if(e.target.className == "num") return;
            //对点的个数的判断,避免进行多次的点操作
            if(e.target.className=="point"){
                if(!this.pointSwitch) return;
                else{
                    this.pointSwitch=!this.pointSwitch;
                }
    
            }
            //点中等号
            if(e.target.className == "equal") {
                //按下等号，把最后一次的数据也推入数组
                this.res = parseFloat(this.str);
                this.numList.push(this.res)
                //遍历符号数组，对数字数组操作
                this.lastState.forEach((v,i)=>{
                    if(v == "+"){
                        this.cal.add(this.numList[i])
                    }
                    if(v == "-"){
                        this.cal.sub(this.numList[i])
                    }
                    if(v == "*"){
                        this.cal.mul(this.numList[i])
                    }
                    if(v == "/"){
                        this.cal.div(this.numList[i])
                    }
                })
                //把最终运算结果取出
                this.res = this.cal.result;
                this.str = this.res;
                this.show();
                //显示出去后，变量清零
                this.numList = [];
                this.lastState = [];
                this.res = 0;
                this.cal.result = 0;
                this.funcCount = 0;
            }
            //点中数字或者点符号,获取对应按键的内容
            else{
                this.str = this.str + e.target.innerText;
                this.show();
            }
           
        })
        //点击功能按键
        this.func.addEventListener("click",(e)=>{
            this.targetCn = e.target.className;
            //清除按键
            if(this.targetCn=="clear"){
                this.str = "";
                this.res = 0;
                this.cal.result = 0;
                this.funcCount = 0;
                this.show();
            }
            //如果按功能键前没有输入数字，返回
            if(!this.str)return;
            //第一次按功能键都是用来存值的
            if(this.funcCount == 0){
                //把数字转换，放在res中
                this.res = parseFloat(this.str);
                //把数字赋值给计算器中的初始值
                this.cal.result = this.res
                console.log("初始值"+this.cal.result);
            }
            //存值之后的加减法，把按键状态存入数组，把刚才输入的数存入数组，但是第一次的输入数字不需要保存
            this.dataDeal("+");
            this.dataDeal("-");
            this.dataDeal("*");
            this.dataDeal("/");
        })
    }
    //数据处理模块
    dataDeal(sign){
        if(this.targetCn == this.path[sign]){
            //保存运算符号
            this.lastState.push(sign)
            this.str = "";
            //如果是第一次按键，仅保存运算符号
            if(this.funcCount!=0){
                //如果不是第一次按键，保存刚刚的数据到数组
                //先把数据转换了
                this.str = this.oInput[0].value
                this.res = parseFloat(this.str);
                //把res存入数组
                this.numList.push(this.res);
                this.str = "";
            }
            this.funcCount++;
        }
    }
}
