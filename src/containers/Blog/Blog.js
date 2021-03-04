import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selctedPostId: null
    }
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response =>{
                const posts = response.data.slice(0, 4);
                const updatedPosts  = posts.map(post => {
                    return {
                        ...post,
                        author: 'Fakhri'
                    }
                })
                this.setState({posts: updatedPosts})
                console.log(response);
            });
    }

    postSelectedHandler = (id) =>{
        this.setState({selctedPostId: id});
    }

    render () {
        const posts = this.state.posts.map(post => {
            return <Post 
            clicked={()=>this.postSelectedHandler(post.id)} 
            author={post.author} 
            key={post.id} 
            title={post.title}
            />;
        });
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selctedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;