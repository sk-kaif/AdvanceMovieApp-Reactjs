import { useSelector } from "react-redux";
import "./style.scss"


const Genre = ({data}) => {
  const {genres} = useSelector(state=>state.home)
  return (
    <div className="genres">
      {
        data?.map((singleGenre)=>{
          if(!genres[singleGenre]?.name) return;
          return(
            <div className="genre" key={singleGenre}>
              {genres[singleGenre]?.name}
            </div>
          )
        })
      }
    </div>
  )
}

export default Genre