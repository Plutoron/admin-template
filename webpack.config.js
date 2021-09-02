const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
  const { 
    mode,  // 通过 mode 判断 开发 和 生产
  } = argv

  const isDEV = mode === 'development'
  const outputPath = path.resolve(__dirname, 'dist')

  return {
    entry: './src/index.tsx',
    output: {
      path: outputPath,
      filename: isDEV ? '[name].js' : 'js/[name].[contenthash].js',
      chunkFilename: isDEV ? '[name].js' : 'js/[name].[contenthash].js',
      publicPath: isDEV ? '/' : './',
    },
    devServer: {
      historyApiFallback: true,
      contentBase: __dirname,
      open: false,
      hot: true,
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://localhost:3031', // 这是本地用node写的一个服务，用webpack-dev-server起的服务默认端口是8080
          pathRewrite: {"/api" : ""}, // 后台在转接的时候url中是没有 /api 的
          changeOrigin: true, // 加了这个属性，那后端收到的请求头中的host是目标地址 target
        },
      }
    },
    optimization: {
      splitChunks: {
        name: false,
        cacheGroups: {
          common: {
            test: /[\\/]node_modules[\\/] || src\//,
            chunks: 'all',
            name: 'common',
            minSize: 0,
            minChunks: 2,
            priority: 10, //优先级
            enforce: true,
          },
        },
      },
      minimizer: [ 
        ...(isDEV ? [] : [
          new TerserPlugin({
            parallel: true,
          }),
		  	])],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css?$/,
          use: [
            isDEV ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
          ]
        },
        {
          test: /\.less?$/,
          use: [
            isDEV ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  // sourceMap: true, 
                  // modifyVars: theme, 
                  javascriptEnabled: true
                }
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js', 'less' ],
      alias: {
        '@src': path.resolve(__dirname, 'src'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@util': path.resolve(__dirname, 'src/util'),
      }
    },
    plugins: [
      ...(
        isDEV 
          ? [] 
          : [
            new MiniCssExtractPlugin({
              filename: 'css/[name].[contenthash].css',
              chunkFilename: 'css/[name].[contenthash].css',
            }),
          ]
      ), 
      new HtmlWebpackPlugin({
        title: 'title 参数 生成的html模板的title。但指定了 template 后 该参数无效！！！',
        // filename: 'xxxx.html',   // build后html文件名 localhost:8080/xxxx.html
        template: 'template/index.html'  // 入口html文件模板，不指定的话，会默认生成 一个html模版
      }),
    ]
  }
}