import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import {Cast, DetailsBanner, Recommendation, Similar, VideosSections} from "./../pagesIndex.js";


const Details = () => {
  const { mediaType, id } = useParams();
  // for video
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  // for Cast Actor Info
  const { data:credits, loading : creditsLoading} = useFetch(`/${mediaType}/${id}/credits`);
  
  return (
    <div className='b'>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSections data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details