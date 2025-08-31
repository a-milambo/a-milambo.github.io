$(document).ready(function(){

    (function($) {
        "use strict";

        jQuery.validator.addMethod('answercheck', function (value, element) {
            return this.optional(element) || /^\bcat\b$/.test(value);
        }, "type the correct answer -_-");

        // validate contactForm form
        $(function() {
            $('#contactForm').validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                    },
                    subject: {
                        required: true,
                        minlength: 4
                    },
                    number: {
                        required: true,
                        minlength: 5
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: true,
                        minlength: 20
                    }
                },
                messages: {
                    name: {
                        required: "Por favor, preencha seu nome",
                        minlength: "Seu nome deve ter pelo menos 2 caracteres"
                    },
                    subject: {
                        required: "O assunto não pode estar vazio?",
                        minlength: "O assunto deve ter pelo menos 4 caracteres."
                    },
                    number: {
                        required: "Informe seu Numero",
                        minlength: "Deve ter pelo menos 5 digitos"
                    },
                    email: {
                        required: "Insira o email, sem o qual a mensagem nao sera enviada."
                    },
                    message: {
                        required: "O corpo da mensagem nao pode estar vazio.",
                        minlength: "Texto muito curto."
                    }
                },
                submitHandler: function(form) {
                    $(form).ajaxSubmit({
                        type:"POST",
                        data: $(form).serialize(),
                        url:"contact_process.php",
                        success: function() {
                            $('#contactForm :input').attr('disabled', 'disabled');
                            $('#contactForm').fadeTo( "slow", 1, function() {
                                $(this).find(':input').attr('disabled', 'disabled');
                                $(this).find('label').css('cursor','default');
                                $('#success').fadeIn();
                                $('.modal').modal('hide');
                                $('#success').modal('show');
                            });
                        },
                        error: function() {
                            $('#contactForm').fadeTo( "slow", 1, function() {
                                $('#error').fadeIn();
                                $('.modal').modal('hide');
                                $('#error').modal('show');
                            });
                        }
                    });
                }
            });
        });

    })(jQuery);

    $('#limpar').click(function() {
        // Limpa os campos do formulário corretamente
        $('#contactForm')[0].reset(); // <- CORREÇÃO AQUI
    });

});
