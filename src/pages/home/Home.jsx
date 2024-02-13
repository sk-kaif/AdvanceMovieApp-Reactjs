import {HeroBanner,Trending,Popular,TopRated} from '../pagesIndex.js'


import "./style.scss"
const Home = () => {
  return (
    <div className="homePage">
        <HeroBanner />
        <Trending />
        <Popular />
        <TopRated />
    </div>
  )
}

export default Home