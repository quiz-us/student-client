// heavily based on: https://github.com/ianstormtaylor/slate/tree/master/examples/rich-text
import { Editor } from 'slate-react';
import { Value } from 'slate';
import React from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Plain from 'slate-plain-serializer';

const styles = {
  root: {
    backgroundColor: '#F6F8FA',
    '& blockquote': {
      borderLeft: '2px solid #ddd',
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: '10px',
      color: '#aaa',
      fontStyle: 'italic'
    },

    "& blockquote[dir = 'rtl']": {
      borderLeft: 'none',
      paddingLeft: 0,
      paddingRight: '10px',
      borderRight: '2px solid #ddd'
    },

    '& code': {
      backgroundColor: '#eee',
      padding: '3px'
    }
  },
  editor: {
    fontFamily: "'Roboto', sans-serif",
    lineHeight: 1.2,
    fontSize: '16px',
    padding: '15px'
  },
  icon: {
    width: '.8em'
  }
};

class ReadOnly extends React.Component {
  state = {
    value: Value.fromJSON(this.props.value)
  };

  render() {
    const { classes, editorClass } = this.props;
    return (
      <div className={classes.root}>
        <Editor
          className={`${classes.editor} ${editorClass}`}
          value={this.state.value}
          renderBlock={this.renderBlock}
          renderMark={this.renderMark}
          readOnly
        />
      </div>
    );
  }

  renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'image':
        return <img {...attributes} src={node.data.get('file')} />;
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      default:
        return next();
    }
  };

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };
}

ReadOnly.propTypes = {
  value: PropTypes.object
};

ReadOnly.defaultProps = {
  value: Plain.deserialize('')
};

export default withStyles(styles)(ReadOnly);
