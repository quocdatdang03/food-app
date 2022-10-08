import { AiFillFacebook } from 'react-icons/ai';
import { BiBuildings, BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsFillTelephoneFill, BsTwitter, BsYoutube } from 'react-icons/bs';
import { FaInstagram } from 'react-icons/fa';
import { MdOutlineMessage } from 'react-icons/md';

function Footer() {
    return (
        <div className="w-full bg-[#212121] pt-[90px] pb-[80px] h-full px-[64px]">
            <div className="max-w-primary mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[64px]">
                <div className="col-span-1 flex justify-between">
                    <div className="flex flex-col justify-around">
                        <p className="text-white mb-[15px]">Sunday</p>
                        <p className="text-white mb-[15px]">Monday</p>
                        <p className="text-white mb-[15px]">Tuesday</p>
                        <p className="text-white mb-[15px]">Wednesday</p>
                        <p className="text-white mb-[15px]">Friday</p>
                        <p className="text-white mb-[15px]">Saturday</p>
                    </div>
                    <div className="flex flex-col justify-around">
                        <BiDotsHorizontalRounded className="text-white" size={'18px'} />
                        <BiDotsHorizontalRounded className="text-white" size={'18px'} />
                        <BiDotsHorizontalRounded className="text-white" size={'18px'} />
                        <BiDotsHorizontalRounded className="text-white" size={'18px'} />
                        <BiDotsHorizontalRounded className="text-white" size={'18px'} />
                        <BiDotsHorizontalRounded className="text-white" size={'18px'} />
                    </div>
                    <div className="flex flex-col justify-around">
                        <p className="text-[#fbb403]">Closed</p>
                        <p className="text-[#fbb403]">8.00-20.00</p>
                        <p className="text-[#fbb403]">10.00-5.00</p>
                        <p className="text-[#fbb403]">12.00-9.00</p>
                        <p className="text-[#fbb403]">7.00-1.00</p>
                        <p className="text-[#fbb403]">9.00-12.00</p>
                    </div>
                </div>
                <div className="col-span-1">
                    <h1 className="text-[25px] mb-[20px] text-white">Address</h1>
                    <div className="flex flex-col">
                        <p className="flex items-center leading-[23px] text-[16px] mb-[10px]">
                            <BsFillTelephoneFill className="text-[#fbb403] text-[18px] mr-[10px]" />
                            <span className="text-white">+84 934 189 1111</span>
                        </p>
                        <p className="flex items-center leading-[23px] text-[16px] mb-[10px]">
                            <MdOutlineMessage className="text-[#fbb403] text-[18px] mr-[10px]" />
                            <span className="text-white">dat03122003@gmail.com</span>
                        </p>
                        <p className="flex items-center leading-[23px] text-[16px] mb-[10px]">
                            <BiBuildings className="text-[#fbb403] text-[18px] mr-[10px]" />
                            <span className="text-white">+84 934 189 1111</span>
                        </p>
                    </div>
                    <div className="flex">
                        <span className="text-[23px] mr-[12px] cursor-pointer">
                            <AiFillFacebook className="text-[#2d88ff]" />
                        </span>
                        <span className="text-[23px] mr-[12px] cursor-pointer">
                            <BsTwitter className="text-[#5da9dd]" />
                        </span>
                        <span className="text-[23px] mr-[12px] cursor-pointer">
                            <FaInstagram className="text-[#f56040]" />
                        </span>
                        <span className="text-[23px] mr-[12px] cursor-pointer">
                            <BsYoutube className="text-[#ff0000]" />
                        </span>
                    </div>
                </div>
                <div className="w-full h-full">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.77150305217!2d108.2134243!3d16.0773428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142184792140755%3A0xd4058cb259787dac!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgUGjhuqFtIEvhu7kgdGh14bqtdCAtIMSQ4bqhaSBo4buNYyDEkMOgIE7hurVuZw!5e0!3m2!1svi!2s!4v1664765641170!5m2!1svi!2s"
                        width="600"
                        height="450"
                        style={{ border: 0, width: '100%', height: '100%' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default Footer;
