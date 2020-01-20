import { useState, useEffect } from 'react'
import { message } from 'antd'
import load from './dynamicLoadScript'
import plugins from './plugins'
import toolbar from './toolbar'
import UploadImage from './uploadImage'
import styles from "./styles.less"

const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'
const defaultTinymceId = 'react-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')

const Tinymce = (props) => {
  const { id, menubar:bar, value, height, input } = props
  const tinymceId = id || defaultTinymceId
  const menubar = bar || 'file edit insert view format table'
  const [hasInit, setHasInit] = useState(false)
  const [hasChange, setHasChange] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  
  const init = () => {
    // dynamic load tinymce from cdn
    load(tinymceCDN, (err) => {
      if (err) {
        message.error(err.message)
        return
      }
      initTinymce()
    })
  }

  const initTinymce = () => {
    window.tinymce.init({
      language: 'zh_CN',
      selector: `#${tinymceId}`,
      height: height || '360',
      body_class: 'panel-body ',
      object_resizing: false,
      toolbar: toolbar.length > 0 ? toolbar : toolbar,
      menubar: menubar,
      plugins: plugins,
      end_container_on_empty_block: true,
      powerpaste_word_import: 'clean',
      code_dialog_height: 450,
      code_dialog_width: 1000,
      advlist_bullet_styles: 'square',
      advlist_number_styles: 'default',
      imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
      default_link_target: '_blank',
      link_title: false,
      nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
      init_instance_callback: editor => {
        if (value) {
          editor.setContent(value)
        }
        setHasInit(true)
        editor.on('NodeChange Change KeyUp SetContent', () => {
          setHasChange(true)
          input && input(editor.getContent())
        })
      },
      setup(editor) {
        editor.on('FullscreenStateChanged', (e) => {
          setFullscreen(e.state)
        })
      }
      // 整合七牛上传
      // images_dataimg_filter(img) {
      //   setTimeout(() => {
      //     const $image = $(img);
      //     $image.removeAttr('width');
      //     $image.removeAttr('height');
      //     if ($image[0].height && $image[0].width) {
      //       $image.attr('data-wscntype', 'image');
      //       $image.attr('data-wscnh', $image[0].height);
      //       $image.attr('data-wscnw', $image[0].width);
      //       $image.addClass('wscnph');
      //     }
      //   }, 0);
      //   return img
      // },
      // images_upload_handler(blobInfo, success, failure, progress) {
      //   progress(0);
      //   const token = $store.getters.token;
      //   getToken(token).then(response => {
      //     const url = response.data.qiniu_url;
      //     const formData = new FormData();
      //     formData.append('token', response.data.qiniu_token);
      //     formData.append('key', response.data.qiniu_key);
      //     formData.append('file', blobInfo.blob(), url);
      //     upload(formData).then(() => {
      //       success(url);
      //       progress(100);
      //     })
      //   }).catch(err => {
      //     failure('出现未知问题，刷新页面，或者联系程序员')
      //     console.log(err);
      //   });
      // },
    })
  }

  const destroyTinymce = () => {
    const tinymce = window.tinymce.get(tinymceId)
    if (fullscreen) {
      tinymce.execCommand('mceFullScreen')
    }

    if (tinymce) {
      tinymce.destroy()
    }
  }

  useEffect(() => {
    init()
    return destroyTinymce
  }, [tinymceId])

  useEffect(() => {
    if (!hasChange && hasInit) {
      window.tinymce.get(tinymceId).setContent(value || '')
    }
  }, [value])

  // 通过自定义上传图片上传完成后将图片插入编辑内容
  const uploadComplete = (fileList) => {
    fileList.forEach(v => {
      window.tinymce.get(tinymceId).insertContent(`<img src="${v.url || v.response.url}" >`)
    })
  }

  return (
    <div className={styles.tinymce__container}>
      <textarea id={tinymceId} className={styles.tinymce__textarea}></textarea>
      <div className={styles.editor__custom__btn__container}>
        <UploadImage className={styles.editor__upload__btn} uploadComplete={uploadComplete} />
      </div>
    </div>
  )
}

export default Tinymce
