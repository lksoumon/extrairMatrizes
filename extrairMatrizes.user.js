// ==UserScript==
// @name         Extrator de Matrizes
// @namespace    http://tampermonkey.net/
// @version      v0.1
// @description  try to take over the world!
// @author       You
// @match        http://sigeduca.seduc.mt.gov.br/geral/hwmgertrammatrizprincipal.aspx
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gov.br
// @grant        none
// @updateURL    https://github.com/lksoumon/extrairMatrizes/raw/refs/heads/main/extrairMatrizes.user.js
// @downloadURL   https://github.com/lksoumon/extrairMatrizes/raw/refs/heads/main/extrairMatrizes.user.js
// ==/UserScript==

// ----- stylesheet
var styleSCT = document.createElement('style');
styleSCT.type = 'text/css';
styleSCT.innerHTML = '.menu {      display: none;      position: fixed;      top: 80%;      right: 0;      transform: translate(0, -50%);      background-color: #f0f0f0;      padding: 20px;      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);      z-index: 999;    }    .open-menu-btn {      position: fixed;      top: 90%;      right: 10px;      transform: translate(0, -50%);      background-color: #007bff;      color: #fff;      padding: 10px;      border: none;      cursor: pointer;    } .loading-menu {display: none;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);background-color: #fff;padding: 20px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);z-index: 999;} .loading-content {      text-align: center;    } ';
document.getElementsByTagName('head')[0].appendChild(styleSCT);

//CARREGA libJquery
var libJquery = document.createElement('script');
libJquery.src = 'https://code.jquery.com/jquery-3.4.0.min.js';
libJquery.language='javascript';
libJquery.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(libJquery);

//Iframe
var divCorpo = document.createElement('div');
document.getElementsByTagName('body')[0].appendChild(divCorpo);
    var ifrIframe1 = document.createElement("iframe");
    ifrIframe1.setAttribute("id","iframe1");
    ifrIframe1.setAttribute("src","about:blank");
    ifrIframe1.setAttribute("style","height: 1000px; width: 855px;display:none");
divCorpo.appendChild(ifrIframe1);
parent.frames.document.getElementById('MAINFORM').removeAttribute("action");
function criarLoadingMenu(valorAtual, valorMaximo) {
    var loadingDiv = document.getElementById("acomp");
    var loadingContent = document.getElementById("acomp");

    if(valorAtual == valorMaximo){ loadingDiv.style.display = "none";}else{
        // Criar a div do menu de loading
        loadingDiv = document.getElementById("acomp");
        //loadingDiv.id = "loadingMenu";
        loadingDiv.className = "loading-menu";

        // Calcular a porcentagem concluída
        var percentConcluido = (valorAtual / valorMaximo) * 100;
        percentConcluido = Math.min(100, Math.max(0, percentConcluido)); // Garantir que a porcentagem esteja entre 0 e 100

        // Criar o conteúdo do menu de loading
         loadingContent = document.getElementById("acomp");
        loadingContent.className = "loading-content";
        loadingContent.innerHTML = `
        <p>Carregando...</p>
        <progress value="${percentConcluido}" max="100"></progress>
        <p>${valorAtual} de ${valorMaximo}</p>
      `;

        loadingDiv.style.display = "block";
    }
}
function arrayToHtmlTable(dataArray) {
      // Abrir uma nova janela
      var novaJanela = window.open('', '_blank');

      // Criar o conteúdo HTML para a tabela
      var tabelaHTML = '<table border="1"><thead><tr>';

      // Adicionar cabeçalho da tabela
      if (dataArray.length > 0) {
        dataArray[0].forEach(function (coluna) {
          tabelaHTML += '<th>' + coluna + '</th>';
        });
        tabelaHTML += '</tr></thead><tbody>';

        // Adicionar linhas da tabela
        for (var i = 1; i < dataArray.length; i++) {
          tabelaHTML += '<tr>';
          dataArray[i].forEach(function (valor) {
            tabelaHTML += '<td>' + valor + '</td>';
          });
          tabelaHTML += '</tr>';
        }

        tabelaHTML += '</tbody></table>';

        // Adicionar tabela ao conteúdo da nova janela
        novaJanela.document.write(tabelaHTML);
      } else {
        // Se a array estiver vazia, exibir uma mensagem na nova janela
        novaJanela.document.write('<p>Nenhum dado disponível para exibir.</p>');
      }
    }

var output = [["matriz","codigo Matriz","turno","areaConhecimento","Código Disciplina","Componente Curricular","H.A. Semanal","Obrigatória?","H.A","Semanas Letivas","H.A. Anual"]];
var L = 0; var doOnce = 1; var turnTurno = "D";
function cataDados(){

    if(doOnce == 1){
        for(var k = 1; k < 50; k++){
            let linhaMatriz = ("0000" + k).slice(-4);
            if(document.getElementById("span_vGERMATCOD_"+linhaMatriz)){
                matrizes.push(document.getElementById("span_vGERMATCOD_"+linhaMatriz).innerText.trim());

            }else{
                continue;}
        }
        console.log(matrizes);
        doOnce = 0;
    }

    if(turnTurno == "D"){
        ifrIframe1.src = "http://sigeduca.seduc.mt.gov.br/geral/hwmgergradematrizalt.aspx?"+matrizes[L-1]+",2025,10995,2,0,2,D,DSP,1,0";
        ifrIframe1.addEventListener("load", cataMatriz);
    }

    if(turnTurno == "N"){
        ifrIframe1.src = "http://sigeduca.seduc.mt.gov.br/geral/hwmgergradematrizalt.aspx?"+matrizes[L-1]+",2025,10995,2,0,2,N,DSP,1,0";
        ifrIframe1.addEventListener("load", cataMatriz);
    }

    L++;


}


function cataMatriz(){
    ifrIframe1.removeEventListener("load", cataMatriz);
    //let area = 1;
    let codMatriz = parent.frames[0].document.getElementById("span_CTLGERMATCOD").innerText.trim();
    let matriz = parent.frames[0].document.getElementById("span_CTLGERMATDSC").innerText.trim();
    let turno = parent.frames[0].document.getElementById("span_CTLGERTRNTPO").innerText.trim();


    for(var i = 1; i < 20; i++){
        let area = ("0000" + i).slice(-4);
        if(parent.frames[0].document.getElementById("AreaContainerRow_"+area)){
            //console.log('foi na area', area);
            let areaConhecimento = parent.frames[0].document.getElementById("span_CTLGERMATDSCAREA_"+area).innerText.trim();
            for(var j = 1; j < 20; j++){
                let linha = ("0000" + j).slice(-4);
                if(parent.frames[0].document.getElementById("DisciplinaContainer_"+area+"Row_"+linha+area)){
                    //console.log('foi na linha ', linha);


                     output.push([
                         matriz,codMatriz,turno,areaConhecimento,
                         parent.frames[0].document.getElementById("span_CTLGERDISCOD_"+linha+area).innerText.trim(),
                         parent.frames[0].document.getElementById("span_CTLGERDISDSC_"+linha+area).innerText.trim(),
                         parent.frames[0].document.getElementById("span_CTLGERGRDMTZDISCCH_"+linha+area).innerText.trim(),
                         parent.frames[0].document.getElementById("span_CTLGERGRDMTZDISCCCH_"+linha+area).innerText.trim(),
                         parent.frames[0].document.getElementById("span_CTLGERPRMLOTMTZCHN_"+linha+area).innerText.trim(),
                         parent.frames[0].document.getElementById("span_CTLGERMATDISCSEMLET_"+linha+area).innerText.trim(),
                         parent.frames[0].document.getElementById("span_vCHANUALGRIDDISC_"+linha+area).innerText.trim()
                     ]);



                }else{continue;}

            }





        }else{continue;}
    }
    if(L > matrizes.length){
        console.log(L, " de ", matrizes.length, "matriz: ",matrizes[L-1]);
        criarLoadingMenu(L, matrizes.length);
        //downloadCSV(output, tipo+".csv");
        arrayToHtmlTable(output);
        L = 0;
        output = [];
        output.push(["matriz","codigo Matriz","turno","areaConhecimento","Código Disciplina","Componente Curricular","H.A. Semanal","Obrigatória?","H.A","Semanas Letivas","H.A. Anual"]);


    }else{
        criarLoadingMenu(L, matrizes.length);
        console.log(L, " de ", matrizes.length, "matriz: ",matrizes[L-1]);
        cataDados();
    }
    //arrayToHtmlTable(output);
}

// ---- cria os menus  -----
    // Função para abrir o menu
    function abrirMenu() {
      document.getElementById("menu").style.display = "block";
    }

    // Função para fechar o menu
    function fecharMenu() {
      document.getElementById("menu").style.display = "none";
    }



   function criarMenu() {
      // Criar a div do menu
       console.log('foi');
      var menuDiv = document.createElement("div");
      menuDiv.id = "menu";
      menuDiv.style.textAlign  = "center";
      menuDiv.className = "menu";
      menuDiv.innerHTML = "<button id='exportarD'>Exportar Diurno!</button><br><button id='exportarN'>Exportar Noturno!</button><br><br><div id='acomp'></div><br><br><button id='fecha'>Fechar</button>";

       document.body.appendChild(menuDiv);
       document.getElementById('fecha').addEventListener("click", fecharMenu);
       document.getElementById('exportarD').addEventListener("click", function () {
           turnTurno = "D"; // Atribuir o valor à variável
           cataDados(); // Chamar a função
       });
       document.getElementById('exportarN').addEventListener("click", function () {
           turnTurno = "N"; // Atribuir o valor à variável
           cataDados(); // Chamar a função
       });

      // Criar o botão para abrir o menu
      var openMenuBtn = document.createElement("button");
      openMenuBtn.id = "openMenuBtn";
      openMenuBtn.className = "open-menu-btn";
      openMenuBtn.innerHTML = "Planilhar";
      openMenuBtn.addEventListener("click", abrirMenu);
      document.body.appendChild(openMenuBtn);
    }

let matrizes = [];
(function() {
    'use strict';
    criarMenu();




//http://sigeduca.seduc.mt.gov.br/geral/hwmgergradematrizalt.aspx?17047,2025,10995,2,0,2,D,DSP,1,0
//http://sigeduca.seduc.mt.gov.br/geral/hwmgergradematrizalt.aspx?17047,2025,10995,2,0,2,N,DSP,1,0
//http://sigeduca.seduc.mt.gov.br/geral/hwmgergradematrizalt.aspx?16528,2025,10995,2,0,2,N,DSP,1,0

})();
