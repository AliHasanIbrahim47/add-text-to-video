import React, { useState } from 'react';

import Input from './components/Form/Input';
import Button from './components/UI/Button';

import classes from './App.module.css';

// Cloudinary
import { AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";


import { source } from "@cloudinary/url-gen/actions/overlay";

import { Position } from "@cloudinary/url-gen/qualifiers/position";

import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { text } from '@cloudinary/url-gen/qualifiers/source';
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";

const App = () => {

  const initailTextOptions = {
    text: '',
    fontSize: 14,
    xPosition: 0,
    yPosition: 0,
    duration: 5,
    startTime: 0,
  };

  const [textOptions, setTextOptions] = useState(initailTextOptions);

  const handleDownloadVideo = async () => {
    try {
      const videoUrl = myVideo.toURL();
      const videoRequest = new Request(videoUrl);
      const response = await fetch(videoRequest);

      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'modified_video.mp4';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error('Failed to fetch the video:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error downloading the video:', error);
    }
  };


  const cld = new Cloudinary({
    cloud: {
      cloudName: 'demo'
    }
  });

  const myVideo = cld.video('docs/walking_talking');

  myVideo
    .resize(fill().width(400).height(400))
    .roundCorners(byRadius(20));

  myVideo.overlay(
    source(text(textOptions.text, new TextStyle("Arial", textOptions.fontSize)
      .fontWeight("bold"))
      .textColor("#FFFFFF"))
      .position(new Position().offsetY(1 - (textOptions.yPosition / 100)).offsetX(textOptions.xPosition / 100))
    //.timeline(position().startOffset(textOptions.startTime).endOffset(textOptions.startTime + textOptions.duration))
  );

  return (
    <div className={classes.app}>
      <h1>Video Text Overlay App</h1>
      <Input setTextOptions={setTextOptions} />

      <AdvancedVideo cldVid={myVideo} controls />

      <div classes={classes['control-group']}>
        <Button className={classes.customButton} onClick={handleDownloadVideo}>Download Modified Video</Button>
      </div>

    </div>
  );
};

export default App;