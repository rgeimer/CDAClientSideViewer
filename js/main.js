var myApp = angular.module('myApp',[]);

var support  = {
    // Are files exposed to JS?
    // As used by Modernizr @
    // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/file/api.js
    'fileReader'  : (function testFileReader(){
        // Test: look for global file class.
        return !!(window.File && window.FileList && window.FileReader);
    }()),

    // AJAX file upload via formData?
    'formData'    : window.FormData !== void 0
};

function loadXMLDoc(filename){
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", filename, false);
    xhttp.send("");
    return xhttp.responseXML;
}

function RenderController($scope) {
    var xsl = loadXMLDoc("cda.xsl");
    if (support.fileReader == true){
        $scope.fileData = 'Please select a file and click the Display CDA button.';
    } else {
        $scope.fileData = 'Sorry, your browser is not supported.';
    }
    $scope.displayCDA = function(){
        var f = document.getElementById('file').files[0];
        var r = new FileReader();

        r.onloadend = function(){
            var domParser = new DOMParser();
            var xml = r.result;
            var xmlDom = domParser.parseFromString(xml, 'text/xml');
            var xsltProcessor = Saxon.newXSLT20Processor();
            xsltProcessor.importStylesheet(xsl);
            var resultDocument = xsltProcessor.transformToFragment(xmlDom, document);
            $scope.fileData = resultDocument.html;
            document.getElementById("example").appendChild(resultDocument);
        }

        r.readAsText(f);
    }
}



