var fileSelect  = document.getElementById('file-upload');
var uploadModal = document.getElementById('upload-modal');

fileSelect.addEventListener('change', function () {
  var files = this.files;
  for (var i = 0; i < files.length; i++) {
    previewImage(this.files[i], i);
  }

  var uploadButton = document.createElement("button");
  uploadButton.classList.add("upload");
  uploadButton.innerHTML = "upload";
  uploadModal.firstElementChild.appendChild(uploadButton);
  uploadButton.addEventListener("click", uploadSelectedFiles, false);

  window.requestAnimationFrame( function() {
    window.requestAnimationFrame( function() {
      uploadModal.classList.add("visible");
    });
  });
}, false);
  
function previewImage(file, fileID) {
  var imageType = /image.*/;

  if (!file.type.match(imageType)) {
    throw "File Type must be an image";
  }

  var preview = document.createElement("div");
  preview.classList.add('preview');
  preview.dataset.fileid = fileID;
  
  var img = document.createElement("img");
  img.file = file;
  preview.appendChild(img);
  uploadModal.firstElementChild.appendChild(preview);

  var description = document.createElement("input");
  description.type = "text";
  description.placeholder = "Add a description";
  description.classList.add("description");
  preview.appendChild(description);

  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "x";
  deleteButton.classList.add("close");
  deleteButton.addEventListener("click", removeImage, false);
  preview.appendChild(deleteButton);

  var reader = new FileReader();
  reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
  reader.readAsDataURL(file);
}

function removeLastImage() {
  uploadModal.removeEventListener('transitionend', removeLastImage, false);
  var preview = uploadModal.querySelector(".preview");
  preview.parentElement.removeChild(preview);

  var upload = uploadModal.querySelector(".upload");
  upload.parentElement.removeChild(upload);
}

function removeImage() {
  if (uploadModal.querySelectorAll(".preview").length === 1) {
    uploadModal.addEventListener('transitionend', removeLastImage, false);
    uploadModal.classList.remove("visible");
    fileSelect.value = "";
  }else{
    this.parentElement.parentElement.removeChild(this.parentElement);
  }
}

function removeImageAfterUpload( preview ) {
  if (uploadModal.querySelectorAll(".preview").length === 1) {
    uploadModal.addEventListener('transitionend', removeLastImage, false);
    uploadModal.classList.remove("visible");
    fileSelect.value = "";
  }else{
    preview.parentElement.removeChild( preview );
  }
}

function uploadSelectedFiles() {
  var images = uploadModal.querySelectorAll(".preview");
  var files = [];
  var descrips = [];

  for (var i = 0; i < images.length; i++) {
    if ( images[i].querySelector(".description").value !== "" ) {
      files.push( fileSelect.files[images[i].dataset.fileid] );
      descrips.push( images[i].querySelector(".description").value );
      removeImageAfterUpload(images[i]);
    }else{
      images[i].classList.add("error");
    }
  }
  
  if (files.length && descrips.length) {
    uploadFile( files, descrips );
  }
}

function uploadFile(files, descriptions) {
  var url = 'upload.php';
  var xhr = new XMLHttpRequest();
  var fd = new FormData();
  xhr.open("POST", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // handle response
      console.log(xhr.responseText);
      handleResult(xhr.responseText);
    }
  };

  for (var i = 0; i < files.length; i++) {
    fd.append("upload_file_" + i, files[i]);
    fd.append("file_desc_" + i, descriptions[i]);
  }

  xhr.send(fd);
}

function handleResult( data ) {
  /*       
    'image_location' => filePath,
    'image_description' => $description
  */
  var newImageOption;
  try {
    newImageOption = JSON.parse(data);
  } catch (error) {
    alert(error);
    return;
  }

  var optionList = document.getElementById('all-images');
  for ( var i = 0; i < newImageOption.length; i++ ) {
    var label = document.createElement('label');
    label.classList.add("image-option");
    var imageOption = document.createElement('input');
    imageOption.type = "radio";
    imageOption.name = "cars";
    imageOption.dataset.imageurl = newImageOption[i].image_location;
    imageOption.addEventListener('click', selectImage, false);

    var text = document.createTextNode( newImageOption[i].image_description );
    
    label.appendChild(imageOption);
    label.appendChild(text);
    optionList.appendChild(label);
    
    var output = document.querySelector('.output');
    output.classList.remove("no-images");
    
    var setInitialImage = selectImage.bind(imageOption);
    setInitialImage();
  }
}

function swapImages() {
  this.removeEventListener('transitionend', swapImages, false);
  this.src = this.dataset.nextsrc;
  this.classList.remove("small");
}

function selectImage() {
  var currentActive = document.querySelector('.active');
  if (currentActive) 
    currentActive.classList.remove("active");
  this.parentElement.classList.add("active");

  var bigImage = document.getElementById('big-image');
  bigImage.dataset.nextsrc = this.dataset.imageurl;
  bigImage.addEventListener('transitionend', swapImages, false);
  window.requestAnimationFrame( function() { bigImage.classList.add("small");} );
}


function hotwireImageList() {
  var currentImageOptions = document.querySelectorAll('#all-images input')

  for (var i = 0; i < currentImageOptions.length; i++) {
    currentImageOptions[i].addEventListener('change', selectImage, false);
  }

  if (currentImageOptions.length > 0) {
    var setInitialImage = selectImage.bind(currentImageOptions[0]);
    setInitialImage();
  }
}
hotwireImageList();