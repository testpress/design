/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import './styles.css';

import {registerDragonSupport} from 'https://esm.sh/@lexical/dragon';
import {createEmptyHistoryState, registerHistory} from 'https://esm.sh/@lexical/history';
import {HeadingNode, QuoteNode, registerRichText} from 'https://esm.sh/@lexical/rich-text';
import {mergeRegister} from 'https://esm.sh/@lexical/utils';
import {createEditor} from 'https://esm.sh/lexical';



const editorRef = document.getElementById('editor');
const stateRef = document.getElementById(
  'lexical-state',
);

const initialConfig = {
  namespace: 'Vanilla JS Demo',
  // Register nodes specific for @lexical/rich-text
  nodes: [HeadingNode, QuoteNode],
  onError: (error) => {
    throw error;
  },
  theme: {
    // Adding styling to Quote node, see styles.css
    quote: 'PlaygroundEditorTheme__quote',
  },
};
const editor = createEditor(initialConfig);
editor.setRootElement(editorRef);

// Registring Plugins
mergeRegister(
  registerRichText(editor),
  registerDragonSupport(editor),
  registerHistory(editor, createEmptyHistoryState(), 300),
);

editor.registerUpdateListener(({editorState}) => {
  stateRef.value = JSON.stringify(editorState.toJSON(), undefined, 2);
});
