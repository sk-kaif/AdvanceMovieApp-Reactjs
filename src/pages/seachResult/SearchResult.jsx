import "./style.scss"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"

import { fetchDataFromApi } from "../../utils/api"
import { ContentWrapper, MovieCard,Spinner} from "../../components/compoIndex"
import noResult from "../../assets/no-results.png"

const SearchResult = () => {
  const [data,setData] = useState(null)
  const [pageNum,setPageNum] = useState(1)
  const [loading,setLoading] = useState(false)
  const {query} = useParams()


  // for inital render
  const fetchInitalData=async()=>{
    setLoading(true);
    const res = await fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    setData(res)
    setPageNum(pre => pre + 1)
    setLoading(false)
  }

  // for update page by page
  const fetchNextPage=()=>{
    const res1 = fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    if(data?.results){
      setData({...data, results : [...data?.results, ...res1.results], })
    }
    else{
      setData(res1)
    }
    setPageNum((prev)=> prev + 1)
  }


  useEffect(()=>{
    setPageNum(1)
    fetchInitalData()
  },[query])

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />} 
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle ">
                {`Search ${data.total_results > 1 ? "results" : "result"} of ${query}` }
              </div>
              <InfiniteScroll className="content" 
                dataLength={data?.results?.length || []} 
                next={fetchNextPage} 
                hasMore={pageNum <= data?.total_pages} 
                loader={<Spinner />}
              >
                {data?.results.map((item,idx)=>{
                  if(item.media_type === 'person')return;
                  return(
                    <MovieCard key={idx} data={item} fromSearch={true}/>
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

export default SearchResult