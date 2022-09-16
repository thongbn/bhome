import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {CKEditor} from "@ckeditor/ckeditor5-react";
// import CustomEditor  from 'custom-editor/build/ckeditor'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import DecoupledEditor from '../../../../../../../node_modules/@ckeditor/ckeditor5-build-decoupled-document';
import {Box} from "@strapi/design-system/Box";

const Wrapper = styled(Box)`
  .ck-editor__main {
    min-height: ${200 / 16}em;
    > div {
      min-height: ${200 / 16}em;
    }
    // Since Strapi resets css styles, it can be configured here (h2, h3, strong, i, ...)
    h1, h2, h3, h4, h5, h6{
      font-weight: bold;
    }
    
    h2{
      font-size: 1.5em;
    }
    
    h3{
      font-size: 1.17em;
    }
    
    ul {
      list-style: circle inside;
    }
    
    ol {
        list-style: numbered inside;
    }
    
    strong,b{
      font-weight: 600
    }
    i{
      font-style: italic;
    }
  }
`;

const configuration = {
  toolbar: [
    'heading', '|',
    'alignment', '|',
    'bold', 'italic', '|',
    'link', '|',
    'bulletedList', 'numberedList', 'todoList',
    '-', // break point
    'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|',
    'code', 'codeBlock', '|',
    'insertTable', '|',
    'outdent', 'indent', '|',
    'blockQuote', '|',
    'undo', 'redo'
  ],
  shouldNotGroupWhenFull: true
};

const Editor = ({onChange, name, value, disabled}) => {
  return (
    <Wrapper>
      <CKEditor
        editor={ClassicEditor}
        disabled={disabled}
        config={configuration}
        data={value || ""}
        onReady={(editor) => editor.setData(value || "")}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({target: {name, value: data}});
        }}
      />
    </Wrapper>
  );
};

Editor.defaultProps = {
  value: "",
  disabled: false,
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Editor;
