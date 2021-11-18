import React from 'react';

function Kyselylist()
{
    const [id, setId] = React.useState('');

    const [title, setTitle] = React.useState('');

    var table = [];
    var text = "";

    React.useEffect(() => {    

        fetchQuestion();

    }, )

    function fetchQuestion()
    {
        fetch('https://saerarjojo.herokuapp.com/kysely/' + id)
        .then(response => response.json())
        .then(data => {
            
            for(let i=0; i < data.kysymykset.length; i++)
            {
                setTitle(data.title);
                
                table += data.kysymykset[String(i)].kysymys;

                document.getElementById("demo").innerHTML = table;
            }
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <h3>Kysely {id}</h3>
            
            <form>
                <input value={id} onChange={event => setId(event.target.value)}/>
            </form>

            <p>Title: {title}</p>
            <p>Kysymykset:</p>
            <p id="demo"></p>          
        </div>
    );
}

export default Kyselylist;