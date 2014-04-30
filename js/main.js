var myApp = angular.module('myApp',[]);

function loadXMLDoc(filename){
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", filename, false);
    xhttp.send("");
    return xhttp.responseXML;
}

function RenderController($scope) {
    var xsl = loadXMLDoc("cda.xsl");
    $scope.fileData = 'none';
    $scope.displayCDA = function(){
        var f = document.getElementById('file').files[0];
        var r = new FileReader();

        r.onloadend = function(){
            var domParser = new DOMParser();
            var xml = r.result;
            var xmlDom = domParser.parseFromString(xml, 'text/xml');
            var xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsl);
            var resultDocument = xsltProcessor.transformToFragment(xmlDom, document);
            $scope.fileData.innerHTML = resultDocument;
            document.getElementById("example").appendChild(resultDocument);
        }

        r.readAsBinaryString(f);
    }
}



