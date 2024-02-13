import { useState } from "react"
import {ContentWrapper,SwitchTabs,Carousel} from '../../../components/compoIndex'
import useFetch from "../../../hooks/useFetch"

const Trending = () => {
  const [endPoint,setEndPoint] = useState('day')
  const {data,loading} = useFetch(`/trending/all/${endPoint}`)
  
  const onTabChange=(tab,index)=>{
    setEndPoint(tab === 'Day' ? "day" : 'week')
  }


  return (
    <div className="carouselSection">
        <ContentWrapper>
          <span className="carouselTitle">Trending</span>
          <SwitchTabs data={['Day','Week']} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending