import React from 'react';

function Kyselylist()
{
    const [id, setId] = React.useState('');

    const [title, setTitle] = React.useState('');
    const [questions, setQuestions] = React.useState([]);
    const [qId, setQId] = React.useState('0');

    React.useEffect(() => {    

        fetchQuestion();

    }, [])

    function fetchQuestion()
    {
        fetch('https://saerarjojo.herokuapp.com/kysely/' + id)
        .then(response => response.json())
        .then(data => {

            for(let i=0; i < data.kysymykset.length; i++)
            {
                setQId(i);

                setTitle(data.title);
                setQuestions(data.kysymykset[qId].kysymys);
            }
        })
        .catch(err => console.log(err))

    }

    function inputChanged (event)
    {
        event.preventDefault();
    }

    return(
        <div>
            <h3>Kysely {id}</h3>
            
            <form onSubmit={inputChanged}>
                <input value={id} onChange={event => setId(event.target.value)}/>
                <button onClick={fetchQuestion}>Set id</button>
            </form>

            <p>Title: {title}</p>
            <p>Kysymykset:</p>
            <p>{questions}</p>
            
        </div>
    );
}

export default Kyselylist;