import React from 'react';

function Kyselylist()
{
    const [id, setId] = React.useState('');

    const [title, setTitle] = React.useState('');

    const [done, setDone] = React.useState(false);

    var questions = [];

    var qSize = 0;

    React.useEffect(() => {    

        fetchQuestion();

    }, )

    function fetchQuestion()
    {
        fetch('https://saerarjojo.herokuapp.com/kysely/' + id)
        .then(response => response.json())
        .then(data => {
            
            qSize = data.kysymykset.length;

            if(!done)
            {   
                setDone(true);

                for(var i=0; i < qSize; i++)
                {
                    setTitle(data.title);
                    
                    questions[i] = data.kysymykset[i].kysymys;   
                    
                    document.getElementById("questions").innerHTML += 
                    questions[i] + "</br>";
                }
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
            <div id="questions"></div>      
        </div>
    );
}

export default Kyselylist;