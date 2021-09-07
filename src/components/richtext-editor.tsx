import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { Button } from 'antd'
import { get } from '@util/http'

export default class PreviewDemo extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState('')
  }

  handleChange = (editorState) => {
    this.setState({ editorState })
  }

  preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close()
    }

    window.previewWindow = window.open()
    window.previewWindow.document.write(this.buildPreviewHtml())
    window.previewWindow.document.close()
  }

  submit = () => {
    const { onSubmit } = this.props
    const { editorState } = this.state 

    onSubmit(editorState.toHTML())
  }

  buildPreviewHtml () {
    return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `
  }

  componentDidUpdate (prevProps) {
    if (this.props.defaultText !== prevProps.defaultText) {
      this.setState({
        editorState: BraftEditor.createEditorState(this.props.defaultText)
      })
    }
  }

  componentDidMount () {
    console.log('componentDidMount', this.props)
    const { defaultText } = this.props
    
    this.setState({
      editorState: BraftEditor.createEditorState(defaultText)
    })
  }

  render () {
    console.log('render')
    const excludeControls = [
      'letter-spacing',
      'line-height',
      'clear',
      'headings',
      'list-ol',
      'list-ul',
      'remove-styles',
      'superscript',
      'subscript',
      'hr',
      'text-align'
    ]

    const extendControls = [
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: this.preview
      },  {
        key: 'my-component',
        type: 'component',
        component: <Button className="control-item button" type="text" onClick={this.submit}>提交</Button>
      }
    ]

    return (
      <div className="editor-wrapper">
        <BraftEditor
          value={this.state.editorState}
          onChange={this.handleChange}
          excludeControls={excludeControls}
          extendControls={extendControls}
          contentStyle={{height: 400}}
        />
      </div>
    )
  }
}
