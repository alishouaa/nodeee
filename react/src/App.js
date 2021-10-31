import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './component/Register';
import Home from './component/Home';
import Login from './component/Login';
import Header from './component/Headers';
import Privacy from './component/Privacy';


class App extends Component {

  state = {
    posts: [],
    text: '',
    content: '',
    image: null,
    count: [],
  }

  SaveText = (e) => {
    this.setState({
      text: e.target.value
    })
  }
  SaveContent = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  SaveImage = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  }

  /* ---------------------------------------------------- * */

  addSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('avatar', this.state.image);
    formData.append('post', this.state.text)
    formData.append('content', this.state.content)
    formData.append('userId', localStorage.getItem('_id'));

    fetch('http://localhost:8080/api/addPost', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'multipart/form-data'
      },
    })
      .then(res => res.json())
      .then(res => {
        e.target.text.value = '';
        e.target.content.value = '';
        e.target.file.files = null;
        this.getData();
      })
  }

  /**----------------------------------------------------------------- */

  getData = () => {
    fetch('http://localhost:8080/api/getPost', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          posts: data.posts.reverse(),
        });
      })
  }

  componentDidMount() {

    this.count()
    this.getData()

  }

  /**----------------------------------------------------------------- */

  deletPost = (index, id) => {
    const data = { "userId": localStorage.getItem('_id') }
    fetch(`http://localhost:8080/api/delete-post/${id}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(() => this.setState({ status: 'Delete successful' }));
    let posts = this.state.posts;
    posts.splice(index, 1);
    this.setState({
      posts: posts
    })
  }
  /**----------------------------------------------------------------- */





  editPost = (value, valueContent, id) => {

    const data = {
      "posts": value,
      "content": valueContent
    }
    fetch(`http://localhost:8080/api/update-post/${id}`
      ,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(() => this.setState({ status: 'update successful' }));

    let posts = this.state.posts;
    let change = posts.find((post) => post._id === id);
    change['post'] = value;
    change['content'] = valueContent;
    this.setState({
      posts
    })

  }

  /**----------------------------------------------------------------- */


  count = () => {
    fetch('http://localhost:8080/api/count-like', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          count: data.posts
        });

        const arr = this.state.count.map(dt => {
          return (dt)

        })
        this.setState({
          count: arr
        })


      })

  }
  LikePost = async (id) => {
    const data = {
      "userId": localStorage.getItem('_id'),
      "postId": id
    }
    fetch('http://localhost:8080/api/add-like', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(()=> {
      this.count()
    })

  }
  deleteLike = async (id) => {
    const data = {
      "userId": localStorage.getItem('_id'),
      "postId": id
    }
    fetch('http://localhost:8080/api/delete-like', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(()=> {
      this.count()
    })
     }




  countLikeFunction = (array_elements, value) => {

    array_elements.sort();

    var cnt = 0;
    for (var i = 0; i < array_elements.length; i++) {
      if (array_elements[i].postId === value) {
        cnt++;
      }

    }
    return cnt;
  }

  render() {
    this.state.posts.filter((post) => {
      return post._id === localStorage.getItem('_id')
    })
    return (
      <Router>
        <Header />
        <div className="container px-md-5">

          <Switch>
            <Route exact path='/' render={(props) => <Home posts={this.state.posts}
              like={this.state.like}
              LikePost={this.LikePost}
              deleteLike={this.deleteLike}
              count={this.state.count}
              onChangeInput={this.onChangeInput}
              countLikeFunction={this.countLikeFunction}
              addSubmit={this.addSubmit}
              SaveText={this.SaveText}
              SaveImage={this.SaveImage}
              SaveContent={this.SaveContent}
            />} />
            <Route path='/Login' component={Login} />
            <Route path='/Register' component={Register} />
            <Route path='/Privacy' render={(props) => <Privacy
              posts={this.state.posts}
              deletPost={this.deletPost}
              toggleState={this.toggleState}
              editPost={this.editPost}
              like={this.state.like}
              LikePost={this.LikePost}
              count={this.state.count}
              onChangeInput={this.onChangeInput}
              countLikeFunction={this.countLikeFunction}
            />} />

          </Switch>
        </div>
      </Router>
    );
  }


}

export default App;
