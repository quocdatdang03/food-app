//  react loader spinner :
import { ColorRing } from 'react-loader-spinner';

function Spinner() {
    return (
        <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#ff514e', '#ff514e', '#ff514e', '#ff514e', '#ff514e']}
        />
    );
}

export default Spinner;
