(function($) {

    $.fn.jackpotDC = function(options) {
        var settings = $.extend({
            counter : 0,
            nbTour  : 3,
            loseTitle : 'Perdu !',
            winTitle : 'Gagné !',
            loseText : 'Lorem ipsum',
            winText : 'Lorem ipsum',
        }, options );

        return this.each(function () {

                /*** Variables ***/
                const band = $('.band');
                const band1 = $('.band1');
                const band2 = $('.band2');

                let win; // Détermine si le joueur perd ou gagne
                const tab = [125,375,625,875]; 
                const tabTotal = tab.length;
                let random;

                const myModal = new bootstrap.Modal(document.getElementById('modal-box'), {
                keyboard: false
                })
    

                // random avec exclusion du lot
                /*function randomExcluded(min, max, excluded) {
                    var n = Math.floor(Math.random() * (max-min) + min);
                    if (n >= excluded) n++;
                    return n;
                }*/

                // random Donne un entier aléatoire entre 0 et x
                function randomPicto(x){
                return Math.floor((Math.random() * x) + 1) - 1;
                }

                // Animation des bandes du jackpot
                let tl = gsap.timeline({paused:true});
                tl.to(band, {duration:.2, repeat:5, y:"+750px", ease:"none", onComplete:fin, onCompleteParams:[band]}, 0.2)
                .to(band1, {duration:.2, repeat:5, y:"+750px", ease:"none", onComplete:fin, onCompleteParams:[band1]}, 0)
                .to(band2, {duration:.2, repeat:5, y:"+750px", ease:"none", onComplete:fin, onCompleteParams:[band2]}, 0.8);

                // Animation du manche du jackpot
                function slotTriggerMove() {
                    gsap.set([head, stick, hole], {y:0, scale: 1}); // Décomposition du manche en 3 parties : tête, bras, base
                    gsap.to(head, {duration: .4, y: "70"+"px", repeat: 1, yoyo: true, ease:Sine.easeIn});
                    gsap.to(stick, {duration: .4, y: "14"+"px", scaleY: .3, transformOrigin:"50% 100%", repeat: 1, yoyo: true, ease:Sine.easeIn});
                    gsap.to(hole, {duration: .4, y: "10"+"px", scaleY: 2, repeat: 1, yoyo: true, ease:Sine.easeIn});
                }

                function fin(var1){
                    if (var1 == band2) {
                    if (!win) {
                        if (random == (tabTotal -1)) { 
                            random = 0 
                        } else {
                            random ++;   
                        } 
                        gsap.set(var1, {y:"0"});
                        gsap.to(var1, {duration:0.5, y:"+"+tab[random]+"px", ease:"back.out(2)"})

                        $('.modal-title').text(settings.loseTitle);
                        $('.modal-body').text(settings.loseText);
                        myModal.show();

                    } else {
                        $('.modal-title').text(settings.winTitle);
                        $('.modal-body').text(settings.winText);
                        myModal.show();
                    }
                    }
                    gsap.set(var1, {y:"0"});
                    gsap.to(var1, {duration:0.5, y:"+"+tab[random]+"px", ease:"back.out(2)"})
                }
        
                $('#jackpot-stick').click(function() {
                    random = randomPicto(tabTotal); console.log(random)
                    tl.play(0);
                    slotTriggerMove();
                    settings.counter++;
                    if (settings.counter < settings.nbTour ) {
                        win = false;
                    } else {
                        win = true;
                        $('.btn-play').hide();
                    };
                });

            $("img").mousedown(function(){
                return false;
            });
        });
    };
})(jQuery);