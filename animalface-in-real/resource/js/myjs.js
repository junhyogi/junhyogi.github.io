// Image upload 
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.image-upload-wrap').hide();
            $('#loading').show();
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();
            $('.image-title').html(input.files[0].name);
        };
        reader.readAsDataURL(input.files[0]);
        init().then(function() {
            predict();
            $('#loading').hide();
        });
    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function() {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function() {
    $('.image-upload-wrap').removeClass('image-dropping');
});

// Teachable machine

const URL = "https://teachablemachine.withgoogle.com/models/VdX0qtxEM/";
let model, webcam, labelContainer, maxPredictions, resultImageContainer;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    labelContainer = document.getElementById("label-container");
    resultImageContainer = document.getElementById("result-image-container");
    for (let i = 0; i < maxPredictions; i++) {
        var element = document.createElement("div")
        element.classList.add("d-flex");
        labelContainer.appendChild(element);
    }
}

async function predict() {
    var image = document.getElementById("face-image")
    const prediction = await model.predict(image, false);
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    var resultTitle, resultExplain, resultCeleb;

    // gtag('event', '동물상 테스트 수행', {
    //     'event_category': '동물상 테스트 수행',
    //     'event_label': '남자'
    // });
    switch (prediction[0].className) {
        case "dog":
            resultTitle = "xxx"
            resultExplain = "설명"
            resultCeleb = "예:"
            // gtag('event', '남자 결과 강아지상', { 'event_category': '남자 결과' });
            break;
        case "lama":
            resultTitle = "xxx"
            resultExplain = "설명"
            resultCeleb = "예:"
            // gtag('event', '남자 결과 고양이상', { 'event_category': '남자 결과' });
            break;
        case "odobenus":
            resultTitle = "xxx"
            resultExplain = "설명"
            resultCeleb = "예:"
            // gtag('event', '남자 결과 토끼상', { 'event_category': '남자 결과' });
            break;
        case "ferrilata":
            resultTitle = "xxx"
            resultExplain = "설명"
            resultCeleb = "예:"
            // gtag('event', '남자 결과 공룡상', { 'event_category': '남자 결과' });
            break;
        case "flog":
            resultTitle = "xxx"
            resultExplain = "설명"
            resultCeleb = "예:"
            // gtag('event', '남자 결과 곰상', { 'event_category': '남자 결과' });
            break;
        case "monkey":
            resultTitle = "xxx"
            resultExplain = "설명"
            resultCeleb = "예:"
            // gtag('event', '남자 결과 곰상', { 'event_category': '남자 결과' });
            break;
        case "dinosaur":
            resultTitle = "xxx"
            resultExplain = "설명"
            resultCeleb = "예:"
            // gtag('event', '남자 결과 곰상', { 'event_category': '남자 결과' });
            break;
        default:
            resultTitle = "알수없음"
            resultExplain = ""
            resultCeleb = ""
            // gtag('event', '남자 결과 알수없음', { 'event_category': '남자 결과' });
    }

    var title = "<div class='result-animal-title'>" + resultTitle + "</div>"
    var explain = "<div class='animal-explain pt-2'>" + resultExplain + "</div>"
    var celeb = "<div class='result-animal-celeb pt-2 pb-2'>" + resultCeleb + "</div>"
    // $('.result-message').html(title + explain + celeb);
    var barWidth;
    for (let i = 0; i < Math.min(3, prediction.length); i++) {
        if (prediction[i].probability.toFixed(2) > 0.1) {
            barWidth = Math.round(prediction[i].probability.toFixed(2) * 100) + "%";
        } else if (prediction[i].probability.toFixed(2) >= 0.01) {
            barWidth = "4%"
        } else {
            barWidth = "2%"
        }
        var labelTitle, imageURL;
        switch (prediction[i].className) {
            case "dog":
                imageURL = "https://i.ibb.co/8Xp22s8/dog.png"
                labelTitle = "불테리어상"
                break;
            case "lama":
                imageURL = "https://i.ibb.co/s9J8F6V/lama.png"
                labelTitle = "라마상"
                break;
            case "odobenus":
                imageURL = "https://i.ibb.co/v3r43Pf/odobenus.png"
                labelTitle = "바다코끼리상"
                break;
            case "ferrilata":
                imageURL = "https://i.ibb.co/NLfz7gx/ferrilata.png"
                labelTitle = "티벳여우상"
                break;
            case "flog":
                imageURL = "https://i.ibb.co/3BrPMrh/flog.png"
                labelTitle = "개구리상"
                break;
            case "monkey":
                imageURL = "https://i.ibb.co/XD0wZn3/monkey.png"
                labelTitle = "원숭이상"
                break;
            case "dinosaur":
                imageURL = "https://i.ibb.co/3pG81nn/dinosuar.png"
                labelTitle = "공룡상"
                break;
            default:
                imageURL = ""
                labelTitle = "알수없음"
        }
        var label = "<div class='animal-label d-flex align-items-center'>" + labelTitle + "</div>"
        var bar = "<div class='bar-container position-relative container'><div class='top" + (i+1) + "-box'></div><div class='d-flex justify-content-center align-items-center top" + (i+1) + "-bar' style='width: " + barWidth + "'><span class='d-block percent-text'>" + Math.round(prediction[i].probability.toFixed(2) * 100) + "%</span></div></div>"
        labelContainer.childNodes[i].innerHTML = label + bar;

        var image = "<div class='image-column'><img class='rounded-circle' src='"+imageURL+"' width='100%'></div>"
        resultImageContainer.innerHTML += image;
    }
}
