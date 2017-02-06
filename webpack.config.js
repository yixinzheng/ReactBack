module.exports={
    entry:'./app/index.js',
    output:{
        path:'./build',
        publicPath:'build',
        filename:'bundle.js'
    },
    devServer:{
        port:3000,
        inline:true
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                loader:'babel',
                query:{
                    "presets":["react","es2015","stage-0"],
                    "plugins": [["antd", [{ "libraryName": "antd", "style": "css" }]]]
                }
            },
            {
                test:/\.css$/,
                loader:'style-loader!css-loader!autoprefixer-loader'
            },
            {
                test:/\.scss/,
                loader:'style-loader!css-loader!sass-loader!autoprefixer-loader'
            },
            {
                // edit this for additional asset file types
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=819200'
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            }
        ]
    }
};
