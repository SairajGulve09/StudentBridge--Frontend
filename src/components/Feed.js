import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../services/post-service'
import { Col, Row, Spinner } from 'reactstrap'
import PostCard from './PostCard'
import { toast } from 'react-toastify'
// import Post from './Post'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FaSpinner } from 'react-icons/fa'
import './Feed.css'

const Feed = () => {

    const [postContent,setPostContent] = useState({
      content:[],
      totalPages:'',
      totalElements:'',
      pageSize:'',
      lastPage:false,
      pageNumber:''
    })

    const [currentPage,setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(true)

    // useEffect(()=>{
    //     //load all users
    //     getAllPosts(0,5).then((data)=>{
    //         console.log(data)
    //         setPostContent(data)
            

    //     }).catch(error=>{
    //         console.log(error)
    //     }) 
    //   },[])

      useEffect(()=>{
        changePage(currentPage)
      },[currentPage])


       const changePage=(pageNumber=0,pageSize=5)=>{

            if(pageNumber>postContent.pageNumber && postContent.lastPage)
            {
              return;
            }

            if(pageNumber<postContent.pageNumber && postContent.pageNumber===0)
            {
              return;
            }

            getAllPosts(pageNumber,pageSize).then(data=>{
              setPostContent({
                content:[...postContent.content,...data.content],
                totalPages:data.totalPages,
                totalElements:data.totalElements,
                pageSize:data.pageSize,
                lastPage:data.lastPage,
                pageNumber:data.pageNumber
              })
              //window.scroll(0,0)
            }).catch(error=>{
              toast.error("error in loading posts")
            })
       }

       const changePageInfinite=()=>{
          setCurrentPage(currentPage+1)
       }

  const LoadingSpinner = () => (
    <div className="loading-spinner">
      <FaSpinner className="spinner-icon" />
      <span>Loading more posts...</span>
    </div>
  )

  const EndMessage = () => (
    <div className="end-message">
      <h4>🎉 You've reached the end!</h4>
      <p>No more posts to load.</p>
    </div>
  )

  return (

    
    <div className='container-fluid '>
      <Row>
        <Col md={
            {
                size:12
            }
        }>

        <InfiniteScroll
          dataLength={postContent.content.length}
          next={changePageInfinite}
          hasMore={!postContent.lastPage}
          loader={<LoadingSpinner />}
          endMessage={<EndMessage />}
          className="infinite-scroll"
        >

        {
            postContent.content.map((post)=>(
                <PostCard post={post} key={post.postId}/>
            ))
        }
        </InfiniteScroll>
               
        
         

        {/* <Container className="d-flex justify-content-center mt-3">
        <Pagination>
          <PaginationItem onClick={()=>changePage(postContent.pageNumber-1)} disabled= { postContent.pageNumber === 0 }>
            <PaginationLink previous>

            </PaginationLink>
          </PaginationItem>

          {
            [...Array(postContent.totalPages)].map((item,index)=> (

                <PaginationItem onClick={()=>changePage(index)} active = {postContent.pageNumber===index} key={index}>
                  <PaginationLink className='text-dark'>
                    {index+1}
                  </PaginationLink>
                </PaginationItem>

            ))

            
          }

          <PaginationItem onClick={()=>changePage(postContent.pageNumber+1)} disabled={postContent.lastPage===true}>
            <PaginationLink next>

            </PaginationLink>
          </PaginationItem>
        </Pagination>
        </Container> */}

        

        </Col>
      </Row>
    </div>
  )
}

export default Feed
