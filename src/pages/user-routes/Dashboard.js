import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import Post from '../../components/Post'
import { getCurrUser } from '../../Auth/Auth'
import { deletePostService, loadPostUserWise } from '../../services/post-service'
import { toast } from 'react-toastify'
import PostCard from '../../components/PostCard'

const Dashboard = () => {

  const [user,setUser] = useState({})
  const [post,setPost] = useState([])
  useEffect(() => {
    const fetchUserData = async () => {
      setUser(getCurrUser());
    };

    fetchUserData().then(() => {
      loadPostData();
    });
  }, []);

  const loadPostData = () => {
    const currentUser = getCurrUser();
  
    if (currentUser && currentUser.id) {
      loadPostUserWise(currentUser.id)
        .then(data => {
          console.log(data);
          setPost([...data]);
        })
        .catch(error => {
          console.error("Error in loading posts:", error);
          toast.error("Error in displaying posts user-wise");
        });
    } else {
      console.error("User data is not available or does not have 'id' property.");
      // Handle this case as needed
    }
  };

  const deletePost=(post)=>{
    deletePostService(post.postId).then(response=>{
      console.log(response)
      toast.success("Post is deleted!!")
      loadPostData()
    }).catch(error=>{
      console.log(error)
      toast.error("Error in deleting the post...")
    })
  }

  const isDashboard = true

  return (
    <div>
      <Container>
        <Post/>

        <h1 className='my-3 text-center'>Manage Posts</h1>

        {
          post.map((post,index)=>{
            return(
              <PostCard post={post} key={index} isDashboard={isDashboard} deletePost={deletePost}/>
            )
          })
        }

      </Container>
    </div>
  )
}

export default Dashboard
