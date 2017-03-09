var random = {
    name:     function () {
        return chance.pickone([
            "Agate",
            "Amber",
            "Amethyst",
            "Aquamarine",
            "Emerald",
            "Malachite",
            "Moonstone",
            "Obsidian",
            "Onyx",
            "Sapphire"
        ]);
    },
    price:    function () {
        return chance.floating({
            min:   3,
            max:   80,
            fixed: chance.natural({ max: 2 })
        });
    },
    sentence: function () {
        return chance.sentence({
            words: chance.natural({ min: 5, max: 20 })
        });
    },
    image:    function (num) {
        num = num || chance.natural({ min: 1, max: 10 });
        return "src/images/gem-" + num + ".jpg";
    },
    images:    function () {
        var numbers = (new Array(9)).join('a').split('a').map((v, i) => i+1);
        var indexes = chance.shuffle(numbers).slice(0, chance.natural({ min: 2, max: 4 }));
        return indexes.map(this.image);
    },
    boolean:  function () {
        return chance.bool();
    },
    stars: function () {
        return chance.natural({ min: 1, max: 5 });
    },
    email: function () {
        return chance.email();
    }
};


var app = angular.module('app', []);


app.controller('StoreController', function () {

    this.numbers = [1, 2, 3, 4, 5];

    this.colors = [
        { id: 1, name:'black',  shade:'dark' },
        { id: 2, name:'white',  shade:'light' },
        { id: 3, name:'red',    shade:'dark' },
        { id: 4, name:'blue',   shade:'dark', disabled: true },
        { id: 5, name:'yellow', shade:'light' }
    ];

});






app.controller('StoreController', function () {
   this.products = (new Array(1))
       .join('a')
       .split('a')
       .map(v => {
           return {
               name:        random.name(),
               price:       random.price(),
               description: random.sentence(),
               canPurchase: random.boolean(),
               soldOut:     random.boolean(),
               image:       random.image(),
               images:      random.images(),
               reviews:     [{
                   stars:  random.stars(),
                   body:   random.sentence(),
                   author: random.email()
               }, {
                   stars:  random.stars(),
                   body:   random.sentence(),
                   author: random.email()
               }, {
                   stars:  random.stars(),
                   body:   random.sentence(),
                   author: random.email()
               }],
               specifs: []
           };
       });
});

app.controller('PanelController', function () {
   this.tab = 2;

   this.selectTab = function (tab) {
       this.tab = tab;
   };

   this.isSelected = function (tab) {
       return this.tab == tab;
   };

});

app.controller('GalleryController', function () {
   this.current = 0;

   this.setCurrent = function(index){
       this.current = index || 0;
   };
});

app.controller('ReviewController', function () {
   this.review = {};



   this.addReview = function(product){
     var date = new Date();
     this.review.date = date;
       product.reviews.push(this.review);
       this.review = {};
   };
});

app.controller('SpecificationController', function () {
    this.spec = {
        colors: []
    };
    this.addSpecification = function (product) {
        this.spec.colors = this.spec.colors.join(', ');
        product.specifs.push(this.spec);
        this.spec = {};
    }
    this.addColor = function (color) {
        this.spec.colors.push(color);
    }
})