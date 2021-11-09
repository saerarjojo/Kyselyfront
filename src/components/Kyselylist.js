import React from 'react';

function Kyselylist()
{
    const [title, setTitle] = React.useState('');

    React.useEffect(() => {
        fetch('https://saerarjojo.herokuapp.com/kysely/1')
        .then(response => response.json())
        .then(data => setTitle(data.title))
        .catch(err => console.log(err))
    }, [])

    return(
        <div>
            <p>Title: {title}</p>
        </div>
    );
}

export default Kyselylist;