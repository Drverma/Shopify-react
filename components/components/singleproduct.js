import React from "react";
import Slider from "react-slick";
 
class SimpleSlider extends React.Component {

  constructor(props) {
		super(props);
		this.state = { images: [] };
		
  }

  componentWillMount() {
      this.setState({images: this.props.product.images})
  }

	componentDidMount(){
    this.setState({images: this.props.product.images})
    let slickListDiv = document.getElementsByClassName('slick-list')[0]
    slickListDiv.addEventListener('wheel', event => {
      event.preventDefault()
      event.deltaY > 0 ? this.slider.slickNext() : this.slider.slickPrev()
    })
  }

  settings = {
    dots: true, 
    dotsClass: "slick-dots",
    customPaging: (i) => {
      return (this.state && this.state.images[i]) ? <img className="dotsImage" src={this.state.images[i].src} alt=""/>: <button className="sliderDots"></button>  
    },
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
		 adaptiveHeight: true,
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
			 adaptiveHeight: true,
        vertical: false,
       verticalSwiping: false,
           slidesToShow: 1,
           slidesToScroll: 1
         }
       }
     ]
   };

  render() {
   console.info('props data: ', this.props)

    let productImages = (this.props && this.props.product) ? this.props.product.images.map((image) => {
      return (
        <div key={image.id}>
          <img src={image.src} alt="" />
        </div>
      );
    }) : '';
    return (
 
	<div className="row">
	<div className="col-sm-12 singlepage_slider">
      <Slider {...this.settings} ref={slider => this.slider = (slider) ? slider.innerSlider : null}>
        {productImages}
      </Slider>
	  </div>
	  </div>
	  
    );
  }
}
export default SimpleSlider;
