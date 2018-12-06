import React from "react";
import Slider from "react-slick";
 
class SimpleSlider extends React.Component {
	
  render() {
   console.info('props data: ', this.props)

    var settings = {
     dots: true, 
	 dotsClass: "slick-dots slick-thumb",
      infinite: true,
      slidesToShow: 1, 
      slidesToScroll: 1,
      vertical: true, 
      verticalSwiping: true, 
    responsive: [
        {
          breakpoint: 1024,
          settings: { 
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 767,
          settings: {
			   vertical: false,
			  verticalSwiping: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
			   vertical: false,
			  verticalSwiping: false,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    let productImages = (this.props && this.props.product) ? this.props.product.images.map((image) => {
      return (
        <div key={image.id}>
          <img src={image.src} alt="" />
        </div>
      );
    }) : '';
    return (
	 <div className="container">
	  
	<div className="row">
	<div className="col-sm-12">
      <Slider {...settings}>
        {productImages}
      </Slider>
	  </div>
	  </div>
	  </div>
    );
  }
}
export default SimpleSlider;
