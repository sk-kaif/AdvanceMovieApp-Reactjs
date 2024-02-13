import { useState } from "react"
import {ContentWrapper,SwitchTabs,Carousel} from '../../../components/compoIndex'
import useFetch from "../../../hooks/useFetch"

const Popular = () => {
  const [endPoint,setEndPoint] = useState('movie')
  const {data,loading} = useFetch(`/${endPoint}/popular`)
  
  const onTabChange=(tab,index)=>{
    setEndPoint(tab === 'Movies' ? "movie" : 'tv')
  }


  return (
    <div className="carouselSection">
        <ContentWrapper>
          <span className="carouselTitle ">Popular</span>
          <SwitchTabs data={['Movies','TV Shows']} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endPoint={endPoint}/>
    </div>
  )
}

export default Popular