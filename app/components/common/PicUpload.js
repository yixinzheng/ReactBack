import React from 'react';
import {Upload,Icon,Button,message} from 'antd';
import {goobleApi,UserModel} from '../../Datas/dataModel';

class PicUpload extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            imgUrl:"",
            fileList:[]
        };
        this.handleChange=this.handleChange.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.fileurl && this.props.fileurl!=nextProps.fileurl){
            this.setState({
                imgUrl:nextProps.fileurl,
                fileList:[{
                    uid: -1,
                    status: 'done',
                    url: nextProps.fileurl
                }]
            });
        }
    }

    handleChange(info){

        let fileList = info.fileList;

        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);

        // 2. read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url.file;
            }
            return file;
        });

        // 3. filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
            if (file.response) {
                this.props.uploadImg(file.url);
                return file.response.status == '0';
            }
            return true;
        });
        this.setState({ fileList });

    };

    render() {
        const tk=UserModel.fetchToken();
        const pic_props={
            action:`${goobleApi}api/admin/upload-img?token=${tk}`,
            onChange:this.handleChange,
            listType:"picture",
            fileList:this.state.fileList,
            multiple:false
        };
        return (
            <div className="clearfix">
                <Upload
                    {...pic_props}
                    className="upload-list-inline"
                    >
                    <Button type="primary">
                        <Icon type="upload" /> {this.props.title?this.props.title:"上传图片"}
                    </Button>
                </Upload>
            </div>
        );
    }
}

export default PicUpload;
