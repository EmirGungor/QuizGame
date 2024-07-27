const ui = new UI();

ui.btn_start.addEventListener("click", function() {  //start butonuna bastığında
    //if(quiz.sorular.length != quiz.soruIndex){ //soru bitmemişse quiz_box classı active yapıyor ve öne çıkıyor
        ui.quiz_box.classList.add("active")
        startTimer(10);
        startTimerLine();
        ui.soruGoster(quiz.soruGetir()); //soru getirme fonksiyonu çağırılıyor
        ui.soruSayisiniGoster(quiz.soruIndex+1, quiz.sorular.length);
        ui.btn_next.classList.remove("show");
        //quiz.soruIndex += 1;  //sonraki soru için quiz index 1 artır  
    // }else{
        //console.log("quiz bitti");
    //}
    //bunları silip aşağıda next_btn e ekledik çünkü indexi 1 artırma sonraki butona basınca olacağı için sadeleştirme yapmamız iyi olur
});
ui.btn_next.addEventListener("click", function(){  //ekleme içeriğinin aynısı
    if(quiz.sorular.length != quiz.soruIndex+1){ //soru bitmemişse devam
        quiz.soruIndex += 1;
        document.querySelector(".timer").classList.remove("bg-danger");
        ui.time_text.textContent = "Kalan Süre";
        clearInterval(counter); //intervali temizlememiz gerekiyor
        clearInterval(counterLine); //line ı temizle
        startTimer(10);
        startTimerLine();
        ui.soruGoster(quiz.soruGetir()); //soru getirme fonksiyonu çağırılıyor
        ui.soruSayisiniGoster(quiz.soruIndex+1, quiz.sorular.length)
        document.querySelector(".next_btn").classList.remove("show");
          //sonraki soru için quiz index 1 artır 
    }else{
        clearInterval(counter);
        clearInterval(counterLine); //line ı temizle
        ui.quiz_box.classList.remove("active");
        ui.score_box.classList.add("active");
        ui.skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi);
    }
});

ui.btn_quit.addEventListener("click", function(){
    window.location.reload();
});

ui.btn_replay.addEventListener("click", function(){
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi =0;
    ui.btn_start.click();
    ui.score_box.classList.remove("active")
});


// const option_list = document.querySelector(".option_list");            
// const correctIcon='<div class="icon"><i class="fa fa-check"></i></div>';
// const incorrectIcon='<div class="icon"><i class="fa fa-times"></i></div>';



function optionSelected(option){
    clearInterval(counter);
    clearInterval(counterLine); //line ı temizle
    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir();

    if(soru.cevabiKontrolEt(cevap)){
        quiz.dogruCevapSayisi += 1;
        option.classList.add("correct")
        option.insertAdjacentHTML("beforeend", ui.correctIcon)
    } else{
        option.classList.add("incorrect")
        option.insertAdjacentHTML("beforeend",ui.incorrectIcon)

    }

    for (let i=0; i<ui.option_list.children.length; i++ ){
        ui.option_list.children[i].classList.add("disabled")
    }

    ui.btn_next.classList.add("show");

}


//timer
let counter;
function startTimer(time){
    counter = setInterval(timer, 1000);

    function timer(){
        ui.time_second.textContent = time;
        time--;

        if(time<0){
            clearInterval(counter)

            ui.time_text.textContent = "Süre Bitti";

            let cevap = quiz.soruGetir().dogruCevap;
            document.querySelector(".timer").classList.add("bg-danger");

            for (let option of ui.option_list.children){
                if (option.querySelector("span b").textContent == cevap){
                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend", ui.correctIcon)

                }

                option.classList.add("disabled")

            }

            ui.btn_next.classList.add("show")
        }
    }
}


let counterLine;
function startTimerLine(){
    let line_width = 0;

    counterLine = setInterval(timer,20);
    
    function timer(){
        line_width += 1;
        ui.time_line.style.width = line_width + "px";

        if(line_width > 549){
            clearInterval(counterLine);
        }
    }
}






