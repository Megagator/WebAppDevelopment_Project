<!doctype html>
<html class="no-js" lang="">

<head>
	<meta charset="utf-8">
	<title>Zoom Zoom</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="css/main.css">
</head>

<?php
	require('load.php');
?>

<body>
	<header>
		<div class="wrapper">
			<h1>Zoom Zoom</h1>
			<label class="plus">+<input type="file" id="file-upload" accept="image/*" multiple="multiple"></label>
		</div>
	</header>
	
	<section class="output <?php echo ($rows->rowCount() === 0) ? "no-images" : "";?>">
		<div class="wrapper">
		<div class="image-options" id="all-images">
			<!-- list of image options -->
			<?php
				foreach ($rows as $row) {
					echo '<label class="image-option">';
					echo '<input type="radio" name="cars" data-imageurl="'.$row['filepath'].'" value="'.$row['description'].'">';
					echo $row['description'];
					echo '</label>';
				}
			?>
		</div>
		
		<div class="display-image">
			<!-- blank image so browser doesn't optimize its animation away when the new image is added -->
			<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" id="big-image"/>
		</div>

		</div>
	</section>

	<div class="modal-bg" id="upload-modal">
		<div class="modal">
			<h2>Upload</h2>
		</div>
	</div>

	<script src="js/uploader.js" async></script>
</body>
</html>



