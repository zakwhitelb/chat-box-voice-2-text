// Icons
import LoadingIcon from "../../asset/LoadingIcon"

export default function Loading({ width, height }) {
    return(
      <div className='animate-spin w-fit h-fit' >
        <LoadingIcon fillColor="var(--white)" width={width} height={height} />
      </div>
    )
}