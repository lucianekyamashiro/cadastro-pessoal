//valida os campos obrigatórios do formulário
function Enviar() {
    if (document.getElementById("nome").value == "" || 
        document.getElementById("cpf").value == "" ||
        document.getElementById("endereco").value == "" ||
        document.getElementById("numero").value == "" ||
        document.getElementById("celular").value == "") 
        {
            alert("Favor preencher os campos obrigatórios.");
            return false;
    }
    else{
        alert("Formulário enviado com sucesso.");
        return true;
    }
}

//adiciona mascara de cep
function MascaraCep(e){
        if(somenteNumeros(e)==false){
                return false;
    }       
    return formataCampo('cep', '00000-000', e);
}

//adiciona mascara ao telefone
function MascaraTelefone(e){  
        if(somenteNumeros(e)==false){
                return false;
    }       
    return formataCampo('telefone', '(00) 0000-0000', e);
}

//adiciona mascara ao celular
function MascaraCelular(e){  
        if(somenteNumeros(e)==false){
                return false;
    }       
    return formataCampo('celular', '(00) 00000-0000', e);
}

//adiciona mascara ao CPF
function MascaraCPF(e){
    if(somenteNumeros(e)==false){
        return false;
    }       
    return formataCampo('cpf', '000.000.000-00', e);
}

function somenteNumeros(e) {
        var charCode = e.charCode ? e.charCode : e.keyCode;
        // charCode 8 = backspace   
        // charCode 9 = tab
        if (charCode != 8 && charCode != 9) {
                // charCode 48 equivale a 0   
                // charCode 57 equivale a 9
                if (charCode < 48 || charCode > 57) {
                return false;
                }
        }
}

//valida telefone
function ValidaTelefone(tel){
    exp = /\(\d{2}\)\ \d{4}\-\d{4}/
    if(!exp.test(tel.value))
            alert('Numero de Telefone Invalido!');
}

//valida CEP
function ValidaCep(cep){
    exp = /\d{2}\.\d{3}\-\d{3}/
    if(!exp.test(cep.value))
            alert('Numero de Cep Invalido!');               
}

//valida data
function ValidaData(data){
    exp = /\d{2}\/\d{2}\/\d{4}/
    if(!exp.test(data.value))
            alert('Data Invalida!');                        
}

//valida o CPF digitado
function ValidarCPF(Objcpf){
    var cpf = Objcpf.value;
    exp = /\.|\-/g
    cpf = cpf.toString().replace( exp, "" ); 
    var digitoDigitado = eval(cpf.charAt(9)+cpf.charAt(10));
    var soma1=0, soma2=0;
    var vlr =11;

    for(i=0;i<9;i++){
            soma1+=eval(cpf.charAt(i)*(vlr-1));
            soma2+=eval(cpf.charAt(i)*vlr);
            vlr--;
    }       
    soma1 = (((soma1*10)%11)==10 ? 0:((soma1*10)%11));
    soma2=(((soma2+(2*soma1))*10)%11);

    var digitoGerado=(soma1*10)+soma2;
    if(digitoGerado!=digitoDigitado)        
            alert('CPF Invalido!');         
}

//valida numero inteiro com mascara
function mascaraInteiro(){
    if (event.keyCode < 48 || event.keyCode > 57){
            //event.returnValue = false;
            return false;
    }
    return true;
}

//formata de forma generica os campos
function formataCampo(campo, Mascara, evento) { 
    var boleanoMascara; 

    var Digitato = evento.keyCode;
    exp = /\-|\.|\/|\(|\)| /g
    campoSoNumeros = document.getElementById(campo).value.toString().replace( exp, "" ); 

    var posicaoCampo = 0;    
    var NovoValorCampo="";
    var TamanhoMascara = campoSoNumeros.length;; 

    if (Digitato != 8) { // backspace 
            for(i=0; i<= TamanhoMascara; i++) { 
                    boleanoMascara  = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
                                                            || (Mascara.charAt(i) == "/")) 
                    boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "(") 
                                                            || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " ")) 
                    if (boleanoMascara) { 
                            NovoValorCampo += Mascara.charAt(i); 
                              TamanhoMascara++;
                    }else { 
                            NovoValorCampo += campoSoNumeros.charAt(posicaoCampo); 
                            posicaoCampo++; 
                      }              
              }      
              document.getElementById(campo).value = NovoValorCampo;
              return true; 
    }else { 
            return true; 
    }
}