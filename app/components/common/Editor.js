import React from 'react';
import '../../../build/ueditor/ueditor.config.js';
import '../../../build/ueditor/ueditor.all.min.js';
import '../../../build/ueditor/lang/zh-cn/zh-cn.js';

import {goobleApi} from '../../Datas/dataModel';
class UEditor extends React.Component {
    // 设置默认的属性值
    constructor(props) {
        super(props);
        this.state= {
            disabled: false,
            height: 500,
            content:''
        };
    }
    render() {
        return (
            <div>
                 <textarea id={this.props.id}>
                 </textarea>
            </div>
        );
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.contents && nextProps.contents!=this.props.contents){
            this.setState({
                content:nextProps.contents
            },function(){
                this.initEditor();
            })
        }

    }
   // 调用初始化方法

    componentDidMount() {
        this.initEditor();
    }

    // 编辑器配置项初始化
    initEditor() {
        var id = this.props.id;
        var ue = UE.getEditor(id, {
            // 工具栏，不配置有默认项目
            toolbars: [[
                'fullscreen', 'source', '|', 'undo', 'redo', '|',
                'bold', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch',
                '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                'indent', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                'emotion',
                'horizontal', '|', 'date', 'time', '|', 'insertimage'
            ]],
            lang: 'zh-cn',
            // 字体
            'fontfamily': [
                {label: '', name: 'songti', val: '宋体,SimSun'},
                {label: '', name: 'kaiti', val: '楷体,楷体_GB2312, SimKai'},
                {label: '', name: 'yahei', val: '微软雅黑,Microsoft YaHei'},
                {label: '', name: 'heiti', val: '黑体, SimHei'},
                {label: '', name: 'lishu', val: '隶书, SimLi'},
                {label: '', name: 'andaleMono', val: 'andale mono'},
                {label: '', name: 'arial', val: 'arial, helvetica,sans-serif'},
                {label: '', name: 'arialBlack', val: 'arial black,avant garde'},
                {label: '', name: 'comicSansMs', val: 'comic sans ms'},
                {label: '', name: 'impact', val: 'impact,chicago'},
                {label: '', name: 'timesNewRoman', val: 'times new roman'}
            ],
            // 字号
            'fontsize': [10, 11, 12, 14, 16, 18, 20, 24, 36],
            // 为编辑器实例添加一个路径，必需项
            'UEDITOR_HOME_URL': 'build/ueditor/',
            //'UEDITOR_HOME_URL': '/node_modules/ueditor/example/public/ueditor/',
            // 上传图片时后端提供的接口
            //serverUrl: window.api_host + '/innerMessage/uploadImage',
            serverUrl:`${goobleApi}ueditor/file`,
            enableAutoSave: false,
            autoHeightEnabled: false,
            initialFrameHeight: this.props.height,
            initialFrameWidth: '100%',
            initialContent:"",
            // 是否允许编辑
            readonly: this.props.disabled
        });
        this.editor = ue;
        var self=this;
        this.editor.ready(function (ueditor) {
            if (!ueditor) {
                // 如果初始化后ueditor不存在删除后重新调用
                UE.delEditor(self.props.id);
                self.initEditor();
            }
            self.setContent(self.state.content,false);
            //self.setContent(self.props.contents,false);
        });

    }

    // 获取编辑器的内容
    getContent() {
        if (this.editor) {
            return this.editor.getContent();
        }
        return '';
    }

    /**
     * 写入内容｜追加内容
     * @param {Boolean} isAppendTo    [是否是追加]
     * @param {String}  appendContent [内容]
     */
    setContent (appendContent, isAppendTo) {
        if (this.editor) {
            this.editor.setContent(appendContent, isAppendTo);
        }
    }
    // 获取纯文本
    getContentTxt() {
        if (this.editor) {
            return this.editor.getContentTxt();
        }
        return '';
    }

// 获得带格式的纯文本
    getPlainTxt() {
        if (this.editor) {
            return this.editor.getPlainTxt();
        }
        return '';
    }

// 判断是否有内容
    hasContent() {
        if (this.editor) {
            return this.editor.hasContents();
        }
        return false;
    }

// 插入给定的html
    insertHtml(content) {
        if (this.editor) {
            this.editor.execCommand('insertHtml', content);
        }
    }

// 使编辑器获得焦点
    setFocus() {
        if (this.editor) {
            this.editor.focus();
        }
    }

// 设置高度
    setHeight(height) {
        if (this.editor) {
            this.editor.setHeight(height);
        }
    }
}


export default UEditor;