import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={1}
    width={210}
    height={260}
    viewBox="0 0 210 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="1" y="1" rx="10" ry="10" width="150" height="91" /> 
    <rect x="-3" y="106" rx="3" ry="3" width="150" height="15" /> 
    <rect x="1" y="126" rx="3" ry="3" width="93" height="15" /> 
    <rect x="-1" y="156" rx="3" ry="3" width="80" height="24" /> 
    <rect x="108" y="147" rx="0" ry="0" width="32" height="32" />
  </ContentLoader>
)

export default MyLoader

