import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import aos from 'aos';
import 'aos/dist/aos.css';

import '../../sass/Home.scss';

function SliderHome({ img, slogan, title, titlePrimary }) {
    aos.init();
    aos.init({
        once: false,
        easing: 'ease',
        duration: 600,
    });
    return (
        <div className={`${img} bg-cover w-full h-[500px] sm:h-[800px] bg-no-repeat bg-fixed bg-half`}>
            <div className="max-w-primary m-auto px-[24px] flex flex-col justify-center items-center md:items-start w-full h-full z-100">
                <h2 className="text-[14px] md:text-[18px] text-white uppercase font-semibold" data-aos="fade-right">
                    {slogan}
                </h2>
                <div data-aos="fade-left" data-aos-delay="750" className="text-center md:text-left">
                    <h1 className="text-[40px] md:text-[72px] font-semibold mt-[5px] mb-[5px] md:mb-[15px] text-white slider-title">
                        {title}
                    </h1>
                    <h1 className="text-[40px] md:text-[72px] font-semibold mt-[0px] md:mt-[-50px] mb-[10px] text-primary slider-title">
                        {titlePrimary}
                    </h1>
                </div>
                <button data-aos="fade-up" data-aos-delay="1400">
                    <NavLink
                        to="/order"
                        className="py-[8px] px-[22px] text-white bg-primary self-start min-w-[64px] rounded-[999px]"
                    >
                        <FontAwesomeIcon icon={faCartArrowDown} />
                        <span className="uppercase font-normal text-[16px] pl-[5px]">order now</span>
                    </NavLink>
                </button>
            </div>
        </div>
    );
}

export default SliderHome;
