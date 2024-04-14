$("document").ready(()=>{

    $("#conselho-box").fadeIn()
    var language = "en"

    $("#language").on("change", (e)=> language = e.target.value)

    function getAdvice(){

        $("#conselho").css("display", "none")
        

        fetch("https://api.adviceslip.com/advice")
        .then(response => response.json())
        .then(data => {
            fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${language}&dt=t&q=${data.slip.advice}`)
            .then(response => response.json())
            .then(data => {
                const traducao = data[0][0][0];
                $("#conselho").text( '"'+traducao + '"')
                $("#conselho").slideDown()
            })
            .catch(error => {
                console.error('Erro:', error);
            });

            $("#numero").text(data.slip.id)
            
        })
    }

    

    getAdvice()
    
    $("#roll-dice").click(()=>{
            getAdvice()    
        }
    )

    

    
})