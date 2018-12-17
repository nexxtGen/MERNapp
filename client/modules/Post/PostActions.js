import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const THUMB_UP = 'THUMB_UP';
export const THUMB_DOWN = 'THUMB_DOWN';

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    return callApi('posts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
        votes: 0,
      },
    }).then(res => dispatch(addPost(res.post))
    ).catch( err => {
      console.log('addPostRequest error: ', err);            
    });
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi('posts').then(res => {
      dispatch(addPosts(res.posts));
    }).catch( err => {
      console.log('FetchPosts error: ', err);            
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post))
    ).catch( err => {
      console.log('FetchPost error: ', err);            
    });
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid))
    ).catch( err => {
      console.log('updateLaneRequest error: ', err);            
    });
  };
}

//Add new functionality
export function editPost (cuid, post) {
  return {
    type: EDIT_POST,
    cuid,
    post
  };
}

export function editPostRequest(cuid, post) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'put', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content
      },
    }).then(() => dispatch(editPost(cuid, post))
    ).catch( err => {
      console.log('EditPostRequest error: ', err);            
    });     
  };
}
// Add votes functionality (thumbUp)
export function thumbUp(cuid) {
  return {
    type: THUMB_UP,
    cuid    
  };
}

export function thumbUpRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}/thumbUp`, 'put').then(() => {
    dispatch(thumbUp(cuid))
    }).catch( err => {
      console.log('thumbUpreq error: ', err);            
    });
  }
}
// Add votes functionality (thumbDown)
export function thumbDown(cuid) {
  return {
    type: THUMB_DOWN,
    cuid    
  };
}

export function thumbDownRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}/thumbDown`, 'put').then(() => dispatch(thumbDown(cuid))
    ).catch( err => {
      console.log('thDownReq error: ', err);            
    });
  }
}
