import { formatRelative } from 'date-fns';
import { AiFillStar } from 'react-icons/ai';

// function này dùng để chuyển đổi createdAt.seconds của firestore sang ngày giờ hiện taih bằng thư viên data-fns
function formatDate(seconds) {
    let formattedDate = '';

    if (seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000), new Date());

        // in hoa chữ cái đầu :
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
}

function UserComment({ id, img, name, time, message, rate }) {
    const stars = Array(5).fill(0);
    return (
        <div className="flex mt-[60px]" key={id}>
            <img className="w-[47px] h-[47px] rounded-[50%] border border-[rgba(0,0,0,0.09)] mt-[3px]" src={img} />
            <div className="ml-[15px]">
                <div className="flex items-center">
                    <h1 className="text-[14px] mr-[8px]">{name}</h1>
                    <span className="text-[13px] font-medium text-[rgba(0,0,0,0.55)]">
                        {formatDate(time && time.seconds)}
                    </span>
                </div>
                <div className="flex items-center mt-[10px] mb-[15px]">
                    {stars.map((item, index) => {
                        return (
                            <AiFillStar
                                key={index}
                                className={`${rate > index ? 'text-[#fbb403]' : 'text-[#fdda81]'} cursor-default`}
                            />
                        );
                    })}
                </div>
                <p className="leading-[7px] text-[14px] mt-[10px]">{message}</p>
            </div>
            <button className="border border-black">Delete</button>
        </div>
    );
}

export default UserComment;
