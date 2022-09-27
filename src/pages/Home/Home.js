import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Slider from 'react-slick';
import aos from 'aos';

import images from '../../assets/images/images';
import FoodProduct from '../../components/FoodProducts/FoodProducts';
import OrderStep from '../../components/OrderStep/OrderStep';
import SliderHome from '../../components/SliderHome/SliderHome';
import '../../sass/Home.scss';

const sliderHomeBg = [
    {
        img: 'bg-homeBg',
        slogan: 'enjoy your me',
        title: 'Good food is wise',
        titlePrimary: 'medicine',
    },
    {
        img: 'bg-homeBg2',
        slogan: 'happy your special',
        title: 'Love at first',
        titlePrimary: 'bite',
    },
    {
        img: 'bg-homeBg3',
        slogan: 'GOOD FOOD IS GOOD MOOD',
        title: 'The belly rules the',
        titlePrimary: 'mind',
    },
];

const sliderHomeCategory = [
    {
        img: images.foodCategory1,
        title: 'breakfast',
    },
    {
        img: images.foodCategory2,
        title: 'coffee',
    },
    {
        img: images.foodCategory3,
        title: 'pork ham',
    },
    {
        img: images.foodCategory4,
        title: 'dinner',
    },
    {
        img: images.foodCategory5,
        title: 'tea',
    },
    {
        img: images.foodCategory6,
        title: 'lunch',
    },
    {
        img: images.foodCategory7,
        title: 'grilled children',
    },
    {
        img: images.foodCategory8,
        title: 'breakfast',
    },
    {
        img: images.foodCategory9,
        title: 'roast beef',
    },
];

function NextArrow(props) {
    const { style, onClick } = props;
    return (
        <div style={{ ...style, display: 'block' }} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronRight} size="3x" className="slick-arrow-icon-right" />
        </div>
    );
}

function PrevArrow(props) {
    const { style, onClick } = props;
    return (
        <div style={{ ...style, display: 'block' }} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronLeft} size="3x" className="slick-arrow-icon-left" />
        </div>
    );
}

function Home() {
    const setting1s = {
        dots: true,
        inFinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const setting2s = {
        dots: false,
        arrows: true,
        slidesToShow: 7,
        slidesToScroll: 3,
        speed: 800,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 300,
                settings: 'unslick', // destroys slick
            },
        ],
    };

    aos.init();
    aos.init({
        once: false,
    });

    return (
        <div className="w-full overflow-hidden">
            <Slider {...setting1s} className="relative">
                {sliderHomeBg.map((item, index) => {
                    return (
                        <SliderHome
                            img={item.img}
                            slogan={item.slogan}
                            title={item.title}
                            titlePrimary={item.titlePrimary}
                            key={index}
                        />
                    );
                })}
            </Slider>
            <div className="max-w-primary mx-[auto] px-[24px]">
                {/* order now*/}
                <div className="mb-[80px]">
                    <div className="text-center mt-[80px]">
                        <h2
                            className="text-[18px] text-[#fbb403] font-medium"
                            data-aos="fade-left"
                            data-aos-duration="800"
                            data-aos-ease="linear"
                        >
                            Order now!
                        </h2>
                        <h1
                            className="text-[32px] font-light"
                            data-aos="fade-right"
                            data-aos-delay="100"
                            data-aos-duration="900"
                            data-aos-ease="linear"
                        >
                            How it works
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[12px] mt-[48px]">
                        <OrderStep
                            image={images.orderStep1}
                            title="Choose Your Favorite"
                            imageArrow={images.orderArrow1}
                        />
                        <OrderStep
                            image={images.orderStep2}
                            title="We Deliver Your Meals"
                            imageArrow={images.orderArrow2}
                            hiddenArrow
                            delay="800"
                        />
                        <OrderStep
                            image={images.orderStep3}
                            title="Cash on Delivery"
                            imageArrow={images.orderArrow3}
                            delay="1200"
                        />
                        <OrderStep image={images.orderStep4} title="Eat And Enjoy" delay="1500" />
                    </div>
                </div>
                {/* Browse food category */}
                <div className="shadow-box pt-[50px] pb-[70px]  my-[100px]">
                    <div className="text-center">
                        <h2
                            className="text-[18px] text-[#fbb403] font-medium font-pangolin"
                            data-aos="fade-left"
                            data-aos-duration="800"
                            data-aos-ease="linear"
                        >
                            What we have?
                        </h2>
                        <h1
                            className="text-[32px] font-bold"
                            data-aos="fade-right"
                            data-aos-delay="100"
                            data-aos-duration="900"
                            data-aos-ease="linear"
                        >
                            Browse food category
                        </h1>
                    </div>
                    <div data-aos="fade-down" data-aos-duration="800" data-aos-delay="500">
                        <Slider {...setting2s} className="mt-[60px]">
                            {sliderHomeCategory.map((item, index) => {
                                return (
                                    <div className="px-[20px] hover:text-primary ease-in duration-100 " key={index}>
                                        <div className="shadow-box w-[120p] h-[120px] flex items-center justify-center">
                                            <img className="w-[60px] h-full " src={item.img} />
                                        </div>
                                        <h2 className="text-center font-semibold text-[13px] uppercase mt-[20px]">
                                            {item.title}
                                        </h2>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
                {/* food product */}
                <FoodProduct />
            </div>
        </div>
    );
}

export default Home;
