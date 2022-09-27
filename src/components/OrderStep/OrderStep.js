import aos from 'aos';

function OrderStep({ image, title, imageArrow, numberStep, hiddenArrow, delay }) {
    return (
        <div
            className="flex flex-col items-center justify-center relative"
            data-aos="fade-up"
            data-aos-duration="900"
            data-aos-delay={delay}
        >
            <img className="" src={image} alt="order-step-2" />
            <p className="my-[10px] text-[18px] font-medium cursor-pointer hover:text-primary">{title}</p>
            <img
                src={imageArrow}
                className={`absolute top-[50%] hidden ${
                    hiddenArrow ? 'lg:block' : 'md:block'
                } right-[0] translate-x-[50%]`}
            />
            <div className="absolute top-[-7px] right-[46px] flex flex-col items-center justify-center text-center bg-primary border-[4px] border-white rounded-[50%] w-[60px] h-[60px] text-white text-[13px] p-[10px]">
                <span className="">{numberStep}</span>
                <span className="uppercase">step</span>
            </div>
        </div>
    );
}

export default OrderStep;
