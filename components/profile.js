function ProfilePageScope() {

    function renderProfilePage() {

        document.querySelector(".main-content").innerHTML = `
                <form>
            <div class="mb-3">
                <label for="" class="form-label">Username</label>
                <input type="text" class="form-control" aria-describedby="">
                <div  class="form-text"></div>
            </div>
            <div class="mb-3">
                <label for="" class="form-label">Email address</label>
                <input type="email" class="form-control" aria-describedby="emailHelp">
                <div  class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="" class="form-label">Email address</label>
                <input type="email" class="form-control" aria-describedby="emailHelp">
                <div class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="" class="form-label">Password</label>
                <input type="password" class="form-control">
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" >
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        `
    }


    return {
        'renderProfilePage': renderProfilePage
    }

}