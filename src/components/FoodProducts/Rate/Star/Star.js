import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function Star({ data, inProduct, onClick }) {
    return (
        <p
            className={`cursor-pointer ${
                !inProduct ? 'w-full my-[5px] py-[3px] pl-[8px]' : ''
            } flex items-center text-[18px]`}
            onClick={onClick}
        >
            <AiFillStar size={'23px'} className="px-[2px] text-[#fbb403]" />
            <AiFillStar size={'23px'} className="px-[2px] text-[#fbb403]" />
            <AiFillStar size={'23px'} className="px-[2px] text-[#fbb403]" />
            {data === 5 ? (
                <>
                    {' '}
                    <AiFillStar size={'23px'} className="px-[2px] text-[#fbb403]" />
                    <AiFillStar size={'23px'} className="px-[2px] text-[#fbb403]" />
                </>
            ) : data === 4 ? (
                <>
                    {' '}
                    <AiFillStar size={'23px'} className="px-[2px] text-[#fbb403]" />
                    <AiOutlineStar size={'23px'} className="px-[2px] text-[#fbb403]" />
                </>
            ) : (
                <>
                    <AiOutlineStar size={'23px'} className="px-[2px] text-[#fbb403]" />
                    <AiOutlineStar size={'23px'} className="px-[2px] text-[#fbb403]" />
                </>
            )}
        </p>
    );
}

export default Star;
