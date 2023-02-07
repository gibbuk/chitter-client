import PropTypes from 'prop-types';

import Peep from '../Peep/Peep';


const AllPeeps = ({ peeps }) => {

    peeps = [...peeps].reverse();

    const peepElements = peeps.map(peep => <Peep peep={peep} key={peep._id} />);

    return (
        <article className='col'>
            {peepElements}
        </article>
    )

}

AllPeeps.propTypes = {
    peeps: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            realName: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            dateCreated: PropTypes.string.isRequired
        })
    )
}

export default AllPeeps;