import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostListItem.css';

function PostListItem(props) {
  const { slug, cuid, votes, title, content } = props.post;
  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link to={`/posts/${slug}-${cuid}`} >
          {title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {name}</p>
      <p className={styles['post-desc']}>{content}</p>
      <p className={styles['post-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a></p>
      <p>votes: {votes}</p>
      <button onClick={props.onThumbUp}>ThumbUp</button>
      <button onClick={props.onThumbDown}>ThumbDown</button>
      <hr className={styles.divider} />
    </div>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,    
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onThumbUp: PropTypes.func.isRequired,
  onThumbDown: PropTypes.func.isRequired,
};

export default PostListItem;
