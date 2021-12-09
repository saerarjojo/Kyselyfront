import React from 'react';

function Kyselylist()
{
    const [id, setId] = React.useState('');

    const [title, setTitle] = React.useState('');

    const [done, setDone] = React.useState(false);

    const [first, setFirst] = React.useState(true);

    var questions = [];
    var qSize = 0;
    const [qId, setQId] = React.useState();
    var qIndex = 0;
    
    const [answers, setAnswers] = React.useState("");

    React.useEffect(() => {    

        if(first)
        {
            setQId(0);
            setFirst(false);
        }

        fetchQuestion();

    }, )

    function sendAnswers()
    {
        qIndex ++;
        console.log("1 -- -- qIndex: " + qIndex);

        setQId(qIndex);
        console.log("2 -- -- qIndex: " + qIndex);

        console.log("-- sendAnswers: " + qId);

        console.log("question: " + questions[1]);
        console.log("answers: " + answers);

        //alert("Vastaus: " + answers);

        addAnswers(answers);
    }

    function addAnswers(answer)
    {
        console.log("-- addAnswers: " + qId);

        var vastaus = 
        {
            "vastaus": answer,
            "kysymys": {
                "kysymysid": qId+1,
                "kysely": {
                    "title": "Värit"
                },
                "tyyppi": null
            }
        };

        console.log(vastaus);

        fetch('https://saerarjojo.herokuapp.com/rest/vastaukset/',{
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(vastaus)
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

        setAnswers("");
        fetchQuestion();
        setDone(false);
    }
    

    function fetchQuestion()
    {
        console.log("1 -- qId: " + qId);

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
                }

                document.getElementById("questions").innerHTML = 
                questions[qId] + "</br>";

                console.log("2 -- qId: " + qId);
            }
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <h3>Kysely {id}</h3>
            
            <form>
                <input placeholder="Kyselyn id" value={id} onChange={event => setId(event.target.value)}/>
            </form>
            <p>Kysely: {title}</p>
            <p>Kysymykset:</p>

            <div id="questions"></div>

            <input placeholder="Vastaus" value={answers} onChange={e => setAnswers(e.target.value)}/>
            <button onClick={sendAnswers}>Seuraava</button>
        </div>
    );
}

export default Kyselylist;