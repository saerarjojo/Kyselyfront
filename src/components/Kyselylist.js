import React from 'react';

function Kyselylist()
{
    const [id, setId] = React.useState('');

    const [title, setTitle] = React.useState('');

    const [done, setDone] = React.useState(false);

    var questions = [];
    var qSize = 0;
    
    const [answersTab, setAnswersTab] = React.useState([]);

    const [answers, setAnswers] = React.useState("");

    React.useEffect(() => {    

        fetchQuestion();

    }, )

    function sendAnswers()
    {
        console.log("-- sendAnswers");

        console.log("question: " + questions[0]);
        console.log("answers: " + answers);

        alert("Vastaus: " + answers);

        addAnswers(answers);
    }

    // TODO TÄMÄ KESKEN!!!
    function addAnswers(answer)
    {
        fetch('https://saerarjojo.herokuapp.com/rest/vastaukset/',{
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(answer)
        })
        .then(response => {
            if(response.ok)
            {
                fetchQuestion();
                alert("onnistui");
            }
            else
                alert('Lisäys ei onnistunut');
        })
        .catch(err => console.log(err))
    }
    

    function fetchQuestion()
    {
        fetch('https://saerarjojo.herokuapp.com/rest/kyselyt/' + id)
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
            
            <input value={answers} onChange={e => setAnswers(e.target.value)}/>
            <button onClick={sendAnswers}>press</button>
        </div>
    );
}

export default Kyselylist;