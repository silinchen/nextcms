import Tinymce from '@components/tinymce'

const Editor = ({ value, onChange }, ref) => (
  <div ref={ref}>
    <Tinymce value={value} input={onChange} id="post_form_content"></Tinymce>
  </div>
)

export default React.forwardRef(Editor)
