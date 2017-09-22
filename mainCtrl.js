var flagPhotoList = [
    {
        id: "ItalyFlag",
        location: "Italy",
        href: "./img/IMG_0210.jpg",
        time: "2016.05"
    },
    {
        id: "SpainFlag",
        location: "Spain",
        href: "./img/IMG_1482.jpg",
        time: "2016.07"
    },
    {
        id: "FranceFlag",
        location: "France",
        href: "./img/IMG_2215.jpg",
        time: "2016.08"
    },
    {
        id: "TurkeyFlag",
        location: "Turkey",
        href: "./img/IMG_1264.jpg",
        time: "2016.06"
    },
    {
        id: "NetherlandsFlag",
        location: "Netherlands",
        href: "./img/IMG_1933.jpg",
        time: "2016.07"
    },
    {
        id: "TorontoFlag",
        location: "Toronto",
        href: "./img/IMG_3867.jpg",
        time: "2017.02"
    }
]

function positionFlag() {
    var mapHeight = $('#worldMap').height();
    var mapWidth = $('#worldMap').width();
    $('#TorontoFlag').css('top', mapHeight*0.35);
    $('#TorontoFlag').css('left', mapWidth*0.29);
    $('#ItalyFlag').css('top', mapHeight*0.343);
    $('#ItalyFlag').css('left', mapWidth*0.491);
    $('#SpainFlag').css('top', mapHeight*0.355);
    $('#SpainFlag').css('left', mapWidth*0.455);
    $('#FranceFlag').css('top', mapHeight*0.315);
    $('#FranceFlag').css('left', mapWidth*0.465);
    $('#TurkeyFlag').css('top', mapHeight*0.357);
    $('#TurkeyFlag').css('left', mapWidth*0.533);
    $('#NetherlandsFlag').css('top', mapHeight*0.285);
    $('#NetherlandsFlag').css('left', mapWidth*0.475);
}

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

function findKeyframesRule(rule) {
    var ss = document.styleSheets;
    for (var i = 0; i < ss.length; ++i) {
        if (ss[i].href == "http://www.dogandlion.ca/style/main.css") {
            for (var j = 0; j < ss[i].cssRules.length; ++j) {
                if (ss[i].cssRules[j].type == window.CSSRule.KEYFRAMES_RULE && ss[i].cssRules[j].name == rule) { return ss[i].cssRules[j]; }
            }
        }
    }
    return null;
}

function fly(destinationX, destinationY, planeX, planeY) {
    var keyframes = findKeyframesRule('fly');
    var keyframelength = keyframes.cssRules.length;
    var keyframeString = [];  
    for(var i = 0; i < keyframelength; i ++) {
        keyframeString.push(keyframes.cssRules[i].keyText);
    }
    for(var i = 0; i < keyframelength; i ++) {
        keyframes.deleteRule(keyframeString[i]);
    }
    var plane = $("#paperPlane");
    if (destinationX > planeX) {
        plane.css("-webkit-transform","scale(0.675, 0.675)");
        keyframes.appendRule("0% {left: "+planeX+"px; top: "+planeY+"px;}");
        keyframes.appendRule("30% {top: "+(destinationY-(Math.abs(destinationX-planeX)*0.18))+"px; -webkit-transform: scale(1, 1) rotate(22.5deg);}");
        keyframes.appendRule("40% {top: "+(destinationY-(Math.abs(destinationX-planeX)*0.2))+"px; -webkit-transform: rotate(30deg);}");
        keyframes.appendRule("50% {top: "+(destinationY-(Math.abs(destinationX-planeX)*0.18))+"px;}");
        keyframes.appendRule("80% {top: "+(destinationY-(Math.abs(destinationX-planeX)*0.025))+"px; -webkit-transform: scale(1, 1)} rotate(22.5deg)");
        keyframes.appendRule("100% {left: "+(destinationX+24)+"px; top: "+destinationY+"px;}");    
    }
    else {
        plane.css("-webkit-transform","scale(-0.675, 0.675)");
        keyframes.appendRule("0% {left: "+planeX+"px; top: "+planeY+"px;}");
        keyframes.appendRule("30% {top: "+(destinationY-(Math.abs(destinationX-planeX)*0.18))+"px; -webkit-transform: scale(-1, 1) rotate(22.5deg);;}");
        keyframes.appendRule("40% {top: "+(destinationY-(Math.abs(destinationX-planeX)*0.2))+"px; -webkit-transform: scale(-1, 1) rotate(30deg);}");
        keyframes.appendRule("50% {top: "+(destinationY-(Math.abs(destinationX-planeX)*0.18))+"px; -webkit-transform: scale(-1, 1) rotate(27,5deg);}");
        keyframes.appendRule("80% {top: "+(destinationY-(Math.abs(destinationX-planeX)*0.025))+"px; -webkit-transform: scale(-1, 1) rotate(22.5deg);}");
        keyframes.appendRule("100% {left: "+(destinationX+24)+"px; top: "+destinationY+"px;}");
    }
    document.getElementById('paperPlane').style.webkitAnimation = 'none';
    setTimeout(function() {
        document.getElementById('paperPlane').style.webkitAnimation = '';
    }, 1);
    setTimeout(function() {
        plane.css("left", (destinationX+24+"px"));
        plane.css("top", (destinationY+"px"));
    }, 4000)
}

function triggerFly(event, planeLeft, planeTop) {
    event.preventDefault();
    var placeId = event.target.id;
    var placeModel = placeId.replace('Flag', 'Model');
    fly(event.target.offsetLeft, event.target.offsetTop, planeLeft, planeTop);
    $("#"+placeId+"Model").show();
    if (($("#"+placeId).offset().top) < 300) $("#"+placeId+"Model").css('top', (($("#"+placeId).offset().top-16-($("#"+placeId+"Model").height()))+ "px"));
    else $("#"+placeId+"Model").css('top', (($("#"+placeId).offset().top+32)+ "px"));
    $("#"+placeId+"Model").css('left', (($("#"+placeId).offset().left-($("#"+placeId+"Model").width()/2))+ "px"));
}

function homePageLoadImg() {
    $('#loadingIcon').show();
    setTimeout(function(){
        for (var i = 0; i < 1; i++) {
            var imageNode = document.createElement('div');
            imageNode.id = "fileName";
            imageNode.className = "col-sm-4 img-responsive";
            imageNode.style = "padding: 2em; text-align: center;"
            var imageElement = document.createElement('img');
            imageElement.className = "photoModel";
            imageElement.src = "./img/IMG_7606.jpg";
            imageElement.alt = "fileName";
            imageElement.style = "width: 100%; padding: 1em; padding-bottom: 5em;";
            var summaryElement = document.createElement('h5');
            summaryElement.innerHTML = "Story Behind";
            summaryElement.style = "position: relative; top: -3.7em";
            imageNode.appendChild(imageElement);
            imageNode.appendChild(summaryElement);
            $('#homePhotoWall').append(imageNode);
            $('#loadingIcon').hide();
        }
    }, 1000);
}

function homePageFlagModel() {
    for (var i = 0; i < flagPhotoList.length; i++) {
        var flagImageNode = document.createElement('div');
        flagImageNode.id = flagPhotoList[i].id + "Model";
        flagImageNode.className = "photoModel floatOverMap";
        flagImageNode.style = "display: none;"
        var imageElement = document.createElement('img');
        imageElement.className = "photo";
        imageElement.src = flagPhotoList[i].href;
        imageElement.alt = flagPhotoList[i].location + "Photo";
        var locationElement = document.createElement('h1');
        locationElement.innerHTML = flagPhotoList[i].location;
        var timeElement = document.createElement('h5');
        timeElement.innerHTML = flagPhotoList[i].time;
        flagImageNode.appendChild(imageElement);
        flagImageNode.appendChild(locationElement);
        flagImageNode.appendChild(timeElement);
        $('#homePageMap').append(flagImageNode);
    }
}

$(document).ready(function() {

    homePageFlagModel();

    var planeLeft = $("#paperPlane").position().left;
    var planeTop = $("#paperPlane").position().top;
    var planePosUpdate = setInterval(function() {
        planeLeft = $("#paperPlane").position().left;
        planeTop = $("#paperPlane").position().top;
    }, 50)

    $(".mapLocation").hover(function(event){
        if (event.type == "mouseenter") {
            for (var i = 0; i < flagPhotoList.length; i++) {
                $("#"+flagPhotoList[i].id+"Model").hide();
            }
            triggerFly(event, planeLeft, planeTop);
        }
    })

    $(window).scroll(function() {
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
            homePageLoadImg();
        }
    });

    $(".foggyGlass").mousemove(function(event){
        var fog = document.createElement('div');
        fog.id = guid();
        fog.className = "fog";
        fog.style = "top: "+($('.foggyGlass').position().top + event.clientY)+"px;left: "+($('.foggyGlass').position().left + event.clientX)+"px;";
        $('.foggyGlass').append(fog);
        setTimeout(function() {
            $('#'+fog.id).remove();
        }, 3000);
    })

    setTimeout(function() {
        positionFlag();
    }, 500);
});
