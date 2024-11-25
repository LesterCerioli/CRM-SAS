import styled from 'styled-components'
import { CarrousselStyles } from '../../recruitmentServices/mainHeroCarousel/styles'

export const BlogPostsContainer = styled.div`
  h1 {
    margin-left: 100px;
    margin-bottom: 50px;
    @media (max-width: 390px) {
      width: 350px;
      margin-left: 50px;
    }
  }
  a {
    text-decoration: none;
  }
  h3 {
    margin-left: 100px;
    margin-bottom: 50px;
    color: rgb(2, 31, 62);
  }
  @media (max-width: 390px) {
    margin-top: -150px;
    max-width: 355px;
  }
`

const ImageContainer = styled.div``

export const CarouselStyles = styled.div`
  width: 500px;
  margin-bottom: 150px;
  @media (max-width: 390px) {
    max-heght: 355px;
    max-heght: 355px;
    margin-right: 15px;
  }
`
