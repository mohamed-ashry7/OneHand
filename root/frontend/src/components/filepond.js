import React, { Component } from 'react';

// Import React FilePond
import { FilePond,File, registerPlugin } from 'react-filepond';

import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
// import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImageResize,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginImageTransform
);

// Our app
class filepond extends Component {
    constructor(props) {
      super(props);
      this.state = {
         files: []
      };
    }
    render() {
      const { onChangeValue } = this.props;
      return (
        <div className="App">
          <FilePond
            ref={ref => (this.pond = ref)}
            files={this.state.files}
            onaddfile={(err,fileItems)=> {
              const FileData = {
                type : fileItems.file.type,
                data : fileItems.getFileEncodeBase64String()
              }
              onChangeValue(FileData);
            }}
          />
        </div>
      );
    }
  }
export default filepond;