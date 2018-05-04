<template>
    <div id="app" class="container">
        <div class="page-header">
            <h1><img src="http://book.framgia.vn/images/icon.jpg" alt="" width="67" height="60"><span>FBook</span></h1>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Add New Books</h3>
            </div>
            <div class="panel-body">
                <form id="form" class="form-inline" v-on:submit.prevent="addBook">
                    <div class="form-group">
                        <label for="bookTitle">Title:</label>
                        <input type="text" id="bookTitle" class="form-control" v-model="newBook.title">
                    </div>
                    <div class="form-group">
                        <label for="bookAuthor">Author:</label>
                        <input type="text" id="bookAuthor" class="form-control" v-model="newBook.author">
                    </div>
                    <div class="form-group">
                        <label for="bookUrl">Url:</label>
                        <input type="text" id="bookUrl" class="form-control" v-model="newBook.url">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Add Book">
                </form>
                <br>
                <p v-if="errors.length > 0">
                    <ul class="alert alert-danger">
                        <li v-for="(error, index) in errors" v-bind:key="index">{{ error }}</li>
                    </ul>
                </p>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Book List</h3>
            </div>
            <div class="panel-body">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody name="custom-classes-transition"
                        enter-active-class="animated tada"
                        leave-active-class="animated bounceOutRight"
                        is="transition-group"
                    >
                        <tr v-for="book in books" v-bind:key="book['.key']">
                            <td><a v-bind:href="book.url">{{book.title}}</a></td>
                            <td>{{book.author}}</td>
                            <td><span class="glyphicon glyphicon-trash" aria-hidden="true" v-on:click="removeBook(book)"></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import Firebase from 'firebase'
    import toastr from 'toastr'

    let config = {
        apiKey: "AIzaSyCN_JQcGwvCVh5mUBOno_YCR_BONey08Fs",
        authDomain: "vuejs-http-aa65e",
        databaseURL: "https://vuejs-http-aa65e.firebaseio.com/",
        storageBucket: "vuejs-http-aa65e.appspot.com",
        messagingSenderId: "444555911896"
    };
      
    let app = Firebase.initializeApp(config)
    let db = app.database()
    let booksRef = db.ref('books')
    
    export default {
        name: 'app',
        data () {
            return {
                newBook: {
                    title: '',
                    author: '',
                    url: 'http://'
                },
                errors: []
            }
        },
        firebase: {
            books: booksRef
        },
        methods: {
            addBook(e) {
                this.errors = [''];
                if(!this.newBook.title) this.errors.push("Name required.");
                if(!this.newBook.author) this.errors.push("Author required.");
                e.preventDefault();
                if(this.errors == '') {
                    booksRef.push(this.newBook);
                    this.newBook.title = '';
                    this.newBook.author = '';
                    this.newBook.url = 'http://';
                    toastr.success('Book added successfully')
                }
            },
            removeBook(book) {
                booksRef.child(book['.key']).remove()
                toastr.success('Book removed successfully')
            }
        },
    }
</script>
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 20px;
    }

    ul li {
        list-style-type: none;
    }
</style>
