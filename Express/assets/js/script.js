$(document).ready(function () {
    $('.collapsible').collapsible();
    /*$('#header').removeClass("teal lighten-2").css({
     "background-color": "blue",
     })*/
    function SelectAll() {
        $.ajax({
            url: "http://127.0.0.1:8080/todo",
            type: "GET",
            accept: "application/json",
            success: function (data) {
                console.log("get:", data);
                var html = "<ul class='collapsible' data-collapsible='accordion'>";
                $.each(data, function (i, row) {
                    // console.log(i)
                    // console.log(row.TITRE)
                    html += '<li class="row" style="background-color: lightgrey;box-shadow: 1px 1px 2px #888888;border-radius: 5px;padding: 10px;margin-bottom:20px;">' +
                        '<div class="col s3 collapsible-header">' + row.titre + '</div>';
                    html += '<div class="col s5 collapsible-body">' + row.description + '</div>';
                    html += '<div class="col s2 right" id="delete_button"><button class="btn red"><i class="material-icons">delete</i></button></div>';
                    html += '<div class="col s2 right" id="edit_button"><button class="btn orange"><i class="material-icons">edit</i></button></div>';
                    html += '</li>';
                    // console.log(html)

                });
                html += "</ul>";
                $('#results').html(html);
            }
        })
    }

    SelectAll();

//*************************************AJAX AJOUT TACHES**********************************************//
    $('#ajoutTache').on("click", function () {
        var titre_value = $('#titre').val();
        // console.log("titre_value:",titre_value);
        var description_value = $('#description').val();
        // console.log("description_value:",description_value);
        data = {
            titre: titre_value,
            description: description_value
        };
        // socket.emit('insert',data)
        console.log("PUT data:", data);
        console.log("PUT JSON.stringify(data):", JSON.stringify(data));

        /*        $.ajax({
         url: "http://127.0.0.1:8080/todo",
         type: "PUT",
         data: data,
         dataType: "json",
         // accept: "application/json",
         success: function (data) {
         console.log(data);

         // var html = "";
         }
         })*/
        $.ajax({
            url: "/todo/",
            type: "PUT",
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: "json",
            // accept: "application/json",
            success: function (data) {
                console.log(data);
                // window.location.reload();
                selectAll();
            }
        });

    });
//*************************************AJAX DELETE TACHES**********************************************//
    $('.delete_button').on('click', function (e) {
        e.stopPropagation();
        var id_value = $(this).parent().prev().prev().prev().children("span").html();
        data = {
            id: id_value
        };
        console.log("DELETE:", data);
        $.ajax({
            url: "/todo/",
            type: "DELETE",
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: "json",
            // accept: "application/json",
            success: function (data) {
                console.log(data);
                SelectAll();
            }
        });
    });
//*************************************AJAX UPDATE TACHES**********************************************//

    $('.edit_button').on('click', function (e) {
        e.stopPropagation()
    });
    $('a#validModif').css({
        display: "none",
    });
    $('.edit_button').on('click', function () {
        // $('#titre').val()="";
        var id_value = $(this).parent().prev().prev().children("span").html();
        var id_titre = $(this).parent().prev().html();
        var id_description = $(this).parent().parent().next().find("p").html();

        /*    data = {
         id: id_value,
         titre: id_titre,
         description: id_description
         };
         console.log(data);*/
        $('#titre').val(id_titre);
        $('#titre').focus();
        // $('label [for=titre]').addClass('active');
        $('#description').val(id_description);
        $('#description').focus();
        // $('label [for=description]').addClass('active');
        $('a#ajoutTache').remove();

        $('a#validModif').css({
            display: "block",
        })
        $('a#validModif').on('click', function () {
            titre_value = $('#titre').val();
            description_value = $('#description').val();
            console.log("id_value in validModif event:", id_value);
            data = {
                id: id_value,
                titre: titre_value,
                description: description_value
            };

 /*           $.ajax({
                url: "/todo/" + id_value,
                type: "POST",
                data: JSON.stringify(data),
                contentType: 'application/json',
                dataType: "json",
                // accept: "application/json",
                success: function (data) {
                    console.log("data return ajax:", data);
                    // var html = "";
                    // SelectAll();
                }
            })*/
        })


    });

    // var socket=io.connect("http://127.0.0.1:8080")
//****************************************AJAX UTILISATEURS***************************************//

    $('#submit_login').on('click', function () {
        var email_value = $('#email').val();
        // console.log("email_value:",email_value);
        var password_value = $('#pass').val();
        // console.log("password_value:",password_value);
        var data = {
            email: email_value,
            password: password_value
        };
        console.log("data send ajax:", data);
        $.ajax({
            url: "/user/login/",
            type: "PUT",
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: "json",
            // accept: "application/json",
            success: function (data) {
                console.log("data return ajax:", data);
                // var html = "";
            }
        })


    })

    $('#submit_register').on('click', function (e) {
        e.preventDefault();
        var email_value = $('#email').val();
        // console.log("email_value:",email_value);
        var password_value = $('#pass').val();
        // console.log("password_value:",password_value);
        var data = {
            email: email_value,
            password: password_value
        };
        console.log("data send ajax:", data);
        $.ajax({
            url: "/user/register/",
            type: "PUT",
            data: JSON.stringify(data),
            contentType: 'application/json',

            dataType: "json",
            // accept: "application/json",
            success: function (data) {
                console.log("data return ajax:", data);
                // var html = "";
            }
        })


    })


});