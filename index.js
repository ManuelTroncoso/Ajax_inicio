$(function (){
AjaxConnect("espectaculos.php")
});

function AjaxConnect(name){
    $.ajax({
        url: name,
        method: "get",
        dataType: "json",
        //async: false,
        success: function (data) {
            console.log(data)
            AddDatas(data);
        }

    });
}

function AddDatas(data){
    
    for(const obj in data){
        
        $("#tbody").append(`<tr id="${data[obj].idespectaculo}"><td>${data[obj].fecha}</td>
                               <td>${data[obj].espectaculo}</td>
                               <td>${data[obj].artista}</td>
                               <td id="votes${obj}">${data[obj].votos}</td>
                               <td><button onclick="AddVotes(${data[obj].idespectaculo})">Votos</button></td>
                               </tr>`);
    }
    Show(data);
}
function Show(data){
    $("tr").hover(function(x){
        $(this).css("color","red")
        photo = data[(x.delegateTarget.id-1)]
        if(photo.foto!=null){
            $("#photo").append(`<img class="delete" src="fotos/`+photo.foto+`" alt=""></img>`);
        }
    })
    $("tr").mouseleave(function(x){
        $(this).css("color","black")
        $(".delete").remove();
    })
}

function AddVotes(id){
    console.log(id)
    $.ajax({
		url: "votar.php",
		method: "post",
		data: { id: id},
		success: function(){
            AjaxConnect("espectaculos.php")
            $("#tbody").text("")
		}
	});
}