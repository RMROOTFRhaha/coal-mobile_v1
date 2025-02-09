"use dom";
import { WebView } from 'react-native-webview';
import React, { useEffect, useState } from 'react';

export default function textEditor() {

  // State Set-Up for dynamic editor
  const[noteContent, setNoteContent] = useState('');
  const[editorFunction, setEditorFunction] = useState('');

  const javaScript = `
  const quill = new Quill('#editor', {
    theme: 'snow'
  });
  `;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet">
      </head>
      <body>
        <div id="editor">
          <p>Hello World!</p>
          <p>Text Editor here</p>
          <p><br /></p>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"></script>
        <script>
          ${javaScript}
        </script>
      </body>
    </html>
  `;

  return <WebView originWhitelist={["https://*"]} source={{ html: htmlContent }} javaScriptEnabled={true} />;

}