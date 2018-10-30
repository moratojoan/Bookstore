/* eslint-env browser */
/* eslint "no-console": "off"  */
/* global$ */

var app = new Vue({
    el: "#app",
    data: {
        url: "https://api.myjson.com/bins/zyv02",
        books: null,
        languages: [],
        searchInfo: "",
        filterLanguages: "All"
    },
    methods: {
        startFetch: function (url) {
            fetch(url, {
                    method: "GET"
                })
                .then(response => response.json())
                .then(myData => {
                    this.books = myData.books;
                    console.log(this.books);
                    this.dropDownMenuLenguages();
                })
        },
        dropDownMenuLenguages: function () {
            this.languages = [...new Set(this.books.map(book => book.language))].sort();
        },
        searchMachine: function (book) {
            return (book.title.toLowerCase().includes(this.searchInfo.trim().toLowerCase()) || book.description.toLowerCase().includes(this.searchInfo.trim().toLowerCase()) || book.language.toLowerCase().includes(this.searchInfo.trim().toLowerCase())) && (this.filterLanguages == "All" || this.filterLanguages == book.language);
        }
    },
    created: function () {
        this.startFetch(this.url);
    }
})
