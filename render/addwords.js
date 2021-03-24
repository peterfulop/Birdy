function AddWordsScope() {

    function renderAddWordsContent() {

        createDictionaryDDList(mainContent);

        mainContent.innerHTML += `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            </div>
    
            <div class="add-new-words-input">
                <div class="col-md-12 input-box-1">
                    <label for="validationServer01" class="form-label">Idegen kifejezés</label>
                    <div class="new-word-input-1">
                        <input type="text" class="form-control" id="validationServer01" value="" required><button class="btn btn-secondary" type=""><i class="fas fa-volume-up"></i></button>
                    </div>
                    <div class="feedback new-word-input-1">Looks good!</div>
                </div>
    
                <div class="col-md-12 input-box-2">
                    <label for="validationServer02" class="form-label">Magyar kifejezés</label>
                        <div class="new-word-input-2">
                            <input type="text" class="form-control" id="validationServer02" value="" required>
                            <button class="btn btn-secondary" type=""><i class="fas fa-volume-up"></i></button>
                        </div>
                        <div class="feedback new-word-input-2">Looks good!</div>
                    </div>
                 </div>
    
                <div class="add-new-words-buttons">
                    <div class="buttons-left">
                        <button class="btn btn-success" type="">Rögzítés</button>
                    </div>
                    <div class="buttons-right">
                        <button class="btn btn-danger" type=""><i class="fas fa-eraser"></i></button>
                        <button class="btn btn-warning" type=""><i class="fas fa-sync-alt"></i></button>
                    </div>
                </div>
            </div>
        `
    }



    return {
        'renderAddWordsContent': renderAddWordsContent
    }
}