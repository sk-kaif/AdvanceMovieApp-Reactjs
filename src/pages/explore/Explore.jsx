import React from 'react'
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import './style.scss'
import InfiniteScroll from "react-infinite-scroll-component"

import useFetch from '../../hooks/useFetch'
import { ContentWrapper,MovieCard,Spinner } from '../../components/compoIndex'
import noResult from "../../assets/no-results.png"


const Explore = () => {
  const {mediaType} = useParams()
  const [pageNum,setPageNum] = useState(1)
  const {data,loading} = useFetch(`/${mediaType}/popular`)

  
  useEffect(()=>{
  },[mediaType])
  


  
  return (
    <div className="searchResultsPage">
    {loading && <Spinner initial={true} />} 
    {!loading && (
      <ContentWrapper>
        {data?.results?.length > 0 ? (
          <>
            <div className="pageTitle ">
              {`Search ${data.total_results > 1 ? "results" : "result"} of ${mediaType}` }
            </div>
            <InfiniteScroll className="content" 
              dataLength={data?.results?.length || []} 
              // next={fetchNextPage} 
              // hasMore={pageNum <= data?.total_pages} 
              loader={<Spinner />}
            >
              {data?.results.map((item,idx)=>{
                if(item.media_type === 'person')return;
                return(
                  <MovieCard key={idx} data={item} fromSearch={true} mediaType={mediaType}/>
                )
              })}
            </InfiniteScroll>
          </>
        ) :(
          <span className="resultNotFound">{`Soory :( not found`}</span>
        )}
      </ContentWrapper>
    )}
  </div>
  )
}

export default Explore