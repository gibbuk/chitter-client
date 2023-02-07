import PropTypes from 'prop-types';

const Peep = ({ peep }) => {

    const date = new Date(peep.dateCreated);

    return (
        <>
            <section className='card mb-4 rounded-3 shadow-sm'>
                <div className='card-header py-3'>
                    <h2 className='my-0 fw-normal'>{peep.content}</h2>
                </div>
                <div className='card-body container'>
                    <div className='row'>
                        <label className='col text-start'>{peep.username} {`(${peep.realName})`}</label>
                        <time className='col text-end'>{date.toUTCString()}</time>
                    </div>
                </div>
            </section>
        </>
    );

};

Peep.propTypes = {
    Peep: PropTypes.shape({
        realName: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        dateCreated: PropTypes.string.isRequired
    })
};

export default Peep;

