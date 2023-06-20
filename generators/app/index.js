const Generator = require("yeoman-generator");
const fs = require('fs');

const choices = ['uniapp', 'vue', 'react'];
module.exports = class extends Generator {
    // 初始化方法 (检查当前项目的状态，配置，等)
    initializing() {}
    // 用户提示选项 (在这你会使用 this.prompt())
    prompting() {
        return this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname, // Default to current folder name
            },
            {
                type: "list",
                name: "template",
                message: "pick your template",
                choices: choices
            },
        ]).then(function (answers) {
            this.log('project: ', answers.name);
            this.log('template: ', answers.template);

            this.answers = answers;
        }.bind(this));
    }
    // 保存配置并配置项目 (创建 .editorconfig 文件和其他元数据文件)
    configuring() {}
    // 如果方法名称不匹配优先级，将被推到这个组。
    default() {}
    // 这里是你写的 generator 特殊文件(路由，控制器，等)
    writing() {
        // 目录名称
        const createDirName = this.destinationRoot() + '\\' + this.answers.name;
        // 模板路径
        const templatePath = this.templatePath() + '\\' + this.answers.template;
        // 判断文件夹是否存在
        if(fs.existsSync(createDirName)) {
            throw new Error("文件夹已存在");
        }
        // 创建文件夹
        fs.mkdirSync(createDirName);
        // 拷贝文件
        this.fs.copy(templatePath, createDirName);
    }
    // 处理冲突的地方 (内部使用)
    conflicts() {}
    // 运行(npm, bower)时的安装
    install() {}
    // 运行(npm, bower)时的安装
    end() {}
};
